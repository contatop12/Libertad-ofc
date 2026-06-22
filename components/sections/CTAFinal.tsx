import { BrandButton } from "@/components/ui/brand-button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { CONTACT_SECTION_HREF } from "@/lib/constants";

export function CTAFinal() {
  return (
    <Section tone="gradient" containerClassName="max-w-[var(--content-max-wide)] text-center">
      <SectionReveal>
        <SectionHeader
          tone="dark"
          title="Seu patrimônio merece uma estratégia à altura da sua trajetória."
          subtitle="Dê o primeiro passo. Uma conversa pode mudar a forma como você cuida do que construiu."
        />
        <BrandButton
          href={CONTACT_SECTION_HREF}
          variant="gold"
          size="lg"
          fullWidth
          className="mt-[var(--stack-xl)] sm:w-auto sm:min-w-[18rem]"
        >
          Agendar reunião estratégica
        </BrandButton>
      </SectionReveal>
    </Section>
  );
}
