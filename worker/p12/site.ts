// Endereços do site e do blog. O blog fica em /blog e /blog/<slug> (sem barra no fim, como as demais páginas do site).
export const SITE_URL = 'https://libertadcapital.com.br';
export const SITE_NOME = 'Libertad Capital';
export const BLOG_PATH = '/blog';
export const WEBHOOK_PATH = '/api/p12/webhook';

export const urlDoPost = (slug: string) => `${SITE_URL}${BLOG_PATH}/${slug}`;
export const urlDaCategoria = (slug: string) => `${SITE_URL}${BLOG_PATH}/categoria/${slug}`;
