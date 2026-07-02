"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BotanicalLineArt() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const section = root?.parentElement;
    if (!root || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const scenes = root.querySelectorAll<SVGGElement>(".botanical-scene");

      scenes.forEach((scene) => {
        const sectionId = scene.dataset.section;
        const trigger = sectionId ? document.getElementById(sectionId) : null;
        const paths = scene.querySelectorAll<SVGPathElement>(".botanical-draw");
        if (!trigger || !paths.length) return;

        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });

        gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top 72%",
            toggleActions: "play none none none",
            once: true,
          },
        }).to(paths, {
          strokeDashoffset: 0,
          duration: 1.25,
          stagger: 0.11,
          ease: "power2.out",
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="botanical-effect" aria-hidden="true">
      <svg viewBox="0 0 1440 3600" preserveAspectRatio="none">
        <g className="botanical-scene" data-section="sobre" fill="none" stroke="#3a9e3f" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" strokeLinejoin="round">
          <path className="botanical-draw" d="M-80 840 C90 790 135 610 220 472 C292 355 390 260 520 210" />
          <path className="botanical-draw" d="M151 596 C67 570 45 492 58 414 C140 426 198 492 151 596 Z" />
          <path className="botanical-draw" d="M225 468 C190 375 239 308 315 275 C346 362 305 431 225 468 Z" />
          <path className="botanical-draw" d="M333 321 C316 241 373 185 446 172 C454 247 410 303 333 321 Z" />
        </g>
        <g className="botanical-scene" data-section="regioes" fill="none" stroke="#3a9e3f" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" strokeLinejoin="round">
          <path className="botanical-draw" d="M1515 2750 C1330 2680 1270 2490 1190 2340 C1124 2218 1030 2120 900 2055" />
          <path className="botanical-draw" d="M1281 2510 C1367 2482 1408 2405 1392 2327 C1310 2340 1245 2414 1281 2510 Z" />
          <path className="botanical-draw" d="M1192 2345 C1235 2252 1188 2180 1110 2140 C1072 2228 1112 2303 1192 2345 Z" />
          <path className="botanical-draw" d="M1078 2192 C1098 2107 1037 2047 959 2027 C947 2105 996 2168 1078 2192 Z" />
        </g>

        <g className="botanical-scene" data-section="cuidados" fill="none" stroke="#004a92" strokeWidth="1.2" opacity="0.22" strokeLinecap="round" strokeLinejoin="round">
          <path className="botanical-draw" d="M1510 1270 C1360 1200 1320 1040 1235 920 C1165 820 1075 748 960 720" />
          <path className="botanical-draw" d="M1310 1030 C1378 994 1402 920 1378 852 C1308 874 1260 948 1310 1030 Z" />
          <path className="botanical-draw" d="M1236 919 C1264 841 1218 782 1151 756 C1127 830 1165 892 1236 919 Z" />
          <path className="botanical-draw" d="M1112 778 C1117 711 1063 670 1002 668 C1005 730 1051 772 1112 778 Z" />
        </g>
        <g className="botanical-scene" data-section="regioes" fill="none" stroke="#004a92" strokeWidth="1.2" opacity="0.22" strokeLinecap="round" strokeLinejoin="round">
          <path className="botanical-draw" d="M-90 3330 C84 3270 144 3120 230 2990 C305 2877 401 2795 530 2750" />
          <path className="botanical-draw" d="M156 3090 C72 3068 43 2992 51 2915 C132 2921 195 2990 156 3090 Z" />
          <path className="botanical-draw" d="M238 2981 C204 2896 250 2830 322 2798 C352 2877 315 2943 238 2981 Z" />
        </g>

        <g className="botanical-scene botanical-hands" data-section="diferenciais" fill="none" stroke="#8b7a63" strokeWidth="1.35" opacity="0.24" strokeLinecap="round" strokeLinejoin="round">
          <path className="botanical-draw" d="M90 1905 C185 1845 265 1842 348 1880 C410 1908 468 1962 535 1978 C590 1992 631 1975 676 1947 C622 2035 532 2075 437 2058 C342 2041 282 1972 197 1968 C151 1966 112 1980 72 2004" />
          <path className="botanical-draw" d="M1350 1905 C1255 1845 1175 1842 1092 1880 C1030 1908 972 1962 905 1978 C850 1992 809 1975 764 1947 C818 2035 908 2075 1003 2058 C1098 2041 1158 1972 1243 1968 C1289 1966 1328 1980 1368 2004" />
          <path className="botanical-draw" d="M678 1948 C657 1906 661 1860 694 1828 C710 1812 720 1805 720 1782 C720 1805 730 1812 746 1828 C779 1860 783 1906 762 1948" />
          <path className="botanical-draw" d="M720 1906 C690 1878 689 1844 720 1818 C751 1844 750 1878 720 1906 Z" stroke="#3a9e3f" opacity="0.9" />
          <path className="botanical-draw" d="M720 1905 L720 1960" stroke="#3a9e3f" opacity="0.75" />
        </g>
      </svg>
    </div>
  );
}
