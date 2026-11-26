# Efeitos premium + carregamento ágil — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Página inicial com efeitos "premium discreto" (abertura, botões, cartões, jornada, luz nas seções verdes, progresso de leitura) e LCP < 2,5 s no celular.

**Architecture:** Next 15 (export estático) + Tailwind v4 + Framer Motion já existentes. Framer passa a `LazyMotion` + `m` com recursos carregados sob demanda; entrada da abertura vira CSS puro (texto visível no primeiro quadro); efeitos de cursor ficam em componentes cliente pequenos, ligados só em `(hover: hover) and (pointer: fine)` e desligados com `prefers-reduced-motion`.

**Tech Stack:** Next.js 15.5, React 19, Tailwind CSS 4, framer-motion 12, zod 4 (`zod/mini`), @hookform/resolvers 5, sharp 0.34 (já em node_modules, só para o script de imagens).

**Spec:** `docs/superpowers/specs/2026-11-26-efeitos-premium-design.md`

## Global Constraints

- Cores e fontes: só tokens existentes (`libertad-*`, `white/…`, `--font-sora`, `--font-dm-sans`). Nada de cor nova.
- Textos, ordem das seções, vídeo da abertura, GTM e navegação `/#secao` não mudam.
- Nenhuma dependência nova no `package.json`.
- Animar só `transform`/`opacity`/`background-position`; camadas decorativas com `aria-hidden` e `pointer-events-none`.
- `prefers-reduced-motion: reduce` → sem parallax, inclinação, brilho animado, desenho de linha (estado final direto).
- Efeitos de cursor só com `matchMedia("(hover: hover) and (pointer: fine)")`.
- Anti-metas: neon, cursor personalizado, título letra a letra, rolagem presa, simuladores de rentabilidade.
- Metas de medição (home, celular 390×844, 4G lento, CPU 4×, sem cache): LCP < 2,5 s; CLS < 0,1; JS inicial gz menor que hoje (~280 kB).

## Verificação neste projeto

Não há executor de testes no repositório e o plano não cria um (YAGNI). Cada tarefa é provada por:
`npx tsc --noEmit -p .` + `npm run lint` + `npm run build` (todos sem erro) e por checagens no navegador
(Chrome DevTools MCP contra `npx wrangler dev --port 8788 --local`, que serve `out/` como em produção).
Os trechos `evaluate_script` abaixo são os "testes"; o resultado esperado vem ao lado.
Antes de cada `npm run build`, parar o `wrangler dev` (ele trava a pasta `out/`).

## Review Focus

1. Celular/toque: tocar num cartão ou botão não deixa inclinação/luz "presa"; nenhum efeito de cursor liga.
2. "Reduzir movimento" ligado: tudo visível na posição final, sem parallax nem linha se desenhando.
3. JS lento: o título e os botões da abertura aparecem antes da hidratação (LCP); nada fica invisível para sempre.
4. Teclado: o anel de foco dos botões continua visível; camadas de brilho não bloqueiam clique.
5. Formulário: com `zod/mini` as mesmas mensagens aparecem (envio vazio; WhatsApp BR inválido; DDI estrangeiro com 7 dígitos).

---

### Task 1: Framer Motion enxuto + validação com `zod/mini`

**Files:**
- Create: `components/ui/MotionProvider.tsx`, `lib/motion-features.ts`
- Modify: `app/layout.tsx` (envolver `{children}`), `components/sections/{Depoimentos,Diferenciais,Hero,JornadaCliente}.tsx`, `components/ui/SectionReveal.tsx` (`motion.*` → `m.*`), `lib/schemas/contact.ts`

**Interfaces:**
- Produces: `MotionProvider({ children })` — `LazyMotion` com `strict` e `features={() => import("@/lib/motion-features").then((mod) => mod.default)}`; `lib/motion-features.ts` faz `export default domAnimation`. Todas as tarefas seguintes usam `m.*` (nunca `motion.*`, o `strict` acusa).
- Produces: `contactSchema` e `ContactFormData` com os mesmos nomes e tipos de hoje.

- [ ] **Step 1: Medir a base** — `npm run build`; anotar o gz de cada chunk JS referenciado em `out/index.html` (mesmo comando da auditoria: `gzip -c out$f | wc -c` para cada `/_next/static/chunks/*.js` do HTML). Esperado: chunk maior ~106 kB.
- [ ] **Step 2: Criar `MotionProvider` + `motion-features` e envolver o `body` do layout.**
- [ ] **Step 3: Trocar `motion.` por `m.` nos 5 arquivos** (imports: `m`, `AnimatePresence`, hooks seguem iguais).
- [ ] **Step 4: Reescrever `contactSchema` em `zod/mini`** (`import * as z from "zod/mini"`), mesmas regras e mensagens:
  `nome` min 2 "Informe seu nome completo"; `email` "Informe um e-mail válido"; `ddi` enum "Selecione o DDI";
  `whatsapp` min 1 "Informe seu WhatsApp"; `patrimonio` "Selecione seu patrimônio"; `objetivo` "Selecione seu objetivo";
  checagem do telefone (BR: "Informe um WhatsApp válido com DDD"; outros: 8–15 dígitos, "Informe um número de telefone válido", `path: ["whatsapp"]`).
