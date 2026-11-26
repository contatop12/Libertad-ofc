# Efeitos "premium discreto" na página inicial — desenho

Data: 2026-11-26 · Estilo escolhido pelo cliente: **A — Premium discreto**

## Intenção

Deixar a página da Libertad Capital mais memorável e imersiva (abertura, botões, cartões, jornada) sem perder
a sobriedade que um escritório de investimentos para patrimônio alto precisa. Movimento lento e elegante,
nunca chamativo.

## Metas

- Abertura (Hero) com profundidade: fundo em parallax ao rolar, leve deslocamento seguindo o mouse e um brilho
  dourado suave atrás do título.
- Botões com acabamento premium: brilho dourado que atravessa o botão no hover (dourado) e preenchimento que
  desliza (contorno).
- Cartões (Quem atendemos, Soluções) com inclinação 3D leve e luz que segue o cursor.
- Jornada do Cliente com uma linha dourada que se desenha conforme a rolagem, acendendo cada etapa.
- Seções verdes (Quem atendemos, Diferenciais, Formulário, CTA final) com uma luz suave seguindo o cursor.
- Barra fina dourada de progresso de leitura sob o cabeçalho.
- Indicador de rolagem elegante na abertura (no lugar da seta que pula), clicável.

## Não-metas

- Trocar cores, fontes, textos ou a ordem das seções.
- Mexer no vídeo/imagem da abertura, no formulário ou na navegação corrigida antes.

## Anti-metas (seria um fracasso mesmo funcionando)

- Efeito neon, brilho forte, cursor personalizado, título letra a letra, seções que prendem a rolagem.
- Simuladores ou qualquer elemento que mostre rentabilidade (regras da CVM; o site passou por ajuste de conformidade).
- Página mais lenta no celular ou rolagem travada.

## Restrições

- Só as cores e fontes existentes (tokens `libertad-*`, `--font-sora`, `--font-dm-sans`).
- `prefers-reduced-motion: reduce`: sem parallax, inclinação, brilho animado nem desenho da linha (estado final direto).
- Toque/celular: sem efeitos de cursor (inclinação, luz); parallax de rolagem mantido, mais suave.
- Só `transform`/`opacity` animados; camadas decorativas com `aria-hidden` e `pointer-events: none`.
- Manter `scroll-margin-top` e os links `/#secao` funcionando.

## Abordagens consideradas

1. **Framer Motion + CSS sobre os componentes atuais (escolhida).** A biblioteca já está no projeto; nenhum peso
   novo; cada efeito fica isolado no componente que já existe.
2. GSAP + ScrollTrigger + rolagem suave (Lenis): mais poder, mas ~60 kB a mais e a rolagem suave sequestrada
   briga com a navegação por âncoras que acabamos de corrigir.
3. Abertura em WebGL/Three.js: pesado no celular e exagerado para o estilo A.

## Como (decidido)

- `BrandButton`: camada de brilho (dourado) e camada de preenchimento (contorno/ghost) via CSS; sem JS.
- Hero: `useScroll`/`useTransform` para parallax do fundo e saída do conteúdo; `useMotionValue` + `useSpring`
  para o deslocamento pelo mouse (só `pointer: fine`); brilho dourado em CSS (keyframes lentos).
- Novo componente cliente de luz que segue o cursor, usado pelas seções verdes (`Section` tons `dark`/`gradient`).
- `FeatureCard`: inclinação (máx. ~4°) e luz interna seguindo o cursor, num wrapper cliente.
- `JornadaCliente`: linha com `scaleX` (desktop) / `scaleY` (celular) ligada à rolagem; etapa acende ao ser alcançada.
- `Header`: barra de progresso com `useScroll().scrollYProgress` + `scaleX`.

## Desempenho (pedido do cliente na aprovação: "carregamento super ágil")

Medição de partida (home ao vivo, celular, 4G lento, CPU 4×, sem cache):

| Métrica | Valor | Causa |
|---|---|---|
| LCP | 6,6 s (ruim) | o título da abertura (LCP) nasce com `opacity: 0` (Framer Motion) e só aparece depois que o JS hidrata: 6,0 s de atraso |
| CLS | 0,01 (bom) | — |
| TTFB | 0,56 s (bom) | — |
| JS inicial | ~280 kB gz | chunk de 106 kB gz com Framer Motion completo + Zod (validação do formulário) |
| Logo | PNG 99 kB, 700×200 | exibido a no máximo 280×80 |
| GTM | 622 ms de CPU | terceiro |

Metas: LCP < 2,5 s nessa mesma medição; os efeitos novos não aumentam o JS inicial (a meta é reduzi-lo); CLS < 0,1.

Como:
- Entrada da abertura em CSS (visível no primeiro quadro, sem esperar o JS); parallax e mouse entram depois, no JS.
- Framer Motion com `LazyMotion` + `m` (recursos `domAnimation`), no lugar do `motion` completo.
- Validação do formulário com `zod/mini` (mesmas regras e mensagens).
- Logo em WebP redimensionado (2× do maior tamanho exibido), no cabeçalho e no rodapé.
- Imagens estáticas da abertura recomprimidas (ficam sob a camada verde de 72%).
- Efeitos novos só com CSS ou hooks que já estão no pacote; nenhuma biblioteca nova.

Fora: o GTM continua carregando como hoje (adiar o carregamento muda os dados medidos; é decisão do cliente).
O vídeo da abertura não muda.

## Fica a critério de quem implementar

Durações, curvas e intensidades exatas (dentro de "lento e sutil"), e os nomes dos novos componentes.
