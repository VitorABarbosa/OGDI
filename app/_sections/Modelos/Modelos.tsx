import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { modelos } from "./modelos.data";
import { ModeloCard } from "./ModeloCard";

export async function Modelos() {
  const t = await getTranslations("home.modelos");
  return (
    <section id="modelos" className="py-section">
      <div className="wrap">
        <div className="max-w-[760px] reveal">
          <Kicker>{t("kicker")}</Kicker>
          <SectionHeading className="mt-[14px] mb-[18px]">{t.rich("heading", { br: () => <br /> })}</SectionHeading>
          <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-ink-2">{t("intro")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[22px] mt-[clamp(48px,6vw,72px)]">
          {modelos.map((m) => (
            <ModeloCard key={m.ring} m={m} idx={t(`cards.${m.ring}.idx`)} title={t(`cards.${m.ring}.title`)} desc={t(`cards.${m.ring}.desc`)} />
          ))}
        </div>
      </div>
    </section>
  );
}
