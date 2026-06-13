import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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
  { id: "clientes-inicio", label: "Início" },
  { id: "clientes-perfis", label: "Perfis" },
  { id: "clientes-relacao", label: "Formas de relação" },
  { id: "clientes-compromissos", label: "Compromissos" },
  { id: "clientes-operacoes", label: "Operações" },
  { id: "clientes-perguntas", label: "Perguntas" },
  { id: "clientes-contato", label: "Contato" },
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
  return (
    <main>
      <RevealController />
      <PageSectionRail items={clientesRailItems} ariaLabel="Navegação visual da página clientes" />
      <ClientesHero />
      <ClientesPerfis />
      <ClientesRelacao />
      <ClientesCompromissos />
      <ClientesOperacoes />
      <ClientesPerguntas />
      <div id="clientes-contato">
        <CtaBand
          title="Tem uma operação para estruturar?"
          text="Apresente a oportunidade — fazemos a primeira leitura e indicamos os próximos passos."
          ctaLabel="Falar com a Open Group"
          href="/contato"
        />
      </div>
    </main>
  );
}
