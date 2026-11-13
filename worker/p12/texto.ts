// Small text helpers of the blog (no dependency on the Next app: the Worker is built apart from it).

/** Reading time in minutes (200 words per minute, at least 1) from the Markdown of a post. */
export function readingMinutes(markdown: string): number {
  const palavras = markdown.replace(/[`*_#>\[\]()!|-]+/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(palavras / 200));
}

/** Escapes text for HTML (content and attributes). */
export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** JSON for a `<script type="application/ld+json">`: every `<` becomes < so article text can never close the tag. */
export const jsonScript = (v: unknown) => JSON.stringify(v).replace(/</g, '\\u003c');

const DATA = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' });
/** "12 de setembro de 2026" from an ISO date. */
export const dataLonga = (iso: string) => DATA.format(new Date(iso));
