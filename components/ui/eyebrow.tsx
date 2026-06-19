import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  tone?: "light" | "dark" | "gold";
  variant?: "text" | "pill";
  className?: string;
};

export function Eyebrow({
  children,
  tone = "light",
  variant = "text",
  className,
}: EyebrowProps) {
  if (variant === "pill") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-[var(--radius-pill)] border px-4 py-1.5",
          "text-[length:var(--text-caption)] font-medium tracking-wide",
          tone === "dark"
            ? "border-libertad-gold/60 text-libertad-gold"
            : "border-libertad-gold text-libertad-gold",
          className,
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "block text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em]",
        tone === "dark" ? "text-libertad-gold" : "text-libertad-gold-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
