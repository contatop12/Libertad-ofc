"use client";

import { FaWhatsapp } from "@/lib/brand-icons";
import { CONTACT_SECTION_HREF } from "@/lib/constants";
import { scrollToContactForm } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <div className="group fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <span className="pointer-events-none absolute -top-11 right-0 whitespace-nowrap rounded-[var(--radius-md)] border border-white/10 bg-libertad-green-deep/95 px-3 py-2 text-[length:var(--text-caption)] font-medium text-white opacity-0 shadow-[var(--shadow-lg)] backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
        Ir para o formulário
      </span>
      <a
        href={CONTACT_SECTION_HREF}
        onClick={(event) => {
          event.preventDefault();
          scrollToContactForm();
        }}
        aria-label="Ir para o formulário de contato"
        className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgb(37_211_102/0.4)] ring-2 ring-libertad-gold/25 ring-offset-2 ring-offset-transparent transition-[transform,box-shadow,ring-color] duration-300 hover:scale-105 hover:shadow-[0_6px_24px_rgb(37_211_102/0.5)] hover:ring-libertad-gold/45 active:scale-[0.98] sm:size-14 sm:ring-offset-libertad-green motion-safe:animate-[pulse-soft_3s_ease-in-out_infinite] hover:motion-safe:animate-none"
      >
        <FaWhatsapp className="size-8" aria-hidden />
      </a>
      <span className="sr-only">Ir para o formulário de contato</span>
    </div>
  );
}
