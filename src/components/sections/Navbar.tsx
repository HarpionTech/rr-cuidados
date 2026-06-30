"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#cuidados", label: "Cuidados" },
  { href: "#diferenciais", label: "Por que nós" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#regioes", label: "Regiões" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: Element, o?: object) => void } }).lenis;
    if (el && lenis) lenis.scrollTo(el, { offset: -70 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 transition-all duration-500 md:px-[7vw] ${
          scrolled
            ? "bg-cream/80 py-3 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl"
            : "py-5"
        }`}
      >
        <a href="#hero" className="flex items-center gap-2" aria-label="RR Cuidado Domiciliar — início">
          <img src={asset("/assets/logo.png")} alt="RR Cuidado Domiciliar" width={46} height={46} className="h-11 w-11 object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]" />
          <span className="flex flex-col leading-none">
            <strong className={`display-font text-xl ${scrolled ? "text-brand-blue" : "text-white-warm"}`}>RR</strong>
            <small className={`mt-0.5 text-[0.62rem] uppercase tracking-[0.18em] ${scrolled ? "text-ink-soft" : "text-white-warm/80"}`}>
              Cuidado Domiciliar
            </small>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className={`group relative text-sm font-medium transition-colors ${
                scrolled
                  ? "text-ink-soft hover:text-brand-blue"
                  : "text-white-warm/90 hover:text-white-warm"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100 ${
                  scrolled ? "bg-brand-blue" : "bg-white-warm"
                }`}
              />
            </button>
          ))}
        </nav>

        <a
          href="https://api.whatsapp.com/send?phone=5548988803583&text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais."
          target="_blank"
          rel="noopener"
          className="hidden rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white-warm transition-colors hover:bg-brand-orange lg:inline-block"
        >
          Fale conosco
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-1.5 lg:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          {(() => {
            const bar = scrolled || open ? "bg-ink" : "bg-white-warm";
            return (
              <>
                <span className={`h-0.5 w-6 ${bar} transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`h-0.5 w-6 ${bar} transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-6 ${bar} transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </>
            );
          })()}
        </button>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-cream transition-transform duration-500 lg:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {links.map((l) => (
          <button
            key={l.href}
            onClick={() => go(l.href)}
            className="display-font text-3xl text-ink"
          >
            {l.label}
          </button>
        ))}
        <a
          href="https://api.whatsapp.com/send?phone=5548988803583"
          target="_blank"
          rel="noopener"
          className="mt-4 rounded-full bg-brand-blue px-7 py-3 font-semibold text-white-warm"
        >
          Fale conosco
        </a>
      </div>
    </>
  );
}
