import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { OBJETIVO_OPTIONS, PATRIMONIO_OPTIONS, SITE, CONTACT_SECTION_HREF, FORM_WEBHOOK_URL, DDI_OPTIONS } from "@/lib/constants";
import type { ContactFormData } from "@/lib/schemas/contact";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBrazilPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function formatInternationalPhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 15);
}

export function formatPhoneByDdi(value: string, ddi: string): string {
  if (ddi === "55") {
    return formatBrazilPhone(value);
  }
  return formatInternationalPhone(value);
}

export function formatPhoneE164(ddi: string, phone: string): string {
  return `${ddi}${phone.replace(/\D/g, "")}`;
}

export function formatPhoneDisplay(ddi: string, phone: string): string {
  const ddiOption = DDI_OPTIONS.find((option) => option.value === ddi);
  const prefix = ddiOption?.label ?? `+${ddi}`;
  return `${prefix} ${phone}`;
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

export function scrollToContactForm(): void {
  scrollToSection(CONTACT_SECTION_HREF);
}

export async function submitContactToWebhook(data: ContactFormData): Promise<void> {
  const patrimonioLabel =
    PATRIMONIO_OPTIONS.find((option) => option.value === data.patrimonio)?.label ??
    data.patrimonio;
  const objetivoLabel =
    OBJETIVO_OPTIONS.find((option) => option.value === data.objetivo)?.label ?? data.objetivo;

  const response = await fetch(FORM_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: data.nome,
      email: data.email,
      ddi: data.ddi,
      whatsapp: data.whatsapp,
      whatsapp_e164: formatPhoneE164(data.ddi, data.whatsapp),
      whatsapp_display: formatPhoneDisplay(data.ddi, data.whatsapp),
      patrimonio: data.patrimonio,
      patrimonio_label: patrimonioLabel,
      objetivo: data.objetivo,
      objetivo_label: objetivoLabel,
      site: SITE.url,
      submitted_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Falha ao enviar formulário para o webhook.");
  }
}
