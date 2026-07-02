"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

const LOGO_PATH = "/images/logo-libertad-capital-eqi.png";
const LOGO_ALT = "Libertad Capital — Escritório credenciado à EQI Investimentos";

type BrandLogoProps = {
  variant?: "header" | "footer";
  className?: string;
};

const logoSizes = {
  header: {
    className: "h-16 w-[224px] sm:h-[4.5rem] sm:w-[252px] lg:h-[4.75rem] lg:w-[266px]",
    sizes: "(max-width: 640px) 224px, (max-width: 1024px) 252px, 266px",
  },
  footer: {
    className: "h-16 w-[224px] sm:h-[4.5rem] sm:w-[252px] lg:h-20 lg:w-[280px]",
    sizes: "(max-width: 640px) 224px, (max-width: 1024px) 252px, 280px",
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
