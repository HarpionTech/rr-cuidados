"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const reveal = { duration: 1, ease: EASE };

export default function RevealText({
  children,
  className = "",
  as = "div",
  mode = "mask",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  mode?: "mask" | "up";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (mode === "mask") {
    const Outer = motion[as as "div"];
    return (
      <Outer
        className={`block overflow-hidden pb-[0.12em] ${className}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -6% 0px" }}
        variants={{ hidden: {}, show: {} }}
      >
        <motion.span
          className="block"
          variants={{
            hidden: reduceMotion ? { opacity: 0 } : { y: "110%" },
            show: reduceMotion
              ? { opacity: 1, transition: { duration: 0.01 } }
              : { y: 0, transition: { ...reveal, duration: 0.78, delay } },
          }}
        >
          {children}
        </motion.span>
      </Outer>
    );
  }

  const MotionTag = motion[as as "div"];
  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -6% 0px" }}
      transition={{ ...reveal, duration: reduceMotion ? 0.01 : 0.72, delay }}
    >
      {children}
    </MotionTag>
  );
}
