import { Hero } from "@/app/_sections/Hero/Hero";
import { Projetos } from "@/app/_sections/Projetos/Projetos";
import { Atuacao } from "@/app/_sections/Atuacao/Atuacao";
import { Modelos } from "@/app/_sections/Modelos/Modelos";
import { Contato } from "@/app/_sections/Contato/Contato";
import { PageSectionRail } from "@/app/_sections/PageSectionRail";
import { IntroVideo } from "@/components/Intro/IntroVideo";
import { RevealController } from "@/components/Reveal/RevealController";
import { getTranslations, setRequestLocale } from "next-intl/server";

const homeRailIds = ["top", "projetos", "atuacao", "modelos", "contato"] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home.rail");
  const homeRailItems = homeRailIds.map((id) => ({ id, label: t(id) }));
  return (
    <>
      <IntroVideo />
      <RevealController />
      <main>
        <PageSectionRail
          items={homeRailItems}
          ariaLabel={t("ariaLabel")}
          revealAfter={{ id: "top", viewportRatio: 0.48 }}
        />
        <Hero />
        <Projetos />
        <Atuacao />
        <Modelos />
        <Contato />
      </main>
    </>
  );
}
