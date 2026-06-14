import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";

const pilarIds = ["01", "02", "03"] as const;

// Governança: a autoridade da condução. Coluna esquerda fixa com o
// statement; à direita, os três pilares em réguas.
export async function InvestidoresGovernanca() {
  const t = await getTranslations("investidores.governanca");
  return (
    <section id="investidores-governanca" className="bg-paper py-[clamp(88px,11vw,160px)]">
      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,96px)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal lg:sticky lg:top-[120px]">
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3.4vw,46px)] leading-[1.08] tracking-[-.025em] text-ink">
              {t.rich("heading", { br: () => <br /> })}
            </h2>
            <p className="mt-6 max-w-[44ch] text-[clamp(15px,1.12vw,18px)] leading-[1.65] text-ink-2">
              {t("intro")}
            </p>
          </div>

          <div className="reveal reveal-2 flex flex-col">
            {pilarIds.map((idx, i) => (
              <div
                key={idx}
                className={`grid grid-cols-[52px_1fr] gap-[22px] border-t border-[color:var(--line)] py-[clamp(24px,3vw,34px)] ${i === pilarIds.length - 1 ? "border-b" : ""} transition-[padding-left] duration-[400ms] ease-brand hover:pl-3`}
              >
                <span className="font-sans text-[17px] font-semibold leading-none tracking-[.02em] text-green tabular-nums">{idx}</span>
                <div>
                  <h3 className="m-0 mb-2 font-sans font-semibold text-[clamp(18px,1.5vw,23px)] tracking-[-.015em] text-ink">{t(`items.${idx}.title`)}</h3>
                  <p className="m-0 max-w-[480px] text-[14.5px] leading-[1.6] text-ink-2">{t(`items.${idx}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
