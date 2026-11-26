"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { useFinePointer } from "@/lib/use-fine-pointer";
import { cn } from "@/lib/utils";

// Inclinação máxima (graus) em cada eixo: sutil, só para dar profundidade.
const INCLINACAO_MAXIMA = 4;
const MOLA = { stiffness: 180, damping: 18 };

/**
 * Cartão que inclina de leve na direção do cursor e ganha uma luz dourada no ponto do mouse.
 * Com toque ou "reduzir movimento" é um <div> comum, sem nenhum efeito.
 */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ligado = useFinePointer();
  const luzRef = useRef<HTMLSpanElement>(null);
  const rotateX = useSpring(useMotionValue(0), MOLA);
  const rotateY = useSpring(useMotionValue(0), MOLA);

  if (!ligado) return <div className={className}>{children}</div>;

  const mover = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const caixa = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - caixa.left) / caixa.width - 0.5;
    const y = (event.clientY - caixa.top) / caixa.height - 0.5;
    rotateY.set(x * 2 * INCLINACAO_MAXIMA);
    rotateX.set(-y * 2 * INCLINACAO_MAXIMA);
    const luz = luzRef.current;
    if (luz) {
      luz.style.setProperty("--x", `${event.clientX - caixa.left}px`);
      luz.style.setProperty("--y", `${event.clientY - caixa.top}px`);
      luz.style.opacity = "1";
    }
  };

  const soltar = () => {
    rotateX.set(0);
    rotateY.set(0);
    if (luzRef.current) luzRef.current.style.opacity = "0";
  };

  return (
    <m.div
      data-tilt
      onPointerMove={mover}
      onPointerLeave={soltar}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("relative", className)}
    >
      {children}
      <span
        ref={luzRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] bg-[radial-gradient(320px_circle_at_var(--x)_var(--y),rgb(201_168_76/0.12),transparent_65%)] opacity-0 transition-opacity duration-300"
      />
    </m.div>
  );
}
