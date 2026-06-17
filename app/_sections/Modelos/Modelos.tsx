import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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
        <div className="reveal mt-[clamp(34px,4vw,54px)] flex justify-center">
          <Link
            href="/institucional"
            className="group inline-flex items-center gap-3 border border-ink px-[30px] py-4 font-sans text-[12px] font-medium uppercase tracking-[.14em] text-ink transition-[background-color,color,border-color] duration-[400ms] ease-brand hover:bg-ink hover:text-white"
          >
            {t("cta")}
            <span aria-hidden className="transition-transform duration-[400ms] ease-brand group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
