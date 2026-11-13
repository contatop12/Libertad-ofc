// Teste local do recebimento do Rankeando (contrato v3): assina cada pedido no horário de agora com a chave de TESTE e confere as respostas
// e as páginas. Uso (com `npx wrangler dev --port 8788 --var RANKEANDO_WEBHOOK_SECRET:<chave de teste>` rodando e o D1 local migrado):
//   RANKEANDO_TEST_KEY=<chave de teste> node scripts/testar-rankeando.mjs http://localhost:8788
// Nunca use a chave de produção aqui e nunca rode contra o endereço de produção: ele grava posts.
import { createHmac } from 'node:crypto';

const base = (process.argv[2] ?? 'http://localhost:8788').replace(/\/$/, '');
const chave = process.env.RANKEANDO_TEST_KEY;
if (!chave) throw new Error('defina RANKEANDO_TEST_KEY (a chave de teste do pacote)');
if (/libertadcapital\.com\.br/.test(base)) throw new Error('este teste grava posts: nunca rode contra produção');

let falhas = 0;
const confere = (nome, ok, extra = '') => {
  console.log(`${ok ? 'OK   ' : 'FALHA'} ${nome}${ok ? '' : ` ${extra}`}`);
  if (!ok) falhas++;
};

const assinar = (corpo, t = Math.floor(Date.now() / 1000)) => `t=${t},v1=${createHmac('sha256', chave).update(`${t}.${corpo}`).digest('hex')}`;
async function enviar(evento, entrega, objeto, { assinatura } = {}) {
  const corpo = typeof objeto === 'string' ? objeto : JSON.stringify(objeto);
  const r = await fetch(`${base}/api/p12/webhook`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-Rankeando-Evento': evento,
      'X-Rankeando-Entrega': entrega,
      'X-Rankeando-Assinatura': assinatura ?? assinar(corpo),
    },
    body: corpo,
  });
  const texto = await r.text();
  let json = null;
  try { json = JSON.parse(texto); } catch { /* não é JSON */ }
  return { status: r.status, json, texto };
}
const pagina = async (caminho) => {
  const r = await fetch(`${base}${caminho}`, { redirect: 'manual' });
  return { status: r.status, texto: await r.text(), location: r.headers.get('location') };
};

const rand = Math.random().toString(36).slice(2, 8);
const id = `art_teste_${rand}`;
const slug = `como-escolher-um-plano-${rand}`;
const agoraIso = new Date().toISOString();
const post = (extra = {}) => ({
  evento: 'post.publicar',
  contrato: 2,
  post: {
    id, slug, titulo: 'Como escolher um plano <b>de investimento</b>', resumo: 'Resumo do post de teste.',
    conteudo_html: '<h2>Primeiro passo</h2><p>Conheça o seu perfil.</p><script>alert(1)</script><p onclick="x()">Texto</p>',
    conteudo_markdown: '## Primeiro passo\n\nConheça o seu perfil.',
    capa: { url: 'https://app.rankeando.com.br/blog-img/AAAAAAAAAAAAAAAAAAAAAA?v=abc', alt: 'Capa' },
    seo: { titulo: 'Plano de investimento | Teste', descricao: 'Descrição SEO do teste.', palavra_chave: 'plano', canonical: null },
    faq_jsonld: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'E </script> agora?', acceptedAnswer: { '@type': 'Answer', text: 'Sim.' } }] },
    autor: 'Libertad Capital', publicado_em: '2026-10-19T12:00:00.000Z', atualizado_em: '2026-10-19T12:00:00.000Z',
    categoria: { slug: 'investimentos', nome: 'Investimentos', descricao: 'Tudo sobre investir.', pai: null }, ...extra,
  },
});

// --- assinatura e ping
let r = await enviar('ping', `ping:${rand}`, { evento: 'ping', contrato: 1, desafio: 'x1' }, { assinatura: 't=1760000000,v1=' + '0'.repeat(64) });
confere('ping com assinatura errada -> 401', r.status === 401 && r.json?.erro === 'assinatura_invalida', JSON.stringify(r));
r = await enviar('ping', `ping:${rand}`, { evento: 'ping', contrato: 1, desafio: 'x1' }, { assinatura: assinar('{"evento":"ping","contrato":1,"desafio":"x1"}', 1760000000) });
confere('ping fora do horário -> 401', r.status === 401 && r.json?.erro === 'fora_do_horario', JSON.stringify(r));
r = await enviar('ping', `ping:${rand}`, { evento: 'ping', contrato: 1, desafio: 'desafio-1' });
confere('ping certo', r.status === 200 && r.json?.desafio === 'desafio-1' && r.json?.contrato === 3 && r.json?.recursos?.length === 6, JSON.stringify(r));

