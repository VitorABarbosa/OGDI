import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RevealController } from "@/components/Reveal/RevealController";
import { PageSectionRail } from "@/app/_sections/PageSectionRail";
import { CtaBand } from "@/components/ui/CtaBand";
import { ClientesHero } from "@/app/_sections/ClientesPage/ClientesHero";
import { ClientesPerfis } from "@/app/_sections/ClientesPage/ClientesPerfis";
import { ClientesRelacao } from "@/app/_sections/ClientesPage/ClientesRelacao";
import { ClientesCompromissos } from "@/app/_sections/ClientesPage/ClientesCompromissos";
import { ClientesOperacoes } from "@/app/_sections/ClientesPage/ClientesOperacoes";
import { ClientesPerguntas } from "@/app/_sections/ClientesPage/ClientesPerguntas";

const clientesRailItems = [
  { id: "clientes-inicio", key: "inicio" },
  { id: "clientes-perfis", key: "perfis" },
  { id: "clientes-relacao", key: "relacao" },
  { id: "clientes-compromissos", key: "compromissos" },
  { id: "clientes-operacoes", key: "operacoes" },
  { id: "clientes-perguntas", key: "perguntas" },
  { id: "clientes-contato", key: "contato" },
] as const;

export const metadata: Metadata = {
  title: "Clientes",
  description:
    "Incorporadoras, construtoras, fundos e proprietários de área que estruturam suas operações com a Open Group — da origem ao lançamento.",
};

export default async function ClientesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("clientes");
  const railItems = clientesRailItems.map((it) => ({ id: it.id, label: t(`rail.${it.key}`) }));
  return (
    <main>
      <RevealController />
      <PageSectionRail items={railItems} ariaLabel={t("rail.ariaLabel")} />
      <ClientesHero />
      <ClientesPerfis />
      <ClientesRelacao />
      <ClientesCompromissos />
      <ClientesOperacoes />
      <ClientesPerguntas />
      <div id="clientes-contato">
        <CtaBand
          title={t("cta.title")}
          text={t("cta.text")}
          ctaLabel={t("cta.ctaLabel")}
          href="/contato"
        />
      </div>
    </main>
  );
}
