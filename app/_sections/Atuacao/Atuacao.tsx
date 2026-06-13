import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { atuacaoSteps, atuacaoTagKeys } from "./atuacao.data";
import { AtuacaoRow } from "./AtuacaoRow";
import { AtuacaoWatermark } from "./AtuacaoWatermark";

export async function Atuacao() {
  const t = await getTranslations("home.atuacao");
  return (
    <section id="atuacao" className="relative py-section bg-bg-soft">
      <AtuacaoWatermark />
      <div className="wrap relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[clamp(40px,6vw,96px)] items-start">
          <div className="lg:sticky lg:top-[120px] flex flex-col gap-[22px] reveal">
            <Kicker>{t("kicker")}</Kicker>
            <SectionHeading>{t.rich("heading", { br: () => <br /> })}</SectionHeading>
            <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-ink-2">{t("intro")}</p>
            <div className="mt-[26px] flex flex-wrap gap-2 text-[13px] text-ink-3">
              {atuacaoTagKeys.map((k) => <span key={k} className="px-[13px] py-[7px] border border-[color:var(--line-2)] text-[12px] tracking-[.02em]">{t(`tags.${k}`)}</span>)}
            </div>
          </div>
          <div className="flex flex-col reveal reveal-2">
            {atuacaoSteps.map((s, i) => (
              <AtuacaoRow key={s.idx} step={s} title={t(`steps.${s.idx}.title`)} desc={t(`steps.${s.idx}.desc`)} last={i === atuacaoSteps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
