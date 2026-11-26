"use client";

import { useEffect, useRef } from "react";

import { useFinePointer } from "@/lib/use-fine-pointer";
import { cn } from "@/lib/utils";

/**
 * Luz dourada suave que acompanha o cursor dentro do elemento pai (seções verdes).
 * Só existe com mouse/trackpad e sem "reduzir movimento"; no toque não é nem montada.
 * O pai precisa de `relative isolate` (a camada fica atrás do conteúdo, acima do fundo).
 */
export function CursorSpotlight({ className }: { className?: string }) {
  const ligado = useFinePointer();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const luz = ref.current;
    const area = luz?.parentElement;
    if (!ligado || !luz || !area) return;
    let quadro = 0;
    const mover = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const caixa = area.getBoundingClientRect();
        luz.style.setProperty("--x", `${event.clientX - caixa.left}px`);
        luz.style.setProperty("--y", `${event.clientY - caixa.top}px`);
        luz.style.opacity = "1";
      });
    };
    const apagar = () => {
      cancelAnimationFrame(quadro);
      luz.style.opacity = "0";
    };
    area.addEventListener("pointermove", mover, { passive: true });
    area.addEventListener("pointerleave", apagar);
    return () => {
      cancelAnimationFrame(quadro);
      area.removeEventListener("pointermove", mover);
      area.removeEventListener("pointerleave", apagar);
    };
  }, [ligado]);

  if (!ligado) return null;

  return (
    <span
      ref={ref}
      data-spotlight
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500",
        "bg-[radial-gradient(600px_circle_at_var(--x)_var(--y),rgb(201_168_76/0.10),transparent_60%)]",
        className,
      )}
    />
  );
}
