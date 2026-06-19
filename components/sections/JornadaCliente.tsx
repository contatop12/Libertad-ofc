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
        <SectionHeader
          title={
            <>
              Sua jornada
              <br />
              patrimonial com a Libertad
            </>
          }
        />
      </SectionReveal>

      <div ref={ref} className="relative mt-[var(--section-gap)]">
        <div
          className="absolute left-8 top-0 hidden h-full w-px bg-libertad-gold/25 lg:left-0 lg:top-1/2 lg:block lg:h-px lg:w-full"
          aria-hidden
        />

        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {JOURNEY_STEPS.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-1 flex-col items-start lg:items-center lg:text-center"
              >
                <div className="flex size-11 items-center justify-center rounded-full bg-libertad-gold font-heading text-base font-semibold text-libertad-text-dark shadow-[var(--shadow-gold)]">
                  {index + 1}
                </div>
                <Icon className="mt-4 size-6 text-libertad-green lg:mx-auto" strokeWidth={1.5} aria-hidden />
                <h3 className="font-heading mt-3 text-[length:var(--text-display-md)] font-semibold text-libertad-text-dark">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-[length:var(--text-body-sm)] leading-relaxed text-libertad-text-medium">
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
