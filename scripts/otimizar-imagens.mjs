// Gera as versões leves das imagens que pesam no carregamento da página inicial.
// Usa o sharp que já vem com o Next (não é dependência direta do projeto).
//
//   node scripts/otimizar-imagens.mjs                        → logo em WebP (a partir do PNG original)
//   node scripts/otimizar-imagens.mjs --recomprimir-abertura → também recomprime as imagens da abertura
//
// A recomprimir-abertura sobrescreve os .webp da abertura (não há outro original no repositório): rode uma vez só,
// senão a qualidade cai a cada execução. Elas ficam sob uma camada verde de 72%, por isso aguentam compressão forte:
// desktop reduzida a 1600 px (qualidade 50) e celular em qualidade 35 (medido: 178 kB -> 91 kB e 100 kB -> 66 kB).
import { readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

// Sem cache: no Windows o sharp segura o arquivo aberto e a sobrescrita falha.
sharp.cache(false);

const IMAGENS = join(import.meta.dirname, "..", "public", "images");
const kb = async (arquivo) => `${((await stat(arquivo)).size / 1024).toFixed(1)} kB`;

// Logo: 2× do maior tamanho em que aparece (280×80 no rodapé), com transparência.
const logoPng = join(IMAGENS, "logo-libertad-capital-eqi.png");
const logoWebp = join(IMAGENS, "logo-libertad-capital-eqi.webp");
await sharp(logoPng).resize(560, 160).webp({ quality: 85, alphaQuality: 90, effort: 6 }).toFile(logoWebp);
console.log(`logo: ${await kb(logoPng)} (PNG) -> ${await kb(logoWebp)} (WebP 560x160)`);

if (process.argv.includes("--recomprimir-abertura")) {
  const ABERTURA = [
    { nome: "hero-skyline.webp", largura: 1600, qualidade: 50 },
    { nome: "hero-skyline-mobile.webp", largura: null, qualidade: 35 },
  ];
  for (const { nome, largura, qualidade } of ABERTURA) {
    const arquivo = join(IMAGENS, nome);
    const antes = await kb(arquivo);
    let imagem = sharp(await readFile(arquivo));
    if (largura) imagem = imagem.resize({ width: largura, withoutEnlargement: true });
    const leve = await imagem.webp({ quality: qualidade, effort: 6 }).toBuffer();
    await writeFile(arquivo, leve);
    console.log(`${nome}: ${antes} -> ${await kb(arquivo)}`);
  }
}
