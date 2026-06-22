"use client";

import Image from "next/image";

import { BrandButton } from "@/components/ui/brand-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { RAFAELA_CREDENTIALS, RAFAELA_SITE_URL } from "@/lib/constants";

export function HistoriaRafaela() {
  return (
    <Section id="sobre-rafaela" tone="light">
      <div className="grid items-center gap-[var(--stack-xl)] lg:grid-cols-2 lg:gap-16">
        <SectionReveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)] lg:max-w-none">
            <Image
              src="/images/rafaela-alves.jpg"
              alt="Rafaela Alves — Libertad Capital"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-libertad-green-deep/35 to-transparent" />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <Eyebrow>Por trás da Libertad</Eyebrow>
          <h2 className="type-title-lg mt-[var(--stack-sm)] text-libertad-text-dark text-balance">
            A história que deu origem à Libertad Capital
          </h2>

          <div className="mt-[var(--stack-lg)] flex flex-col gap-[var(--stack-md)] type-body text-libertad-text-medium">
            <p>A Libertad nasceu da convicção de que patrimônio não deve ser tratado como número.</p>
            <p>
              <a
                href={RAFAELA_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-libertad-green-mid underline-offset-2 transition-colors hover:text-libertad-gold hover:underline"
              >
                Rafaela Alves
              </a>{" "}
              construiu sua trajetória passando por instituições de prestígio, acumulando mais de R$ 500
              milhões gerenciados ao longo da carreira e atendendo investidores em todo o Brasil com soluções
              para o mercado local e internacional.
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

          <div className="mt-[var(--stack-lg)] flex flex-wrap gap-2 sm:gap-3">
            {RAFAELA_CREDENTIALS.map((cred) => (
              <span
                key={cred}
                className="rounded-[var(--radius-pill)] border border-libertad-gold/50 px-3 py-1 text-[length:var(--text-caption)] font-medium text-libertad-gold sm:px-4 sm:py-1.5"
              >
                {cred}
              </span>
            ))}
          </div>

          <BrandButton
            variant="gold"
            size="default"
            fullWidth
            className="mt-[var(--stack-lg)] sm:w-auto"
            href={RAFAELA_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conheça minha trajetória completa
          </BrandButton>
        </SectionReveal>
      </div>
    </Section>
  );
}
