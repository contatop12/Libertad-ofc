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
          title="A diferença que você vai sentir desde o primeiro contato"
        />
      </SectionReveal>

      <div ref={ref} className="mt-[var(--section-gap)] grid gap-5 lg:grid-cols-2 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="card-surface border border-white/8 bg-libertad-green-mid/35"
        >
          <div className="mb-[var(--stack-md)] flex items-center gap-3">
            <X className="size-5 shrink-0 text-red-400/90" aria-hidden />
            <h3 className="font-heading text-[length:var(--text-display-md)] font-semibold text-white">
              Atendimento tradicional
            </h3>
          </div>
          <ul className="flex flex-col gap-[var(--stack-sm)]">
            {DIFFERENTIALS.traditional.map((item) => (
              <li key={item} className="flex items-start gap-3 type-caption text-white/72">
                <ThumbsDown className="mt-0.5 size-4 shrink-0 text-red-400/75" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="card-surface border border-libertad-gold/20 bg-libertad-green-mid/35"
        >
          <div className="mb-[var(--stack-md)] flex items-center gap-3">
            <Check className="size-5 shrink-0 text-libertad-gold" aria-hidden />
            <h3 className="font-heading text-[length:var(--text-display-md)] font-semibold text-white">
              Experiência Libertad
            </h3>
          </div>
          <ul className="flex flex-col gap-[var(--stack-sm)]">
            {DIFFERENTIALS.libertad.map((item) => (
              <li key={item} className="flex items-start gap-3 type-caption text-white/72">
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
