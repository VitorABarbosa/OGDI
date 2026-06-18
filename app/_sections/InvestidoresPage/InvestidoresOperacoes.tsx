import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { InvestidoresOperacoesCarousel } from "./InvestidoresOperacoesCarousel";

// Prova: as três operações em obra como cards visuais; o portfólio
// completo fica na página de projetos.
export async function InvestidoresOperacoes() {
  const t = await getTranslations("investidores.operacoes");
  return (
    <section id="investidores-operacoes" className="bg-bg-soft py-[clamp(40px,5vw,76px)]">
      <div className="wrap-wide">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3.2vw,44px)] leading-[1.08] tracking-[-.025em] text-ink">
              {t("heading")}
            </h2>
            <p className="mt-4 max-w-[48ch] text-[13.5px] leading-[1.6] text-ink-2">
              {t("intro")}
            </p>
          </div>
        </div>

        <InvestidoresOperacoesCarousel />

        <div className="reveal mt-[clamp(16px,2vw,28px)] flex justify-center">
          <Button href="/projetos" arrow>
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
