"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AnimatedItem({
  children,
  className,
  as = "div",
  delay = 0,
  variant = "soft",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "h2" | "p" | "span" | "figure";
  delay?: number;
  /** soft = blur + rise · card = blur + rise + leve escala */
  variant?: "soft" | "card";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];
  const hidden = reduceMotion
    ? { opacity: 0 }
    :
    variant === "card"
      ? { opacity: 0, y: 36, scale: 0.975 }
      : { opacity: 0, y: 30 };
  const show =
    variant === "card"
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 1, y: 0 };

  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={show}
      viewport={{ once: true, amount: 0.14, margin: "0px 0px -6% 0px" }}
      transition={{ duration: reduceMotion ? 0.01 : 0.68, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
