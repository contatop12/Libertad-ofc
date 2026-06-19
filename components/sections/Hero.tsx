"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import { BrandButton } from "@/components/ui/brand-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HERO_IMAGE, SITE } from "@/lib/constants";
import { buildWhatsAppLink, scrollToSection } from "@/lib/utils";

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Skyline urbano premium"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-libertad-green/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-libertad-green-deep/60 via-transparent to-libertad-green/40" />

      <div className="relative z-10 mx-auto max-w-4xl px-[var(--container-px)] py-32 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0)}>
          <Eyebrow variant="pill" tone="dark">
            {SITE.credential}
          </Eyebrow>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.15)}
          className="font-heading mt-8 text-[length:var(--text-display-hero)] font-semibold leading-[1.08] tracking-tight text-white"
        >
          Grandes patrimônios
          <br />
          exigem decisões
          <br />à altura.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.3)}
          className="mx-auto mt-6 max-w-xl text-[length:var(--text-body-lg)] leading-relaxed text-white/80"
        >
          A Libertad Capital, escritório credenciado à EQI Investimentos, atende investidores que buscam
          estratégia, proteção patrimonial e acesso às melhores oportunidades do mercado.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.45)}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <BrandButton
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="gold"
            className="w-full sm:w-auto"
          >
            Agendar Reunião Estratégica
          </BrandButton>
          <BrandButton
            variant="ghost-white"
            className="w-full sm:w-auto"
            onClick={() => scrollToSection("#sobre-rafaela")}
          >
            Conheça Nossa História
          </BrandButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <ChevronDown className="size-8 animate-bounce text-white/50" />
      </motion.div>
    </section>
  );
}
