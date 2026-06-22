"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import { BrandButton } from "@/components/ui/brand-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HERO_IMAGE, CONTACT_SECTION_HREF, HISTORIA_SECTION_HREF, SITE } from "@/lib/constants";
import { scrollToContactForm, scrollToSection } from "@/lib/utils";

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden pt-16"
    >
      <Image
        src={HERO_IMAGE}
        alt="Skyline urbano premium"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-libertad-green/82" />
      <div className="absolute inset-0 bg-gradient-to-t from-libertad-green-deep/70 via-transparent to-libertad-green/35" />

      <div className="relative z-10 mx-auto max-w-[var(--content-max-wide)] px-[var(--container-px)] py-16 sm:py-24 lg:py-28">
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0)} className="text-center">
          <Eyebrow variant="pill" tone="dark">
            {SITE.credential}
          </Eyebrow>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.12)}
          className="font-heading mt-[var(--stack-lg)] text-center text-[length:var(--text-display-hero)] font-semibold leading-[var(--leading-tight)] tracking-tight text-white text-balance"
        >
          Grandes patrimônios exigem decisões à altura.
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.24)}
          className="type-subtitle mx-auto mt-[var(--stack-md)] max-w-[var(--content-max)] text-center text-white/78 text-balance sm:mt-[var(--stack-lg)]"
        >
          A Libertad Capital, escritório credenciado à EQI Investimentos, atende investidores que buscam
          estratégia, proteção patrimonial e acesso às melhores oportunidades do mercado.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.36)}
          className="mt-[var(--stack-xl)] flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4"
        >
          <BrandButton
            href={CONTACT_SECTION_HREF}
            onClick={(event) => {
              event.preventDefault();
              scrollToContactForm();
            }}
            variant="gold"
            size="lg"
            fullWidth
            className="sm:w-auto sm:min-w-[16rem]"
          >
            Agendar Reunião Estratégica
          </BrandButton>
          <BrandButton
            href={HISTORIA_SECTION_HREF}
            variant="ghost-white"
            size="lg"
            fullWidth
            className="sm:w-auto sm:min-w-[16rem]"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(HISTORIA_SECTION_HREF);
            }}
          >
            Conheça Nossa História
          </BrandButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <ChevronDown className="size-7 animate-bounce text-white/40" />
      </motion.div>
    </section>
  );
}
