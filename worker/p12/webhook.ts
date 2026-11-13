// POST /api/p12/webhook: recebe os posts e as categorias do Rankeando e responde as leituras dele (rankeando-blog/CONTRATO.md v3).
// A assinatura é conferida primeiro, só com RANKEANDO_WEBHOOK_SECRET (ou o antigo P12_WEBHOOK_SECRET) e o relógio do servidor; depois uma
// X-Rankeando-Entrega repetida recebe a resposta guardada; depois o evento é aplicado.
import { readBody } from '../body';
import { lerCabecalhoDoRankeando, verificarAssinatura } from './assinatura';
import { CONTRATO, RECURSOS, ERROS, erro, lerEvento, resposta, type PostP12, type Resposta } from './contrato';
import { acharEntrada, entradas, lerPostDaEntrada, paginaDePosts } from './posts';
import { urlDoPost } from './site';
import type { P12Store } from './store';

/** O JSON de um post inteiro raramente passa de 200 KB; o D1 guarda linhas de até 2 MB. */
const MAX_CORPO = 1_500_000;

/** Endereços de um segmento que o blog usa para outra coisa (páginas de categoria e paginação). */
const RESERVADOS = new Set(['categoria', 'page', 'pagina', 'feed']);

export type Dependencias = {
  /** `segredoDoRankeando(env)`. */
  segredo: string | undefined;
  store: P12Store;
  /** Segundos unix: o relógio do servidor em produção. */
  agora: number;
};

