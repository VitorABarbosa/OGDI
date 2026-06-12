import type { Metadata } from "next";
import { RevealController } from "@/components/Reveal/RevealController";
import { InvestidoresHero } from "@/app/_sections/InvestidoresPage/InvestidoresHero";
import { InvestidoresTese } from "@/app/_sections/InvestidoresPage/InvestidoresTese";
import { InvestidoresCiclo } from "@/app/_sections/InvestidoresPage/InvestidoresCiclo";
import { InvestidoresModelos } from "@/app/_sections/InvestidoresPage/InvestidoresModelos";
import { InvestidoresGovernanca } from "@/app/_sections/InvestidoresPage/InvestidoresGovernanca";
import { InvestidoresOperacoes } from "@/app/_sections/InvestidoresPage/InvestidoresOperacoes";
import { InvestidoresCta } from "@/app/_sections/InvestidoresPage/InvestidoresCta";

export const metadata: Metadata = {
  title: "Investidores",
  description:
    "Capital qualificado entra antes do lançamento — na fase em que o valor é criado. Conheça a tese, o ciclo da operação e os modelos de participação da Open Group.",
};

export default function InvestidoresPage() {
  return (
    <main>
      <RevealController />
      <InvestidoresHero />
      <InvestidoresTese />
      <InvestidoresCiclo />
      <InvestidoresModelos />
      <InvestidoresGovernanca />
      <InvestidoresOperacoes />
      <InvestidoresCta />
    </main>
  );
}
