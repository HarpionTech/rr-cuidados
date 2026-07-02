"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const motion = [
  { x: 24, y: 16, scale: 1.08, duration: 11 },
  { x: -20, y: 22, scale: 1.12, duration: 13 },
  { x: 18, y: -18, scale: 1.09, duration: 12 },
  { x: -24, y: -14, scale: 1.11, duration: 14 },
  { x: 16, y: 20, scale: 1.07, duration: 12.5 },
];

export default function OrganicAmbient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const orbs = Array.from(root.querySelectorAll<HTMLElement>(".organic-orb"));
    const tweens = orbs.map((orb, index) => {
      const config = motion[index];
      return gsap.to(orb, {
        xPercent: config.x,
        yPercent: config.y,
        scale: config.scale,
        duration: config.duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        paused: true,
      });
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        tweens.forEach((tween) => (entry.isIntersecting ? tween.play() : tween.pause()));
      },
      { rootMargin: "20% 0px" }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      tweens.forEach((tween) => tween.kill());
    };
  }, []);

  return (
    <div ref={rootRef} className="organic-ambient" aria-hidden="true">
      <span className="organic-orb organic-orb--leaf" />
      <span className="organic-orb organic-orb--blue" />
      <span className="organic-orb organic-orb--orange" />
      <span className="organic-orb organic-orb--green" />
      <span className="organic-orb organic-orb--azure" />
    </div>
  );
}
