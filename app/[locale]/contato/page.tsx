import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { RevealController } from "@/components/Reveal/RevealController";
import { ContatoHero } from "@/app/_sections/ContatoPage/ContatoHero";
import { ContatoConversa } from "@/app/_sections/ContatoPage/ContatoConversa";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Apresente o ativo, o terreno ou o projeto. A Open Group faz a primeira leitura da oportunidade e retorna com os próximos passos.",
};

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
        <ContatoHero />
        <ContatoConversa />
      </div>
    </main>
  );
}
