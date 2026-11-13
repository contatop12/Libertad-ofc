// Worker do site Libertad Capital. O site em si é exportado (Next, output: "export") e servido como arquivos estáticos (binding ASSETS);
// este Worker só roda para as rotas listadas em `run_worker_first` (wrangler.jsonc): o recebimento dos posts do Rankeando (/api/p12/webhook),
// as páginas do blog (/blog...) e o /sitemap.xml com os posts. Qualquer outra rota nem chega aqui.
import { segredoDoRankeando } from './p12/assinatura';
import { tratarBlog, tratarSitemap } from './p12/blog';
import { WEBHOOK_PATH } from './p12/site';
import { D1Store } from './p12/store';
import { tratarWebhook } from './p12/webhook';

/** DB: o D1 do blog (posts e categorias do Rankeando). RANKEANDO_WEBHOOK_SECRET: a chave que assina os envios (secret do Worker, nunca no código).
 *  P12_WEBHOOK_SECRET é a mesma chave com o nome antigo: só vale enquanto a nova não existe. */
export interface Env { ASSETS: Fetcher; DB: D1Database; RANKEANDO_WEBHOOK_SECRET?: string; P12_WEBHOOK_SECRET?: string }

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === WEBHOOK_PATH || pathname === `${WEBHOOK_PATH}/`) {
      return tratarWebhook(request, {
        segredo: segredoDoRankeando({ RANKEANDO_WEBHOOK_SECRET: env.RANKEANDO_WEBHOOK_SECRET, P12_WEBHOOK_SECRET: env.P12_WEBHOOK_SECRET }),
        store: new D1Store(env.DB),
        agora: Math.floor(Date.now() / 1000),
      });
    }
    if (pathname.startsWith('/api/p12/')) return Response.json({ ok: false, error: 'not_found' }, { status: 404, headers: { 'cache-control': 'no-store' } });
    if (pathname === '/sitemap.xml') return tratarSitemap(request, env, new D1Store(env.DB));
    if (pathname === '/blog' || pathname.startsWith('/blog/')) return tratarBlog(request, env, new D1Store(env.DB));
    // Rota que não deveria chegar aqui: entrega o arquivo do site.
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
