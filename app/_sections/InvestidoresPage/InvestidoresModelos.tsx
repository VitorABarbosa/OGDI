import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";

const modeloKeys = ["scp", "permuta", "coinvest"] as const;

// Modelos como tipografia grande em colunas desencontradas — sem cards,
// sem caixas: hierarquia por escala e espaço.
export async function InvestidoresModelos() {
  const t = await getTranslations("investidores.modelos");
  return (
    <section id="investidores-modelos" className="bg-bg-soft py-[clamp(96px,12vw,180px)]">
      <div className="wrap">
        <div className="reveal max-w-[640px]">
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3.2vw,44px)] leading-[1.08] tracking-[-.025em]">
            {t.rich("heading", { br: () => <br /> })}
          </h2>
        </div>

        <div className="mt-[clamp(56px,7vw,104px)] grid grid-cols-1 gap-x-[clamp(40px,5vw,80px)] gap-y-[clamp(56px,7vw,96px)] md:grid-cols-3">
          {modeloKeys.map((key, i) => (
            <div key={key} className={`reveal reveal-${Math.min(i + 1, 5)} ${i === 1 ? "md:translate-y-[clamp(28px,4vw,64px)]" : ""} ${i === 2 ? "md:translate-y-[clamp(56px,8vw,128px)]" : ""}`}>
              <span className="block font-news text-[clamp(2.6rem,4.8vw,4.4rem)] leading-none tracking-[-.03em] text-teal">
                {t(`items.${key}.sigla`)}
              </span>
              <span className="mt-4 block h-px w-12 bg-green" />
              <h3 className="mt-5 font-sans font-semibold text-[clamp(17px,1.4vw,21px)] tracking-[-.015em] text-ink">
                {t(`items.${key}.nome`)}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[14.5px] leading-[1.62] text-ink-2">{t(`items.${key}.desc`)}</p>
            </div>
          ))}
        </div>

        <p className="reveal mt-[clamp(64px,9vw,140px)] text-[12.5px] tracking-[.04em] text-ink-3">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
