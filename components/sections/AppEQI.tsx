import { CheckCircle2, Smartphone } from "lucide-react";

import { BrandButton } from "@/components/ui/brand-button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { APP_FEATURES } from "@/lib/constants";

export function AppEQI() {
  return (
    <Section tone="dark">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <SectionReveal>
          <SectionHeader
            tone="dark"
            align="left"
            title={
              <>
                Sua estratégia patrimonial
                <br />
                na palma da mão
              </>
            }
            subtitle="Acompanhe seus investimentos com transparência, autonomia e tecnologia através do aplicativo da EQI Investimentos. Mais de 1.000 produtos disponíveis com segurança e praticidade."
          />

          <ul className="mt-8 flex flex-col gap-3">
            {APP_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-[length:var(--text-body-md)] text-white/80">
                <CheckCircle2 className="size-5 shrink-0 text-libertad-gold" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <BrandButton href="#" variant="light" size="default" className="flex-1 sm:flex-none">
              App Store
            </BrandButton>
            <BrandButton href="#" variant="light" size="default" className="flex-1 sm:flex-none">
              Google Play
            </BrandButton>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="mx-auto flex max-w-xs items-center justify-center rounded-[2.5rem] border-4 border-white/10 bg-libertad-green-mid p-8 shadow-[var(--shadow-lg)]">
            <div className="flex flex-col items-center gap-4 text-white/50">
              <Smartphone className="size-32 stroke-1" aria-hidden />
              <p className="text-[length:var(--text-body-sm)]">App EQI Investimentos</p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </Section>
  );
}
