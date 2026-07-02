import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedItem from "@/components/ui/AnimatedItem";
import RevealText from "@/components/ui/RevealText";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import InstagramIcon from "@/components/ui/InstagramIcon";

export default function CTA() {
  return (
    <AnimatedSection
      id="contato"
      className="cta-botanical relative overflow-hidden px-6 py-28 text-center text-ink md:px-[7vw] md:py-40"
    >
      <div className="mx-auto max-w-3xl">
        <AnimatedItem as="span" className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
          Vamos conversar
        </AnimatedItem>
        <RevealText
          as="h2"
          className="display-font mt-4 text-[clamp(2.2rem,6vw,4.4rem)] font-light leading-tight"
        >
          Dê a quem você ama o cuidado que ele merece.
        </RevealText>
        <AnimatedItem as="p" className="mx-auto mt-6 max-w-[52ch] text-lg text-ink-soft">
          Conte para nós sua necessidade. Vamos juntos desenhar o cuidado ideal —
          com tranquilidade, sem compromisso.
        </AnimatedItem>
        <AnimatedItem className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://api.whatsapp.com/send?phone=5548988803583&text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20conversa%20sobre%20cuidado%20domiciliar."
            target="_blank"
            rel="noopener"
            className="wa-gradient group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
          >
            <WhatsAppIcon className="transition-transform duration-300 group-hover:rotate-6" />
            Chamar no WhatsApp
          </a>
          <a
            href="https://www.instagram.com/rrcuidado/"
            target="_blank"
            rel="noopener"
            className="insta-gradient group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold text-white shadow-[0_12px_30px_-10px_rgba(214,41,118,0.6)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
          >
            <InstagramIcon className="transition-transform duration-300 group-hover:rotate-6" />
            @rrcuidado no Instagram
          </a>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  );
}
