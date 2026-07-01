"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
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
  /** soft = blur + rise · card = reveal do card */
  variant?: "soft" | "card";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  const [mode, setMode] = useState<"desktop" | "tablet" | "phone">("desktop");
  useEffect(() => {
    const deskQ = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const phoneQ = window.matchMedia("(max-width: 767px)");
    const update = () =>
      setMode(deskQ.matches ? "desktop" : phoneQ.matches ? "phone" : "tablet");
    update();
    deskQ.addEventListener("change", update);
    phoneQ.addEventListener("change", update);
    return () => {
      deskQ.removeEventListener("change", update);
      phoneQ.removeEventListener("change", update);
    };
  }, []);

  // No tablet o slide do card é feito pelo ParallaxItem — aqui fica estático.
  if (variant === "card" && mode === "tablet") {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  const hidden = reduceMotion
    ? { opacity: 0 }
    : variant === "card"
      ? mode === "phone"
        ? { opacity: 0, y: 20 } // celular: entrada leve, sem parallax
        : { opacity: 0, y: 36, scale: 0.975 }
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
