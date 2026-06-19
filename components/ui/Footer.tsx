import Link from "next/link";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { BrandButton } from "@/components/ui/brand-button";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "@/lib/brand-icons";
import { FOOTER_SOLUTIONS, NAV_LINKS, OFFICES, SITE } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/utils";

const socialLinkClass =
  "flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-[color,background-color,border-color] duration-200 hover:border-libertad-gold/40 hover:bg-libertad-gold/10 hover:text-libertad-gold";

export function Footer() {
  return (
    <footer className="border-t border-libertad-gold/15 bg-gradient-to-b from-libertad-green to-libertad-green-deep text-white">
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-px)] py-12 sm:py-16">
        <div className="mb-10 border-b border-white/10 pb-10 sm:mb-12 sm:pb-12">
          <BrandLogo variant="footer" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <h3 className="font-heading text-lg font-semibold">{SITE.name}</h3>
            <p className="mt-4 text-[length:var(--text-body-sm)] leading-relaxed text-white/70">
              {SITE.tagline}. {SITE.credential}.
            </p>
            <div className="mt-4 flex flex-col gap-3 text-[length:var(--text-body-sm)] text-white/70">
              {OFFICES.map((office) => (
                <div key={office.city}>
                  <p className="font-medium text-libertad-gold">{office.city}</p>
                  <p>{office.address}</p>
                </div>
              ))}
            </div>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[length:var(--text-body-sm)] text-libertad-gold transition-colors hover:text-libertad-gold-light"
            >
              <FaWhatsapp className="size-4 shrink-0" aria-hidden />
              {SITE.whatsappDisplay}
            </a>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">Navegação</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[length:var(--text-body-sm)] text-white/70 transition-colors hover:text-libertad-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">Soluções</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {FOOTER_SOLUTIONS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[length:var(--text-body-sm)] text-white/70 transition-colors hover:text-libertad-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold">Contato</h3>
            <div className="mt-4 flex flex-col gap-3 text-[length:var(--text-body-sm)] text-white/70">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-libertad-gold"
              >
                <FaWhatsapp className="size-4 shrink-0" aria-hidden />
                {SITE.whatsappDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-libertad-gold">
                {SITE.email}
              </a>
            </div>
            <BrandButton
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
              size="default"
              className="mt-6"
            >
              Agendar Reunião
            </BrandButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-[length:var(--text-caption)] text-white/50">
            <p>© 2025 Libertad Capital. Todos os direitos reservados. Escritório credenciado à EQI Investimentos.</p>
            <p className="mt-1">Rafaela Alves — Ancord | CEA | CPA-20</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#"
              className="text-[length:var(--text-caption)] text-white/50 transition-colors hover:text-libertad-gold"
            >
              Política de Privacidade
            </Link>
            <Link
              href="#"
              className="text-[length:var(--text-caption)] text-white/50 transition-colors hover:text-libertad-gold"
            >
              Termos de Uso
            </Link>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="Instagram" className={socialLinkClass}>
                <FaInstagram className="size-4" aria-hidden />
              </a>
              <a href="#" aria-label="LinkedIn" className={socialLinkClass}>
                <FaLinkedinIn className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
