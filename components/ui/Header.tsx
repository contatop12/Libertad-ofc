"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";

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
import { CONTACT_SECTION_HREF, NAV_LINKS, SITE } from "@/lib/constants";
import { cn, homeSectionHref, scrollToSection } from "@/lib/utils";

const HOME_SECTION_HREF = "#inicio";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  // Seção escolhida no menu mobile: só é aberta depois que o menu termina de fechar e solta a trava de rolagem.
  const pendingSection = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Na página inicial rola até a seção; nas outras páginas (Termos, Política...) abre a página inicial já na seção.
  const goToSection = (hash: string) => {
    if (isHome && scrollToSection(hash)) return;
    router.push(homeSectionHref(hash));
  };

  // Links do cabeçalho: fora da página inicial o próprio link leva para "/#secao"; nela, só rola.
  const handleSectionClick = (hash: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    event.preventDefault();
    scrollToSection(hash);
  };

  const handleMobileClick = (hash: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    pendingSection.current = hash;
    setOpen(false);
  };

  const handleMenuClosed = (isOpen: boolean) => {
    if (isOpen || !pendingSection.current) return;
    const hash = pendingSection.current;
    pendingSection.current = null;
    goToSection(hash);
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
      <div className="mx-auto flex h-[var(--header-height)] max-w-[var(--container-max)] items-center justify-between gap-3 px-[var(--container-px)] sm:gap-4">
        <Link href="/" onClick={handleSectionClick(HOME_SECTION_HREF)} aria-label="Ir para o início">
          <BrandLogo variant="header" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={homeSectionHref(link.href)}
              onClick={handleSectionClick(link.href)}
              className="text-[length:var(--text-body-sm)] font-medium text-white/75 transition-colors hover:text-libertad-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-libertad-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <BrandButton
            href={homeSectionHref(CONTACT_SECTION_HREF)}
            onClick={(event: MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              goToSection(CONTACT_SECTION_HREF);
            }}
            variant="gold-outline"
            size="default"
            className="hidden sm:inline-flex"
          >
            Agendar Reunião
          </BrandButton>

          <Sheet open={open} onOpenChange={setOpen} onOpenChangeComplete={handleMenuClosed}>
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
                  <a
                    key={link.href}
                    href={homeSectionHref(link.href)}
                    onClick={handleMobileClick(link.href)}
                    className="rounded-[var(--radius-md)] px-2 py-3 text-left text-[length:var(--text-body-md)] font-medium text-white/88 transition-colors hover:bg-white/5 hover:text-libertad-gold"
                  >
                    {link.label}
                  </a>
                ))}
                <BrandButton
                  href={homeSectionHref(CONTACT_SECTION_HREF)}
                  onClick={handleMobileClick(CONTACT_SECTION_HREF)}
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
