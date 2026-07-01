"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrapper de card:
 * - Desktop (mouse): parallax vertical — desloca levemente o card no eixo Y
 *   conforme a página rola, dando profundidade.
 * - Touch (celular/tablet): NÃO aplica transform ligado ao scroll (isso deixava
 *   os cards invisíveis/pulando). A entrada dos cards fica por conta do
 *   AnimatedItem (slide da esquerda via whileInView), que é confiável.
 *
 * Em ambos, quando o card chega ao centro da tela recebe data-focus="true";
 * os filhos reagem via `group-data-[focus=true]/focus:` (só em < lg).
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

  // Parallax só no desktop com mouse (scroll suave). No touch fica estático.
  const [parallax, setParallax] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setParallax(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
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

  return (
    <div ref={ref} data-focus="false" className={`group/focus ${className ?? ""}`}>
      <motion.div
        style={parallax && !reduce ? { y } : undefined}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
