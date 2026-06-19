import { cn } from "@/lib/utils";

type FormFieldProps = {
  id?: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

export function FormField({ id, label, error, children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="text-[length:var(--text-caption)] font-medium uppercase tracking-[0.12em] text-white/55"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[length:var(--text-body-sm)] text-red-300/90" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const formControlClass = cn(
  "min-h-11 w-full rounded-[var(--radius-md)] px-3.5 sm:min-h-12 sm:px-4",
  "border border-[var(--form-glass-border)] bg-[var(--form-glass-bg)] text-white backdrop-blur-sm",
  "text-[length:var(--text-body-md)] placeholder:text-white/35",
  "transition-[border-color,background-color,box-shadow] duration-200",
  "hover:border-white/18 hover:bg-[var(--form-glass-bg-hover)]",
  "focus-visible:border-[var(--form-glass-border-focus)] focus-visible:bg-[var(--form-glass-bg-hover)]",
  "focus-visible:ring-2 focus-visible:ring-libertad-gold/20 focus-visible:outline-none",
);
