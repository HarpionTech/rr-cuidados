"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { asset } from "@/lib/asset";

const FRAME_COUNT = 151;
const framePath = (i: number) =>
  asset(`/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [exiting, setExiting] = useState(false);
  const mountRef = useRef(Date.now());

  // mantém o preloader no mínimo 1,5s e dispara a saída (cortina sobe)
  useEffect(() => {
    if (!loaded) return;
    const elapsed = Date.now() - mountRef.current;
    const wait = Math.max(0, 1500 - elapsed);
    const t = setTimeout(() => setExiting(true), wait);
    return () => clearTimeout(t);
  }, [loaded]);

  // preload de todos os frames com barra de progresso real
  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = [];
    let cancelled = false;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = img.onerror = () => {
        done++;
        if (cancelled) return;
        setProgress(Math.round((done / FRAME_COUNT) * 100));
        if (done === FRAME_COUNT) setLoaded(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = () => window.innerWidth < 768;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || !img.naturalWidth) return;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const zoom = isMobile() ? 1.3 : 1;
      const scale = Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight) * zoom;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      // alinhamento vertical: 0 = topo, 0.5 = centro. Menor que 0.5 mostra
      // mais o topo da cena (evita cortar as cabeças).
      const VALIGN = 0.3;
      const dx = (cssW - dw) / 2;
      const dy = (cssH - dh) * VALIGN;
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const render = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      const frame = Math.min(Math.floor(p * FRAME_COUNT), FRAME_COUNT - 1);
      drawFrame(frame);

      // intro some até 22% do scroll; outro aparece de 72% a 100%
      if (introRef.current) {
        introRef.current.style.opacity = String(Math.max(0, 1 - p / 0.22));
      }
      if (outroRef.current) {
        outroRef.current.style.opacity = String(
          Math.min(Math.max((p - 0.72) / 0.2, 0), 1)
        );
      }
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(render);
      }
    };

    const onResize = () => {
      sizeCanvas();
      render();
    };

    sizeCanvas();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [loaded]);

  return (
    <section ref={sectionRef} className="relative h-[360vh] md:h-[420vh]">
      {/* preloader (branded) — sai como uma cortina que sobe revelando o hero */}
      <div
        aria-hidden={exiting}
        className={`fixed inset-0 z-[70] grid place-items-center bg-cream transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          exiting ? "pointer-events-none -translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`flex flex-col items-center gap-5 px-8 text-center transition-opacity duration-500 ${
            exiting ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={asset("/assets/logo.png")}
            alt=""
            className="logo-beat h-28 w-28 object-contain md:h-32 md:w-32"
          />
          <div className="flex flex-col items-center gap-1">
            <span className="display-font text-2xl text-brand-blue md:text-3xl">
              RR Cuidado Domiciliar
            </span>
            <span className="display-font text-base italic text-ink-soft">
              cuidamos no conforto do seu lar
            </span>
          </div>
        </div>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />

        {/* véu pra legibilidade */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,20,34,0.72)_0%,rgba(10,20,34,0.32)_45%,rgba(10,20,34,0)_72%),linear-gradient(180deg,rgba(10,20,34,0.35)_0%,rgba(10,20,34,0.15)_40%,rgba(10,20,34,0.78)_100%)]" />

        {/* intro */}
        <div
          ref={introRef}
          className="pointer-events-none absolute inset-0 flex flex-col justify-end px-6 pb-16 pt-24 md:px-[7vw] md:pb-24"
        >
          <div className="pointer-events-auto max-w-3xl text-white-warm">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-leaf">
              Cuidado domiciliar de idosos · Grande Florianópolis
            </span>
            <h1 className="display-font mt-4 text-[clamp(2rem,5.2vw,4.2rem)] font-light leading-[1.02]">
              O conforto de estar em{" "}
              <span className="italic text-brand-leaf">casa.</span>
              <br />
              O cuidado de quem ama.
            </h1>
            <p className="mt-5 max-w-xl text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed text-white-warm/90">
              Acolhemos quem você ama com técnica, presença e ternura — para que
              cada dia seja vivido com dignidade, paz e tranquilidade, no lugar
              mais seguro do mundo: o próprio lar.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button
                href="https://api.whatsapp.com/send?phone=5548988803583&text=Ol%C3%A1!%20Gostaria%20de%20um%20atendimento."
                external
                size="lg"
              >
                Agendar uma conversa
              </Button>
              <Button href="#cuidados" variant="ghost" size="lg" className="!text-white-warm !border-white-warm/40 hover:!bg-white-warm/10">
                Conhecer os cuidados
              </Button>
            </div>
          </div>
        </div>

        {/* outro (aparece no fim da sequência) */}
        <div
          ref={outroRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 opacity-0"
        >
          <p className="display-font max-w-3xl text-center text-[clamp(1.8rem,4.5vw,3.4rem)] font-light leading-tight text-white-warm">
            Presença que acolhe. Cuidado que{" "}
            <span className="italic text-brand-leaf">transforma</span> o dia a dia.
          </p>
        </div>

        {/* indicador de scroll */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-white-warm/70 md:flex">
          <span>role para descobrir</span>
          <span className="block h-12 w-px bg-white-warm/40" />
        </div>
      </div>
    </section>
  );
}