- [ ] **Step 5: Build + tamanhos** — tsc/lint/build sem erro; refazer a medição do Step 1. Esperado: soma gz dos chunks da home menor que a base.
- [ ] **Step 6: Teste do formulário no navegador** — na home local, clicar "Solicitar reunião estratégica" com tudo vazio:
  esperado 6 mensagens (`[role=alert]`) com os textos acima; preencher DDI +55 e WhatsApp "123": esperado "Informe um WhatsApp válido com DDD"; DDI +1 e "1234567": esperado "Informe um número de telefone válido". Console sem erro de `LazyMotion strict`.
- [ ] **Step 7: Commit** — `perf: Framer Motion sob demanda e validação com zod/mini`.

### Task 2: Abertura (Hero) — LCP + profundidade

**Files:**
- Modify: `components/sections/Hero.tsx`, `app/globals.css`

**Interfaces:**
- Consumes: `m` (Task 1).
- Produces: classe utilitária CSS `.hero-enter` (keyframes `hero-enter`: `opacity 0→1`, `translateY(20px)→0`, 0,6 s, `cubic-bezier(0.22,1,0.36,1)`, `both`) com atraso por `style={{ animationDelay }}` (0 / 0,08 / 0,16 / 0,24 s).

- [ ] **Step 1: Entrada em CSS** — eyebrow, `h1`, parágrafo e botões viram elementos comuns com `.hero-enter` (sem `motion`/`m`).
- [ ] **Step 2: Parallax de rolagem** — `useScroll({ target: section, offset: ["start start","end start"] })`; fundo (picture+video) `y: 0→18%` e `scale: 1→1.08`; bloco de texto `y: 0→-8%`, `opacity: 1→0` até 70% da rolagem. Desligado com `useReducedMotion()`.
- [ ] **Step 3: Profundidade pelo mouse** — só com ponteiro fino: fundo desloca no máximo ±12 px (`useMotionValue` + `useSpring({ stiffness: 60, damping: 20 })`), ouvindo `pointermove` na seção.
- [ ] **Step 4: Brilho dourado** — camada `aria-hidden` atrás do título: `radial-gradient` de `var(--libertad-gold)` a ~12% de opacidade, keyframes lentos (deriva de 14 s, `alternate`).
- [ ] **Step 5: Indicador de rolagem** — trocar o `ChevronDown` que pula por um contorno de "mouse" com ponto dourado deslizando; é um `<a href="#eqi-stats">` com `aria-label="Rolar para o conteúdo"` que chama `scrollToSection`.
- [ ] **Step 6: Verificar** — build ok; trace de desempenho (celular, 4G lento, CPU 4×) contra o local: **LCP < 2,5 s** e elemento LCP = `h1`. Com `prefers-reduced-motion` emulado: `getComputedStyle(fundo).transform` continua `none`/identidade depois de rolar 300 px.
- [ ] **Step 7: Commit** — `feat(hero): entrada em CSS, parallax e brilho dourado`.

### Task 3: Botões premium

**Files:**
- Modify: `components/ui/brand-button.tsx`, `app/globals.css`

**Interfaces:**
- Produces: `BrandButton` com a mesma API; filhos passam a ficar num `<span className="relative z-10 inline-flex items-center justify-center gap-[inherit]">` (mantém o `gap-2` que o botão de envio passa). Grupo nomeado `group/btn` para não colidir com o `group` que o formulário já usa.

- [ ] **Step 1:** `gold` — camada `aria-hidden` (`absolute inset-0 overflow-hidden rounded-[inherit]`) com faixa diagonal de luz branca 35% que atravessa da esquerda à direita em 0,7 s no hover/focus-visible; leve elevação (`-translate-y-px`).
- [ ] **Step 2:** `gold-outline`, `ghost-white`, `ghost-dark` — preenchimento que desliza da esquerda (`scale-x 0→1`, `origin-left`, 0,4 s) com a cor de hover que cada variante já usa hoje.
- [ ] **Step 3: Verificar** — no navegador: o botão continua com o mesmo `innerText`; `elementFromPoint` no centro do botão devolve o próprio `<a>/<button>` ou o `<span>` de texto (camada não captura clique); Tab até "Agendar Reunião" mostra o contorno de foco. Com reduced motion, o hover só muda a cor.
- [ ] **Step 4: Commit** — `feat(botões): brilho dourado e preenchimento deslizante`.

