# Libertad Capital — Design System

Fundamentos visuais do site institucional. Tokens centralizados em [`styles/tokens.css`](styles/tokens.css).

## Tipografia

| Papel | Fonte | Uso |
|-------|-------|-----|
| **Display / Títulos** | [Sora](https://fonts.google.com/specimen/Sora) | H1–H4, números institucionais, labels de seção |
| **Corpo / UI** | [DM Sans](https://fonts.google.com/specimen/DM+Sans) | Parágrafos, formulários, navegação, botões |

Ambas são **sans-serif**. Sora traz personalidade geométrica nos títulos; DM Sans garante legibilidade nos textos longos.

### Escala tipográfica (CSS variables)

- `--text-display-hero` — Hero principal
- `--text-display-xl` — Títulos de seção
- `--text-display-lg` — Subtítulos grandes
- `--text-display-md` — Cards e H3
- `--text-body-lg` / `--text-body-md` / `--text-body-sm`
- `--text-caption` — Eyebrows e notas
- `--text-stat` — Números EQI

## Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| `--libertad-green` | `#0D3D2B` | Fundo principal, header |
| `--libertad-green-mid` | `#1A5C40` | Cards escuros, formulário |
| `--libertad-gold` | `#C9A84C` | CTAs, acentos, ícones |
| `--libertad-gold-light` | `#E8C97A` | Hover de botões dourados |
| `--libertad-off-white` | `#F8F6F1` | Seções alternadas |
| `--libertad-text-dark` | `#1A1A1A` | Texto principal |
| `--libertad-text-medium` | `#4A4A4A` | Texto secundário |

## Componentes base

| Componente | Arquivo | Finalidade |
|------------|---------|------------|
| `Section` | `components/ui/section.tsx` | Wrapper de seção com tom e padding |
| `SectionHeader` | `components/ui/section-header.tsx` | Eyebrow + título + subtítulo |
| `Eyebrow` | `components/ui/eyebrow.tsx` | Label superior (text ou pill) |
| `FeatureCard` | `components/ui/feature-card.tsx` | Cards de soluções/audiência |
| `BrandButton` | `components/ui/brand-button.tsx` | CTAs da marca (gold, outline, ghost) |

### Tons de seção (`Section`)

- `light` — fundo branco
- `muted` — off-white
- `dark` — verde institucional
- `black` — footer
- `gradient` — CTA final

### Variantes de botão (`BrandButton`)

| Variante | Uso |
|----------|-----|
| `gold` | CTA primário — gradiente dourado + sombra |
| `gold-outline` | CTA secundário / header |
| `ghost-white` | Sobre fundo escuro (hero) |
| `ghost-dark` | Sobre fundo claro |
| `light` | Botões claros em seções escuras (App Store) |

**Tokens:** `--btn-gradient-gold`, `--btn-shadow-gold`, `--btn-height-*`

### Formulário

Componentes em `form-field.tsx`: `FormField` + `formControlClass` (glass inputs).
Card usa `--form-card-bg` e borda gradiente dourada.

## Acessibilidade

- Foco visível dourado (`--color-focus-ring`)
- `prefers-reduced-motion` respeitado globalmente
- Alvos de toque mínimo 44px nos botões de formulário e carrossel
- Contraste WCAG AA nos pares texto/fundo principais

## Substituir fontes

Em [`app/layout.tsx`](app/layout.tsx), altere as importações `next/font/google` e atualize as variáveis CSS em `globals.css` (`--font-sora`, `--font-dm-sans`).
