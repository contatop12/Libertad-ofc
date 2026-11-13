// HTML das páginas do blog (lista, categoria, post, 404), gerado no servidor, no visual do site (verde institucional + dourado).
// As cores, as fontes e o rodapé vêm do próprio site (shell.ts); o resto do estilo é daqui, com o prefixo `lb-`, para não
// depender de quais classes o Tailwind deixou na folha de estilo do build.
import type { Assinatura, CategoriaDoPost, PostP12 } from './contrato';
import type { Casco } from './shell';
import { BLOG_PATH, SITE_NOME, SITE_URL, urlDaCategoria, urlDoPost } from './site';
import type { Cartao } from './store';
import { dataLonga, esc, jsonScript, readingMinutes } from './texto';

export const POR_PAGINA = 9;
const LOGO = '/images/logo-libertad-capital-eqi.png';
const OG_PADRAO = `${SITE_URL}/images/og-libertad.jpg`;

const NAV = [
  ['Início', '/#inicio'],
  ['Sobre Rafaela', '/#sobre-rafaela'],
  ['Soluções', '/#solucoes'],
  ['Por que a EQI', '/#eqi'],
  ['Depoimentos', '/#depoimentos'],
  ['Contato', '/#contato'],
] as const;

const CSS = `
.lb-body{text-wrap:wrap;margin:0;background:var(--libertad-off-white,#f8f6f1);color:var(--libertad-text-dark,#1a1a1a)}
.lb-header{position:fixed;inset:0 0 auto 0;z-index:50;background:var(--libertad-green,#0d3d2b);border-bottom:1px solid rgb(255 255 255/.1);box-shadow:var(--shadow-md,0 4px 16px rgb(13 61 43/.06))}
.lb-header__in{display:flex;align-items:center;justify-content:space-between;gap:1rem;height:var(--header-height,4.5rem);max-width:var(--container-max,72rem);margin:0 auto;padding:0 var(--container-px,1.25rem)}
.lb-logo{position:relative;display:block;flex:none;width:12rem;height:3.25rem}
.lb-logo img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:left}
.lb-nav{display:none;gap:2rem}
.lb-nav a,.lb-menu a{color:rgb(255 255 255/.75);text-decoration:none;font-size:var(--text-body-sm,.875rem);font-weight:500}
.lb-nav a:hover,.lb-menu a:hover{color:var(--libertad-gold,#c9a84c)}
.lb-cta{display:none;align-items:center;min-height:2.875rem;padding:0 1.5rem;border:1px solid rgb(201 168 76/.7);border-radius:var(--radius-md,.5rem);color:var(--libertad-gold,#c9a84c);text-decoration:none;font-size:var(--text-body-sm,.875rem);font-weight:600;white-space:nowrap}
.lb-cta:hover{background:rgb(201 168 76/.1);color:var(--libertad-gold-light,#e8c97a)}
.lb-menu{position:relative}
.lb-menu summary{list-style:none;cursor:pointer;color:#fff;font-size:var(--text-body-sm,.875rem);font-weight:600;padding:.6rem .9rem;border:1px solid rgb(255 255 255/.25);border-radius:var(--radius-md,.5rem)}
.lb-menu summary::-webkit-details-marker{display:none}
.lb-menu nav{position:absolute;right:0;top:calc(100% + .5rem);display:flex;flex-direction:column;gap:.25rem;min-width:13rem;padding:.75rem;background:var(--libertad-green,#0d3d2b);border:1px solid rgb(255 255 255/.12);border-radius:var(--radius-lg,.75rem)}
.lb-menu nav a{padding:.6rem .5rem;border-radius:var(--radius-md,.5rem)}
@media(min-width:640px){.lb-logo{width:15.75rem;height:4.5rem}.lb-cta{display:inline-flex}}
@media(min-width:1024px){.lb-nav{display:flex}.lb-menu{display:none}.lb-logo{width:16.6rem;height:4.75rem}}
.lb-main{padding:calc(var(--header-height,4.5rem) + clamp(2rem,5vw,3.5rem)) 0 var(--section-py,5rem)}
.lb-wrap{max-width:var(--container-max,72rem);margin:0 auto;padding:0 var(--container-px,1.25rem)}
.lb-narrow{max-width:48rem;margin:0 auto}
.lb-crumbs{display:flex;flex-wrap:wrap;gap:.4rem;margin:0 0 1.5rem;padding:0;list-style:none;font-size:var(--text-body-sm,.875rem);color:var(--libertad-text-muted,#6b6b6b)}
.lb-crumbs li+li::before{content:"›";margin-right:.4rem}
.lb-crumbs a{color:var(--libertad-green-mid,#1a5c40);text-decoration:none;font-weight:500}
.lb-crumbs a:hover{color:var(--libertad-gold,#c9a84c)}
.lb-eyebrow{margin:0 0 .75rem;font-size:var(--text-caption,.6875rem);font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--libertad-gold-muted,#a88b3d)}
.lb-h1{text-wrap:balance;margin:0;font-family:var(--font-sora),system-ui,sans-serif;font-size:var(--text-display-xl,2.25rem);line-height:var(--leading-tight,1.12);letter-spacing:-.02em;color:var(--libertad-green,#0d3d2b)}
.lb-lead{margin:1rem 0 0;max-width:42rem;font-size:var(--text-body-lg,1.0625rem);line-height:var(--leading-relaxed,1.65);color:var(--libertad-text-medium,#4a4a4a)}
.lb-filtros{display:flex;flex-wrap:wrap;gap:.5rem;margin:2rem 0 0}
.lb-chip{display:inline-flex;align-items:center;padding:.45rem 1rem;border:1px solid var(--color-border-gold,rgb(201 168 76/.4));border-radius:var(--radius-pill,9999px);background:#fff;color:var(--libertad-green,#0d3d2b);text-decoration:none;font-size:var(--text-body-sm,.875rem);font-weight:500}
.lb-chip:hover,.lb-chip[aria-current=true]{background:var(--libertad-green,#0d3d2b);border-color:var(--libertad-green,#0d3d2b);color:#fff}
.lb-grid{display:grid;gap:1.5rem;margin:2.5rem 0 0;padding:0;list-style:none;grid-template-columns:1fr}
@media(min-width:640px){.lb-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.lb-grid{grid-template-columns:repeat(3,1fr)}}
.lb-card{display:flex;flex-direction:column;overflow:hidden;height:100%;background:#fff;border:1px solid var(--color-border-subtle,rgb(0 0 0/.06));border-radius:var(--radius-xl,1rem);box-shadow:var(--shadow-md,0 4px 16px rgb(13 61 43/.06));transition:transform .3s var(--ease-out-expo,ease),box-shadow .3s}
.lb-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg,0 8px 28px rgb(13 61 43/.08))}
.lb-card__img{display:block;aspect-ratio:16/9;width:100%;object-fit:cover;background:var(--libertad-gray-light,#f2f2f0)}
.lb-card__ph{display:block;aspect-ratio:16/9;background:linear-gradient(135deg,var(--libertad-green,#0d3d2b),var(--libertad-green-mid,#1a5c40))}
.lb-card__body{display:flex;flex-direction:column;gap:.6rem;flex:1;padding:1.25rem 1.25rem 1.5rem}
.lb-card__cat{font-size:var(--text-caption,.6875rem);font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--libertad-gold-muted,#a88b3d);text-decoration:none}
.lb-card__title{margin:0;font-family:var(--font-sora),system-ui,sans-serif;font-size:1.125rem;line-height:1.3;letter-spacing:-.01em}
.lb-card__title a{color:var(--libertad-green,#0d3d2b);text-decoration:none}
.lb-card__title a::after{content:"";position:absolute;inset:0}
.lb-card{position:relative}
.lb-card__cat{position:relative;z-index:1}
.lb-card__txt{margin:0;font-size:var(--text-body-sm,.875rem);line-height:1.55;color:var(--libertad-text-medium,#4a4a4a)}
.lb-meta{margin-top:auto;padding-top:.5rem;font-size:var(--text-caption,.75rem);color:var(--libertad-text-muted,#6b6b6b)}
.lb-vazio{margin:3rem 0 0;padding:2.5rem 1.5rem;text-align:center;background:#fff;border:1px dashed var(--color-border-gold,rgb(201 168 76/.4));border-radius:var(--radius-xl,1rem);color:var(--libertad-text-medium,#4a4a4a)}
.lb-pag{display:flex;justify-content:center;gap:.5rem;margin:3rem 0 0;flex-wrap:wrap}
.lb-pag a,.lb-pag span{display:inline-flex;align-items:center;justify-content:center;min-width:2.5rem;height:2.5rem;padding:0 .9rem;border-radius:var(--radius-md,.5rem);border:1px solid var(--color-border-gold,rgb(201 168 76/.4));background:#fff;color:var(--libertad-green,#0d3d2b);text-decoration:none;font-size:var(--text-body-sm,.875rem);font-weight:500}
.lb-pag span[aria-current=page]{background:var(--libertad-green,#0d3d2b);color:#fff;border-color:var(--libertad-green,#0d3d2b)}
.lb-pag a:hover{border-color:var(--libertad-gold,#c9a84c)}
.lb-post__cat{display:inline-block;margin:0 0 1rem;font-size:var(--text-caption,.75rem);font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--libertad-gold-muted,#a88b3d);text-decoration:none}
.lb-post__meta{margin:1.25rem 0 0;font-size:var(--text-body-sm,.875rem);color:var(--libertad-text-muted,#6b6b6b)}
.lb-post__capa{display:block;width:100%;height:auto;margin:2rem 0 0;border-radius:var(--radius-xl,1rem);box-shadow:var(--shadow-lg,0 8px 28px rgb(13 61 43/.08));background:var(--libertad-gray-light,#f2f2f0)}
.lb-prose{margin-top:2.25rem;font-size:var(--text-body-lg,1.0625rem);line-height:1.75;color:var(--libertad-text-medium,#4a4a4a);overflow-wrap:anywhere}
.lb-prose h2,.lb-prose h3,.lb-prose h4{font-family:var(--font-sora),system-ui,sans-serif;color:var(--libertad-green,#0d3d2b);line-height:1.25;letter-spacing:-.01em;scroll-margin-top:calc(var(--header-height,4.5rem) + 1rem)}
.lb-prose h2{margin:2.5rem 0 .9rem;font-size:var(--text-display-lg,1.75rem)}
.lb-prose h3{margin:2rem 0 .75rem;font-size:var(--text-display-md,1.35rem)}
.lb-prose h4{margin:1.5rem 0 .6rem;font-size:1.1rem}
.lb-prose p{margin:0 0 1.15rem}
.lb-prose a{color:var(--libertad-green-mid,#1a5c40);text-decoration:underline;text-decoration-color:var(--libertad-gold,#c9a84c);text-underline-offset:3px}
.lb-prose a:hover{color:var(--libertad-gold-muted,#a88b3d)}
.lb-prose ul,.lb-prose ol{margin:0 0 1.15rem;padding-left:1.4rem}
.lb-prose ul{list-style:disc}
.lb-prose ol{list-style:decimal}
.lb-prose li{margin:.35rem 0}
.lb-prose img,.lb-prose video,.lb-prose iframe{max-width:100%;height:auto;border-radius:var(--radius-lg,.75rem)}
.lb-prose iframe{width:100%;aspect-ratio:16/9;border:0}
.lb-prose blockquote{margin:1.75rem 0;padding:.25rem 0 .25rem 1.25rem;border-left:3px solid var(--libertad-gold,#c9a84c);color:var(--libertad-text-dark,#1a1a1a)}
.lb-prose table{display:block;width:100%;max-width:100%;margin:1.5rem 0;overflow-x:auto;border-collapse:collapse;font-size:.95rem}
.lb-prose th,.lb-prose td{padding:.6rem .8rem;border:1px solid var(--color-border-subtle,rgb(0 0 0/.12));text-align:left}
.lb-prose th{background:var(--libertad-gray-light,#f2f2f0);color:var(--libertad-green,#0d3d2b)}
.lb-prose hr{margin:2.5rem 0;border:0;border-top:1px solid var(--color-border-gold,rgb(201 168 76/.4))}
.lb-prose pre{overflow-x:auto;padding:1rem;border-radius:var(--radius-lg,.75rem);background:var(--libertad-green-deep,#082a1e);color:#fff;font-size:.9rem}
.lb-prose .p12-linha-fina{font-size:1.2rem;line-height:1.5;color:var(--libertad-text-dark,#1a1a1a)}
.lb-prose .p12-resumo,.lb-prose .p12-leia-tambem,.lb-prose .p12-fontes{margin:1.75rem 0;padding:1.1rem 1.3rem;background:#fff;border:1px solid var(--color-border-gold,rgb(201 168 76/.4));border-radius:var(--radius-lg,.75rem)}
.lb-prose .p12-caixa-titulo{margin:0 0 .5rem;font-weight:700;color:var(--libertad-green,#0d3d2b)}
.lb-prose .rankeando-assinatura{display:flex;gap:1.25rem;align-items:flex-start;margin-top:3rem;padding:1.5rem;background:#fff;border:1px solid var(--color-border-gold,rgb(201 168 76/.4));border-radius:var(--radius-xl,1rem)}
.rankeando-assinatura p{margin:0}
.rankeando-assinatura__texto{min-width:0;display:grid;gap:.35rem}
img.rankeando-assinatura__foto{flex:none;width:88px;height:88px;border-radius:999px;object-fit:cover}
.rankeando-assinatura__rotulo{font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--libertad-gold-muted,#a88b3d)}
.rankeando-assinatura__nome{font-size:1.125rem;font-weight:700;color:var(--libertad-green,#0d3d2b)}
.rankeando-assinatura__cargo{font-size:.9375rem;color:var(--libertad-text-muted,#6b6b6b)}
.rankeando-assinatura__bio{margin-top:.4rem;font-size:.9375rem;line-height:1.6;overflow-wrap:anywhere}
.rankeando-assinatura__link{margin-top:.4rem;font-size:.9375rem;font-weight:600}
@media(max-width:480px){.lb-prose .rankeando-assinatura{flex-direction:column}}
.lb-voltar{display:inline-block;margin-top:3rem;color:var(--libertad-green-mid,#1a5c40);text-decoration:none;font-weight:500}
.lb-voltar:hover{color:var(--libertad-gold,#c9a84c)}
.lb-footer-simples{padding:2rem var(--container-px,1.25rem);background:var(--libertad-green,#0d3d2b);color:rgb(255 255 255/.7);font-size:.875rem;text-align:center}
.lb-cookie{position:fixed;inset:auto 0 0 0;z-index:60;display:none;background:linear-gradient(90deg,var(--libertad-green-deep,#082a1e),var(--libertad-green,#0d3d2b));border-top:1px solid rgb(255 255 255/.1);box-shadow:var(--shadow-lg,0 8px 28px rgb(13 61 43/.08));color:#fff}
.lb-cookie__in{display:flex;flex-direction:column;gap:1rem;max-width:var(--container-max,72rem);margin:0 auto;padding:1rem var(--container-px,1.25rem)}
.lb-cookie p{margin:0;font-size:var(--text-caption,.75rem);line-height:1.6;color:rgb(255 255 255/.75)}
.lb-cookie strong{display:block;margin-bottom:.25rem;font-size:var(--text-body-sm,.875rem);color:#fff}
.lb-cookie a{color:var(--libertad-gold,#c9a84c)}
.lb-cookie button{flex:none;min-height:2.5rem;padding:0 1.25rem;border:0;border-radius:var(--radius-md,.5rem);background:var(--btn-gradient-gold,#c9a84c);color:var(--libertad-text-dark,#1a1a1a);font-weight:600;cursor:pointer}
@media(min-width:640px){.lb-cookie__in{flex-direction:row;align-items:center;justify-content:space-between}}
`;

