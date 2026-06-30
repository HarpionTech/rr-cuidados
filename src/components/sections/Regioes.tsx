import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedItem from "@/components/ui/AnimatedItem";
import RevealText from "@/components/ui/RevealText";

const cidades = [
  "Florianópolis",
  "São José",
  "Palhoça",
  "Biguaçu",
  "Santo Amaro da Imperatriz",
  "Governador Celso Ramos",
];

export default function Regioes() {
  return (
    <AnimatedSection
      id="regioes"
      className="mx-auto max-w-[1320px] px-6 py-24 md:px-[7vw] md:py-36"
    >
      {/* Rótulo de seção ocultado a pedido — descomente para reexibir
      <AnimatedItem as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
        05 — Regiões
      </AnimatedItem>
      */}
      <RevealText
        as="h2"
        className="display-font mt-4 text-[clamp(2rem,4.5vw,3.6rem)] font-normal"
      >
        Atendemos a Grande Florianópolis
      </RevealText>

      <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {cidades.map((c, i) => (
          <AnimatedItem
            as="li"
            key={c}
            delay={(i % 3) * 0.06}
            className="group display-font cursor-default border-b border-line py-6 text-[clamp(1.4rem,3vw,2.2rem)] text-ink transition-colors hover:text-brand-blue"
          >
            <span className="inline-flex items-center gap-3">
              <span className="text-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                →
              </span>
              {c}
            </span>
          </AnimatedItem>
        ))}
      </ul>

      <AnimatedItem as="p" className="mt-8 text-lg text-ink-soft">
        Não encontrou sua cidade?{" "}
        <a
          href="https://api.whatsapp.com/send?phone=5548988803583&text=Ol%C3%A1!%20Voc%C3%AAs%20atendem%20na%20minha%20regi%C3%A3o%3F"
          target="_blank"
          rel="noopener"
          className="font-semibold text-brand-blue underline-offset-4 hover:underline"
        >
          Fale com a gente
        </a>{" "}
        — podemos atender você também.
      </AnimatedItem>
    </AnimatedSection>
  );
}
