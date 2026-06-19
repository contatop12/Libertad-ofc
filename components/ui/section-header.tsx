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
        "max-w-[var(--content-max-wide)]",
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
          "type-title text-balance",
          isDark ? "text-white" : "text-libertad-text-dark",
          eyebrow ? "mt-[var(--stack-sm)]" : undefined,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "type-subtitle mt-[var(--stack-md)] text-balance sm:mt-[var(--stack-lg)]",
            isDark ? "text-white/72" : "text-libertad-text-medium",
          )}
        >
          {subtitle}
        </p>
      )}
      {note && (
        <p
          className={cn(
            "type-caption mt-[var(--stack-sm)] text-balance",
            isDark ? "text-white/55" : "text-libertad-text-muted",
          )}
        >
          {note}
        </p>
      )}
    </header>
  );
}
