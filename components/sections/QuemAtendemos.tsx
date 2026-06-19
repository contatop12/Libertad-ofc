import { FeatureCard } from "@/components/ui/feature-card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { AUDIENCE_CARDS } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

export function QuemAtendemos() {
  return (
    <Section tone="dark">
      <SectionReveal>
        <SectionHeader
          tone="dark"
          title="Patrimônio exige estratégia personalizada"
          subtitle="Atendemos investidores que buscam mais do que rentabilidade — buscam um parceiro estratégico para construir, proteger e perpetuar seu patrimônio."
        />
      </SectionReveal>

      <div className="mt-[var(--section-gap)] grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {AUDIENCE_CARDS.map((card, index) => {
          const Icon = getIcon(card.icon);
          return (
            <SectionReveal key={card.title} delay={index * 0.06}>
              <FeatureCard icon={Icon} title={card.title} description={card.text} tone="dark" />
            </SectionReveal>
          );
        })}
      </div>
    </Section>
  );
}
