import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedItem from "@/components/ui/AnimatedItem";
import RevealText from "@/components/ui/RevealText";
import CountUp from "@/components/ui/CountUp";

const stats = [
  { to: 100, suffix: "%", label: "cuidado humanizado" },
  { to: 24, suffix: "h", label: "disponibilidade conforme o plano" },
  { to: 1, prefix: "#", label: "prioridade: o bem-estar de quem você ama" },
];

export default function Sobre() {
  return (
    <AnimatedSection
      id="sobre"
      className="mx-auto max-w-[1320px] px-6 py-24 md:px-[7vw] md:py-36"
    >
      {/* Rótulo de seção ocultado a pedido — descomente para reexibir
      <AnimatedItem as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
        01 — Sobre
      </AnimatedItem>
      */}

      <div className="mt-12 grid items-start gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <RevealText
            as="h2"
            className="display-font max-w-[16ch] text-[clamp(2rem,4.5vw,3.6rem)] font-normal"
          >
            Cuidar é um gesto de amor que se faz com{" "}
            <span className="italic text-brand-blue">responsabilidade</span>.
          </RevealText>
          <AnimatedItem as="p" className="mt-7 max-w-[54ch] text-lg text-ink-soft">
            A RR Cuidado Domiciliar nasceu para levar tranquilidade às famílias
            que desejam o melhor para seus idosos sem abrir mão do conforto e da
            familiaridade de casa. Unimos o rigor técnico de uma equipe preparada
            à sensibilidade de quem entende que, por trás de cada cuidado, existe
            uma história de vida.
          </AnimatedItem>
          <AnimatedItem as="p" className="mt-5 max-w-[54ch] text-lg text-ink-soft">
            Acompanhamos rotinas, medicações, higiene, alimentação e — acima de
            tudo — oferecemos companhia. Porque envelhecer bem é envelhecer
            cercado de respeito, paciência e afeto.
          </AnimatedItem>
        </div>

        <div className="flex flex-col gap-5">
          {stats.map((s, i) => (
            <AnimatedItem key={i} variant="card" delay={i * 0.12} className="neu rounded-[20px] p-7">
              <CountUp
                to={s.to}
                prefix={s.prefix}
                suffix={s.suffix}
                className="display-font block text-5xl text-brand-blue"
              />
              <span className="mt-2 block text-sm text-ink-soft">{s.label}</span>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
