"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

import { BrandButton } from "@/components/ui/brand-button";
import { FormField, formControlClass } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { OBJETIVO_OPTIONS, PATRIMONIO_OPTIONS, SITE } from "@/lib/constants";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { buildWhatsAppLink, buildWhatsAppMessage, cn, formatWhatsApp } from "@/lib/utils";

export function Formulario() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const patrimonio = watch("patrimonio");
  const objetivo = watch("objetivo");

  const onSubmit = (data: ContactFormData) => {
    const message = buildWhatsAppMessage(data);
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <Section id="contato" tone="dark">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <SectionReveal>
          <SectionHeader
            tone="dark"
            align="left"
            title={
              <>
                Agende uma
                <br />
                reunião estratégica
              </>
            }
            subtitle="Cada relacionamento começa com uma conversa. Queremos entender seus objetivos, seu momento de vida e como podemos construir juntos a melhor estratégia para o seu patrimônio."
          />
          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-1 text-[length:var(--text-body-md)]">
              <span className="text-[length:var(--text-caption)] font-medium uppercase tracking-[0.12em] text-white/45">
                WhatsApp
              </span>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-libertad-gold transition-colors hover:text-libertad-gold-light"
              >
                {SITE.whatsappDisplay}
              </a>
            </div>
            <div className="flex flex-col gap-1 text-[length:var(--text-body-md)]">
              <span className="text-[length:var(--text-caption)] font-medium uppercase tracking-[0.12em] text-white/45">
                Localização
              </span>
              <span className="text-white/75">
                {SITE.location} — {SITE.coverage}
              </span>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] p-px shadow-[var(--shadow-lg)]">
            <div
              className="absolute inset-0 rounded-[var(--radius-xl)] bg-gradient-to-br from-libertad-gold/30 via-white/5 to-libertad-gold/10"
              aria-hidden
            />
            <div
              className="relative rounded-[calc(var(--radius-xl)-1px)] bg-[image:var(--form-card-bg)] p-8 ring-1 ring-[var(--form-card-ring)] sm:p-10"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-libertad-gold/50 to-transparent sm:inset-x-10" aria-hidden />

              <div className="mb-8 flex items-start justify-between gap-4">
                <h3 className="font-heading max-w-sm text-[length:var(--text-display-md)] font-semibold leading-snug tracking-tight text-white">
                  Converse com um especialista patrimonial
                </h3>
                <ShieldCheck className="mt-1 size-5 shrink-0 text-libertad-gold/60" aria-hidden />
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
                <FormField id="nome" label="Nome completo" error={errors.nome?.message}>
                  <Input
                    id="nome"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    className={formControlClass}
                    aria-invalid={!!errors.nome}
                    {...register("nome")}
                  />
                </FormField>

                <FormField id="email" label="E-mail" error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Seu melhor e-mail"
                    autoComplete="email"
                    className={formControlClass}
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                </FormField>

                <FormField id="whatsapp" label="WhatsApp (com DDD)" error={errors.whatsapp?.message}>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    autoComplete="tel"
                    className={formControlClass}
                    aria-invalid={!!errors.whatsapp}
                    {...register("whatsapp", {
                      onChange: (e) => {
                        e.target.value = formatWhatsApp(e.target.value);
                      },
                    })}
                  />
                </FormField>

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField label="Patrimônio aproximado" error={errors.patrimonio?.message}>
                    <Select
                      value={patrimonio}
                      onValueChange={(v) =>
                        setValue("patrimonio", v as ContactFormData["patrimonio"], { shouldValidate: true })
                      }
                    >
                      <SelectTrigger
                        className={cn(formControlClass, "data-[placeholder]:text-white/35")}
                        aria-invalid={!!errors.patrimonio}
                      >
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {PATRIMONIO_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>

                  <FormField label="Objetivo principal" error={errors.objetivo?.message}>
                    <Select
                      value={objetivo}
                      onValueChange={(v) =>
                        setValue("objetivo", v as ContactFormData["objetivo"], { shouldValidate: true })
                      }
                    >
                      <SelectTrigger
                        className={cn(formControlClass, "data-[placeholder]:text-white/35")}
                        aria-invalid={!!errors.objetivo}
                      >
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {OBJETIVO_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                </div>

                <BrandButton
                  type="submit"
                  variant="gold"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  className="group mt-2 gap-2"
                >
                  Solicitar reunião estratégica
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </BrandButton>

                <p className="text-center text-[length:var(--text-caption)] leading-relaxed text-white/40">
                  Seus dados são tratados com total confidencialidade.
                  <br className="hidden sm:block" /> Não compartilhamos informações com terceiros.
                </p>
              </form>
            </div>
          </div>
        </SectionReveal>
      </div>
    </Section>
  );
}
