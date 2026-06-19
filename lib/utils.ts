import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { OBJETIVO_OPTIONS, PATRIMONIO_OPTIONS, SITE } from "@/lib/constants";
import type { ContactFormData } from "@/lib/schemas/contact";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function buildWhatsAppMessage(data: ContactFormData): string {
  const patrimonio =
    PATRIMONIO_OPTIONS.find((o) => o.value === data.patrimonio)?.label ??
    data.patrimonio;
  const objetivo =
    OBJETIVO_OPTIONS.find((o) => o.value === data.objetivo)?.label ??
    data.objetivo;

  return `Olá Rafaela! Me chamo ${data.nome}, tenho patrimônio ${patrimonio} e meu objetivo é ${objetivo}. Gostaria de agendar uma reunião estratégica.`;
}

export function buildWhatsAppLink(message?: string): string {
  const text = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${SITE.whatsapp}${text ? `?text=${text}` : ""}`;
}

export function scrollToSection(href: string): void {
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
