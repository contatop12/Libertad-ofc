"use client";

import { FeatureCard } from "@/components/ui/feature-card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SOLUTIONS_CARDS } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

export function SolucoesPatrimoniais() {
  return (
    <Section id="solucoes" tone="muted">
      <SectionReveal>
        <SectionHeader
          title="Como ajudamos nossos clientes"
          subtitle="Não vendemos produtos. Construímos estratégias patrimoniais personalizadas para cada momento da sua vida."
        />
      </SectionReveal>

      <div className="mt-[var(--section-gap)] grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {SOLUTIONS_CARDS.map((card, index) => {
          const Icon = getIcon(card.icon);
          return (
            <SectionReveal key={card.title} delay={index * 0.06}>
              <FeatureCard icon={Icon} title={card.title} description={card.text} tone="light" />
            </SectionReveal>
          );
        })}
      </div>
    </Section>
  );
}
