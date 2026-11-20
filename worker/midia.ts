// Os vídeos do site (/videos/...). Os arquivos estáticos do Workers ignoram o cabeçalho Range e devolvem sempre o arquivo inteiro (200),
// mas o Safari (iPhone e Mac) só toca vídeo quando o servidor entrega o trecho pedido (206). Aqui o arquivo vem do ASSETS e o trecho sai daqui.
export type Ambiente = { ASSETS: Fetcher };

/** O trecho pedido em `Range: bytes=...` num arquivo de `tamanho` bytes; null se o pedido for inválido ou não couber no arquivo. */
export function trechoPedido(range: string, tamanho: number): { inicio: number; fim: number } | null {
  const partes = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (!partes || (partes[1] === '' && partes[2] === '')) return null;
  if (partes[1] === '') {
    // bytes=-N: os últimos N bytes.
    const ultimos = Number(partes[2]);
    return ultimos > 0 && tamanho > 0 ? { inicio: Math.max(0, tamanho - ultimos), fim: tamanho - 1 } : null;
  }
  const inicio = Number(partes[1]);
  const fim = partes[2] === '' ? tamanho - 1 : Math.min(Number(partes[2]), tamanho - 1);
  return inicio <= fim && inicio < tamanho ? { inicio, fim } : null;
}

export async function tratarVideo(request: Request, env: Ambiente): Promise<Response> {
  const arquivo = await env.ASSETS.fetch(request);
  const ehVideo = (arquivo.headers.get('content-type') ?? '').startsWith('video/');
  // Qualquer coisa que não seja o vídeo inteiro (304, a página do site no lugar de um arquivo que não existe...) segue como veio.
  if (request.method !== 'GET' || arquivo.status !== 200 || !ehVideo) return arquivo;

  const headers = new Headers(arquivo.headers);
  headers.set('accept-ranges', 'bytes');
  const range = request.headers.get('range');
  const seRange = request.headers.get('if-range');
  if (!range || (seRange !== null && seRange !== arquivo.headers.get('etag'))) return new Response(arquivo.body, { status: 200, headers });

  const bytes = await arquivo.arrayBuffer();
  const trecho = trechoPedido(range, bytes.byteLength);
  if (!trecho) return new Response(null, { status: 416, headers: { 'content-range': `bytes */${bytes.byteLength}`, 'accept-ranges': 'bytes' } });

  headers.set('content-range', `bytes ${trecho.inicio}-${trecho.fim}/${bytes.byteLength}`);
  headers.set('content-length', String(trecho.fim - trecho.inicio + 1));
  return new Response(bytes.slice(trecho.inicio, trecho.fim + 1), { status: 206, headers });
}
