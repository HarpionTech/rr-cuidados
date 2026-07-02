"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/asset";

export default function BotanicalImageReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const wrapper = root?.parentElement;
    const stage = root?.querySelector<HTMLElement>(".botanical-image-stage");
    const image = root?.querySelector<HTMLImageElement>("img");
    if (!root || !wrapper || !stage || !image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(stage, {
        opacity: 0,
        scale: 1.025,
      }, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 76%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.fromTo(image, {
        objectPosition: "center 0%",
      }, {
        objectPosition: "center 100%",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="botanical-image-effect" aria-hidden="true">
      <div className="botanical-image-stage">
        <img src={asset("/assets/botanical-editorial.png")} alt="" />
      </div>
    </div>
  );
}
