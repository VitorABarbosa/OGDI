import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RevealController } from "@/components/Reveal/RevealController";
import { ContatoSection } from "@/app/_sections/ContatoPage/ContatoSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contato.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContatoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <RevealController />
      {/* Página inteira sobre bg-dark: o marcador mantém a header branca
          enquanto o conteúdo estiver sob ela */}
      <div data-header-dark className="bg-dark">
        <ContatoSection />
      </div>
    </main>
  );
}
