"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrapper de card:
 * - Celular/tablet (touch): o card ENTRA deslizando da esquerda e SAI deslizando
 *   pra direita, ligado ao scroll. Só mexe no eixo X (translate) — a opacidade
 *   nunca é tocada, então o card jamais some.
 * - Desktop (mouse): parallax vertical sutil.
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
  const x = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [-44, 0, 0, 44]);

  const [mode, setMode] = useState<"none" | "desktop" | "touch">("none");
  useEffect(() => {
    const desk = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setMode(desk.matches ? "desktop" : "touch");
    update();
    desk.addEventListener("change", update);
    return () => desk.removeEventListener("change", update);
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
      : mode === "touch"
        ? { x }
        : undefined;

  return (
    <div ref={ref} data-focus="false" className={`group/focus ${className ?? ""}`}>
      <motion.div style={style} className="h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
