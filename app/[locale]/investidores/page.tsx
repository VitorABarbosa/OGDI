import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RevealController } from "@/components/Reveal/RevealController";
import { InvestidoresHero } from "@/app/_sections/InvestidoresPage/InvestidoresHero";
import { InvestidoresTese } from "@/app/_sections/InvestidoresPage/InvestidoresTese";
import { InvestidoresCiclo } from "@/app/_sections/InvestidoresPage/InvestidoresCiclo";
import { InvestidoresModelos } from "@/app/_sections/InvestidoresPage/InvestidoresModelos";
import { InvestidoresGovernanca } from "@/app/_sections/InvestidoresPage/InvestidoresGovernanca";
import { InvestidoresOperacoes } from "@/app/_sections/InvestidoresPage/InvestidoresOperacoes";
import { InvestidoresPerguntas } from "@/app/_sections/InvestidoresPage/InvestidoresPerguntas";
import { InvestidoresCta } from "@/app/_sections/InvestidoresPage/InvestidoresCta";
import { PageSectionRail } from "@/app/_sections/PageSectionRail";

// Itens da régua de navegação: id da seção + chave de rótulo i18n.
const investidoresRailItems = [
  { id: "investidores-inicio", labelKey: "inicio" },
  { id: "investidores-tese", labelKey: "tese" },
  { id: "investidores-ciclo", labelKey: "ciclo" },
  { id: "investidores-modelos", labelKey: "modelos" },
  { id: "investidores-governanca", labelKey: "governanca" },
  { id: "investidores-operacoes", labelKey: "operacoes" },
  { id: "investidores-perguntas", labelKey: "perguntas" },
  { id: "investidores-contato", labelKey: "contato" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "investidores.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function InvestidoresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("investidores.rail");
  const railItems = investidoresRailItems.map((it) => ({ id: it.id, label: t(it.labelKey) }));
  return (
    <main>
      <RevealController />
      <PageSectionRail items={railItems} ariaLabel={t("ariaLabel")} />
      <InvestidoresHero />
      <InvestidoresTese />
      <InvestidoresCiclo />
      <InvestidoresModelos />
      <InvestidoresGovernanca />
      <InvestidoresOperacoes />
      <InvestidoresPerguntas />
      <InvestidoresCta />
    </main>
  );
}