// --- categorias (mesclar) e a que o site criou por conta própria
r = await enviar('categorias', `categorias:${agoraIso}:${rand}`, {
  evento: 'categorias', contrato: 2, modo: 'mesclar', atualizado_em: agoraIso,
  categorias: [
    { slug: 'investimentos', nome: 'Investimentos', descricao: 'Tudo sobre investir.', ordem: 0, atualizado_em: agoraIso },
    { slug: 'renda-fixa', nome: 'Renda fixa', descricao: null, ordem: 1, pai: 'investimentos', atualizado_em: agoraIso },
  ],
});
confere('categorias mesclar', r.status === 200 && r.json?.ok === true, JSON.stringify(r));
r = await enviar('categorias.listar', `categorias.listar:${agoraIso}:${rand}`, { evento: 'categorias.listar', contrato: 2 });
const slugs = (r.json?.categorias ?? []).map((c) => c.slug);
confere('categorias.listar traz as categorias', r.status === 200 && slugs.includes('investimentos') && slugs.includes('renda-fixa'), JSON.stringify(r));
confere('renda-fixa dentro de investimentos', (r.json?.categorias ?? []).find((c) => c.slug === 'renda-fixa')?.pai === 'investimentos');

// --- publicar
let p = await pagina('/blog');
confere('/blog vazio -> 200', p.status === 200 && p.texto.includes('Em breve'), String(p.status));
const corpoPub = JSON.stringify(post());
r = await enviar('post.publicar', `${id}:${agoraIso}`, corpoPub);
confere('post.publicar', r.status === 200 && r.json?.ok === true && r.json?.url === `https://libertadcapital.com.br/blog/${slug}`, JSON.stringify(r));
const r2 = await enviar('post.publicar', `${id}:${agoraIso}`, corpoPub);
confere('entrega repetida responde igual', r2.status === 200 && r2.texto === r.texto);
const conflito = await enviar('post.publicar', `outro:${rand}`, JSON.stringify(post({ id: `outro_${rand}` })));
confere('slug de outro post do Rankeando -> 409', conflito.status === 409 && conflito.json?.erro === 'slug_em_uso', JSON.stringify(conflito));
const reservado = await enviar('post.publicar', `res:${rand}`, JSON.stringify(post({ id: `res_${rand}`, slug: 'categoria' })));
confere('slug reservado -> 409', reservado.status === 409, JSON.stringify(reservado));

// --- páginas
p = await pagina(`/blog/${slug}`);
confere('post 200', p.status === 200, String(p.status));
confere('post: título escapado e <h1>', p.texto.includes('<h1 class="lb-h1">Como escolher um plano &lt;b&gt;de investimento&lt;/b&gt;</h1>'));
confere('post: sem <script> do corpo nem onclick', !p.texto.includes('alert(1)') && !p.texto.includes('onclick="x()"'));
confere('post: title/description/canonical/og', p.texto.includes('<title>Plano de investimento | Teste</title>') && p.texto.includes('content="Descrição SEO do teste."') && p.texto.includes(`rel="canonical" href="https://libertadcapital.com.br/blog/${slug}"`) && p.texto.includes('og:image" content="https://app.rankeando.com.br/blog-img/'));
confere('post: JSON-LD Article, BreadcrumbList e FAQ com < escapado', p.texto.includes('"@type":"Article"') && p.texto.includes('"@type":"BreadcrumbList"') && p.texto.includes('"@type":"FAQPage"') && p.texto.includes('E \\u003c/script> agora?'));
confere('post: breadcrumb com categoria', p.texto.includes('Blog') && p.texto.includes('/blog/categoria/investimentos') && p.texto.includes('"position":3'));
p = await pagina(`/blog/${slug}/`);
confere('barra no fim -> 301 sem barra', p.status === 301 && p.location === `/blog/${slug}`, `${p.status} ${p.location}`);
p = await pagina('/blog');
confere('/blog lista o post e o filtro', p.status === 200 && p.texto.includes(`/blog/${slug}`) && p.texto.includes('/blog/categoria/investimentos'));
p = await pagina('/blog/categoria/investimentos');
confere('categoria com post -> 200', p.status === 200 && p.texto.includes(`/blog/${slug}`));
p = await pagina('/blog/categoria/renda-fixa');
confere('categoria sem post -> 404', p.status === 404, String(p.status));
p = await pagina('/blog/nao-existe');
confere('slug inexistente -> 404', p.status === 404);
p = await pagina('/sitemap.xml');
confere('sitemap com post, categoria e /blog', p.status === 200 && p.texto.includes(`<loc>https://libertadcapital.com.br/blog/${slug}</loc>`) && p.texto.includes('/blog/categoria/investimentos</loc>') && p.texto.includes('<loc>https://libertadcapital.com.br/blog</loc>') && p.texto.includes('<loc>https://libertadcapital.com.br</loc>') && !p.texto.includes('categoria/renda-fixa'), p.texto.slice(0, 300));

