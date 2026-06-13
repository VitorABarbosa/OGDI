import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { institucional } from "./institucional.data";

export async function InstitucionalSobre() {
  const t = await getTranslations("institucional.about");
  const { about } = institucional;
  return (
    <section id="institucional-sobre" className="bg-white py-section text-ink">
      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,100px)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="reveal">
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-[18px] font-sans font-semibold text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.07] tracking-[-.03em] text-ink">
              {t.rich("heading", {
                em: (c) => <span className="font-news font-normal italic text-teal tracking-[-.005em]">{c}</span>,
              })}
            </h2>
            <div className="mt-[28px] flex flex-wrap gap-[10px]">
              {about.models.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-[color:var(--line)] px-4 py-[9px] text-[12.5px] tracking-[.03em] text-ink-2"
                >
                  <b className="font-semibold text-ink">{t(`models.${m}.strong`)}</b> {t(`models.${m}.rest`)}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal reveal-2 [&_p]:mb-5 [&_p]:max-w-[62ch] [&_p]:text-[clamp(15px,1.25vw,18px)] [&_p]:leading-[1.72] [&_p]:text-ink-2 [&_p:last-child]:mb-0 [&_.em]:font-medium [&_.em]:text-ink">
            <p>{t.rich("body1", { em: (c) => <span className="em">{c}</span> })}</p>
            <p>{t("body2")}</p>
            <p>{t("body3")}</p>
            <p>{t.rich("body4", { em: (c) => <span className="em">{c}</span> })}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
