import { cn } from "@/lib/utils";

type SectionTone = "light" | "muted" | "dark" | "black" | "gradient";

const toneStyles: Record<SectionTone, string> = {
  light: "bg-white text-libertad-text-dark",
  muted: "bg-libertad-off-white text-libertad-text-dark",
  dark: "bg-libertad-green text-white",
  black: "bg-libertad-black text-white",
  gradient: "bg-gradient-to-br from-libertad-green to-libertad-green-mid text-white",
};

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
};

export function Section({
  id,
  tone = "light",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-[var(--section-py)]", toneStyles[tone], className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
