"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { BrandButton } from "@/components/ui/brand-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { buildWhatsAppLink, cn, scrollToSection } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-[var(--duration-normal)]",
        scrolled
          ? "border-b border-white/10 bg-libertad-green shadow-[var(--shadow-md)]"
          : "border-b border-transparent bg-libertad-green/85 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[var(--container-max)] items-center justify-between gap-3 px-[var(--container-px)] sm:h-16 sm:gap-4">
        <Link href="#inicio" onClick={() => scrollToSection("#inicio")} aria-label="Ir para o início">
          <BrandLogo variant="header" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="text-[length:var(--text-body-sm)] font-medium text-white/75 transition-colors hover:text-libertad-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-libertad-gold"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <BrandButton
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="gold-outline"
            size="default"
            className="hidden sm:inline-flex"
          >
            Agendar Reunião
          </BrandButton>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "text-white hover:bg-white/10 lg:hidden",
              )}
              aria-label="Abrir menu"
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="border-libertad-green-mid bg-libertad-green text-white">
              <SheetHeader>
                <SheetTitle className="font-heading text-white">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Navegação mobile">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="rounded-[var(--radius-md)] px-2 py-3 text-left text-[length:var(--text-body-md)] font-medium text-white/88 transition-colors hover:bg-white/5 hover:text-libertad-gold"
                  >
                    {link.label}
                  </button>
                ))}
                <BrandButton
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold-outline"
                  size="default"
                  fullWidth
                  className="mt-4"
                >
                  Agendar Reunião
                </BrandButton>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <span className="sr-only">{SITE.credential}</span>
    </header>
  );
}