// --- mudança de slug -> 301
const novoSlug = `${slug}-v2`;
r = await enviar('post.publicar', `${id}:v2`, JSON.stringify(post({ slug: novoSlug, atualizado_em: '2026-10-20T12:00:00.000Z' })));
confere('slug novo', r.status === 200);
p = await pagina(`/blog/${slug}`);
confere('slug antigo -> 301 para o novo', p.status === 301 && p.location === `/blog/${novoSlug}`, `${p.status} ${p.location}`);
// versão mais velha que a gravada não desfaz
r = await enviar('post.publicar', `${id}:antiga`, JSON.stringify(post({ slug, atualizado_em: '2026-10-19T12:00:00.000Z' })));
p = await pagina(`/blog/${novoSlug}`);
confere('reenvio velho não desfaz', r.status === 200 && p.status === 200);

// --- assinatura do autor
r = await enviar('post.publicar', `${id}:ass`, JSON.stringify(post({ slug: novoSlug, atualizado_em: '2026-10-21T12:00:00.000Z', assinatura: { tipo: 'pessoa', nome: 'Dra. <Ana> Exemplo', funcao: 'Consultora', registro: 'CPA-20', curriculo: 'Linha 1\nLinha 2', foto_url: 'https://app.rankeando.com.br/blog-img/CCCCCCCCCCCCCCCCCCCCCC?v=a', link_url: 'https://libertadcapital.com.br/' } })));
p = await pagina(`/blog/${novoSlug}`);
confere('caixa do autor', r.status === 200 && p.texto.includes('class="rankeando-assinatura"') && p.texto.includes('Escrito por') && p.texto.includes('Dra. &lt;Ana&gt; Exemplo') && p.texto.includes('Linha 1<br>Linha 2') && p.texto.includes('Conheça a formação completa'));

// --- posts.listar / post.ler
r = await enviar('posts.listar', `posts.listar:${agoraIso}:${rand}`, { evento: 'posts.listar', contrato: 3, limite: 50 });
const item = (r.json?.posts ?? []).find((x) => x.origem === id);
confere('posts.listar', r.status === 200 && item && item.id_no_site === `rk:${id}` && item.slug === novoSlug && item.categoria_slug === 'investimentos' && r.json.proximo_cursor === null, JSON.stringify(r).slice(0, 400));
r = await enviar('post.ler', `post.ler:rk:${id}:${agoraIso}:${rand}`, { evento: 'post.ler', contrato: 3, id_no_site: `rk:${id}` });
confere('post.ler', r.status === 200 && r.json?.slug === novoSlug && r.json?.conteudo_html?.includes('Primeiro passo') && r.json?.seo?.titulo === 'Plano de investimento | Teste', JSON.stringify(r).slice(0, 300));
r = await enviar('post.ler', `post.ler:x:${agoraIso}:${rand}`, { evento: 'post.ler', contrato: 3, id_no_site: 'rk:nao-existe' });
confere('post.ler inexistente -> 404', r.status === 404 && r.json?.erro === 'nao_encontrado');

// --- post.substituir / post.restaurar
const troca = { evento: 'post.substituir', contrato: 3, id_no_site: `rk:${id}`, atualizado_em: '2026-11-01T10:00:00.000Z',
  post: { titulo: 'Título trocado', conteudo_html: '<h2>Conteúdo novo</h2><p>Texto novo.</p>', conteudo_markdown: '## Conteúdo novo\n\nTexto novo.', seo: { titulo: 'SEO trocado', descricao: 'Descrição trocada.', palavra_chave: 'novo' }, faq_jsonld: null } };
