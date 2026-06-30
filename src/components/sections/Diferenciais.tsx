import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedItem from "@/components/ui/AnimatedItem";
import RevealText from "@/components/ui/RevealText";

const items = [
  { k: "Equipe preparada", d: "Profissionais com formação técnica e o cuidado humano que transforma rotina em acolhimento." },
  { k: "Plano sob medida", d: "Cada família é única. Construímos o cuidado de acordo com a necessidade e a rotina do seu lar." },
  { k: "Comunicação próxima", d: "Você sempre informado sobre o bem-estar do seu familiar, com transparência e confiança." },
  { k: "Conforto de casa", d: "O cuidado vai até onde o idoso se sente seguro — sem mudanças, sem rupturas, sem solidão." },
];

export default function Diferenciais() {
  return (
    <AnimatedSection
      id="diferenciais"
      className="mx-auto max-w-[1320px] px-6 py-24 md:px-[7vw] md:py-36"
    >
      {/* Rótulo de seção ocultado a pedido — descomente para reexibir
      <AnimatedItem as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
        03 — Por que a RR
      </AnimatedItem>
      */}
      <RevealText
        as="h2"
        className="display-font mt-4 max-w-[20ch] text-[clamp(2rem,4.5vw,3.6rem)] font-normal"
      >
        Tranquilidade para a família, dignidade para quem é cuidado
      </RevealText>

      <div className="mt-12 grid border-t border-line md:grid-cols-2">
        {items.map((it, i) => (
          <AnimatedItem
            key={it.k}
            delay={(i % 2) * 0.08}
            className={`border-b border-line py-9 ${
              i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12"
            }`}
          >
            <div className="grid gap-2 md:grid-cols-[1fr_1.4fr] md:items-baseline md:gap-6">
              <span className="display-font text-2xl text-brand-blue">{it.k}</span>
              <p className="text-ink-soft">{it.d}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
