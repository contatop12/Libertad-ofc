// Posts do blog como o contrato v3 do Rankeando os enxerga (`posts.listar`, `post.ler`, `post.substituir`, `post.restaurar`).
// Este site não tinha blog: todos os posts são os do Rankeando (D1), cada um com um `id_no_site` estável ("rk:<id>", worker/p12/ids.ts).
// Uma troca (tabela p12_substituicoes) é aplicada aqui e nas páginas: o post original nunca é alterado.
import type { PostP12 } from './contrato';
import { idDoPostDoPublisher } from './ids';
import { urlDoPost } from './site';
import { readingMinutes } from './texto';
import type { Cartao, P12Store, Resumo, Substituicao } from './store';

/** Um post do blog como `posts.listar` o mostra (a troca, se houver, já aplicada). */
export type Entrada = {
  idNoSite: string;
  slug: string;
  titulo: string;
  publicadoEm: string;
  atualizadoEm: string;
  categoriaSlug: string | null;
  /** O id que o Rankeando mandou no `post.publicar`. */
  origem: string;
  troca: Substituicao | null;
};

const iso = (s: string) => new Date(s).toISOString();

/** Todos os posts, do mais novo para o mais antigo (empate pelo `id_no_site`). */
export async function entradas(store: P12Store): Promise<Entrada[]> {
  const [resumos, trocas] = await Promise.all([store.resumos(), store.substituicoes()]);
  const porId = new Map(trocas.map((t) => [t.idNoSite, t]));
  return resumos
    .map((r): Entrada => {
      const id = idDoPostDoPublisher(r.id);
      const t = porId.get(id) ?? null;
      return {
        idNoSite: id, slug: r.slug, titulo: t?.titulo ?? r.titulo, publicadoEm: iso(r.publicadoEm), atualizadoEm: t?.atualizadoEm ?? iso(r.atualizadoEm),
        categoriaSlug: r.categoria, origem: r.id, troca: t,
      };
    })
    .sort((a, b) => (a.publicadoEm < b.publicadoEm ? 1 : a.publicadoEm > b.publicadoEm ? -1 : a.idNoSite < b.idNoSite ? -1 : a.idNoSite > b.idNoSite ? 1 : 0));
}

// ------------------------------------------------------------------------------------------ posts.listar

