import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { GalleryFlowBackground } from "@/components/ui/gallery-flow-background";

const compromissoIds = ["01", "02", "03", "04"] as const;

// O que sustenta a relação — a autoridade da condução em réguas, no mesmo
// desenho das réguas de Atuação da home.
export async function ClientesCompromissos() {
  const t = await getTranslations("clientes.compromissos");

  return (
    <section id="clientes-compromissos" className="relative overflow-hidden bg-paper py-[clamp(88px,11vw,160px)]">
      {/* Linha fluida serena, espelhada em relação à do hero */}
      <GalleryFlowBackground background="#FFFFFF" variant="clientes-compromissos" />
      <div className="wrap relative z-[2]">
        <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,96px)] lg:grid-cols-[0.9fr_1.1fr]">
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
            {compromissoIds.map((idx, i) => (
              <div
                key={idx}
                className={`grid grid-cols-[52px_1fr] gap-[22px] border-t border-[color:var(--line)] py-[clamp(22px,2.8vw,32px)] ${i === compromissoIds.length - 1 ? "border-b" : ""} transition-[padding-left] duration-[400ms] ease-brand hover:pl-3`}
              >
                <span className="font-sans text-[17px] font-semibold leading-none tracking-[.02em] text-green tabular-nums">{idx}</span>
                <div>
                  <h3 className="m-0 mb-2 font-sans font-semibold text-[clamp(17px,1.45vw,22px)] tracking-[-.015em] text-ink">{t(`items.${idx}.title`)}</h3>
                  <p className="m-0 max-w-[500px] text-[14px] leading-[1.6] text-ink-2">{t(`items.${idx}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