/** Aviso de cookies igual ao do resto do site (mesma chave no localStorage: quem já aceitou não vê de novo). */
const COOKIE = `<div class="lb-cookie" id="lb-cookie" role="dialog" aria-labelledby="lb-cookie-t"><div class="lb-cookie__in"><div><strong id="lb-cookie-t">Utilizamos cookies</strong><p>Usamos cookies essenciais para garantir o funcionamento do site e armazenar suas preferências de navegação. Ao continuar, você concorda com nossa <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.</p></div><button type="button" id="lb-cookie-ok">Aceitar cookies</button></div></div>
<script>(function(){try{var k="libertad-cookie-consent",b=document.getElementById("lb-cookie");if(!localStorage.getItem(k)){b.style.display="block";document.getElementById("lb-cookie-ok").onclick=function(){localStorage.setItem(k,"accepted");b.style.display="none"}}}catch(e){}})();</script>`;

const cabecalho = () => {
  const links = NAV.map(([nome, href]) => `<a href="${href}">${esc(nome)}</a>`).join('');
  return (
    `<header class="lb-header"><div class="lb-header__in">` +
    `<a class="lb-logo" href="/" aria-label="Ir para o início"><img src="${LOGO}" alt="Libertad Capital — Escritório credenciado à EQI Investimentos" width="266" height="76"></a>` +
    `<nav class="lb-nav" aria-label="Navegação principal">${links}</nav>` +
    `<div style="display:flex;align-items:center;gap:.75rem"><a class="lb-cta" href="/#contato">Agendar Reunião</a>` +
    `<details class="lb-menu"><summary>Menu</summary><nav aria-label="Navegação mobile">${links}<a href="/#contato">Agendar Reunião</a></nav></details></div>` +
    `</div></header>`
  );
};

