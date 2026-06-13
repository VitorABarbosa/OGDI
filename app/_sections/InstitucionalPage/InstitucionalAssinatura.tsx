import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { AssinaturaWatermark } from "./AssinaturaWatermark";

export async function InstitucionalAssinatura() {
  const t = await getTranslations("institucional.assinatura");
  return (
    <section
      id="institucional-assinatura"
      className="relative overflow-hidden bg-dark py-[clamp(96px,13vw,184px)] text-white"
    >
      <AssinaturaWatermark />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] [background:radial-gradient(70%_60%_at_50%_50%,transparent_40%,rgba(18,22,23,.6)_100%)]"
      />
      <div className="wrap relative z-[2] text-center">
        <Kicker tone="on-dark-green" className="mb-[26px] justify-center">{t("kicker")}</Kicker>
        <h2 className="font-news font-normal text-[clamp(2.1rem,5.6vw,4.6rem)] leading-[1.05] tracking-[-.018em] text-white">
          {t.rich("heading", {
            em: (c) => <span className="italic text-green">{c}</span>,
            br: () => <br />,
          })}
        </h2>
        <p className="mx-auto mt-6 max-w-[48ch] text-[15px] leading-[1.62] text-white/70">{t("sub")}</p>
        <div className="mt-[42px] flex flex-wrap justify-center gap-4">
          <Button href="/projetos" variant="light" arrow>
            {t("ctaProjetos")}
          </Button>
          <Button href="/contato" variant="on-dark" arrow>
            {t("ctaContato")}
          </Button>
        </div>
      </div>
    </section>
  );
}
