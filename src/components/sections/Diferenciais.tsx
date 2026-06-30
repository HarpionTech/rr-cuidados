import {
  UsersThree,
  SlidersHorizontal,
  ChatCircleDots,
  HouseLine,
} from "@phosphor-icons/react/dist/ssr";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedItem from "@/components/ui/AnimatedItem";
import RevealText from "@/components/ui/RevealText";

const items = [
  {
    Icon: UsersThree,
    k: "Equipe preparada",
    d: "Profissionais com formação técnica e o cuidado humano que transforma rotina em acolhimento.",
  },
  {
    Icon: SlidersHorizontal,
    k: "Plano sob medida",
    d: "Cada família é única. Construímos o cuidado de acordo com a necessidade e a rotina do seu lar.",
  },
  {
    Icon: ChatCircleDots,
    k: "Comunicação próxima",
    d: "Você sempre informado sobre o bem-estar do seu familiar, com transparência e confiança.",
  },
  {
    Icon: HouseLine,
    k: "Conforto de casa",
    d: "O cuidado vai até onde o idoso se sente seguro — sem mudanças, sem rupturas, sem solidão.",
  },
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
      <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
        <RevealText
          as="h2"
          className="display-font max-w-[20ch] text-[clamp(2rem,4.5vw,3.6rem)] font-normal"
        >
          Tranquilidade para a família, dignidade para quem é cuidado
        </RevealText>
        <AnimatedItem as="p" className="max-w-[42ch] text-ink-soft md:pb-2">
          Quatro compromissos que sustentam cada visita — para você confiar de
          olhos fechados.
        </AnimatedItem>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {items.map((it, i) => (
          <AnimatedItem
            key={it.k}
            variant="card"
            delay={(i % 2) * 0.1}
            className="group flex gap-5 rounded-[20px] border border-line bg-white-warm p-7 shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--card-shadow-hover)] sm:p-8"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-blue/10 text-brand-blue transition-colors duration-500 group-hover:bg-brand-blue group-hover:text-white-warm">
              <it.Icon size={28} weight="duotone" />
            </span>
            <div>
              <h3 className="display-font text-2xl font-medium text-brand-blue">
                {it.k}
              </h3>
              <p className="mt-2 text-ink-soft">{it.d}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
