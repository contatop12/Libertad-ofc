-- Blog do Rankeando (rankeando-blog/CONTRATO.md, versao 3) no Worker libertad-ofc. Banco proprio do blog: libertad-blog.
-- Aplicar com: npx wrangler d1 migrations apply libertad-blog --remote

-- Um registro por post do Rankeando, gravado e atualizado pelo `id` dele. Datas em ISO 8601 UTC.
CREATE TABLE IF NOT EXISTS p12_posts (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  resumo TEXT NOT NULL,
  conteudo_html TEXT NOT NULL,
  conteudo_markdown TEXT NOT NULL,
  capa_url TEXT,
  capa_alt TEXT,
  seo_titulo TEXT NOT NULL,
  seo_descricao TEXT NOT NULL,
  seo_palavra_chave TEXT,
  seo_canonical TEXT,
  faq_jsonld TEXT,
  autor TEXT NOT NULL,
  publicado_em TEXT NOT NULL,
  atualizado_em TEXT NOT NULL,
  -- Lista JSON dos slugs anteriores do post: cada um responde 301 para o atual.
  slugs_antigos TEXT NOT NULL DEFAULT '[]',
  recebido_em TEXT NOT NULL,
  -- JSON da caixa "Escrito por" (NULL = sem caixa).
  assinatura TEXT
);

CREATE INDEX IF NOT EXISTS p12_posts_publicado_em ON p12_posts (publicado_em DESC);

-- X-Rankeando-Entrega de cada resposta de sucesso (2xx) e a resposta dada: uma entrega repetida recebe a mesma resposta e nao grava nada.
CREATE TABLE IF NOT EXISTS p12_entregas (
  entrega TEXT PRIMARY KEY,
  evento TEXT NOT NULL,
  status INTEGER NOT NULL,
  corpo TEXT NOT NULL,
  recebido_em TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS p12_entregas_evento_recebido ON p12_entregas (evento, recebido_em);

-- Categorias do blog, pelo slug. `ordem` segue a tela do Rankeando; `pai_slug` so nas subcategorias.
CREATE TABLE IF NOT EXISTS p12_categorias (
  slug TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER NOT NULL DEFAULT 0,
  pai_slug TEXT,
  atualizado_em TEXT
);

CREATE INDEX IF NOT EXISTS p12_categorias_pai ON p12_categorias (pai_slug);

-- A categoria de um post (no maximo uma). Post sem linha aqui fica sem categoria.
CREATE TABLE IF NOT EXISTS p12_post_categoria (
  post_id TEXT PRIMARY KEY,
  categoria_slug TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS p12_post_categoria_slug ON p12_post_categoria (categoria_slug);

-- Ajustes do recebimento: `categorias_atualizado_em` = a ultima lista de categorias aplicada.
CREATE TABLE IF NOT EXISTS p12_config (
  chave TEXT PRIMARY KEY,
  valor TEXT NOT NULL
);

-- Contrato v3: conteudo novo de um post trocado por `post.substituir` (uma linha por `id_no_site`; o original nunca e alterado).
-- `post.restaurar` (ou um novo `post.publicar` do post) apaga a linha. seo_* vazio = "use o do original".
CREATE TABLE IF NOT EXISTS p12_substituicoes (
  id_no_site TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  conteudo_html TEXT NOT NULL,
  conteudo_markdown TEXT NOT NULL DEFAULT '',
  seo_titulo TEXT NOT NULL DEFAULT '',
  seo_descricao TEXT NOT NULL DEFAULT '',
  seo_palavra_chave TEXT NOT NULL DEFAULT '',
  faq_jsonld TEXT,
  atualizado_em TEXT NOT NULL,
  recebido_em TEXT NOT NULL
);
