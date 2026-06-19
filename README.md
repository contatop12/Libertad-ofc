# Libertad Capital — Site Institucional

Boutique de estratégia patrimonial credenciada à EQI Investimentos. Site institucional premium construído com Next.js 15.

## Stack

- Next.js 15 (App Router, static export)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- ShadCN/UI
- React Hook Form + Zod

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
```

O export estático é gerado na pasta `out/`.

## Design System

Documentação completa em [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md).

- **Títulos:** Sora (sans-serif geométrica)
- **Textos:** DM Sans (sans-serif)
- **Tokens:** `styles/tokens.css`

## Substituir imagens

Coloque os arquivos em `public/images/`:

| Arquivo | Descrição |
|---------|-----------|
| `logo-libertad-eqi.png` | Logo combinada Libertad + EQI (header e footer) |
| `rafaela-alves.jpg` | Foto profissional da Rafaela Alves |
| `og-libertad.jpg` | Imagem Open Graph (1200×630 recomendado) |

Após substituir, reinicie o servidor de desenvolvimento ou rode um novo build.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste:

```
NEXT_PUBLIC_SITE_URL=https://seudominio.com.br
```

## Deploy na Cloudflare Pages

1. Conecte o repositório Git à Cloudflare Pages
2. **Framework preset:** None (ou Next.js Static)
3. **Build command:** `npm run build`
4. **Build output directory:** `out`
5. **Node.js version:** 20 ou superior
6. Adicione a variável `NEXT_PUBLIC_SITE_URL` com a URL final do site

### Deploy manual (CLI)

```bash
npm run build
npx wrangler pages deploy out --project-name=libertad-capital
```

## Estrutura

```
app/                  # Layout, página principal, SEO
components/sections/  # Seções da home
components/ui/        # Header, Footer, componentes base
lib/                  # Constantes, schemas, utilitários
public/images/        # Assets estáticos
```

## Contato

- WhatsApp: (11) 98859-5724
- Localização: Indaiatuba, SP
