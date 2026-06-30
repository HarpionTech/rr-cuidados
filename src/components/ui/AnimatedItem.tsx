"use client";

import { motion } from "framer-motion";
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
  const MotionTag = motion[as];
  const hidden =
    variant === "card"
      ? { opacity: 0, y: 56, scale: 0.96, filter: "blur(10px)" }
      : { opacity: 0, y: 48, filter: "blur(8px)" };
  const show =
    variant === "card"
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={show}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
