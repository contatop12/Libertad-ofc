// As rotas do blog, no servidor: /blog, /blog/categoria/<slug>, /blog/<slug> (com 301 dos slugs antigos) e o /sitemap.xml do site com os posts
// e as categorias que têm post. Os posts vêm do D1; a troca de um post (post.substituir) vale em todas as páginas daqui.
import { prepararConteudo } from './conteudo';
import { entradas, comTrocaNoCartao, comTrocaNoPost, trocasPorId, trocaDoPublisher, type Entrada } from './posts';
import { documento, paginaDeLista, paginaDePost, paginaNaoEncontrada, POR_PAGINA, type Pagina } from './render';
import { carregarCasco } from './shell';
import { BLOG_PATH, SITE_URL, urlDaCategoria, urlDoPost } from './site';
import type { P12Store } from './store';
import { esc } from './texto';

export type Ambiente = { ASSETS: Fetcher };

const HTML = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=0, must-revalidate' };

const html = (corpo: string, status = 200, head = false) => new Response(head ? null : corpo, { status, headers: HTML });
const redirecionar = (para: string, status = 301) => new Response(null, { status, headers: { location: para, 'cache-control': 'public, max-age=3600' } });

/** O número da página em `?page=` (1 se faltar ou for inválido). */
const numeroDaPagina = (url: URL) => {
  const n = Number(url.searchParams.get('page'));
  return Number.isInteger(n) && n >= 1 && n <= 10_000 ? n : 1;
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Categorias com os posts delas contados (os de subcategorias contam para a mãe). */
async function categoriasComPosts(store: P12Store, todas: Entrada[]) {
  const categorias = await store.categorias();
  const pai = new Map(categorias.map((c) => [c.slug, c.pai]));
  const posts = (slug: string) => todas.filter((e) => e.categoriaSlug === slug || (e.categoriaSlug !== null && pai.get(e.categoriaSlug) === slug));
  return { categorias, posts };
}

export async function tratarBlog(request: Request, env: Ambiente, store: P12Store): Promise<Response> {
  const url = new URL(request.url);
  const head = request.method === 'HEAD';
  if (request.method !== 'GET' && !head) return new Response('Método não permitido', { status: 405, headers: { allow: 'GET, HEAD' } });

  // Um só endereço por página: sem a barra no fim.
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) return redirecionar(`${url.pathname.replace(/\/+$/, '')}${url.search}`);

  const casco = await carregarCasco(env.ASSETS, url.origin);
  const pagina = (p: Pagina, status = 200) => html(documento(p, casco), status, head);

  const resto = url.pathname.slice(BLOG_PATH.length).replace(/^\//, '');
  const partes = resto ? resto.split('/') : [];

  try {
    if (partes.length === 0) return await lista(null);
    if (partes.length === 2 && partes[0] === 'categoria') return SLUG.test(partes[1]) ? await lista(partes[1]) : pagina(paginaNaoEncontrada(), 404);
    if (partes.length === 1 && SLUG.test(partes[0])) return await post(partes[0]);
    return pagina(paginaNaoEncontrada(), 404);
  } catch (e) {
    console.error({ message: 'blog: falha ao montar a página', path: url.pathname, error: e instanceof Error ? e.message : String(e) });
    return new Response('Blog indisponível no momento. Tente de novo em instantes.', { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8', 'retry-after': '30' } });
  }

  async function lista(categoriaSlug: string | null): Promise<Response> {
    const todas = await entradas(store);
    const { categorias, posts } = await categoriasComPosts(store, todas);
    const comPosts = categorias.filter((c) => !c.pai && posts(c.slug).length > 0);
    const visiveis = comPosts.map((c) => ({ slug: c.slug, nome: c.nome }));
    let selecionadas = todas;
    let categoria = null;
    if (categoriaSlug) {
      const c = categorias.find((x) => x.slug === categoriaSlug);
      selecionadas = c ? posts(c.slug) : [];
      // Categoria que não existe ou que ainda não tem post: 404.
      if (!c || selecionadas.length === 0) return pagina(paginaNaoEncontrada(), 404);
      const mae = c.pai ? categorias.find((x) => x.slug === c.pai && !x.pai) : undefined;
      categoria = { slug: c.slug, nome: c.nome, descricao: c.descricao, pai: mae ? { slug: mae.slug, nome: mae.nome } : null };
    }
    const totalPaginas = Math.max(1, Math.ceil(selecionadas.length / POR_PAGINA));
    const numero = numeroDaPagina(url);
    if (numero > totalPaginas) return redirecionar(`${url.pathname}${totalPaginas > 1 ? `?page=${totalPaginas}` : ''}`, 302);
    const fatia = selecionadas.slice((numero - 1) * POR_PAGINA, numero * POR_PAGINA);
    const cartoes = await store.cartoes(fatia.map((e) => e.origem));
    const porId = new Map(cartoes.map((c) => [c.id, c]));
    const ordenados = fatia.flatMap((e) => {
      const c = porId.get(e.origem);
      return c ? [comTrocaNoCartao(c, e.troca)] : [];
    });
    // O filtro de subcategoria mostra as irmãs da categoria aberta: na lista de uma subcategoria os chips são os das categorias de cima.
    return pagina(paginaDeLista({ categoria, categorias: visiveis, cartoes: ordenados, pagina: numero, totalPaginas }));
  }

  async function post(slug: string): Promise<Response> {
    const p = await store.post(slug);
    if (!p) {
      const atual = await store.slugAtualDoAntigo(slug);
      return atual ? redirecionar(`${BLOG_PATH}/${atual}${url.search}`) : pagina(paginaNaoEncontrada(), 404);
    }
    const trocas = trocasPorId(await store.substituicoes());
    const q = comTrocaNoPost(p, trocaDoPublisher(trocas, p.id));
    const corpo = await prepararConteudo(q.conteudo_html);
    return pagina(paginaDePost(q, corpo, q.categoria));
  }
}

// -------------------------------------------------------------------------------------------- sitemap

const ITEM = (loc: string, lastmod: string) => `<url><loc>${esc(loc)}</loc><lastmod>${lastmod}</lastmod></url>`;

/** O sitemap do site (o que o Next exportou) com o /blog, os posts e as categorias que têm post. Se o D1 falhar, devolve o do site como está. */
export async function tratarSitemap(request: Request, env: Ambiente, store: P12Store): Promise<Response> {
  const base = await env.ASSETS.fetch(new Request(new URL('/sitemap.xml', request.url)));
  const original = base.ok ? await base.text() : '';
  const cabecalhos = { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=300' };
  let extras = '';
  try {
    const todas = await entradas(store);
    const { categorias, posts } = await categoriasComPosts(store, todas);
    const maisRecente = (lista: Entrada[]) => lista.reduce((m, e) => (e.atualizadoEm > m ? e.atualizadoEm : m), '');
    const itens: string[] = [];
    if (todas.length) itens.push(ITEM(`${SITE_URL}${BLOG_PATH}`, maisRecente(todas)));
    for (const c of categorias) {
      const dela = posts(c.slug);
      if (dela.length) itens.push(ITEM(urlDaCategoria(c.slug), maisRecente(dela)));
    }
    for (const e of todas) itens.push(ITEM(urlDoPost(e.slug), e.atualizadoEm));
    extras = itens.join('');
  } catch (e) {
    console.error({ message: 'sitemap: falha ao ler os posts', error: e instanceof Error ? e.message : String(e) });
  }
  const aberto = original.includes('</urlset>');
  const xml = aberto
    ? original.replace('</urlset>', `${extras}</urlset>`)
    : `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${SITE_URL}</loc></url>${extras}</urlset>`;
  return new Response(request.method === 'HEAD' ? null : xml, { headers: cabecalhos });
}
