"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { JOURNEY_STEPS } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

export function JornadaCliente() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section tone="light">
      <SectionReveal>
        <SectionHeader title="Sua jornada patrimonial com a Libertad" />
      </SectionReveal>

      <div ref={ref} className="mt-[var(--section-gap)]">
        <div className="flex flex-col gap-[var(--stack-xl)] lg:flex-row lg:justify-between lg:gap-6">
          {JOURNEY_STEPS.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="flex flex-1 flex-col items-start lg:items-center lg:text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-libertad-gold px-3.5 py-2">
                  <span className="font-heading text-sm font-semibold leading-none text-libertad-text-dark">
                    {index + 1}
                  </span>
                  <Icon
                    className="size-4 shrink-0 text-libertad-text-dark"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </div>
                <h3 className="font-heading mt-[var(--stack-sm)] text-[length:var(--text-display-md)] font-semibold text-libertad-text-dark">
                  {step.title}
                </h3>
                <p className="type-caption mt-[var(--stack-xs)] max-w-xs text-libertad-text-medium">
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
