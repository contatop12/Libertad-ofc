"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { FOOTER_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CONSENT_STORAGE_KEY = "libertad-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[60] border-t border-white/10",
        "bg-gradient-to-r from-libertad-green-deep to-libertad-green shadow-[var(--shadow-lg)]",
      )}
    >
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-4 px-[var(--container-px)] py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-5">
        <div className="max-w-3xl">
          <p
            id="cookie-consent-title"
            className="text-[length:var(--text-body-sm)] font-semibold text-white"
          >
            Utilizamos cookies
          </p>
          <p
            id="cookie-consent-description"
            className="mt-1 text-[length:var(--text-caption)] leading-relaxed text-white/75"
          >
            Usamos cookies essenciais para garantir o funcionamento do site e armazenar suas preferências
            de navegação. Ao continuar, você concorda com nossa{" "}
            <Link
              href={FOOTER_LINKS.privacy}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-libertad-gold underline-offset-2 hover:underline"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={acceptCookies}
            className={cn(
              "inline-flex min-h-[var(--btn-height-sm)] items-center justify-center rounded-[var(--btn-radius)]",
              "bg-[image:var(--btn-gradient-gold)] px-5 text-[length:var(--text-body-sm)] font-semibold text-libertad-text-dark",
              "shadow-[var(--btn-shadow-gold)] transition-[filter,transform] duration-200",
              "hover:brightness-[1.02] active:scale-[0.98]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-libertad-gold",
            )}
          >
            Aceitar cookies
          </button>
        </div>
      </div>
    </div>
  );
}
