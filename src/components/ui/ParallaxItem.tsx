"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrapper de card com:
 * - Parallax: desloca levemente o card no eixo Y conforme a página rola (profundidade).
 * - Foco no centro: quando o card chega ao centro da tela, recebe data-focus="true".
 *   Os filhos reagem via `group-data-[focus=true]/focus:` (usado só em telas < lg,
 *   pra dar o "hover do dedo" no mobile/tablet — no desktop o hover normal cuida).
 *
 * O elemento externo (ref) é estável; o transform do parallax fica no filho,
 * evitando feedback na medição de scroll/intersection.
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
        style={reduce ? undefined : { y }}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