const rodapeSimples = () => `<footer class="lb-footer-simples"><p>© ${new Date().getFullYear()} ${SITE_NOME}. Escritório credenciado à EQI Investimentos.</p></footer>`;

export type Pagina = {
  titulo: string;
  descricao: string;
  canonical: string;
  imagem?: string | null;
  tipo?: 'website' | 'article';
  /** Cada um já em JSON (jsonScript). */
  jsonld?: string[];
  /** `noindex` (a página 404 e as buscas sem resultado). */
  semIndice?: boolean;
  /** Para as páginas de lista: link para a página anterior/seguinte (SEO). */
  anterior?: string | null;
  seguinte?: string | null;
  publicado?: string;
  atualizado?: string;
  corpo: string;
};

/** Documento HTML completo. */
export function documento(p: Pagina, casco: Casco): string {
  const og = p.imagem || OG_PADRAO;
  return (
    `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<title>${esc(p.titulo)}</title><meta name="description" content="${esc(p.descricao)}">` +
    `<link rel="canonical" href="${esc(p.canonical)}">` +
    (p.semIndice ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">') +
    (p.anterior ? `<link rel="prev" href="${esc(p.anterior)}">` : '') +
    (p.seguinte ? `<link rel="next" href="${esc(p.seguinte)}">` : '') +
    `<meta property="og:title" content="${esc(p.titulo)}"><meta property="og:description" content="${esc(p.descricao)}">` +
    `<meta property="og:url" content="${esc(p.canonical)}"><meta property="og:site_name" content="${esc(SITE_NOME)}"><meta property="og:locale" content="pt_BR">` +
    `<meta property="og:type" content="${p.tipo ?? 'website'}"><meta property="og:image" content="${esc(og)}">` +
    (p.tipo === 'article' && p.publicado ? `<meta property="article:published_time" content="${esc(p.publicado)}">` : '') +
    (p.tipo === 'article' && p.atualizado ? `<meta property="article:modified_time" content="${esc(p.atualizado)}">` : '') +
    `<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(p.titulo)}"><meta name="twitter:description" content="${esc(p.descricao)}"><meta name="twitter:image" content="${esc(og)}">` +
    `<link rel="icon" href="/favicon.png" type="image/png"><link rel="apple-touch-icon" href="/apple-icon.png">` +
    casco.links +
    `<style>${CSS}</style>` +
    (p.jsonld ?? []).map((j) => `<script type="application/ld+json">${j}</script>`).join('') +
    `</head><body class="${esc(`${casco.bodyClass} lb-body`.trim())}">` +
    cabecalho() +
    `<main class="lb-main">${p.corpo}</main>` +
    (casco.rodape ?? rodapeSimples()) +
    COOKIE +
    `</body></html>`
  );
}

// ------------------------------------------------------------------------------------------------ peças

const https = (u: string | null): URL | null => {
  if (!u) return null;
  try {
    const x = new URL(u);
    return x.protocol === 'https:' ? x : null;
  } catch {
    return null;
  }
};

const migalhas = (trilha: { nome: string; href?: string }[]) =>
  `<nav aria-label="Você está em"><ol class="lb-crumbs">` +
  trilha.map((t) => `<li>${t.href ? `<a href="${esc(t.href)}">${esc(t.nome)}</a>` : `<span aria-current="page">${esc(t.nome)}</span>`}</li>`).join('') +
  `</ol></nav>`;

/** JSON-LD BreadcrumbList; os endereços são absolutos. */
export const breadcrumbLd = (trilha: { nome: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trilha.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.nome, item: t.url })),
});

