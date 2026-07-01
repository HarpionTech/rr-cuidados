"use client";

import { useEffect, useState } from "react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

// Seções onde o botão flutuante deve aparecer: de "Quem somos" até "Regiões".
// Fora dessa faixa (hero e contato/rodapé) ele some pra não poluir a página.
const SECTIONS = ["sobre", "cuidados", "diferenciais", "regioes"];

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (els.length === 0) return;

    const shown = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) shown.add(e.target);
          else shown.delete(e.target);
        }
        setVisible(shown.size > 0);
      },
      { rootMargin: "-15% 0px -15% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
