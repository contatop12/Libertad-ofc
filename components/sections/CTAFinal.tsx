import { BrandButton } from "@/components/ui/brand-button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { buildWhatsAppLink } from "@/lib/utils";

export function CTAFinal() {
  return (
    <Section tone="gradient" containerClassName="max-w-3xl text-center">
      <SectionReveal>
        <SectionHeader
          tone="dark"
          title={
            <>
              Seu patrimônio merece
              <br />
              uma estratégia à altura
              <br />
              da sua trajetória.
            </>
          }
          subtitle="Dê o primeiro passo. Uma conversa pode mudar a forma como você cuida do que construiu."
        />
        <BrandButton
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          variant="gold"
          size="lg"
          className="mt-10 px-10"
        >
          Agendar reunião estratégica
        </BrandButton>
      </SectionReveal>
    </Section>
  );
}
