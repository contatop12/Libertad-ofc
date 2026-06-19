import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type FeatureCardTone = "light" | "dark";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: FeatureCardTone;
  className?: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "light",
  className,
}: FeatureCardProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "group flex h-full flex-col rounded-[var(--radius-lg)] p-5 transition-[border-color,box-shadow] duration-[var(--duration-normal)] sm:p-6 lg:p-7",
        isDark
          ? "border border-white/8 bg-libertad-green-mid/50 hover:border-libertad-gold/30"
          : "border border-[var(--color-border-subtle)] bg-white hover:border-libertad-gold/35 sm:hover:shadow-[var(--shadow-sm)]",
        className,
      )}
    >
      <Icon
        className={cn("size-6 sm:size-7", isDark ? "text-libertad-gold" : "text-libertad-green")}
        strokeWidth={1.5}
        aria-hidden
      />
      <h3
        className={cn(
          "font-heading mt-[var(--stack-sm)] text-[length:var(--text-display-md)] font-semibold tracking-tight",
          isDark ? "text-white" : "text-libertad-text-dark",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "type-caption mt-[var(--stack-xs)] sm:mt-[var(--stack-sm)]",
          isDark ? "text-white/72" : "text-libertad-text-medium",
        )}
      >
        {description}
      </p>
    </div>
  );
}
