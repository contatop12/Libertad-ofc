"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TESTIMONIALS } from "@/lib/constants";
import { brandButtonVariants } from "@/components/ui/brand-button";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Depoimentos() {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else setVisibleCount(1);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const maxIndex = TESTIMONIALS.length - visibleCount;

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = () => {
    setCurrent((p) => (p <= 0 ? maxIndex : p - 1));
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const visible = TESTIMONIALS.slice(current, current + visibleCount);
  const padded =
    visible.length < visibleCount
      ? [...visible, ...TESTIMONIALS.slice(0, visibleCount - visible.length)]
      : visible;

  return (
    <Section id="depoimentos" tone="muted">
      <SectionReveal>
        <SectionHeader
          title="O que dizem nossos clientes"
          subtitle="Relacionamentos construídos sobre confiança, estratégia e resultados."
        />
      </SectionReveal>

      <div className="relative mt-[var(--section-gap)]">
        <div className="grid gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {padded.map((testimonial) => (
              <motion.div
                key={`${testimonial.name}-${current}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-white p-5 sm:p-6"
              >
                <Quote className="size-8 text-libertad-gold/25 sm:size-9" aria-hidden />
                <p className="type-caption mt-[var(--stack-sm)] flex-1 text-libertad-text-medium">
                  {testimonial.text}
                </p>
                <div className="mt-[var(--stack-md)] flex items-center gap-3 border-t border-libertad-gold/12 pt-[var(--stack-md)]">
                  <div className="flex size-10 items-center justify-center rounded-full bg-libertad-green font-heading text-xs font-semibold text-white">
                    {getInitials(testimonial.name)}
                  </div>
                  <span className="font-medium text-libertad-text-dark">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Depoimento anterior"
            className={cn(
              brandButtonVariants({ variant: "ghost-dark", size: "sm" }),
              "size-11 rounded-full p-0",
            )}
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Navegação de depoimentos">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`Ir para slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  i === current ? "bg-libertad-gold" : "bg-libertad-green/15",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Próximo depoimento"
            className={cn(
              brandButtonVariants({ variant: "ghost-dark", size: "sm" }),
              "size-11 rounded-full p-0",
            )}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}