/** A caixa "Escrito por" (campo opcional `post.assinatura`): todo texto é escapado; o link e a foto só saem em https. */
export function caixaAssinatura(a: Assinatura): string {
  const pessoa = a.tipo === 'pessoa';
  const foto = https(a.foto_url);
  const link = https(a.link_url);
  const cargo = [a.funcao.trim(), a.registro.trim()].filter(Boolean).map(esc).join(' · ');
  const bio = a.curriculo.trim() ? esc(a.curriculo.trim()).replace(/\r\n|\r|\n/g, '<br>') : '';
  const rotulo = pessoa ? 'Escrito por' : 'Publicado por';
  return (
    `<aside class="rankeando-assinatura" aria-label="${rotulo} ${esc(a.nome)}">` +
    (foto ? `<img class="rankeando-assinatura__foto" src="${esc(foto.href)}" alt="${esc(a.nome)}" width="88" height="88" loading="lazy" decoding="async">` : '') +
    `<div class="rankeando-assinatura__texto"><p class="rankeando-assinatura__rotulo">${rotulo}</p>` +
    `<p class="rankeando-assinatura__nome">${esc(a.nome)}</p>` +
    (cargo ? `<p class="rankeando-assinatura__cargo">${cargo}</p>` : '') +
    (bio ? `<p class="rankeando-assinatura__bio">${bio}</p>` : '') +
    (link ? `<p class="rankeando-assinatura__link"><a href="${esc(link.href)}" rel="noopener">${pessoa ? 'Conheça a formação completa' : 'Saiba mais'}</a></p>` : '') +
    '</div></aside>'
  );
}

