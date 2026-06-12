import { Hero } from "./_sections/Hero/Hero";
import { Projetos } from "./_sections/Projetos/Projetos";
import { Atuacao } from "./_sections/Atuacao/Atuacao";
import { Modelos } from "./_sections/Modelos/Modelos";
import { Manifesto } from "./_sections/Manifesto/Manifesto";
import { Clientes } from "./_sections/Clientes/Clientes";
import { Contato } from "./_sections/Contato/Contato";
import { PageSectionRail } from "./_sections/PageSectionRail";
import { IntroVideo } from "@/components/Intro/IntroVideo";
import { RevealController } from "@/components/Reveal/RevealController";

const homeRailItems = [
  { id: "top", label: "Início" },
  { id: "projetos", label: "Projetos" },
  { id: "atuacao", label: "Atuação" },
  { id: "modelos", label: "Modelos" },
  { id: "institucional", label: "Manifesto" },
  { id: "parceiros", label: "Parceiros" },
  { id: "contato", label: "Contato" },
] as const;

export default function HomePage() {
  return (
    <>
      <IntroVideo />
      <RevealController />
      <main>
        <PageSectionRail
          items={homeRailItems}
          ariaLabel="Navegação visual da página inicial"
          revealAfter={{ id: "top", viewportRatio: 0.48 }}
        />
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
