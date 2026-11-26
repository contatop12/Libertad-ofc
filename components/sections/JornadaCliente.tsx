"use client";

import { m, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { JOURNEY_STEPS } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

const ULTIMA_ETAPA = JOURNEY_STEPS.length - 1;

type EtapaProps = {
  index: number;
  title: string;
  text: string;
  icon: (typeof JOURNEY_STEPS)[number]["icon"];
  progresso: MotionValue<number>;
  visivel: boolean;
  reduzirMovimento: boolean;
};

/**
 * Uma etapa da jornada. Ela "acende" (brilho dourado e leve aumento) quando a linha a alcança, e desenha o trecho de
 * linha até a próxima etapa: vertical no celular, horizontal no desktop. Com "reduzir movimento", tudo já vem pronto.
 */
function Etapa({ index, title, text, icon, progresso, visivel, reduzirMovimento }: EtapaProps) {
  const Icon = getIcon(icon);
  const inicio = index / ULTIMA_ETAPA;
  const fim = (index + 1) / ULTIMA_ETAPA;
  const trecho = useTransform(progresso, [inicio, fim], reduzirMovimento ? [1, 1] : [0, 1]);
  const acesa = useTransform(progresso, [inicio - 0.06, inicio], reduzirMovimento ? [1, 1] : [0, 1]);
  const escala = useTransform(acesa, [0, 1], [1, 1.06]);

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={visivel ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      // Celular: linha do tempo (selo à esquerda, texto ao lado, linha entre os selos). Desktop: etapas lado a lado.
      className="relative grid grid-cols-[auto_1fr] items-start gap-x-4 lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:items-center lg:text-center"
    >
      {index < ULTIMA_ETAPA ? (
        <span
          aria-hidden
          className="pointer-events-none absolute left-[1.875rem] top-[2.375rem] -bottom-[var(--stack-xl)] w-px bg-libertad-gold/20 lg:left-1/2 lg:top-4 lg:bottom-auto lg:h-px lg:w-[calc(100%+1.5rem)]"
        >
          <m.span
            data-journey-line
            className="absolute inset-0 origin-top bg-libertad-gold [transform:scaleY(var(--trecho))] lg:origin-left lg:[transform:scaleX(var(--trecho))]"
            style={{ "--trecho": trecho } as React.CSSProperties}
          />
        </span>
      ) : null}

      <m.div style={{ scale: escala }} className="relative z-10 row-span-2 inline-flex min-w-[3.75rem] items-center justify-center gap-2 rounded-full bg-libertad-gold px-3.5 py-2">
        <m.span
          aria-hidden
          style={{ opacity: acesa }}
          className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_0_4px_rgb(201_168_76/0.22),0_6px_18px_rgb(201_168_76/0.45)]"
        />
        <span className="font-heading text-sm font-semibold leading-none text-libertad-text-dark">{index + 1}</span>
        <Icon className="size-4 shrink-0 text-libertad-text-dark" strokeWidth={1.75} aria-hidden />
      </m.div>
      <h3 className="font-heading pt-0.5 text-[length:var(--text-display-md)] font-semibold text-libertad-text-dark lg:mt-[var(--stack-sm)] lg:pt-0">
        {title}
      </h3>
      <p className="type-caption col-start-2 mt-[var(--stack-xs)] max-w-xs text-libertad-text-medium">{text}</p>
    </m.div>
  );
}

export function JornadaCliente() {
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { once: true, margin: "-80px" });
  const reduzirMovimento = useReducedMotion() ?? false;
  // A linha se desenha enquanto a jornada atravessa a tela: começa com o topo a 75% da altura, termina com o fim a 55%.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });

  return (
    <Section tone="light">
      <SectionReveal>
        <SectionHeader title="Sua jornada de investimentos com a Libertad" />
      </SectionReveal>

      <div ref={ref} className="mt-[var(--section-gap)]">
        <div className="flex flex-col gap-[var(--stack-xl)] lg:flex-row lg:justify-between lg:gap-6">
          {JOURNEY_STEPS.map((step, index) => (
            <Etapa
              key={step.title}
              index={index}
              title={step.title}
              text={step.text}
              icon={step.icon}
              progresso={scrollYProgress}
              visivel={visivel}
              reduzirMovimento={reduzirMovimento}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
