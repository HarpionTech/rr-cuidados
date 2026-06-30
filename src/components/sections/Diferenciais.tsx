import {
  UsersThree,
  SlidersHorizontal,
  ChatCircleDots,
  HouseLine,
} from "@phosphor-icons/react/dist/ssr";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedItem from "@/components/ui/AnimatedItem";
import RevealText from "@/components/ui/RevealText";
import ScrollAccentLine from "@/components/ui/ScrollAccentLine";

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

      <div className="relative grid items-end gap-7 md:grid-cols-[1.5fr_0.5fr] md:gap-14">
        <RevealText
          as="h2"
          className="display-font max-w-[24ch] text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.06]"
        >
          <span className="block">Tranquilidade para a família.</span>
          <span className="block italic text-brand-blue">
            Dignidade para quem é cuidado.
          </span>
        </RevealText>
        <AnimatedItem as="p" className="max-w-[38ch] border-l-2 border-brand-leaf pl-5 text-base leading-relaxed text-ink-soft md:mb-1">
          Quatro compromissos que sustentam cada visita — para você confiar de
          olhos fechados.
        </AnimatedItem>
      </div>

      <div className="relative mt-11 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-5">
        {items.map((it, i) => (
          <AnimatedItem
            key={it.k}
            variant="card"
            delay={(i % 2) * 0.1}
            className="group relative grid grid-cols-[auto_1fr] items-start gap-5 overflow-hidden rounded-[22px] border border-line/90 bg-white-warm p-6 shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue/20 hover:shadow-[var(--card-shadow-hover)] md:p-7"
          >
            <ScrollAccentLine
              className={it.accent}
              delay={i * 0.08}
            />

            <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-brand-blue/[0.08] text-brand-blue transition-all duration-500 group-hover:-rotate-3 group-hover:bg-brand-blue group-hover:text-white-warm md:h-14 md:w-14">
              <it.Icon size={27} weight="duotone" />
            </span>
            <span className="display-font absolute right-6 top-5 text-2xl italic text-brand-blue/15 transition-colors duration-500 group-hover:text-brand-blue/30">
              {it.n}
            </span>

            <div className="min-w-0 pr-7">
              <h3 className="display-font text-[1.45rem] font-medium leading-tight text-brand-blue md:text-[1.6rem]">
                {it.k}
              </h3>
              <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-ink-soft">{it.d}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
