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

      <div ref={ref} className="relative mt-[var(--section-gap)]">
        <div
          className="absolute left-5 top-0 hidden h-full w-px bg-libertad-gold/20 lg:left-0 lg:top-1/2 lg:block lg:h-px lg:w-full"
          aria-hidden
        />

        <div className="flex flex-col gap-[var(--stack-xl)] lg:flex-row lg:justify-between lg:gap-6">
          {JOURNEY_STEPS.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="relative flex flex-1 flex-col items-start pl-12 lg:items-center lg:pl-0 lg:text-center"
              >
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-libertad-gold font-heading text-sm font-semibold text-libertad-text-dark lg:relative lg:mb-1">
                  {index + 1}
                </div>
                <Icon className="size-5 text-libertad-green lg:mx-auto" strokeWidth={1.5} aria-hidden />
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
