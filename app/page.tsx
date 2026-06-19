import { AppEQI } from "@/components/sections/AppEQI";
import { AutoridadeEQI } from "@/components/sections/AutoridadeEQI";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { FAQ } from "@/components/sections/FAQ";
import { Formulario } from "@/components/sections/Formulario";
import { Hero } from "@/components/sections/Hero";
import { HistoriaRafaela } from "@/components/sections/HistoriaRafaela";
import { JornadaCliente } from "@/components/sections/JornadaCliente";
import { PlataformaEQI } from "@/components/sections/PlataformaEQI";
import { QuemAtendemos } from "@/components/sections/QuemAtendemos";
import { SolucoesPatrimoniais } from "@/components/sections/SolucoesPatrimoniais";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AutoridadeEQI />
        <QuemAtendemos />
        <HistoriaRafaela />
        <SolucoesPatrimoniais />
        <Diferenciais />
        <JornadaCliente />
        <PlataformaEQI />
        <AppEQI />
        <Depoimentos />
        <Formulario />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
