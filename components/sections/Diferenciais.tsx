"use client";

import { motion, useInView } from "framer-motion";
import { Check, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { useRef } from "react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { DIFFERENTIALS } from "@/lib/constants";

export function Diferenciais() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section tone="dark">
      <SectionReveal>
        <SectionHeader
          tone="dark"
          title={
            <>
              A diferença que você
              <br />
              vai sentir desde o primeiro contato
            </>
          }
        />
      </SectionReveal>

      <div ref={ref} className="mt-[var(--section-gap)] grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[var(--radius-lg)] bg-libertad-green-mid/40 p-8 ring-1 ring-white/5"
        >
          <div className="mb-6 flex items-center gap-3">
            <X className="size-5 text-red-400" aria-hidden />
            <h3 className="font-heading text-[length:var(--text-display-md)] font-semibold text-white">
              Atendimento tradicional
            </h3>
          </div>
          <ul className="flex flex-col gap-4">
            {DIFFERENTIALS.traditional.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[length:var(--text-body-sm)] text-white/75">
                <ThumbsDown className="mt-0.5 size-4 shrink-0 text-red-400/80" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[var(--radius-lg)] border border-libertad-gold/25 bg-libertad-green-mid/40 p-8 shadow-[var(--shadow-gold)]"
        >
          <div className="mb-6 flex items-center gap-3">
            <Check className="size-5 text-libertad-gold" aria-hidden />
            <h3 className="font-heading text-[length:var(--text-display-md)] font-semibold text-white">
              Experiência Libertad
            </h3>
          </div>
          <ul className="flex flex-col gap-4">
            {DIFFERENTIALS.libertad.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[length:var(--text-body-sm)] text-white/75">
                <ThumbsUp className="mt-0.5 size-4 shrink-0 text-libertad-gold" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
