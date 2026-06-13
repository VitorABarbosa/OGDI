import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { RevealController } from "@/components/Reveal/RevealController";
import { InvestidoresHero } from "@/app/_sections/InvestidoresPage/InvestidoresHero";
import { InvestidoresTese } from "@/app/_sections/InvestidoresPage/InvestidoresTese";
import { InvestidoresCiclo } from "@/app/_sections/InvestidoresPage/InvestidoresCiclo";
import { InvestidoresModelos } from "@/app/_sections/InvestidoresPage/InvestidoresModelos";
import { InvestidoresGovernanca } from "@/app/_sections/InvestidoresPage/InvestidoresGovernanca";
import { InvestidoresOperacoes } from "@/app/_sections/InvestidoresPage/InvestidoresOperacoes";
import { InvestidoresCta } from "@/app/_sections/InvestidoresPage/InvestidoresCta";
import { PageSectionRail } from "@/app/_sections/PageSectionRail";

const investidoresRailItems = [
  { id: "investidores-inicio", label: "Início" },
  { id: "investidores-tese", label: "Tese" },
  { id: "investidores-ciclo", label: "Ciclo" },
  { id: "investidores-modelos", label: "Modelos" },
  { id: "investidores-governanca", label: "Governança" },
  { id: "investidores-operacoes", label: "Operações" },
  { id: "investidores-contato", label: "Contato" },
] as const;

export const metadata: Metadata = {
  title: "Investidores",
  description:
    "Capital qualificado entra antes do lançamento — na fase em que o valor é criado. Conheça a tese, o ciclo da operação e os modelos de participação da Open Group.",
};

export default async function InvestidoresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <RevealController />
      <PageSectionRail items={investidoresRailItems} ariaLabel="Navegação visual da página investidores" />
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
