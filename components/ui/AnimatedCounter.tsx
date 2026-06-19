"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  isText?: boolean;
  className?: string;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  isText = false,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (isInView && !isText) {
      motionValue.set(value);
    }
  }, [isInView, isText, motionValue, value]);

  useEffect(() => {
    if (isText) return;

    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString("pt-BR")}${suffix}`;
      }
    });

    return unsubscribe;
  }, [isText, prefix, springValue, suffix]);

  if (isText) {
    return (
      <span ref={ref} className={cn("font-heading text-[length:var(--text-stat)] font-semibold text-libertad-gold", className)}>
        {suffix}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={cn("font-heading text-[length:var(--text-stat)] font-semibold text-libertad-gold", className)}
    >
      {prefix}0{suffix}
    </span>
  );
}
