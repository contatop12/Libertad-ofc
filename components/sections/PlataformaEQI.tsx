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
          title="Uma plataforma completa para cada estratégia patrimonial"
          subtitle="Acesso a mais de 1.000 oportunidades de investimento nacionais e internacionais, com a solidez do BTG Pactual como custodiante."
        />
      </SectionReveal>

      <div className="mt-[var(--section-gap)] grid gap-4 sm:gap-5 lg:grid-cols-3">
        {EQI_TIERS.map((tier, index) => (
          <SectionReveal key={tier.title} delay={index * 0.08}>
            <div
              className={`card-surface flex h-full flex-col bg-white ${
                tier.featured
                  ? "border-2 border-libertad-gold/80"
                  : "border border-[var(--color-border-subtle)]"
              }`}
            >
              <h3 className="font-heading text-[length:var(--text-display-md)] font-semibold text-libertad-text-dark">
                {tier.title}
              </h3>
              <p className="type-caption mt-[var(--stack-xs)] text-libertad-text-medium">{tier.subtitle}</p>
              <p className="font-heading mt-[var(--stack-md)] mb-[var(--stack-lg)] text-[length:var(--text-display-md)] font-semibold text-libertad-gold">
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

      <div className="gold-divider my-[var(--stack-xl)]" />

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-3">
        {EQI_FEATURES.map((feature) => (
          <div key={feature} className="flex items-center gap-2 type-caption text-libertad-text-medium">
            <CheckCircle2 className="size-4 shrink-0 text-libertad-gold" aria-hidden />
            {feature}
          </div>
        ))}
      </div>

      <p className="type-caption mx-auto mt-[var(--stack-xl)] max-w-[var(--content-max-wide)] text-center text-libertad-text-muted">
        A EQI Investimentos é uma das maiores casas de assessoria independentes do Brasil, com o BTG Pactual
        — maior banco de investimentos da América Latina — como parceiro estratégico e custodiante.
      </p>
    </Section>
  );
}
