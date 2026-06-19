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
    <Section id="faq" tone="light" containerClassName="max-w-3xl">
      <SectionReveal>
        <SectionHeader title="Perguntas frequentes" />
      </SectionReveal>

      <SectionReveal delay={0.1} className="mt-12">
        <Accordion className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="border-b border-libertad-gray-light data-[state=open]:border-l-2 data-[state=open]:border-l-libertad-gold data-[state=open]:pl-4"
            >
              <AccordionTrigger className="font-heading text-left text-[length:var(--text-body-lg)] font-semibold text-libertad-text-dark hover:text-libertad-gold hover:no-underline [&[data-state=open]]:text-libertad-gold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[length:var(--text-body-md)] leading-relaxed text-libertad-text-medium">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionReveal>
    </Section>
  );
}
