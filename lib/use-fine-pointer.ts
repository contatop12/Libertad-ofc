"use client";

import { useSyncExternalStore } from "react";

// Efeitos que seguem o cursor só fazem sentido com mouse/trackpad e com o movimento liberado pelo visitante.
const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** `true` só com ponteiro fino (mouse/trackpad) e sem "reduzir movimento"; `false` no servidor e no toque. */
export function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
