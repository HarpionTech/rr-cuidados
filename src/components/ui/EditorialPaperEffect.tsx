"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function EditorialPaperEffect() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.parentElement;
    if (!root || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const paths = root.querySelectorAll<SVGPathElement>(".editorial-draw");

      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 28%",
            scrub: 0.8 + index * 0.08,
          },
        });
      });

      gsap.to(".editorial-layer--slow", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });
      gsap.to(".editorial-layer--fast", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.fromTo(
        ".editorial-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "bottom 18%",
            scrub: 0.7,
          },
        }
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="editorial-effect" aria-hidden="true">
      <span className="editorial-progress" />
      <svg viewBox="0 0 1440 3600" preserveAspectRatio="none">
        <g className="editorial-layer--slow" fill="none" stroke="#004a92" strokeWidth="1.25" opacity="0.2">
          <path className="editorial-draw" d="M-120 390 C180 150 390 610 720 370 S1190 150 1560 420" />
          <path className="editorial-draw" d="M-140 430 C175 190 405 650 738 410 S1210 190 1580 458" opacity="0.55" />
          <path className="editorial-draw" d="M-160 1670 C210 1370 430 1900 760 1620 S1200 1420 1580 1720" />
          <path className="editorial-draw" d="M-170 1712 C205 1415 450 1940 780 1662 S1220 1460 1590 1760" opacity="0.5" />
          <path className="editorial-draw" d="M-130 2980 C190 2730 440 3200 760 2940 S1190 2740 1560 3020" />
        </g>
        <g className="editorial-layer--fast" fill="none" stroke="#8b7a63" strokeWidth="1" opacity="0.18">
          <path className="editorial-draw" d="M220 990 C480 760 700 1180 1010 940 S1360 790 1570 1010" />
          <path className="editorial-draw" d="M190 1028 C465 805 710 1218 1025 980 S1370 830 1590 1050" opacity="0.5" />
          <path className="editorial-draw" d="M-130 2320 C190 2070 420 2500 740 2280 S1190 2050 1560 2350" />
          <path className="editorial-draw" d="M-140 2360 C180 2110 435 2540 760 2322 S1210 2100 1580 2390" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