r = await enviar('post.substituir', `substituir:rk:${id}:h1`, troca);
confere('post.substituir', r.status === 200 && r.json?.url === `https://libertadcapital.com.br/blog/${novoSlug}`, JSON.stringify(r));
r = await enviar('post.ler', `post.ler:b:${agoraIso}:${rand}`, { evento: 'post.ler', contrato: 3, id_no_site: `rk:${id}` });
confere('post.ler devolve o novo', r.json?.titulo === 'Título trocado' && r.json?.atualizado_em === '2026-11-01T10:00:00.000Z' && r.json?.conteudo_html.includes('Conteúdo novo') && r.json?.faq_jsonld === null && r.json?.slug === novoSlug);
r = await enviar('posts.listar', `posts.listar:b:${agoraIso}:${rand}`, { evento: 'posts.listar', contrato: 3, limite: 50 });
const item2 = (r.json?.posts ?? []).find((x) => x.origem === id);
confere('posts.listar com título novo', item2?.titulo === 'Título trocado' && item2?.atualizado_em === '2026-11-01T10:00:00.000Z');
p = await pagina(`/blog/${novoSlug}`);
confere('página usa a troca (title, descrição, JSON-LD, sem FAQ antigo)', p.texto.includes('<title>SEO trocado</title>') && p.texto.includes('Descrição trocada.') && p.texto.includes('<h1 class="lb-h1">Título trocado</h1>') && p.texto.includes('Conteúdo novo') && !p.texto.includes('FAQPage') && p.texto.includes('2026-11-01T10:00:00.000Z') && p.texto.includes('Dra. &lt;Ana&gt; Exemplo'));
p = await pagina('/blog');
confere('lista usa o título novo', p.texto.includes('Título trocado') && !p.texto.includes('Como escolher um plano'));
p = await pagina('/sitemap.xml');
confere('sitemap lastmod da troca', p.texto.includes(`<loc>https://libertadcapital.com.br/blog/${novoSlug}</loc><lastmod>2026-11-01T10:00:00.000Z</lastmod>`));
r = await enviar('post.restaurar', `restaurar:rk:${id}:h1`, { evento: 'post.restaurar', contrato: 3, id_no_site: `rk:${id}`, atualizado_em: '2026-11-02T10:00:00.000Z' });
confere('post.restaurar', r.status === 200);
p = await pagina(`/blog/${novoSlug}`);
confere('restaurado volta ao original (com FAQ)', p.texto.includes('<title>Plano de investimento | Teste</title>') && p.texto.includes('FAQPage') && !p.texto.includes('Título trocado'));
r = await enviar('post.restaurar', `restaurar:rk:${id}:h2`, { evento: 'post.restaurar', contrato: 3, id_no_site: `rk:${id}`, atualizado_em: '2026-11-03T10:00:00.000Z' });
confere('restaurar de novo -> 200', r.status === 200);
await enviar('post.substituir', `substituir:rk:${id}:h3`, { ...troca, atualizado_em: '2026-11-04T10:00:00.000Z' });
await enviar('post.publicar', `${id}:v9`, JSON.stringify(post({ slug: novoSlug, atualizado_em: '2026-11-05T10:00:00.000Z' })));
p = await pagina(`/blog/${novoSlug}`);
confere('post.publicar apaga a troca', p.texto.includes('<title>Plano de investimento | Teste</title>') && !p.texto.includes('Título trocado'));
r = await enviar('post.substituir', `substituir:rk:nao:h`, { ...troca, id_no_site: 'rk:nao-existe' });
confere('substituir inexistente -> 404', r.status === 404);

// --- remover e categorias.remover
r = await enviar('post.remover', `${id}:remover`, { evento: 'post.remover', contrato: 2, post: { id } });
confere('post.remover', r.status === 200);
p = await pagina(`/blog/${novoSlug}`);
confere('post removido -> 404', p.status === 404);
p = await pagina('/blog/categoria/investimentos');
confere('categoria sem post depois da remoção -> 404', p.status === 404);
r = await enviar('categorias.remover', `categorias.remover:${agoraIso}:renda-fixa`, { evento: 'categorias.remover', contrato: 2, slugs: ['renda-fixa'] });
confere('categorias.remover', r.status === 200);
r = await enviar('categorias.listar', `categorias.listar:c:${rand}`, { evento: 'categorias.listar', contrato: 2 });
confere('só renda-fixa saiu', !(r.json?.categorias ?? []).some((c) => c.slug === 'renda-fixa') && (r.json?.categorias ?? []).some((c) => c.slug === 'investimentos'));
r = await enviar('evento.desconhecido', `d:${rand}`, { evento: 'evento.desconhecido', contrato: 3 });
confere('evento desconhecido -> 400', r.status === 400 && r.json?.erro === 'contrato_desconhecido');

console.log(falhas ? `\n${falhas} falha(s)` : '\nTudo certo');
process.exit(falhas ? 1 : 0);
