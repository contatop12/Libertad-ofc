import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { BrandButton } from "@/components/ui/brand-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { APP_FEATURES, APP_SHOWCASE } from "@/lib/constants";

export function AppEQI() {
  return (
    <Section tone="dark">
      <SectionReveal>
        <SectionHeader
          tone="dark"
          align="center"
          title="Sua estratégia patrimonial na palma da mão"
          subtitle="Acompanhe seus investimentos com transparência, autonomia e tecnologia através dos aplicativos da EQI Investimentos."
        />
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <ul className="mx-auto mt-[var(--stack-lg)] flex max-w-2xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
          {APP_FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 type-caption text-white/75"
            >
              <CheckCircle2 className="size-4 shrink-0 text-libertad-gold" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      </SectionReveal>

      <div className="mt-[var(--section-gap)] grid gap-5 lg:grid-cols-2 lg:gap-6">
        {APP_SHOWCASE.map((app, index) => (
          <SectionReveal key={app.title} delay={0.12 + index * 0.08}>
            <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-white/8 bg-white/[0.02]">
              <div className="relative flex items-center justify-center px-5 pb-1 pt-6 sm:px-8 sm:pt-8">
                <Image
                  src={app.image}
                  alt={app.imageAlt}
                  width={280}
                  height={560}
                  className="h-auto w-full max-w-[180px] object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.28)] sm:max-w-[210px]"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <Eyebrow tone="dark">{app.eyebrow}</Eyebrow>
                <h3 className="font-heading mt-[var(--stack-sm)] text-[length:var(--text-display-md)] font-semibold leading-[var(--leading-snug)] tracking-tight text-white text-balance">
                  {app.title}
                </h3>
                <p className="type-caption mt-[var(--stack-sm)] flex-1 text-white/68">
                  {app.description}
                </p>

                <div className="mt-[var(--stack-lg)] flex flex-col gap-2 sm:flex-row sm:gap-3">
                  <BrandButton href="#" variant="light" size="default" fullWidth className="sm:flex-1">
                    App Store
                  </BrandButton>
                  <BrandButton href="#" variant="light" size="default" fullWidth className="sm:flex-1">
                    Google Play
                  </BrandButton>
                </div>
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </Section>
  );
}
