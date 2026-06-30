import { asset } from "@/lib/asset";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink px-6 pb-28 pt-16 text-white-warm/80 md:px-[7vw] md:pb-8">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-10">
        <a href="#hero" className="flex items-center gap-3">
          <img src={asset("/assets/logo.png")} alt="RR Cuidado Domiciliar" width={50} height={50} className="h-12 w-12 object-contain" />
          <span className="flex flex-col leading-none">
            <strong className="display-font text-xl text-brand-leaf">RR</strong>
            <small className="mt-0.5 text-[0.62rem] uppercase tracking-[0.18em] text-white-warm/55">
              Cuidado Domiciliar
            </small>
          </span>
        </a>
        <p className="display-font text-xl italic text-white-warm/90">
          Cuidamos no conforto do seu lar.
        </p>
      </div>

      <div className="grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-leaf">Navegação</h4>
          {["Sobre", "Cuidados", "Por que nós", "Regiões"].map((l, i) => (
            <a
              key={i}
              href={`#${["sobre", "cuidados", "diferenciais", "regioes"][i]}`}
              className="mb-2 block text-sm text-white-warm/70 transition-colors hover:text-brand-leaf"
            >
              {l}
            </a>
          ))}
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-leaf">Contato</h4>
          <a href="https://api.whatsapp.com/send?phone=5548988803583" target="_blank" rel="noopener" className="mb-2 block text-sm text-white-warm/70 transition-colors hover:text-brand-leaf">
            WhatsApp (48) 98880-3583
          </a>
          <a href="https://www.instagram.com/rrcuidado/" target="_blank" rel="noopener" className="mb-2 block text-sm text-white-warm/70 transition-colors hover:text-brand-leaf">
            Instagram @rrcuidado
          </a>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-leaf">Atendimento</h4>
          <span className="mb-2 block text-sm text-white-warm/70">Grande Florianópolis — SC</span>
          <span className="mb-2 block text-sm text-white-warm/70">Cuidado domiciliar de idosos</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 pt-7 text-xs text-white-warm/45">
        <span>© {year} RR Cuidado Domiciliar. Todos os direitos reservados.</span>
        <span>Feito com cuidado.</span>
      </div>
    </footer>
  );
}
