import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Sobre from "@/components/sections/Sobre";
import Cuidados from "@/components/sections/Cuidados";
import Diferenciais from "@/components/sections/Diferenciais";
// Depoimentos removido temporariamente — será adicionado depois (com relatos reais)
// import Depoimentos from "@/components/sections/Depoimentos";
import Regioes from "@/components/sections/Regioes";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/sections/WhatsAppFloat";
import BotanicalImageReveal from "@/components/ui/BotanicalImageReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="hero">
        <Hero />
        <Marquee />
        <div className="editorial-sections">
          <BotanicalImageReveal />
          <Sobre />
          <Cuidados />
          <Diferenciais />
          <Regioes />
          <CTA />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
