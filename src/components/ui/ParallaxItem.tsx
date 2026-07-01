"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrapper de card com dois comportamentos, conforme o dispositivo:
 *
 * - Desktop (mouse): parallax vertical — desloca levemente o card no eixo Y
 *   conforme a página rola, dando profundidade.
 * - Celular/tablet (touch): entrada/saída fluida ligada ao scroll — o card
 *   entra deslizando da esquerda e, quando a seção começa a sair por cima,
 *   desliza pra direita e some. Substitui o parallax, que ficava "picado"
 *   no scroll nativo.
 *
 * Em ambos, quando o card chega ao centro da tela recebe data-focus="true";
 * os filhos reagem via `group-data-[focus=true]/focus:` (usado só em < lg,
 * pra dar o "hover do dedo" no mobile/tablet).
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

  // Desktop: parallax vertical.
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  // Touch: desliza da esquerda ao entrar e pra direita ao sair.
  const x = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [-72, 0, 0, 72]);
  const slideOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.8, 1],
    [0, 1, 1, 0]
  );

  // "desktop" = scroll suave com mouse · "touch" = celular/tablet.
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

  const style =
    reduce || mode === "none"
      ? undefined
      : mode === "desktop"
        ? { y }
        : { x, opacity: slideOpacity };

  return (
    <div ref={ref} data-focus="false" className={`group/focus ${className ?? ""}`}>
      <motion.div style={style} className="h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
