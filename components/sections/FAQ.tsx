import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  return (
    <Section id="faq" tone="light" containerClassName="max-w-[var(--content-max-wide)]">
      <SectionReveal>
        <SectionHeader title="Perguntas frequentes" align="left" />
      </SectionReveal>

      <SectionReveal delay={0.08} className="mt-[var(--stack-xl)]">
        <Accordion className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="border-b border-libertad-gray-light py-1 data-[state=open]:border-l-2 data-[state=open]:border-l-libertad-gold data-[state=open]:pl-3 sm:data-[state=open]:pl-4"
            >
              <AccordionTrigger className="py-4 font-heading text-left text-[length:var(--text-body-md)] font-semibold leading-[var(--leading-snug)] text-libertad-text-dark hover:text-libertad-gold hover:no-underline sm:text-[length:var(--text-body-lg)] [&[data-state=open]]:text-libertad-gold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="type-body pb-4 text-libertad-text-medium">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionReveal>
    </Section>
  );
}
