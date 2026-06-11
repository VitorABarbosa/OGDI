import type { Metadata } from "next";
import { RevealController } from "@/components/Reveal/RevealController";
import { InstitucionalHero } from "@/app/_sections/InstitucionalPage/InstitucionalHero";
import { InstitucionalSobre } from "@/app/_sections/InstitucionalPage/InstitucionalSobre";
import { InstitucionalGrupo } from "@/app/_sections/InstitucionalPage/InstitucionalGrupo";
import { InstitucionalManifesto } from "@/app/_sections/InstitucionalPage/InstitucionalManifesto";
import { InstitucionalOrigem } from "@/app/_sections/InstitucionalPage/InstitucionalOrigem";
import { InstitucionalLideranca } from "@/app/_sections/InstitucionalPage/InstitucionalLideranca";
import { InstitucionalAssinatura } from "@/app/_sections/InstitucionalPage/InstitucionalAssinatura";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "A Open Group estrutura e desenvolve empreendimentos imobiliários, conduzindo oportunidades da conceituação ao lançamento. O valor nasce antes da obra.",
};

export default function InstitucionalPage() {
  return (
    <main>
      <RevealController />
      <InstitucionalHero />
      <InstitucionalSobre />
      <InstitucionalManifesto />
      <InstitucionalOrigem />
      <InstitucionalLideranca />
      <InstitucionalGrupo />
      <InstitucionalAssinatura />
    </main>
  );
}
