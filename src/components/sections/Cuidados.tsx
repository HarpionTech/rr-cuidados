import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedItem from "@/components/ui/AnimatedItem";
import RevealText from "@/components/ui/RevealText";
import ParallaxItem from "@/components/ui/ParallaxItem";

const cards = [
  { n: "01", t: "Cuidador de pessoas", d: "Acompanhamento integral nas atividades do dia a dia, com paciência e atenção contínua a cada necessidade." },
  { n: "02", t: "Administração de medicação", d: "Controle responsável de horários e doses, seguindo rigorosamente a prescrição médica." },
  { n: "03", t: "Higiene e conforto", d: "Banho, troca e cuidados pessoais conduzidos com respeito, discrição e total preservação da dignidade." },
  { n: "04", t: "Alimentação assistida", d: "Apoio nas refeições e atenção à hidratação, respeitando restrições e o ritmo de cada pessoa." },
  { n: "05", t: "Companhia e estímulo", d: "Conversas, atividades e presença afetuosa para manter a mente ativa e o coração tranquilo." },
  { n: "06", t: "Apoio à mobilidade", d: "Auxílio em locomoção, exercícios e prevenção de quedas, para mais autonomia com segurança." },
];

export default function Cuidados() {
  return (
    <div className="bg-cream-2">
      <AnimatedSection
        id="cuidados"
        className="mx-auto max-w-[1320px] px-6 py-24 md:px-[7vw] md:py-36"
      >
        {/* Rótulo de seção ocultado a pedido — descomente para reexibir
        <AnimatedItem as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
          02 — Cuidados
        </AnimatedItem>
        */}
        <RevealText
          as="h2"
          className="display-font mt-4 max-w-[18ch] text-[clamp(2rem,4.5vw,3.6rem)] font-normal"
        >
          Tudo que o lar precisa para acolher com segurança
        </RevealText>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <ParallaxItem key={c.n} speed={16 + (i % 3) * 8} className="h-full">
              <AnimatedItem
                variant="card"
                delay={(i % 3) * 0.1}
                className="group relative h-full overflow-hidden rounded-[20px] border border-line bg-white-warm p-8 shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--card-shadow-hover)] active:scale-[0.985] max-lg:group-data-[focus=true]/focus:-translate-y-1.5 max-lg:group-data-[focus=true]/focus:border-brand-blue/20 max-lg:group-data-[focus=true]/focus:shadow-[var(--card-shadow-hover)]"
              >
                <span className="absolute left-0 top-0 h-[3px] w-0 bg-gradient-to-r from-brand-azure to-brand-leaf transition-all duration-500 group-hover:w-full max-lg:group-data-[focus=true]/focus:w-full" />
                <span className="display-font text-lg italic text-brand-orange">
                  {c.n}
                </span>
                <h3 className="display-font mt-3 text-2xl font-medium">{c.t}</h3>
                <p className="mt-3 text-ink-soft">{c.d}</p>
              </AnimatedItem>
            </ParallaxItem>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
