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
    n: "01",
    accent: "bg-brand-blue",
    k: "Equipe preparada",
    d: "Profissionais com formação técnica e o cuidado humano que transforma rotina em acolhimento.",
  },
  {
    Icon: SlidersHorizontal,
    n: "02",
    accent: "bg-brand-green",
    k: "Plano sob medida",
    d: "Cada família é única. Construímos o cuidado de acordo com a necessidade e a rotina do seu lar.",
  },
  {
    Icon: ChatCircleDots,
    n: "03",
    accent: "bg-brand-orange",
    k: "Comunicação próxima",
    d: "Você sempre informado sobre o bem-estar do seu familiar, com transparência e confiança.",
  },
  {
    Icon: HouseLine,
    n: "04",
    accent: "bg-brand-azure",
    k: "Conforto de casa",
    d: "O cuidado vai até onde o idoso se sente seguro — sem mudanças, sem rupturas, sem solidão.",
  },
];

export default function Diferenciais() {
  return (
    <AnimatedSection
      id="diferenciais"
      className="relative mx-auto max-w-[1320px] overflow-hidden px-6 py-24 md:px-[7vw] md:py-36"
    >
      {/* Rótulo de seção ocultado a pedido — descomente para reexibir
      <AnimatedItem as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
        03 — Por que a RR
      </AnimatedItem>
      */}
      <div className="pointer-events-none absolute -right-32 top-16 h-80 w-80 rounded-full bg-brand-leaf/10 blur-3xl" />

      <div className="relative grid items-end gap-6 md:grid-cols-[1.35fr_0.65fr] md:gap-12">
        <RevealText
          as="h2"
          className="display-font max-w-[19ch] text-[clamp(2rem,4.5vw,3.8rem)] font-normal leading-[1.04]"
        >
          Tranquilidade para a família, dignidade para quem é cuidado
        </RevealText>
        <AnimatedItem as="p" className="max-w-[38ch] border-l-2 border-brand-leaf pl-5 text-base leading-relaxed text-ink-soft md:mb-1">
          Quatro compromissos que sustentam cada visita — para você confiar de
          olhos fechados.
        </AnimatedItem>
      </div>

      <div className="relative mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-5">
        {items.map((it, i) => (
          <AnimatedItem
            key={it.k}
            variant="card"
            delay={(i % 2) * 0.1}
            className="group relative min-h-[230px] overflow-hidden rounded-[24px] border border-line/90 bg-white-warm p-6 shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-blue/20 hover:shadow-[var(--card-shadow-hover)] sm:p-8"
          >
            <span className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.16] transition-transform duration-500 group-hover:scale-x-100 ${it.accent}`} />

            <div className="flex items-start justify-between gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-blue/[0.08] text-brand-blue transition-all duration-500 group-hover:-rotate-3 group-hover:bg-brand-blue group-hover:text-white-warm">
                <it.Icon size={28} weight="duotone" />
              </span>
              <span className="display-font text-3xl italic text-brand-blue/15 transition-colors duration-500 group-hover:text-brand-blue/30">
                {it.n}
              </span>
            </div>

            <div className="mt-7">
              <h3 className="display-font text-[1.65rem] font-medium leading-tight text-brand-blue">
                {it.k}
              </h3>
              <p className="mt-3 max-w-[44ch] leading-relaxed text-ink-soft">{it.d}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