const MAX_RESPOSTA_LISTA = 60_000;
/** O cursor diz onde o último post da página está na ordem: a data de publicação e o id. */
const cursorDe = (e: Entrada) => {
  const bytes = new TextEncoder().encode(`${e.publicadoEm}|${e.idNoSite}`);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
function lerCursor(c: string): { publicadoEm: string; idNoSite: string } | null {
  try {
    const bin = atob(c.replace(/-/g, '+').replace(/_/g, '/'));
    const texto = new TextDecoder('utf-8', { fatal: true, ignoreBOM: false }).decode(Uint8Array.from(bin, (ch) => ch.charCodeAt(0)));
    const i = texto.indexOf('|');
    return i > 0 && !Number.isNaN(Date.parse(texto.slice(0, i))) && texto.slice(0, i) === new Date(texto.slice(0, i)).toISOString() ? { publicadoEm: texto.slice(0, i), idNoSite: texto.slice(i + 1) } : null;
  } catch {
    return null;
  }
}

export type PedidoDeLista = { limite: number; cursor: string | null; desde: number | null; ate: number | null };
export type PaginaDePosts = { posts: Record<string, unknown>[]; total: number; proximo_cursor: string | null };

/** Uma página da lista, ou null para um cursor que este site não deu. */
export function paginaDePosts(todas: Entrada[], q: PedidoDeLista): PaginaDePosts | null {
  const janela = todas.filter((e) => {
    const t = Date.parse(e.publicadoEm);
    return (q.desde === null || t >= q.desde) && (q.ate === null || t <= q.ate);
  });
  let inicio = 0;
  if (q.cursor !== null) {
    const c = lerCursor(q.cursor);
    if (!c) return null;
    inicio = janela.findIndex((e) => e.publicadoEm < c.publicadoEm || (e.publicadoEm === c.publicadoEm && e.idNoSite > c.idNoSite));
    if (inicio < 0) inicio = janela.length;
  }
  let fim = Math.min(inicio + q.limite, janela.length);
  const item = (e: Entrada) => ({
    id_no_site: e.idNoSite, slug: e.slug, url: urlDoPost(e.slug), titulo: e.titulo, publicado_em: e.publicadoEm, atualizado_em: e.atualizadoEm,
    categoria_slug: e.categoriaSlug, origem: e.origem,
  });
  let posts = janela.slice(inicio, fim).map(item);
  // A resposta não passa de 64 KB: uma página de títulos enormes é cortada (o cursor aponta para depois do último dado).
  while (posts.length > 1 && JSON.stringify(posts).length > MAX_RESPOSTA_LISTA) {
    fim--;
    posts = posts.slice(0, -1);
  }
  return { posts, total: janela.length, proximo_cursor: fim < janela.length && fim > inicio ? cursorDe(janela[fim - 1]) : null };
}

// ----------------------------------------------------------------------------------------- post.ler

/** O que `post.ler` responde (ao lado do `ok`): o post como o site o mostra hoje, com a troca aplicada. */
export type PostLido = {
  id_no_site: string;
  slug: string;
  url: string;
  titulo: string;
  conteudo_html: string;
  publicado_em: string;
  atualizado_em: string;
  conteudo_markdown: string;
  seo: { titulo: string; descricao: string; palavra_chave: string };
  faq_jsonld: Record<string, unknown> | null;
  capa?: { url: string; alt: string };
};

export const acharEntrada = (todas: Entrada[], idNoSite: string) => todas.find((e) => e.idNoSite === idNoSite) ?? null;

/** O post de uma entrada como `post.ler` o dá, ou null se o dado sumiu. */
export async function lerPostDaEntrada(e: Entrada, store: P12Store): Promise<PostLido | null> {
  const reg = await store.porId(e.origem);
  const p = reg ? await store.post(reg.slug) : null;
  if (!p) return null;
  const q = comTrocaNoPost(p, e.troca);
  return {
    id_no_site: e.idNoSite, slug: q.slug, url: urlDoPost(q.slug), titulo: q.titulo, conteudo_html: q.conteudo_html, publicado_em: q.publicado_em,
    atualizado_em: q.atualizado_em, conteudo_markdown: q.conteudo_markdown,
    seo: { titulo: q.seo.titulo, descricao: q.seo.descricao, palavra_chave: q.seo.palavra_chave ?? '' },
    faq_jsonld: q.faq_jsonld, ...(q.capa ? { capa: q.capa } : {}),
  };
}

// ------------------------------------------------------------------- a troca, aplicada

/** Um post do Rankeando com a troca (se houver) no lugar do conteúdo, SEO e FAQ. Slug, datas de publicação, categoria, capa e autor ficam. */
export function comTrocaNoPost(p: PostP12, t: Substituicao | null | undefined): PostP12 {
  if (!t) return p;
  return {
    ...p,
    titulo: t.titulo,
    resumo: t.seoDescricao || p.resumo,
    conteudo_html: t.conteudoHtml,
    conteudo_markdown: t.conteudoMarkdown,
    seo: { ...p.seo, titulo: t.seoTitulo || p.seo.titulo, descricao: t.seoDescricao || p.seo.descricao, palavra_chave: t.seoPalavraChave || p.seo.palavra_chave },
    faq_jsonld: t.faqJsonld,
    atualizado_em: t.atualizadoEm,
  };
}

export function comTrocaNoResumo(r: Resumo, t: Substituicao | null | undefined): Resumo {
  return t ? { ...r, titulo: t.titulo, resumo: t.seoDescricao || r.resumo, atualizadoEm: t.atualizadoEm } : r;
}

export function comTrocaNoCartao(c: Cartao, t: Substituicao | null | undefined): Cartao {
  return t ? { ...c, titulo: t.titulo, resumo: t.seoDescricao || c.resumo, minutos: t.conteudoMarkdown ? readingMinutes(t.conteudoMarkdown) : c.minutos } : c;
}

/** As trocas pelo `id_no_site`. */
export const trocasPorId = (trocas: Substituicao[]) => new Map(trocas.map((t) => [t.idNoSite, t]));

/** A troca de um post do Rankeando (id do D1), se tiver. */
export const trocaDoPublisher = (trocas: Map<string, Substituicao>, idDoPost: string) => trocas.get(idDoPostDoPublisher(idDoPost)) ?? null;