export type CategoriaDaLista = { slug: string; nome: string };

const filtros = (categorias: CategoriaDaLista[], atual: string | null) =>
  categorias.length
    ? `<nav class="lb-filtros" aria-label="Categorias do blog"><a class="lb-chip" href="${BLOG_PATH}"${atual === null ? ' aria-current="true"' : ''}>Todos</a>` +
      categorias.map((c) => `<a class="lb-chip" href="${BLOG_PATH}/categoria/${esc(c.slug)}"${atual === c.slug ? ' aria-current="true"' : ''}>${esc(c.nome)}</a>`).join('') +
      `</nav>`
    : '';

const cartao = (c: Cartao) => {
  const capa = https(c.capa?.url ?? null);
  return (
    `<li><article class="lb-card">` +
    (capa ? `<img class="lb-card__img" src="${esc(capa.href)}" alt="${esc(c.capa?.alt || c.titulo)}" width="640" height="360" loading="lazy" decoding="async">` : '<span class="lb-card__ph" aria-hidden="true"></span>') +
    `<div class="lb-card__body">` +
    (c.categoria ? `<a class="lb-card__cat" href="${BLOG_PATH}/categoria/${esc(c.categoria.slug)}">${esc(c.categoria.nome)}</a>` : '') +
    `<h2 class="lb-card__title"><a href="${BLOG_PATH}/${esc(c.slug)}">${esc(c.titulo)}</a></h2>` +
    (c.resumo ? `<p class="lb-card__txt">${esc(c.resumo)}</p>` : '') +
    `<p class="lb-meta"><time datetime="${esc(c.publicadoEm)}">${esc(dataLonga(c.publicadoEm))}</time> · ${c.minutos} min de leitura</p>` +
    `</div></article></li>`
  );
};