const json = (r: Resposta) => Response.json(r.corpo, { status: r.status, headers: { 'cache-control': 'no-store' } });
const salvo = (status: number, corpo: string) =>
  new Response(corpo, { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const LEITURAS = new Set(['categorias.listar', 'posts.listar', 'post.ler']);
const NAO_EXISTE = () => erro(404, 'nao_encontrado', 'post não existe');

export async function tratarWebhook(request: Request, deps: Dependencias): Promise<Response> {
  if (request.method !== 'POST') return json(erro(405, 'metodo_nao_permitido', 'use POST'));
  if (!deps.segredo) {
    console.error({ message: 'rankeando webhook: RANKEANDO_WEBHOOK_SECRET (or P12_WEBHOOK_SECRET) not configured' });
    return json(erro(503, 'nao_configurado', 'o site ainda não tem a chave RANKEANDO_WEBHOOK_SECRET'));
  }
  const corpo = await readBody(request, MAX_CORPO);
  if (corpo === null) return json(erro(413, 'corpo_invalido', 'corpo maior que 1,5 MB'));

  const conferencia = await verificarAssinatura(deps.segredo, lerCabecalhoDoRankeando(request.headers, 'Assinatura'), corpo, deps.agora);
  if (conferencia === 'fora_do_horario') return json(ERROS.horario());
  if (conferencia !== 'ok') return json(ERROS.assinatura());

  const cabecalhoEvento = lerCabecalhoDoRankeando(request.headers, 'Evento');
  // As leituras só leem: cada pedido tem uma entrega nova e a resposta é sempre fresca, nunca uma guardada.
  const leitura = cabecalhoEvento !== null && LEITURAS.has(cabecalhoEvento);
  const entrega = lerCabecalhoDoRankeando(request.headers, 'Entrega') ?? '';
  if (!leitura && (!entrega || entrega.length > 300)) return json(ERROS.corpo('cabeçalho X-Rankeando-Entrega ausente ou inválido'));

  try {
    if (!leitura) {
      const anterior = await deps.store.entrega(entrega);
      if (anterior) return salvo(anterior.status, anterior.corpo);
    }

    const evento = lerEvento(corpo, cabecalhoEvento);
    if ('status' in evento) return json(evento);

    if (evento.evento === 'categorias.listar') {
      const todas = await deps.store.categorias();
      return json(resposta(200, {
        ok: true,
        categorias: todas.map((c) => ({
          slug: c.slug,
          nome: c.nome,
          ...(c.descricao ? { descricao: c.descricao } : {}),
          pai: c.pai,
          ordem: c.ordem,
          total_posts: c.posts,
        })),
      }));
    }

    if (evento.evento === 'posts.listar') {
      const pagina = paginaDePosts(await entradas(deps.store), evento);
      if (!pagina) return json(ERROS.corpo('cursor inválido: use o proximo_cursor que o site deu'));
      return json(resposta(200, { ok: true, posts: pagina.posts, total: pagina.total, proximo_cursor: pagina.proximo_cursor }));
    }
    if (evento.evento === 'post.ler') {
      const e = acharEntrada(await entradas(deps.store), evento.id_no_site);
      if (!e) return json(NAO_EXISTE());
      const post = await lerPostDaEntrada(e, deps.store);
      if (!post) throw new Error(`dados do post ${e.idNoSite} indisponíveis`);
      return json(resposta(200, { ok: true, ...post }));
    }

    const agora = new Date(deps.agora * 1000).toISOString();
    const nova = (r: Resposta) => ({ entrega, evento: evento.evento, status: r.status, corpo: JSON.stringify(r.corpo) });

    if (evento.evento === 'ping') {
      const r = resposta(200, { ok: true, desafio: evento.desafio, contrato: CONTRATO, recursos: [...RECURSOS] });
      await deps.store.salvarPing(nova(r), agora);
      return json(r);
    }
    if (evento.evento === 'categorias') {
      const r = resposta(200, { ok: true });
      // Modo mesclar (ou sem modo): toda lista é aplicada, item a item (um item mais velho que o guardado é pulado pelo store).
      // Outro modo mantém a regra antiga: uma lista mais velha que a última não muda nada.
      const mescla = evento.modo === null || evento.modo === 'mesclar';
      const ultima = mescla ? null : await deps.store.categoriasAtualizadoEm();
      if (ultima && ultima > evento.atualizado_em) await deps.store.salvarEntrega(nova(r), agora);
      else await deps.store.salvarCategorias({ categorias: evento.categorias, atualizadoEm: evento.atualizado_em, entrega: nova(r), agora });
      return json(r);
    }
    if (evento.evento === 'categorias.remover') {
      const r = resposta(200, { ok: true });
      await deps.store.removerCategorias({ slugs: evento.slugs, entrega: nova(r), agora });
      return json(r);
    }
    if (evento.evento === 'post.substituir' || evento.evento === 'post.restaurar') {
      const e = acharEntrada(await entradas(deps.store), evento.id_no_site);
      if (!e) return json(NAO_EXISTE());
      const r = resposta(200, { ok: true, url: urlDoPost(e.slug) });
      if (evento.evento === 'post.restaurar') {
        await deps.store.restaurar(evento.id_no_site, nova(r), agora);
      } else {
        const t = evento.troca;
        await deps.store.substituir(
          { idNoSite: evento.id_no_site, titulo: t.titulo, conteudoHtml: t.conteudo_html, conteudoMarkdown: t.conteudo_markdown, seoTitulo: t.seo.titulo, seoDescricao: t.seo.descricao, seoPalavraChave: t.seo.palavra_chave, faqJsonld: t.faq_jsonld, atualizadoEm: t.atualizado_em },
          nova(r),
          agora,
        );
      }
      return json(r);
    }
    if (evento.evento === 'post.remover') {
      const r = resposta(200, { ok: true });
      await deps.store.remover(evento.id, nova(r), agora);
      return json(r);
    }
    return json(await publicar(evento.post, deps, agora, nova));
  } catch (e) {
    console.error({ message: 'rankeando webhook: storage failed', entrega, error: e instanceof Error ? e.message : String(e) });
    return json(erro(503, 'indisponivel', 'banco do site indisponível; tente de novo'));
  }
}

async function publicar(
  post: PostP12,
  deps: Dependencias,
  agora: string,
  nova: (r: Resposta) => { entrega: string; evento: string; status: number; corpo: string },
): Promise<Resposta> {
  const { store } = deps;
  const atual = await store.porId(post.id);
  // Uma versão mais velha que a do site (um reenvio que chega depois de uma versão nova, ou depois de o post ser removido):
  // responde sucesso e deixa o site como está.
  const removido = atual ? null : await store.removidoEm(post.id);
  if ((atual && atual.atualizadoEm > post.atualizado_em) || (removido && removido > post.atualizado_em)) {
    const r = resposta(200, { ok: true, url: urlDoPost(atual?.slug ?? post.slug) });
    await store.salvarEntrega(nova(r), agora);
    return r;
  }
  // Este site não tinha blog: o único "post do site" possível é um endereço que o próprio blog usa para outra coisa.
  if (RESERVADOS.has(post.slug)) return ERROS.slugDoSite();
  const dono = await store.idDoSlug(post.slug);
  if (dono && dono !== post.id) return ERROS.slugDoPublisher();

  const antigos = new Set(atual?.slugsAntigos ?? []);
  if (atual && atual.slug !== post.slug) antigos.add(atual.slug);
  antigos.delete(post.slug);
  // O endereço antigo de outro post agora é deste: o 301 dele some.
  const liberar = (await store.donosDoSlugAntigo(post.slug)).filter((r) => r.id !== post.id);

  const r = resposta(200, { ok: true, url: urlDoPost(post.slug) });
  await store.gravar({ post, slugsAntigos: [...antigos], liberar, entrega: nova(r), agora });
  return r;
}
