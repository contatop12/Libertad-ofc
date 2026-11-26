import type { Metadata } from "next";

import { BrandButton } from "@/components/ui/brand-button";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { CONTACT_SECTION_HREF } from "@/lib/constants";
import { homeSectionHref } from "@/lib/utils";

// Vira o out/404.html do export, que o Worker entrega (com status 404) para qualquer endereço que não existe (wrangler.jsonc).
export const metadata: Metadata = {
  title: "Página não encontrada | Libertad Capital",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-libertad-off-white pt-[calc(var(--header-height)+clamp(2rem,5vw,3.5rem))] pb-[var(--section-py)]">
        <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)]">
          <p className="type-eyebrow text-libertad-gold-muted">Erro 404</p>
          <h1 className="type-title-lg mt-4 text-libertad-text-dark">Página não encontrada</h1>
          <p className="mt-6 max-w-2xl type-body text-libertad-text-medium">
            O endereço que você acessou não existe ou foi alterado. Volte para a página inicial ou fale com a
            nossa equipe.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BrandButton href="/" variant="gold" size="default">
              Voltar ao início
            </BrandButton>
            <BrandButton href={homeSectionHref(CONTACT_SECTION_HREF)} variant="ghost-dark" size="default">
              Agendar Reunião
            </BrandButton>
          </div>
          <p className="mt-8 type-caption text-libertad-text-muted">
            Procurando conteúdo? Veja o{" "}
            {/* O blog é feito pelo Worker (não pelo Next): link comum, sem navegação do Next. */}
            <a href="/blog" className="font-medium text-libertad-green-mid hover:text-libertad-gold">
              blog da Libertad Capital
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
