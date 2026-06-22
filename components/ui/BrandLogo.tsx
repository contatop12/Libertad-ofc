"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

const LOGO_PATH = "/images/logo-libertad.svg";
const LOGO_ALT = "Libertad Capital — Credenciada à EQI Investimentos";

type BrandLogoProps = {
  variant?: "header" | "footer";
  className?: string;
};

const logoSizes = {
  header: {
    className: "h-8 w-[168px] sm:h-9 sm:w-[190px] lg:h-10 lg:w-[220px]",
    sizes: "(max-width: 640px) 168px, (max-width: 1024px) 190px, 220px",
  },
  footer: {
    className: "h-9 w-[190px] sm:h-10 sm:w-[220px] lg:h-11 lg:w-[250px]",
    sizes: "(max-width: 640px) 190px, (max-width: 1024px) 220px, 250px",
  },
} as const;

export function BrandLogo({ variant = "header", className }: BrandLogoProps) {
  const size = logoSizes[variant];

  return (
    <div className={cn("relative shrink-0", size.className, className)}>
      <Image
        src={LOGO_PATH}
        alt={LOGO_ALT}
        fill
        className="object-contain object-left"
        priority={variant === "header"}
        sizes={size.sizes}
      />
    </div>
  );
}
