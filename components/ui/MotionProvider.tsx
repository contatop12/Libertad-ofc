"use client";

import { LazyMotion } from "framer-motion";

// Framer Motion enxuto: os componentes usam `m.*` e os recursos de animação chegam depois, sem pesar no carregamento.
// `strict` acusa qualquer `motion.*` que escape (ele traria a biblioteca inteira de volta).
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
