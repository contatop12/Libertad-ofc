"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "header" | "footer";
  className?: string;
};

export function BrandLogo({ variant = "header", className }: BrandLogoProps) {
  return (
    <div
      className={cn(
        "relative shrink-0",
        variant === "header" ? "h-10 w-[200px] sm:h-11 sm:w-[220px]" : "h-12 w-[240px]",
        className,
      )}
    >
      <Image
        src="/images/logo-libertad-eqi.png"
        alt="Libertad Capital — Credenciada à EQI Investimentos"
        fill
        className="object-contain object-left"
        priority={variant === "header"}
        sizes="(max-width: 640px) 200px, 240px"
      />
    </div>
  );
}
