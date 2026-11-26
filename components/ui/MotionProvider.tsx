"use client";

import { LazyMotion } from "framer-motion";

// Framer Motion enxuto: os componentes usam `m.*` e os recursos de animação chegam depois, sem pesar no carregamento.
// `strict` acusa qualquer `motion.*` que escape (ele traria a biblioteca inteira de volta).
const importFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);
// Até 3 tentativas, com espera crescente, se o pacote falhar (rede instável): sem ele, o conteúdo que entra animado
// ficaria invisível. A espera deixa terminar os pedidos da tentativa anterior, que o webpack reaproveitaria ainda falhando.
const loadFeatures = async () => {
  for (let tentativa = 1; ; tentativa++) {
    try {
      return await importFeatures();
    } catch (erro) {
      if (tentativa === 3) throw erro;
      await new Promise((resolve) => setTimeout(resolve, 800 * tentativa));
    }
  }
};

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
