import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpHero } from "@/app/_sections/EmpreendimentoPage/EmpHero";
import { EmpInfo } from "@/app/_sections/EmpreendimentoPage/EmpInfo";
import { EmpLocationStory } from "@/app/_sections/EmpreendimentoPage/EmpLocationStory";
import { EmpExperienceFlow } from "@/app/_sections/EmpreendimentoPage/EmpExperienceFlow";
import { EmpProductStory } from "@/app/_sections/EmpreendimentoPage/EmpProductStory";
import { EmpGaleria } from "@/app/_sections/EmpreendimentoPage/EmpGaleria";
import { EmpAtuacao } from "@/app/_sections/EmpreendimentoPage/EmpAtuacao";
import { EmpNeighborhoodMap } from "@/app/_sections/EmpreendimentoPage/EmpNeighborhoodMap";
import { EmpProximos } from "@/app/_sections/EmpreendimentoPage/EmpProximos";
import { CtaBand } from "@/components/ui/CtaBand";
import { RevealController } from "@/components/Reveal/RevealController";

export const dynamicParams = false;

export function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projetos.find((x) => x.slug === slug);
  return { title: p ? p.name : "Projeto" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projetos.find((x) => x.slug === slug);
  if (!p) notFound();

  const idx = projetos.findIndex((x) => x.slug === p.slug);
  const others = [...projetos.slice(idx + 1), ...projetos.slice(0, idx)].slice(0, 3);

  return (
    <main>
      <RevealController />
      <EmpHero p={p} />
      <EmpInfo p={p} />
      <EmpLocationStory p={p} />
      <EmpExperienceFlow>
        <EmpProductStory p={p} />
        <EmpGaleria p={p} />
        <EmpAtuacao p={p} />
      </EmpExperienceFlow>
      <EmpNeighborhoodMap p={p} />
      <EmpProximos others={others} />
      <CtaBand
        title={`Interesse no ${p.name}?`}
        text="Fale com a equipe da Open Group e receba mais informações sobre o empreendimento e a operação."
        ctaLabel="Falar com a equipe"
        href="/#contato"
      />
    </main>
  );
}
