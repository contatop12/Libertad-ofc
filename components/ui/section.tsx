import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
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
  // Seções verdes ganham a luz que segue o cursor (só com mouse); `isolate` a mantém atrás do conteúdo.
  const comLuz = tone === "dark" || tone === "gradient";

  return (
    <section
      id={id}
      className={cn("py-[var(--section-py)]", comLuz && "relative isolate", toneStyles[tone], className)}
    >
      {comLuz ? <CursorSpotlight /> : null}
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
