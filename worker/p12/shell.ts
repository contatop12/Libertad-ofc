// O "casco" das páginas do blog: as folhas de estilo, as fontes, a classe do <body> e o rodapé do próprio site.
// O site é exportado (Next, output: "export") e o blog é feito no servidor; para o blog ficar igual ao resto, o Worker lê
// uma página já exportada (/politica-de-privacidade) e aproveita dela o que muda a cada build (os nomes com hash das folhas
// de estilo e das fontes) e o rodapé. Se a leitura falhar, o blog sai só com o estilo próprio e um rodapé simples: nunca quebra.

export type Casco = {
  /** `<link rel="stylesheet">` e `<link rel="preload" as="font">` do site. */
  links: string;
  /** Classes do <body> (as variáveis das fontes). */
  bodyClass: string;
  /** O <footer> do site, com os links de âncora (#contato) apontando para a página inicial. */
  rodape: string | null;
};

const PAGINA_MODELO = '/politica-de-privacidade';
const TTL_MS = 5 * 60_000;
let guardado: { ate: number; casco: Casco } | null = null;

const VAZIO: Casco = { links: '', bodyClass: '', rodape: null };

/** Só aceita o que o Next gera: folhas de estilo e fontes do próprio site (/_next/...). */
export function extrairCasco(html: string): Casco {
  const links = [
    ...(html.match(/<link rel="stylesheet" href="\/_next\/static\/css\/[^"<>]+"[^<>]*>/g) ?? []),
    ...(html.match(/<link rel="preload" href="\/_next\/static\/media\/[^"<>]+" as="font"[^<>]*>/g) ?? []),
  ].join('');
  const classe = /<body class="([^"<>]*)"/.exec(html)?.[1] ?? '';
  const rodape = /<footer[\s\S]*?<\/footer>/.exec(html)?.[0] ?? null;
  return { links, bodyClass: classe, rodape: rodape ? rodape.replace(/href="#/g, 'href="/#') : null };
}

export async function carregarCasco(assets: Fetcher, origin: string): Promise<Casco> {
  if (guardado && guardado.ate > Date.now()) return guardado.casco;
  try {
    const r = await assets.fetch(new Request(`${origin}${PAGINA_MODELO}`));
    if (!r.ok) return guardado?.casco ?? VAZIO;
    const casco = extrairCasco(await r.text());
    // Sem folha de estilo a leitura não serviu: não guarda, tenta de novo na próxima.
    if (!casco.links) return guardado?.casco ?? VAZIO;
    guardado = { ate: Date.now() + TTL_MS, casco };
    return casco;
  } catch {
    return guardado?.casco ?? VAZIO;
  }
}