### Task 4: Luz que segue o cursor + cartões com inclinação

**Files:**
- Create: `lib/use-fine-pointer.ts`, `components/ui/CursorSpotlight.tsx`, `components/ui/TiltCard.tsx`
- Modify: `components/ui/section.tsx` (tons `dark` e `gradient`: `relative isolate` + `<CursorSpotlight />`), `components/ui/feature-card.tsx` (envolver em `TiltCard`)

**Interfaces:**
- Produces: `useFinePointer(): boolean` — `true` só com `(hover: hover) and (pointer: fine)` e sem reduced motion; `false` no SSR.
- Produces: `CursorSpotlight({ className? })` — camada `absolute inset-0 -z-10 aria-hidden pointer-events-none`; escuta `pointermove` no elemento pai; pinta `radial-gradient(600px circle at var(--x) var(--y), rgb(201 168 76 / 0.10), transparent 60%)`; atualiza `--x/--y` via `requestAnimationFrame`; sem render quando `useFinePointer()` é `false`.
- Produces: `TiltCard({ children, className? })` — inclinação máx. 4° (`rotateX/rotateY` por `useSpring`), `perspective: 900px`, luz interna igual à do spotlight; volta a 0 no `pointerleave`; sem efeito quando `useFinePointer()` é `false`.

- [ ] **Step 1: Criar o hook e os dois componentes.**
- [ ] **Step 2: Ligar no `Section` e no `FeatureCard`.**
- [ ] **Step 3: Verificar** — desktop: mover o mouse sobre "Quem atendemos" muda `--x`; um cartão sob o mouse tem `transform` com `rotateX`; ao sair volta a `none`/0°. Celular emulado (touch): nenhuma camada de spotlight no DOM e cartões sem `transform` depois de tocar.
- [ ] **Step 4: Commit** — `feat: luz que segue o cursor e cartões com inclinação`.

### Task 5: Jornada que se desenha + progresso de leitura

**Files:**
- Modify: `components/sections/JornadaCliente.tsx`, `components/ui/Header.tsx`

**Interfaces:**
- Consumes: `m` (Task 1).

- [ ] **Step 1: Linha da jornada** — trilho `white`/`libertad-gold/20` atrás das etapas e linha dourada por cima com `scaleX` (desktop, `origin-left`) / `scaleY` (celular, `origin-top`) ligada a `useScroll({ target, offset: ["start 75%","end 55%"] })`. Cada etapa "acende" (badge com `shadow` dourada e `scale 1.05`) quando o progresso passa de `index / (n - 1)`. Reduced motion: linha cheia e todas acesas.
- [ ] **Step 2: Barra de progresso** — no `Header`, `m.div` de 2 px na base, `bg-libertad-gold`, `scaleX = useSpring(scrollYProgress)`, `origin-left`, `aria-hidden`.
- [ ] **Step 3: Verificar** — rolar até a Jornada: `scaleX` da linha cresce de 0 a 1; no topo da página a barra tem `scaleX(0)`, no rodapé ~1. Navegação dos Termos para `/#contato` continua parando com o título visível (top entre 60 e 130 px).
- [ ] **Step 4: Commit** — `feat: jornada que se desenha e progresso de leitura`.

### Task 6: Imagens leves

**Files:**
- Create: `scripts/otimizar-imagens.mjs`, `public/images/logo-libertad-capital-eqi.webp`
- Modify: `public/images/hero-skyline.webp`, `public/images/hero-skyline-mobile.webp` (recomprimidas), `components/ui/BrandLogo.tsx`, `worker/p12/render.ts` (`LOGO`)

- [ ] **Step 1: Script com sharp** — logo PNG → WebP 560×160 (qualidade 85, alpha); skylines recomprimidas para WebP qualidade 55 (mesmas dimensões). Rodar `node scripts/otimizar-imagens.mjs`. Esperado: logo < 25 kB; mobile < 70 kB; desktop < 120 kB.
- [ ] **Step 2: Usar o WebP** no `BrandLogo` e no cabeçalho do blog. O PNG fica (JSON-LD/og).
- [ ] **Step 3: Verificar** — conferência visual da abertura (celular e desktop) e do logo no cabeçalho/rodapé/blog: sem serrilhado visível; `naturalWidth` do logo = 560.
- [ ] **Step 4: Commit** — `perf: logo em WebP e imagens da abertura recomprimidas`.

### Task 7: Medição final e entrega

- [ ] **Step 1:** Trace final no local (mesmas condições): anotar LCP, CLS, JS gz total; comparar com a tabela da spec.
- [ ] **Step 2:** Passar pelos 5 itens do Review Focus no navegador (desktop, celular, reduced motion, teclado, formulário).
- [ ] **Step 3:** `git push origin main`; depois do deploy, repetir o trace no site ao vivo.
