import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpHero } from "@/app/_sections/EmpreendimentoPage/EmpHero";
import { EmpNav } from "@/app/_sections/EmpreendimentoPage/EmpNav";
import { EmpInfo } from "@/app/_sections/EmpreendimentoPage/EmpInfo";
import { EmpLocationStory } from "@/app/_sections/EmpreendimentoPage/EmpLocationStory";
import { EmpExperienceFlow } from "@/app/_sections/EmpreendimentoPage/EmpExperienceFlow";
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
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projetos.find((x) => x.slug === slug);
  return { title: p ? p.name : "Projeto" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = projetos.find((x) => x.slug === slug);
  if (!p) notFound();

  const idx = projetos.findIndex((x) => x.slug === p.slug);
  const others = [...projetos.slice(idx + 1), ...projetos.slice(0, idx)].slice(0, 3);

  const t = await getTranslations("empreendimento.cta");
  const tc = await getTranslations(`proj.${p.slug}.card`);
  const tnav = await getTranslations("empreendimento.nav");
  const listing = {
    status: tc("status"),
    segmento: tc("segmento"),
    local: tc("local"),
  };
  // Lista completa de âncoras; o EmpNav mostra só as cujas seções existem no DOM.
  const navItems = [
    { id: "sobre", label: tnav("sobre") },
    { id: "lazer", label: tnav("lazer") },
    { id: "galeria", label: tnav("galeria") },
    { id: "tour", label: tnav("tour") },
    { id: "obra", label: tnav("obra") },
    { id: "localizacao", label: tnav("localizacao") },
  ];

  return (
    <main>
      <RevealController />
      <EmpHero p={p} {...listing} />
      <EmpNav name={p.name} status={listing.status} items={navItems} />
      <EmpExperienceFlow>
        <EmpInfo p={p} {...listing} />
        <EmpLocationStory p={p} />
        <div data-flow-base>
          <EmpGaleria p={p} />
          <EmpAtuacao p={p} />
        </div>
      </EmpExperienceFlow>
      <EmpNeighborhoodMap p={p} />
      <EmpProximos others={others} />
      <CtaBand
        title={t("title", { name: p.name })}
        text={t("text")}
        ctaLabel={t("ctaLabel")}
        href="/contato"
      />
    </main>
  );
}
