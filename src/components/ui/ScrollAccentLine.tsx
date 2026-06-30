"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ScrollAccentLine({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`absolute inset-y-0 left-0 w-1 origin-bottom rounded-full ${className}`}
      initial={{ scaleY: reduceMotion ? 1 : 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.85,
        delay: reduceMotion ? 0 : 0.18 + delay,
        ease: EASE,
      }}
    />
  );
}
