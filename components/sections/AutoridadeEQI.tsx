import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { EQI_STATS } from "@/lib/constants";

export function AutoridadeEQI() {
  return (
    <Section id="eqi-stats" tone="muted">
      <SectionReveal>
        <SectionHeader
          title="A força da estrutura por trás da Libertad"
          subtitle="Atendimento próximo e personalizado com acesso a uma das maiores plataformas independentes de investimentos do Brasil."
          note="Por meio da estrutura da EQI Investimentos, nossos clientes contam com acesso a uma plataforma que já supera R$ 50 bilhões sob custódia e atende mais de 80 mil investidores em todo o Brasil."
        />
      </SectionReveal>

      <div className="mt-[var(--section-gap)] grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {EQI_STATS.map((stat, index) => (
          <SectionReveal key={stat.label} delay={index * 0.08}>
            <div className="card-surface border border-[var(--color-border-subtle)] bg-white text-center">
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                isText={stat.isText}
              />
              <p className="type-caption mt-[var(--stack-sm)] text-libertad-text-medium">{stat.label}</p>
            </div>
          </SectionReveal>
        ))}
      </div>

      <p className="type-caption mt-[var(--stack-lg)] text-center text-libertad-text-muted">
        *Dados referentes à estrutura da EQI Investimentos, plataforma pela qual a Libertad Capital opera
        como escritório credenciado.
      </p>
    </Section>
  );
}
