"use client";

import { FaWhatsapp } from "@/lib/brand-icons";
import { SITE } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <div className="group fixed bottom-6 right-6 z-50">
      <span className="pointer-events-none absolute -top-11 right-0 whitespace-nowrap rounded-[var(--radius-md)] border border-white/10 bg-libertad-green-deep/95 px-3 py-2 text-[length:var(--text-caption)] font-medium text-white opacity-0 shadow-[var(--shadow-lg)] backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
        Fale com a Rafaela
      </span>
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale com a Rafaela no WhatsApp"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgb(37_211_102/0.45)] ring-2 ring-libertad-gold/30 ring-offset-2 ring-offset-libertad-green transition-[transform,box-shadow,ring-color] duration-300 hover:scale-105 hover:shadow-[0_6px_28px_rgb(37_211_102/0.55)] hover:ring-libertad-gold/50 active:scale-[0.98] motion-safe:animate-[pulse-soft_3s_ease-in-out_infinite] hover:motion-safe:animate-none"
      >
        <FaWhatsapp className="size-8" aria-hidden />
      </a>
      <span className="sr-only">{SITE.whatsappDisplay}</span>
    </div>
  );
}
