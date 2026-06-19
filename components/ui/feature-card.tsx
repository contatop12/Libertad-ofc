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
        "group flex h-full flex-col rounded-[var(--radius-lg)] p-8 transition-[border-color,box-shadow,transform] duration-[var(--duration-normal)]",
        isDark
          ? "border border-transparent bg-libertad-green-mid hover:border-libertad-gold/40"
          : "border border-[var(--color-border-subtle)] bg-white shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:border-libertad-gold/50 hover:shadow-[var(--shadow-md)]",
        className,
      )}
    >
      <Icon
        className={cn("size-8", isDark ? "text-libertad-gold" : "text-libertad-green")}
        strokeWidth={1.5}
        aria-hidden
      />
      <h3
        className={cn(
          "font-heading mt-4 text-[length:var(--text-display-md)] font-semibold tracking-tight",
          isDark ? "text-white" : "text-libertad-text-dark",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-3 text-[length:var(--text-body-sm)] leading-relaxed",
          isDark ? "text-white/80" : "text-libertad-text-medium",
        )}
      >
        {description}
      </p>
    </div>
  );
}
