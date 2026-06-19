import { cn } from "@/lib/utils";

import { Eyebrow } from "@/components/ui/eyebrow";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  note?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  note,
  align = "center",
  tone = "light",
  className,
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={isDark ? "dark" : "light"} className={align === "center" ? "mx-auto" : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "font-heading text-[length:var(--text-display-xl)] font-semibold leading-[1.12] tracking-tight",
          isDark ? "text-white" : "text-libertad-text-dark",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-6 text-[length:var(--text-body-lg)] leading-relaxed",
            isDark ? "text-white/75" : "text-libertad-text-medium",
          )}
        >
          {subtitle}
        </p>
      )}
      {note && (
        <p
          className={cn(
            "mt-4 text-[length:var(--text-body-sm)] leading-relaxed",
            isDark ? "text-white/60" : "text-libertad-text-medium/80",
          )}
        >
          {note}
        </p>
      )}
    </header>
  );
}
