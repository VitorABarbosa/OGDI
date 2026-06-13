import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProjetosHero } from "@/app/_sections/ProjetosPage/ProjetosHero";
import { CaseGrid } from "@/app/_sections/ProjetosPage/CaseGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { RevealController } from "@/components/Reveal/RevealController";

export const metadata: Metadata = { title: "Projetos" };

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <RevealController />
      <ProjetosHero />
      <CaseGrid />
      <CtaBand
        title="Tem uma área ou projeto com potencial?"
        text="Apresente a oportunidade. Fazemos a primeira leitura e indicamos os próximos passos da operação."
        ctaLabel="Apresentar oportunidade"
        href="/contato"
      />
    </main>
  );
}