const paginacao = (base: string, pagina: number, total: number) => {
  if (total <= 1) return '';
  const href = (n: number) => (n === 1 ? base : `${base}?page=${n}`);
  const itens: string[] = [];
  if (pagina > 1) itens.push(`<a href="${esc(href(pagina - 1))}" rel="prev">← Anterior</a>`);
  for (let n = 1; n <= total; n++) itens.push(n === pagina ? `<span aria-current="page">${n}</span>` : `<a href="${esc(href(n))}">${n}</a>`);
  if (pagina < total) itens.push(`<a href="${esc(href(pagina + 1))}" rel="next">Próxima →</a>`);
  return `<nav class="lb-pag" aria-label="Paginação">${itens.join('')}</nav>`;
};

export type DadosDaLista = {
  /** `null` na lista geral. */
  categoria: { slug: string; nome: string; descricao: string | null; pai: { slug: string; nome: string } | null } | null;
  categorias: CategoriaDaLista[];
  cartoes: Cartao[];
  pagina: number;
  totalPaginas: number;
};

/** A lista do blog (`/blog`) ou a de uma categoria (`/blog/categoria/<slug>`). */
export function paginaDeLista(d: DadosDaLista): Pagina {
  const c = d.categoria;
  const base = c ? `${BLOG_PATH}/categoria/${c.slug}` : BLOG_PATH;
  const canonicalBase = `${SITE_URL}${base}`;
  const canonical = d.pagina > 1 ? `${canonicalBase}?page=${d.pagina}` : canonicalBase;
  const trilha = c
    ? [{ nome: 'Início', href: '/' }, { nome: 'Blog', href: BLOG_PATH }, ...(c.pai ? [{ nome: c.pai.nome, href: `${BLOG_PATH}/categoria/${c.pai.slug}` }] : []), { nome: c.nome }]
    : [{ nome: 'Início', href: '/' }, { nome: 'Blog' }];
  const trilhaLd = c
    ? [{ nome: 'Blog', url: `${SITE_URL}${BLOG_PATH}` }, ...(c.pai ? [{ nome: c.pai.nome, url: urlDaCategoria(c.pai.slug) }] : []), { nome: c.nome, url: canonicalBase }]
    : [{ nome: 'Blog', url: canonicalBase }];
  const titulo = c ? `${c.nome} | Blog ${SITE_NOME}` : `Blog | ${SITE_NOME}`;
  const descricao = c
    ? c.descricao || `Artigos sobre ${c.nome} no blog da ${SITE_NOME}.`
    : `Artigos sobre investimentos, planejamento financeiro e gestão de patrimônio no blog da ${SITE_NOME}.`;
  const corpo =
    `<div class="lb-wrap">${migalhas(trilha)}` +
    `<p class="lb-eyebrow">${c ? 'Categoria' : 'Blog'}</p><h1 class="lb-h1">${esc(c ? c.nome : 'Blog da Libertad Capital')}</h1>` +
    `<p class="lb-lead">${esc(c ? c.descricao || `Artigos sobre ${c.nome}.` : 'Conteúdo para quem quer investir com clareza, proteger e fazer o patrimônio crescer.')}</p>` +
    filtros(d.categorias, c?.slug ?? null) +
    (d.cartoes.length
      ? `<ul class="lb-grid">${d.cartoes.map(cartao).join('')}</ul>${paginacao(base, d.pagina, d.totalPaginas)}`
      : `<p class="lb-vazio">Em breve, novos artigos por aqui.</p>`) +
    `</div>`;
  return {
    titulo: d.pagina > 1 ? `${titulo} — página ${d.pagina}` : titulo,
    descricao,
    canonical,
    anterior: d.pagina > 1 ? (d.pagina === 2 ? canonicalBase : `${canonicalBase}?page=${d.pagina - 1}`) : null,
    seguinte: d.pagina < d.totalPaginas ? `${canonicalBase}?page=${d.pagina + 1}` : null,
    jsonld: [jsonScript(breadcrumbLd(trilhaLd))],
    corpo,
  };
}

