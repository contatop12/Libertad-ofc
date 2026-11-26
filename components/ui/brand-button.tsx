import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const brandButtonVariants = cva(
  [
    "group/btn relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden",
    "font-semibold tracking-normal sm:tracking-wide whitespace-nowrap",
    "rounded-[var(--btn-radius)] border",
    "transition-[transform,translate,scale,box-shadow,background,border-color,color,filter] duration-300 ease-[var(--ease-out-expo)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        gold: [
          "border-libertad-gold-light/25 bg-[image:var(--btn-gradient-gold)] text-libertad-text-dark",
          "shadow-[var(--btn-shadow-gold)] sm:shadow-[var(--btn-shadow-gold)]",
          "hover:bg-[image:var(--btn-gradient-gold-hover)] hover:shadow-[var(--btn-shadow-gold-hover)] hover:brightness-[1.02] hover:-translate-y-px",
          "focus-visible:outline-libertad-gold",
        ].join(" "),
        "gold-outline": [
          "border-libertad-gold/70 bg-transparent text-libertad-gold",
          "hover:border-libertad-gold hover:text-libertad-gold-light hover:shadow-[var(--btn-shadow-outline-hover)]",
          "focus-visible:outline-libertad-gold",
        ].join(" "),
        "ghost-white": [
          "border-white/35 bg-white/5 text-white backdrop-blur-sm",
          "hover:border-white/55",
          "focus-visible:outline-white/50",
        ].join(" "),
        "ghost-dark": [
          "border-libertad-green/35 bg-libertad-off-white text-libertad-green",
          "hover:border-libertad-green hover:text-white hover:shadow-[var(--shadow-md)]",
          "focus-visible:outline-libertad-green",
        ].join(" "),
        light: [
          "border-white/20 bg-white text-libertad-text-dark shadow-[var(--shadow-sm)]",
          "hover:border-libertad-gold/30 hover:bg-libertad-off-white hover:shadow-[var(--shadow-md)]",
          "focus-visible:outline-libertad-gold",
        ].join(" "),
      },
      size: {
        sm: "min-h-[var(--btn-height-sm)] px-5 text-[length:var(--text-body-sm)]",
        default: "min-h-[var(--btn-height-md)] px-6 text-[length:var(--text-body-sm)]",
        lg: "min-h-[var(--btn-height-lg)] px-8 text-[length:var(--text-body-md)]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
      fullWidth: false,
    },
  },
);

type BrandButtonVariantProps = VariantProps<typeof brandButtonVariants>;

type BrandButtonBaseProps = BrandButtonVariantProps & {
  className?: string;
  children: React.ReactNode;
};

type BrandButtonAsLink = BrandButtonBaseProps &
  React.ComponentProps<"a"> & { href: string; type?: never };

type BrandButtonAsButton = BrandButtonBaseProps &
  React.ComponentProps<"button"> & { href?: never };

type BrandButtonProps = BrandButtonAsLink | BrandButtonAsButton;

// Camadas decorativas por variante. O preenchimento usa a mesma cor de hover que cada variante tinha antes.
const FILL_BY_VARIANT = {
  "gold-outline": "bg-libertad-gold/10",
  "ghost-white": "bg-white/12",
  "ghost-dark": "bg-libertad-green",
} as const;

type BrandButtonVariant = NonNullable<BrandButtonVariantProps["variant"]>;

/** Brilho que atravessa o dourado e preenchimento que desliza nos de contorno. Com "reduzir movimento", a regra global
 *  zera as transições: o brilho não aparece e o preenchimento entra direto, como uma troca de cor. */
function ButtonEffects({ variant }: { variant: BrandButtonVariant }) {
  if (variant === "gold") {
    return (
      <span data-btn-shine aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent transition-none group-hover/btn:translate-x-[400%] group-hover/btn:transition-[translate] group-hover/btn:duration-700 group-focus-visible/btn:translate-x-[400%] group-focus-visible/btn:transition-[translate] group-focus-visible/btn:duration-700" />
      </span>
    );
  }
  if (variant in FILL_BY_VARIANT) {
    return (
      <span
        data-btn-fill
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 rounded-[inherit] transition-[scale] duration-500 ease-[var(--ease-out-expo)] group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100",
          FILL_BY_VARIANT[variant as keyof typeof FILL_BY_VARIANT],
        )}
      />
    );
  }
  return null;
}

export function BrandButton({
  variant = "gold",
  size = "default",
  fullWidth = false,
  className,
  children,
  ...props
}: BrandButtonProps) {
  const classes = cn(brandButtonVariants({ variant, size, fullWidth }), className);
  // O conteúdo fica acima das camadas e herda o espaçamento (gap) que o botão recebeu.
  const content = (
    <>
      <ButtonEffects variant={variant ?? "gold"} />
      <span className="relative inline-flex items-center justify-center gap-[inherit]">{children}</span>
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props as React.ComponentProps<"button">;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

export { brandButtonVariants };
