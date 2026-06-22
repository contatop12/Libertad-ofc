"use client";

import { Dialog } from "@base-ui/react/dialog";
import { CheckCircle2, ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";

import { BrandButton } from "@/components/ui/brand-button";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { EQI_FEATURES, EQI_TIERS } from "@/lib/constants";
import { buildWhatsAppLink, cn } from "@/lib/utils";

type EqiTier = (typeof EQI_TIERS)[number];

function TierDetailList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="mt-[var(--stack-lg)]">
      <h4 className="font-heading text-[length:var(--text-body-md)] font-semibold text-libertad-text-dark">
        {title}
      </h4>
      <ul className="mt-[var(--stack-sm)] flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 type-caption text-libertad-text-medium">
            <CheckCircle2
              className="mt-0.5 size-4 shrink-0 text-libertad-green-mid"
              strokeWidth={2}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TierModal({
  tier,
  open,
  onOpenChange,
}: {
  tier: EqiTier | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/45 transition-opacity duration-200",
            "data-ending-style:opacity-0 data-starting-style:opacity-0",
            "supports-backdrop-filter:backdrop-blur-xs",
          )}
        />
        <Dialog.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-50 flex max-h-[min(90vh,44rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2",
            "flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-white shadow-[var(--shadow-lg)]",
            "transition duration-200 ease-out",
            "data-ending-style:scale-95 data-ending-style:opacity-0",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
          )}
        >
          <div className="overflow-y-auto">
            {tier ? (
              <>
                <div className="relative border-b border-[var(--color-border-subtle)] px-6 py-6 pr-14 text-left">
                  <Dialog.Close
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="absolute top-3 right-3 text-libertad-text-medium hover:text-libertad-text-dark"
                      />
                    }
                  >
                    <XIcon aria-hidden />
                    <span className="sr-only">Fechar</span>
                  </Dialog.Close>
                  <Dialog.Title className="font-heading text-[length:var(--text-display-lg)] font-bold text-libertad-text-dark">
                    {tier.title}
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-[length:var(--text-body-sm)] text-libertad-text-medium">
                    {tier.subtitle} {tier.value}
                  </Dialog.Description>
                  <p className="mt-3 text-[length:var(--text-body-sm)] leading-relaxed text-libertad-text-medium">
                    {tier.description}
                  </p>
                </div>

                <div className="px-6 py-2 pb-8">
                  <TierDetailList title="Atendimento" items={tier.services} />
                  <TierDetailList title="Produtos e serviços" items={tier.products} />

                  <BrandButton
                    href={buildWhatsAppLink(tier.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="gold"
                    size="default"
                    fullWidth
                    className="mt-[var(--stack-xl)]"
                    onClick={() => onOpenChange(false)}
                  >
                    {tier.ctaLabel}
                  </BrandButton>
                </div>
              </>
            ) : null}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function PlataformaEQI() {
  const [activeTierId, setActiveTierId] = useState<EqiTier["id"] | null>(null);
  const activeTier = EQI_TIERS.find((tier) => tier.id === activeTierId) ?? null;

  return (
    <Section id="eqi" tone="muted" containerClassName="max-w-[1300px]">
      <SectionReveal>
        <SectionHeader
          title={
            <>
              <span className="text-libertad-green">Uma plataforma completa</span>{" "}
              <span className="text-libertad-text-dark">para cada estratégia patrimonial</span>
            </>
          }
          subtitle="Acesso a mais de 1.000 oportunidades de investimento nacionais e internacionais, com a solidez do BTG Pactual como custodiante."
        />
      </SectionReveal>

      <div className="mt-[var(--section-gap)] grid gap-4 sm:gap-5 lg:grid-cols-3">
        {EQI_TIERS.map((tier, index) => (
          <SectionReveal key={tier.id} delay={index * 0.08}>
            <article
              className={cn(
                "flex h-full min-h-[13.5rem] flex-col rounded-[var(--radius-lg)]",
                "border border-[var(--color-border-subtle)] bg-white p-6 sm:p-7",
                "shadow-[var(--shadow-sm)] transition-[box-shadow,border-color] duration-200",
                "hover:border-libertad-green/15 hover:shadow-[var(--shadow-md)]",
              )}
            >
              <h3 className="font-heading text-[length:var(--text-display-md)] font-bold text-libertad-text-dark">
                {tier.title}
              </h3>
              <p className="mt-2 text-[length:var(--text-body-sm)] text-libertad-text-muted">
                {tier.subtitle}
              </p>
              <p className="font-heading mt-1 text-[length:var(--text-display-md)] font-semibold text-libertad-text-dark">
                {tier.value}
              </p>

              <button
                type="button"
                onClick={() => setActiveTierId(tier.id)}
                className={cn(
                  "mt-auto inline-flex items-center gap-0.5 pt-6",
                  "text-[length:var(--text-body-sm)] font-medium text-libertad-green-mid",
                  "transition-colors hover:text-libertad-green",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-libertad-gold",
                )}
              >
                Ver detalhes
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </article>
          </SectionReveal>
        ))}
      </div>

      <TierModal
        tier={activeTier}
        open={activeTierId !== null}
        onOpenChange={(open) => {
          if (!open) setActiveTierId(null);
        }}
      />

      <div className="gold-divider my-[var(--stack-xl)]" />

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-3">
        {EQI_FEATURES.map((feature) => (
          <div key={feature} className="flex items-center gap-2 type-caption text-libertad-text-medium">
            <CheckCircle2 className="size-4 shrink-0 text-libertad-gold" aria-hidden />
            {feature}
          </div>
        ))}
      </div>

      <p className="type-caption mx-auto mt-[var(--stack-xl)] max-w-[var(--content-max-wide)] text-center text-libertad-text-muted">
        A EQI Investimentos é uma das maiores casas de assessoria independentes do Brasil, com o BTG Pactual
        — maior banco de investimentos da América Latina — como parceiro estratégico e custodiante.
      </p>
    </Section>
  );
}
