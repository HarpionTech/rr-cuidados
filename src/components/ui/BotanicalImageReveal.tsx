"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/asset";

const scenes = [
  { section: "sobre", top: "0%", position: "center 14%", mirror: false },
  { section: "cuidados", top: "24%", position: "center 38%", mirror: true },
  { section: "diferenciais", top: "49%", position: "center 92%", mirror: false },
  { section: "regioes", top: "73%", position: "center 62%", mirror: true },
];

export default function BotanicalImageReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".botanical-image-scene").forEach((scene) => {
        const sectionId = scene.dataset.section;
        const trigger = sectionId ? document.getElementById(sectionId) : null;
        if (!trigger) return;

        gsap.fromTo(
          scene,
          { opacity: 0, scale: 1.035, clipPath: "inset(8% 3% 8% 3%)" },
          {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.45,
            ease: "power2.out",
            scrollTrigger: {
              trigger,
              start: "top 74%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="botanical-image-effect" aria-hidden="true">
      {scenes.map((scene) => (
        <div
          key={scene.section}
          data-section={scene.section}
          className="botanical-image-scene"
          style={{ top: scene.top }}
        >
          <img
            src={asset("/assets/botanical-editorial.png")}
            alt=""
            className={scene.mirror ? "botanical-image-mirror" : ""}
            style={{ objectPosition: scene.position }}
          />
        </div>
      ))}
    </div>
  );
}