/** A página de um post. `html` é o corpo já limpo (conteudo.ts). */
export function paginaDePost(p: PostP12, html: string, categoria: CategoriaDoPost | null): Pagina {
  const url = urlDoPost(p.slug);
  const capa = https(p.capa?.url ?? null);
  const descricao = p.seo.descricao || p.resumo;
  const titulo = p.seo.titulo || p.titulo;
  const trilha: { nome: string; href?: string }[] = [{ nome: 'Início', href: '/' }, { nome: 'Blog', href: BLOG_PATH }];
  const trilhaLd = [{ nome: 'Blog', url: `${SITE_URL}${BLOG_PATH}` }];
  if (categoria) {
    if (categoria.pai && categoria.pai_nome) {
      trilha.push({ nome: categoria.pai_nome, href: `${BLOG_PATH}/categoria/${categoria.pai}` });
      trilhaLd.push({ nome: categoria.pai_nome, url: urlDaCategoria(categoria.pai) });
    }
    trilha.push({ nome: categoria.nome, href: `${BLOG_PATH}/categoria/${categoria.slug}` });
    trilhaLd.push({ nome: categoria.nome, url: urlDaCategoria(categoria.slug) });
  }
  trilha.push({ nome: p.titulo });
  trilhaLd.push({ nome: p.titulo, url });

  const artigo = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.titulo,
    description: descricao,
    mainEntityOfPage: { '@type': 'WebPage', '@id': p.seo.canonical || url },
    datePublished: p.publicado_em,
    dateModified: p.atualizado_em,
    author: { '@type': p.assinatura?.tipo === 'empresa' ? 'Organization' : 'Person', name: p.assinatura?.nome || p.autor },
    publisher: { '@type': 'Organization', name: SITE_NOME, url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}${LOGO}` } },
    inLanguage: 'pt-BR',
    ...(capa ? { image: [capa.href] } : {}),
  };
  const minutos = readingMinutes(p.conteudo_markdown || html.replace(/<[^>]+>/g, ' '));
  const corpo =
    `<article class="lb-wrap"><div class="lb-narrow">${migalhas(trilha)}` +
    (categoria ? `<a class="lb-post__cat" href="${BLOG_PATH}/categoria/${esc(categoria.slug)}">${esc(categoria.nome)}</a>` : '') +
    `<h1 class="lb-h1">${esc(p.titulo)}</h1>` +
    `<p class="lb-post__meta">Por ${esc(p.assinatura?.nome || p.autor)} · <time datetime="${esc(p.publicado_em)}">${esc(dataLonga(p.publicado_em))}</time> · ${minutos} min de leitura</p>` +
    (capa ? `<img class="lb-post__capa" src="${esc(capa.href)}" alt="${esc(p.capa?.alt || p.titulo)}" width="1200" height="630" decoding="async">` : '') +
    `<div class="lb-prose">${html}${p.assinatura ? caixaAssinatura(p.assinatura) : ''}</div>` +
    `<a class="lb-voltar" href="${BLOG_PATH}">← Voltar ao blog</a></div></article>`;
  return {
    titulo,
    descricao,
    canonical: p.seo.canonical || url,
    imagem: capa?.href ?? null,
    tipo: 'article',
    publicado: p.publicado_em,
    atualizado: p.atualizado_em,
    jsonld: [jsonScript(artigo), jsonScript(breadcrumbLd(trilhaLd)), ...(p.faq_jsonld ? [jsonScript(p.faq_jsonld)] : [])],
    corpo,
  };
}

/** 404 do blog. */
export function paginaNaoEncontrada(): Pagina {
  return {
    titulo: `Página não encontrada | ${SITE_NOME}`,
    descricao: 'O endereço que você procurou não existe no blog.',
    canonical: `${SITE_URL}${BLOG_PATH}`,
    semIndice: true,
    corpo: `<div class="lb-wrap"><div class="lb-narrow"><p class="lb-eyebrow">Erro 404</p><h1 class="lb-h1">Página não encontrada</h1><p class="lb-lead">Não achamos esse artigo ou categoria. Veja os conteúdos mais recentes do blog.</p><a class="lb-voltar" href="${BLOG_PATH}">← Ir para o blog</a></div></div>`,
  };
}
