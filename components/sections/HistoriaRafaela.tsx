"use client";

import Image from "next/image";
import { Play } from "lucide-react";

import { BrandButton } from "@/components/ui/brand-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { RAFAELA_CREDENTIALS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";

export function HistoriaRafaela() {
  return (
    <Section id="sobre-rafaela" tone="light">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionReveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]">
            <Image
              src="/images/rafaela-alves.jpg"
              alt="Rafaela Alves — Libertad Capital"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-libertad-green-deep/40 to-transparent" />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <Eyebrow>Por trás da Libertad</Eyebrow>
          <h2 className="font-heading mt-4 text-[length:var(--text-display-lg)] font-semibold leading-[1.12] tracking-tight text-libertad-text-dark">
            A história que deu
            <br />
            origem à Libertad Capital
          </h2>

          <div className="mt-8 flex flex-col gap-5 text-[length:var(--text-body-md)] leading-relaxed text-libertad-text-medium">
            <p>A Libertad nasceu da convicção de que patrimônio não deve ser tratado como número.</p>
            <p>
              Rafaela Alves construiu sua trajetória passando por instituições de prestígio como Santander
              Select e XP Investimentos, acumulando mais de R$ 500 milhões gerenciados ao longo da carreira
              e atendendo investidores em todo o Brasil com soluções para o mercado local e internacional.
            </p>
            <p>
              Depois de anos acompanhando investidores, empresários e famílias em momentos decisivos de suas
              vidas financeiras, Rafaela percebeu que os melhores resultados surgiam quando o relacionamento
              era construído sobre confiança, proximidade e estratégia — não sobre metas ou produtos.
            </p>
            <p>
              Foi dessa visão que nasceu a Libertad Capital. Um escritório onde cada cliente é tratado como
              único, cada estratégia é construída sob medida e cada decisão é tomada com o patrimônio do
              cliente como prioridade absoluta.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {RAFAELA_CREDENTIALS.map((cred) => (
              <span
                key={cred}
                className="rounded-[var(--radius-pill)] border border-libertad-gold/60 px-4 py-1.5 text-[length:var(--text-caption)] font-medium text-libertad-gold"
              >
                {cred}
              </span>
            ))}
          </div>

          <BrandButton
            variant="gold-outline"
            size="default"
            className="mt-8"
            onClick={() => scrollToSection("#faq")}
          >
            Conheça minha trajetória completa
          </BrandButton>

          <div className="mt-10 flex aspect-video items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-libertad-green/15 bg-libertad-off-white">
            <div className="flex flex-col items-center gap-3 text-libertad-text-medium">
              <div className="flex size-14 items-center justify-center rounded-full bg-libertad-green text-white shadow-[var(--shadow-md)]">
                <Play className="size-6 fill-white" aria-hidden />
              </div>
              <p className="text-[length:var(--text-body-sm)]">Em breve: vídeo institucional</p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </Section>
  );
}
