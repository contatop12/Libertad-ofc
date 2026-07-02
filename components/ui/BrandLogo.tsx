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
    className: "h-9 w-[126px] sm:h-10 sm:w-[140px] lg:h-11 lg:w-[154px]",
    sizes: "(max-width: 640px) 126px, (max-width: 1024px) 140px, 154px",
  },
  footer: {
    className: "h-10 w-[140px] sm:h-11 sm:w-[154px] lg:h-12 lg:w-[168px]",
    sizes: "(max-width: 640px) 140px, (max-width: 1024px) 154px, 168px",
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
