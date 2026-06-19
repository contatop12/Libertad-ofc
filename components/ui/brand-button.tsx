import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const brandButtonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2",
    "font-semibold tracking-normal sm:tracking-wide whitespace-nowrap",
    "rounded-[var(--btn-radius)] border",
    "transition-[transform,box-shadow,background,border-color,color,filter] duration-300 ease-[var(--ease-out-expo)]",
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
          "hover:bg-[image:var(--btn-gradient-gold-hover)] hover:shadow-[var(--btn-shadow-gold-hover)] hover:brightness-[1.02]",
          "focus-visible:outline-libertad-gold",
        ].join(" "),
        "gold-outline": [
          "border-libertad-gold/70 bg-transparent text-libertad-gold",
          "hover:border-libertad-gold hover:bg-libertad-gold/10 hover:text-libertad-gold-light hover:shadow-[var(--btn-shadow-outline-hover)]",
          "focus-visible:outline-libertad-gold",
        ].join(" "),
        "ghost-white": [
          "border-white/35 bg-white/5 text-white backdrop-blur-sm",
          "hover:border-white/55 hover:bg-white/12",
          "focus-visible:outline-white/50",
        ].join(" "),
        "ghost-dark": [
          "border-libertad-green/35 bg-libertad-off-white text-libertad-green",
          "hover:border-libertad-green hover:bg-libertad-green hover:text-white hover:shadow-[var(--shadow-md)]",
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

export function BrandButton({
  variant = "gold",
  size = "default",
  fullWidth = false,
  className,
  children,
  ...props
}: BrandButtonProps) {
  const classes = cn(brandButtonVariants({ variant, size, fullWidth }), className);

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props as React.ComponentProps<"button">;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

export { brandButtonVariants };
