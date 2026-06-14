import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjetosHero } from "@/app/_sections/ProjetosPage/ProjetosHero";
import { CaseGrid } from "@/app/_sections/ProjetosPage/CaseGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { RevealController } from "@/components/Reveal/RevealController";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projetos.meta" });
  return { title: t("title") };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projetos.cta");
  return (
    <main>
      <RevealController />
      <ProjetosHero />
      <CaseGrid />
      <CtaBand
        title={t("title")}
        text={t("text")}
        ctaLabel={t("ctaLabel")}
        href="/contato"
      />
    </main>
  );
}
