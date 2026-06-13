import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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

const institucionalRailItems = [
  { id: "institucional-inicio", label: "Início" },
  { id: "institucional-sobre", label: "Sobre" },
  { id: "institucional-manifesto", label: "Manifesto" },
  { id: "institucional-origem", label: "Origem" },
  { id: "institucional-lideranca", label: "Quem conduz" },
  { id: "institucional-grupo", label: "Nosso Grupo" },
  { id: "institucional-assinatura", label: "Mensagem final" },
] as const;

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "A Open Group estrutura e desenvolve empreendimentos imobiliários, conduzindo oportunidades da conceituação ao lançamento. O valor nasce antes da obra.",
};

export default async function InstitucionalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <RevealController />
      <PageSectionRail items={institucionalRailItems} ariaLabel="Navegação visual da página institucional" />
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
