"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrapper de card, com comportamento por dispositivo:
 * - Desktop (mouse): parallax vertical sutil.
 * - Tablet: o card ENTRA deslizando da esquerda e SAI pra direita, ligado ao
 *   scroll (nesse tamanho performa bem).
 * - Celular: NENHUM efeito ligado ao scroll (mantém o scroll leve); a entrada
 *   leve dos cards fica por conta do AnimatedItem.
 *
 * Em todos, quando o card chega ao centro da tela recebe data-focus="true".
 */
export default function ParallaxItem({
  children,
  className,
  speed = 24,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const x = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [-72, 0, 0, 72]);
  const slideOpacity = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], [0, 1, 1, 0]);

  const [mode, setMode] = useState<"none" | "desktop" | "tablet" | "phone">("none");
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          el.dataset.focus = e.isIntersecting ? "true" : "false";
        }
      },
      // banda central de ~14% da viewport
      { rootMargin: "-43% 0px -43% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = reduce
    ? undefined
    : mode === "desktop"
      ? { y }
      : mode === "tablet"
        ? { x, opacity: slideOpacity }
        : undefined;

  return (
    <div ref={ref} data-focus="false" className={`group/focus ${className ?? ""}`}>
      <motion.div style={style} className="h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
