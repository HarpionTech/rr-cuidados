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
        const washes = scene.querySelectorAll<SVGElement>(".botanical-wash");
        if (!trigger || !paths.length) return;

        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });
        gsap.set(washes, { opacity: 0, scale: 0.92, transformOrigin: "center" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top 72%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        timeline.to(paths, {
          strokeDashoffset: 0,
          duration: 1.15,
          stagger: 0.09,
          ease: "power2.out",
        }).to(washes, {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power2.out",
        }, "-=0.55");
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="botanical-effect" aria-hidden="true">
      <svg viewBox="0 0 1440 3600" preserveAspectRatio="none">
        <defs>
          <radialGradient id="leafWash" cx="50%" cy="45%" r="62%">
            <stop offset="0%" stopColor="#6cc04f" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6cc04f" stopOpacity="0.025" />
          </radialGradient>
          <radialGradient id="blueWash" cx="50%" cy="45%" r="62%">
            <stop offset="0%" stopColor="#0061a9" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0061a9" stopOpacity="0.02" />
          </radialGradient>
          <radialGradient id="warmWash" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#c4aa83" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#c4aa83" stopOpacity="0.015" />
          </radialGradient>
        </defs>
        <g className="botanical-scene" data-section="sobre" fill="none" stroke="#3a9e3f" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse className="botanical-wash" cx="235" cy="420" rx="290" ry="265" fill="url(#leafWash)" stroke="none" />
          <path className="botanical-wash" d="M151 596 C67 570 45 492 58 414 C140 426 198 492 151 596 Z" fill="#6cc04f" fillOpacity="0.15" stroke="none" />
          <path className="botanical-wash" d="M225 468 C190 375 239 308 315 275 C346 362 305 431 225 468 Z" fill="#6cc04f" fillOpacity="0.12" stroke="none" />
          <path className="botanical-draw" d="M-80 840 C90 790 135 610 220 472 C292 355 390 260 520 210" />
          <path className="botanical-draw" d="M151 596 C67 570 45 492 58 414 C140 426 198 492 151 596 Z" />
          <path className="botanical-draw" d="M225 468 C190 375 239 308 315 275 C346 362 305 431 225 468 Z" />
          <path className="botanical-draw" d="M333 321 C316 241 373 185 446 172 C454 247 410 303 333 321 Z" />
          <path className="botanical-draw botanical-detail" d="M82 453 C111 484 133 523 151 596 M248 319 C247 370 238 420 225 468 M390 207 C375 248 354 287 333 321" opacity="0.55" />
          <path className="botanical-draw botanical-detail" d="M106 493 L72 474 M128 535 L91 528 M250 365 L293 335 M238 412 L282 391 M368 254 L415 222" opacity="0.38" />
        </g>
        <g className="botanical-scene" data-section="regioes" fill="none" stroke="#3a9e3f" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" strokeLinejoin="round">
          <ellipse className="botanical-wash" cx="1210" cy="2370" rx="300" ry="280" fill="url(#leafWash)" stroke="none" />
          <path className="botanical-draw" d="M1515 2750 C1330 2680 1270 2490 1190 2340 C1124 2218 1030 2120 900 2055" />
          <path className="botanical-draw" d="M1281 2510 C1367 2482 1408 2405 1392 2327 C1310 2340 1245 2414 1281 2510 Z" />
          <path className="botanical-draw" d="M1192 2345 C1235 2252 1188 2180 1110 2140 C1072 2228 1112 2303 1192 2345 Z" />
          <path className="botanical-draw" d="M1078 2192 C1098 2107 1037 2047 959 2027 C947 2105 996 2168 1078 2192 Z" />
          <path className="botanical-draw botanical-detail" d="M1364 2359 C1334 2410 1305 2460 1281 2510 M1150 2181 C1165 2235 1178 2290 1192 2345 M1010 2053 C1028 2105 1051 2153 1078 2192" opacity="0.48" />
        </g>

        <g className="botanical-scene" data-section="cuidados" fill="none" stroke="#004a92" strokeWidth="1.2" opacity="0.22" strokeLinecap="round" strokeLinejoin="round">
          <ellipse className="botanical-wash" cx="1200" cy="930" rx="280" ry="245" fill="url(#blueWash)" stroke="none" />
          <path className="botanical-wash" d="M1310 1030 C1378 994 1402 920 1378 852 C1308 874 1260 948 1310 1030 Z" fill="#0061a9" fillOpacity="0.12" stroke="none" />
          <path className="botanical-draw" d="M1510 1270 C1360 1200 1320 1040 1235 920 C1165 820 1075 748 960 720" />
          <path className="botanical-draw" d="M1310 1030 C1378 994 1402 920 1378 852 C1308 874 1260 948 1310 1030 Z" />
          <path className="botanical-draw" d="M1236 919 C1264 841 1218 782 1151 756 C1127 830 1165 892 1236 919 Z" />
          <path className="botanical-draw" d="M1112 778 C1117 711 1063 670 1002 668 C1005 730 1051 772 1112 778 Z" />
          <path className="botanical-draw botanical-detail" d="M1361 881 C1344 930 1326 980 1310 1030 M1181 794 C1197 836 1217 880 1236 919 M1034 684 C1054 718 1081 751 1112 778" opacity="0.52" />
        </g>
        <g className="botanical-scene" data-section="regioes" fill="none" stroke="#004a92" strokeWidth="1.2" opacity="0.22" strokeLinecap="round" strokeLinejoin="round">
          <ellipse className="botanical-wash" cx="220" cy="3010" rx="285" ry="250" fill="url(#blueWash)" stroke="none" />
          <path className="botanical-draw" d="M-90 3330 C84 3270 144 3120 230 2990 C305 2877 401 2795 530 2750" />
          <path className="botanical-draw" d="M156 3090 C72 3068 43 2992 51 2915 C132 2921 195 2990 156 3090 Z" />
          <path className="botanical-draw" d="M238 2981 C204 2896 250 2830 322 2798 C352 2877 315 2943 238 2981 Z" />
          <path className="botanical-draw botanical-detail" d="M79 2941 C106 2990 133 3040 156 3090 M268 2838 C258 2886 248 2934 238 2981" opacity="0.48" />
        </g>

        <g className="botanical-scene botanical-hands" data-section="diferenciais" fill="none" stroke="#8b7a63" strokeWidth="1.35" opacity="0.24" strokeLinecap="round" strokeLinejoin="round">
          <ellipse className="botanical-wash" cx="720" cy="1940" rx="390" ry="245" fill="url(#warmWash)" stroke="none" />
          <ellipse className="botanical-wash" cx="720" cy="1885" rx="105" ry="105" fill="url(#leafWash)" stroke="none" />
          <path className="botanical-draw" d="M365 1887 C427 1852 495 1847 553 1872 M1075 1887 C1013 1852 945 1847 887 1872" opacity="0.58" />
          <path className="botanical-draw" d="M90 1905 C185 1845 265 1842 348 1880 C410 1908 468 1962 535 1978 C590 1992 631 1975 676 1947 C622 2035 532 2075 437 2058 C342 2041 282 1972 197 1968 C151 1966 112 1980 72 2004" />
          <path className="botanical-draw" d="M1350 1905 C1255 1845 1175 1842 1092 1880 C1030 1908 972 1962 905 1978 C850 1992 809 1975 764 1947 C818 2035 908 2075 1003 2058 C1098 2041 1158 1972 1243 1968 C1289 1966 1328 1980 1368 2004" />
          <path className="botanical-draw" d="M678 1948 C657 1906 661 1860 694 1828 C710 1812 720 1805 720 1782 C720 1805 730 1812 746 1828 C779 1860 783 1906 762 1948" />
          <path className="botanical-draw" d="M720 1906 C690 1878 689 1844 720 1818 C751 1844 750 1878 720 1906 Z" stroke="#3a9e3f" opacity="0.9" />
          <path className="botanical-draw" d="M720 1905 L720 1960" stroke="#3a9e3f" opacity="0.75" />
          <path className="botanical-draw botanical-detail" d="M210 1892 C278 1880 326 1900 382 1936 M1230 1892 C1162 1880 1114 1900 1058 1936 M296 1968 C355 1998 403 2029 465 2041 M1144 1968 C1085 1998 1037 2029 975 2041" opacity="0.46" />
          <path className="botanical-draw" d="M720 1818 C689 1791 674 1756 685 1718 C715 1732 728 1765 720 1818 Z M720 1818 C750 1790 765 1755 754 1718 C724 1732 712 1766 720 1818 Z" stroke="#3a9e3f" opacity="0.72" />
        </g>
      </svg>
    </div>
  );
}
