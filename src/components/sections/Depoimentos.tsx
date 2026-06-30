import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedItem from "@/components/ui/AnimatedItem";
import RevealText from "@/components/ui/RevealText";

const depos = [
  { q: "Encontramos na RR o cuidado que minha mãe merecia. Voltei a dormir tranquila sabendo que ela está em boas mãos, dentro de casa.", n: "Marina S.", r: "filha · Florianópolis" },
  { q: "Profissionais atenciosos e humanos. Meu pai criou um vínculo lindo com a cuidadora. É mais que um serviço, é afeto.", n: "Carlos M.", r: "filho · São José" },
  { q: "A paz de saber que alguém de confiança está cuidando não tem preço. Recomendo de olhos fechados.", n: "Helena R.", r: "neta · Palhoça" },
];

export default function Depoimentos() {
  return (
    <div className="bg-brand-blue text-white-warm">
      <AnimatedSection
        id="depoimentos"
        className="mx-auto max-w-[1320px] px-6 py-24 md:px-[7vw] md:py-36"
      >
        {/* Rótulo de seção ocultado a pedido — descomente para reexibir
        <AnimatedItem as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-white-warm/60">
          04 — Depoimentos
        </AnimatedItem>
        */}
        <RevealText
          as="h2"
          className="display-font mt-4 max-w-[20ch] text-[clamp(2rem,4.5vw,3.6rem)] font-normal"
        >
          Famílias que confiaram seu maior tesouro
        </RevealText>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {depos.map((d, i) => (
            <AnimatedItem
              key={i}
              variant="card"
              delay={i * 0.12}
              className="flex flex-col justify-between gap-7 rounded-[20px] border border-white/15 bg-white/[0.06] p-8"
            >
              <blockquote className="display-font text-xl italic leading-snug text-white-warm/95">
                “{d.q}”
              </blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <strong className="text-brand-leaf">{d.n}</strong>
                <span className="text-sm text-white-warm/60">{d.r}</span>
              </figcaption>
            </AnimatedItem>
          ))}
        </div>
        <AnimatedItem as="p" className="mt-7 text-xs text-white-warm/50">
          * Depoimentos ilustrativos — substitua pelos relatos reais dos seus clientes.
        </AnimatedItem>
      </AnimatedSection>
    </div>
  );
}
