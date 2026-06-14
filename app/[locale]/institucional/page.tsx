import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RevealController } from "@/components/Reveal/RevealController";
import { GalleryFlowBackground } from "@/components/ui/gallery-flow-background";
import { InstitucionalHero } from "@/app/_sections/InstitucionalPage/InstitucionalHero";
import { InstitucionalSobre } from "@/app/_sections/InstitucionalPage/InstitucionalSobre";
import { InstitucionalGrupo } from "@/app/_sections/InstitucionalPage/InstitucionalGrupo";
import { InstitucionalManifesto } from "@/app/_sections/InstitucionalPage/InstitucionalManifesto";
import { InstitucionalOrigem } from "@/app/_sections/InstitucionalPage/InstitucionalOrigem";
import { InstitucionalLideranca } from "@/app/_sections/InstitucionalPage/InstitucionalLideranca";
import { InstitucionalAssinatura } from "@/app/_sections/InstitucionalPage/InstitucionalAssinatura";
import { PageSectionRail } from "@/app/_sections/PageSectionRail";

// Itens da régua de navegação: id da seção + chave de rótulo i18n.
const institucionalRailItems = [
  { id: "institucional-inicio", labelKey: "inicio" },
  { id: "institucional-sobre", labelKey: "sobre" },
  { id: "institucional-manifesto", labelKey: "manifesto" },
  { id: "institucional-origem", labelKey: "origem" },
  { id: "institucional-lideranca", labelKey: "lideranca" },
  { id: "institucional-grupo", labelKey: "grupo" },
  { id: "institucional-assinatura", labelKey: "assinatura" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "institucional.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function InstitucionalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("institucional.rail");
  const railItems = institucionalRailItems.map((item) => ({
    id: item.id,
    label: t(item.labelKey),
  }));
  return (
    <main>
      <RevealController />
      <PageSectionRail items={railItems} ariaLabel={t("ariaLabel")} />
      <InstitucionalHero />
      <InstitucionalSobre />
      <InstitucionalManifesto />
      <InstitucionalOrigem />
      {/* Linhas fluidas (igual à página de projeto) de Quem conduz ao fim do Nosso Grupo */}
      <div className="relative overflow-hidden bg-bg-soft">
        <GalleryFlowBackground skipSegments={2} />
        <div className="relative z-[2]">
          <InstitucionalLideranca />
          <InstitucionalGrupo />
        </div>
      </div>
      <InstitucionalAssinatura />
    </main>
  );
}
