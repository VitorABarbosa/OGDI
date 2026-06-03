import { Hero } from "./_sections/Hero/Hero";
import { Projetos } from "./_sections/Projetos/Projetos";
import { Atuacao } from "./_sections/Atuacao/Atuacao";
import { Modelos } from "./_sections/Modelos/Modelos";
import { Manifesto } from "./_sections/Manifesto/Manifesto";
import { Clientes } from "./_sections/Clientes/Clientes";
import { Contato } from "./_sections/Contato/Contato";
import { IntroOverlay } from "@/components/Intro/IntroOverlay";
import { RevealController } from "@/components/Reveal/RevealController";

export default function HomePage() {
  return (
    <>
      <IntroOverlay />
      <RevealController />
      <main>
        <Hero />
        <Projetos />
        <Atuacao />
        <Modelos />
        <Manifesto />
        <Clientes />
        <Contato />
      </main>
    </>
  );
}
