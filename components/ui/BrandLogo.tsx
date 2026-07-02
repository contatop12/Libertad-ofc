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
    className: "h-11 w-[154px] sm:h-12 sm:w-[168px] lg:h-14 lg:w-[196px]",
    sizes: "(max-width: 640px) 154px, (max-width: 1024px) 168px, 196px",
  },
  footer: {
    className: "h-12 w-[168px] sm:h-14 sm:w-[196px] lg:h-16 lg:w-[224px]",
    sizes: "(max-width: 640px) 168px, (max-width: 1024px) 196px, 224px",
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
