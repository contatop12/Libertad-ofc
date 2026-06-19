import { CheckCircle2 } from "lucide-react";

import { BrandButton } from "@/components/ui/brand-button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { EQI_FEATURES, EQI_TIERS } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/utils";

export function PlataformaEQI() {
  return (
    <Section id="eqi" tone="muted">
      <SectionReveal>
        <SectionHeader
          title={
            <>
              Uma plataforma completa
              <br />
              para cada estratégia patrimonial
            </>
          }
          subtitle="Acesso a mais de 1.000 oportunidades de investimento nacionais e internacionais, com a solidez do BTG Pactual como custodiante."
        />
      </SectionReveal>

      <div className="mt-[var(--section-gap)] grid gap-6 lg:grid-cols-3">
        {EQI_TIERS.map((tier, index) => (
          <SectionReveal key={tier.title} delay={index * 0.1}>
            <div
              className={`flex h-full flex-col rounded-[var(--radius-lg)] bg-white p-8 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)] ${
                tier.featured
                  ? "border-2 border-libertad-gold shadow-[var(--shadow-gold)]"
                  : "border border-[var(--color-border-subtle)]"
              }`}
            >
              <h3 className="font-heading text-[length:var(--text-display-md)] font-semibold text-libertad-text-dark">
                {tier.title}
              </h3>
              <p className="mt-2 text-[length:var(--text-body-sm)] text-libertad-text-medium">{tier.subtitle}</p>
              <p className="font-heading mt-4 mb-8 text-[length:var(--text-display-md)] font-semibold text-libertad-gold">
                {tier.value}
              </p>
              <BrandButton
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                variant={tier.featured ? "gold" : "gold-outline"}
                size="default"
                fullWidth
                className="mt-auto"
              >
                Saiba mais
              </BrandButton>
            </div>
          </SectionReveal>
        ))}
      </div>

      <div className="gold-divider my-10" />

      <div className="flex flex-wrap items-center justify-center gap-6">
        {EQI_FEATURES.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-[length:var(--text-body-sm)] text-libertad-text-medium">
            <CheckCircle2 className="size-4 text-libertad-gold" aria-hidden />
            {feature}
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-[length:var(--text-body-sm)] leading-relaxed text-libertad-text-muted">
        A EQI Investimentos é uma das maiores casas de assessoria independentes do Brasil, com o BTG Pactual
        — maior banco de investimentos da América Latina — como parceiro estratégico e custodiante.
      </p>
    </Section>
  );
}
