"use client";

import { useEffect, useState } from "react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

/**
 * Botão flutuante do WhatsApp: aparece só depois que "Quem somos" (#sobre)
 * começa a entrar e some assim que a seção de contato (#contato) começa a
 * aparecer — antes dela, portanto, o ícone já está oculto.
 */
export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      const sobre = document.getElementById("sobre");
      const contato = document.getElementById("contato");
      const vh = window.innerHeight;
      const sobreTop = sobre ? sobre.getBoundingClientRect().top : Infinity;
      const contatoTop = contato ? contato.getBoundingClientRect().top : Infinity;
      // já entrou em "Quem somos" e a seção de contato ainda não começou a surgir
      const started = sobreTop <= vh * 0.75;
      const contatoAppearing = contatoTop <= vh * 0.95;
      setVisible(started && !contatoAppearing);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href="https://api.whatsapp.com/send?phone=5548988803583&text=Ol%C3%A1!"
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 grid h-13 w-13 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/40" />
      <WhatsAppIcon size={28} className="relative" />
    </a>
  );
}
