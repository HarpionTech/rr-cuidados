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
import OrganicAmbient from "@/components/ui/OrganicAmbient";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="hero">
        <Hero />
        <Marquee />
        <div className="mesh-sections">
          <OrganicAmbient />
          <Sobre />
          <Cuidados />
          <Diferenciais />
          <Regioes />
        </div>
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
