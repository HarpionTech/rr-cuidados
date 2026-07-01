"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
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
  const frameStepRef = useRef(1);
  const lastFrameRef = useRef(-1);
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
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    let cancelled = false;
    // No touch (celular/tablet) avança em passos de frames pra reduzir a
    // frequência de redesenho e manter o scroll fluido. No desktop, todos.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const step = coarse ? 3 : 1;
    frameStepRef.current = step;
    const frameIndexes = Array.from(
      { length: Math.floor((FRAME_COUNT - 1) / step) + 1 },
      (_, i) => i * step
    );

    for (const i of frameIndexes) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img.onload = img.onerror = () => {
        done++;
        if (cancelled) return;
        if (done === frameIndexes.length) setLoaded(true);
      };
      imgs[i] = img;
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
    // canvas offscreen reutilizável pro fundo desfocado barato (downscale→upscale,
    // sem ctx.filter que travava a cada frame)
    const blurCanvas = document.createElement("canvas");
    const blurCtx = blurCanvas.getContext("2d");
    let framesReleased = false;
    let framesReloading = false;

    const reloadFrames = () => {
      if (framesReloading || imagesRef.current.length === FRAME_COUNT) return;
      framesReloading = true;
      const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
      let done = 0;

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = framePath(i);
        img.onload = img.onerror = () => {
          done++;
          if (done !== FRAME_COUNT) return;
          imagesRef.current = imgs;
          framesReloading = false;
          lastFrameRef.current = -1;
          sizeCanvas();
          render();
        };
        imgs[i] = img;
      }
    };

    const sizeCanvas = () => {
      const cssW = window.innerWidth;
      const cssH = canvas.getBoundingClientRect().height;
      const dprCap = cssW < 640 ? 1 : cssW < 1024 ? 1.25 : 1.75;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || !img.naturalWidth) return;
      const cssW = window.innerWidth;
      const cssH = canvas.getBoundingClientRect().height;
      // Qualquer tela em retrato (celular e tablet em pé) usa o fundo desfocado
      // + plano nítido por cima. Em paisagem (desktop e tablet deitado) o "cover"
      // preenche a tela naturalmente.
      const isMobileDevice = cssH > cssW;

      ctx.clearRect(0, 0, cssW, cssH);

      if (isMobileDevice) {
        // O material original é 16:9. No retrato, uma base desfocada preenche a
        // tela como fundo fotográfico e o plano nítido vem por cima.
        // O desfoque é feito reduzindo o frame e reampliando (barato, roda liso),
        // em vez de ctx.filter="blur()" (que travava a cada frame).
        if (blurCtx) {
          const bw = 64;
          const bh = Math.max(1, Math.round((bw * img.naturalHeight) / img.naturalWidth));
          blurCanvas.width = bw;
          blurCanvas.height = bh;
          blurCtx.drawImage(img, 0, 0, bw, bh);

          const bgScale = Math.max(cssW / bw, cssH / bh) * 1.1;
          const bgW = bw * bgScale;
          const bgH = bh * bgScale;
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(blurCanvas, (cssW - bgW) / 2, (cssH - bgH) * 0.3, bgW, bgH);
        } else {
          const bgScale =
            Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight) * 1.1;
          ctx.globalAlpha = 0.7;
          ctx.drawImage(
            img,
            (cssW - img.naturalWidth * bgScale) / 2,
            (cssH - img.naturalHeight * bgScale) * 0.3,
            img.naturalWidth * bgScale,
            img.naturalHeight * bgScale
          );
          ctx.globalAlpha = 1;
        }

        // escurece o fundo pra coesão e leitura
        ctx.fillStyle = "rgba(10,20,34,0.44)";
        ctx.fillRect(0, 0, cssW, cssH);

        const subjectScale = (cssW * 1.5) / img.naturalWidth;
        const subjectW = img.naturalWidth * subjectScale;
        const subjectH = img.naturalHeight * subjectScale;
        const subjectY = Math.max(64, cssH * 0.06);

        ctx.drawImage(
          img,
          (cssW - subjectW) / 2,
          subjectY,
          subjectW,
          subjectH
        );

        // funde a base do plano nítido no fundo, sem corte seco
        const blend = ctx.createLinearGradient(0, subjectY, 0, subjectY + subjectH);
        blend.addColorStop(0, "rgba(10,20,34,0)");
        blend.addColorStop(0.68, "rgba(10,20,34,0)");
        blend.addColorStop(1, "rgba(10,20,34,0.9)");
        ctx.fillStyle = blend;
        ctx.fillRect(0, subjectY, cssW, subjectH + 2);
        return;
      }

      const scale = Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const VALIGN = 0.3;
      const dx = (cssW - dw) / 2;
      const dy = (cssH - dh) * VALIGN;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const render = () => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom <= 0) {
        if (!framesReleased) {
          // Fora do hero, libera centenas de MB de pixels decodificados e o
          // backing buffer do canvas. Os JPGs compactados continuam no cache.
          imagesRef.current = [];
          canvas.width = 1;
          canvas.height = 1;
          framesReleased = true;
          lastFrameRef.current = -1;
        }
        tickingRef.current = false;
        return;
      }
      if (rect.top >= window.innerHeight) {
        tickingRef.current = false;
        return;
      }
      if (framesReleased) {
        framesReleased = false;
        reloadFrames();
        tickingRef.current = false;
        return;
      }
      const total = section.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      const requestedFrame = Math.min(
        Math.floor(p * FRAME_COUNT),
        FRAME_COUNT - 1
      );
      const frame = Math.min(
        Math.round(requestedFrame / frameStepRef.current) * frameStepRef.current,
        FRAME_COUNT - 1
      );
      if (frame !== lastFrameRef.current) {
        lastFrameRef.current = frame;
        drawFrame(frame);
      }

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
      lastFrameRef.current = -1;
      sizeCanvas();
      render();
    };
    window.addEventListener("resize", onResize, true);

    sizeCanvas();
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [loaded]);

  return (
    <section ref={sectionRef} className="relative h-[180svh] md:h-[200svh] xl:h-[300vh]">
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

      <div className="sticky top-0 h-[100svh] min-h-[620px] w-full translate-z-0 overflow-hidden will-change-transform md:h-screen md:min-h-0">
        <canvas ref={canvasRef} className="h-full w-full translate-z-0 [will-change:contents]" />

        {/* véu pra legibilidade */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,20,34,0.35)_0%,rgba(10,20,34,0.02)_34%,rgba(10,20,34,0.38)_55%,rgba(10,20,34,0.94)_82%)] landscape:bg-[linear-gradient(90deg,rgba(10,20,34,0.72)_0%,rgba(10,20,34,0.32)_45%,rgba(10,20,34,0)_72%),linear-gradient(180deg,rgba(10,20,34,0.35)_0%,rgba(10,20,34,0.15)_40%,rgba(10,20,34,0.78)_100%)]" />

        {/* intro */}
        <div
          ref={introRef}
          className="pointer-events-none absolute inset-0 flex flex-col justify-end px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 sm:px-6 md:px-[7vw] md:pb-24"
        >
          <div className="pointer-events-auto max-w-3xl text-white-warm">
            <h1 className="display-font text-[clamp(1.9rem,9vw,2.55rem)] font-light leading-[1.02] md:text-[clamp(2rem,5.2vw,4.2rem)]">
              O conforto de estar em{" "}
              <span className="italic text-brand-leaf">casa.</span>
              <br />
              O cuidado de quem ama.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-[1.55] text-white-warm/90 sm:text-base md:mt-5 md:text-[clamp(0.95rem,1.3vw,1.1rem)] md:leading-relaxed">
              Acolhemos quem você ama com técnica, presença e ternura — para que
              cada dia seja vivido com dignidade, paz e tranquilidade, no lugar
              mais seguro do mundo: o próprio lar.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-7 md:gap-4">
              <Button
                href="https://api.whatsapp.com/send?phone=5548988803583&text=Ol%C3%A1!%20Gostaria%20de%20um%20atendimento."
                external
                size="lg"
                className="min-h-12 !px-6 !py-3 text-sm sm:text-base"
              >
                Agendar conversa
                <ArrowUpRight size={18} weight="bold" />
              </Button>
              <Button href="#cuidados" variant="ghost" className="min-h-12 !border-0 !px-1 !py-3 text-sm !text-white-warm/90 shadow-none hover:!translate-y-0 hover:!text-brand-leaf">
                Ver os cuidados
                <ArrowDown size={17} weight="bold" />
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
