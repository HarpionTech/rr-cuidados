"use client";

import { motion } from "framer-motion";
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
  if (mode === "mask") {
    const Outer = motion[as as "div"];
    return (
      <Outer
        className={`block overflow-hidden pb-[0.12em] ${className}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: {} }}
      >
        <motion.span
          className="block"
          variants={{
            hidden: { y: "115%" },
            show: { y: 0, transition: { ...reveal, delay } },
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
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...reveal, delay }}
    >
      {children}
    </MotionTag>
  );
}
