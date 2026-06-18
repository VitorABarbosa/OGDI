import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { GalleryFlowBackground } from "@/components/ui/gallery-flow-background";

export async function InstitucionalSobre() {
  const t = await getTranslations("institucional.about");
  return (
    <section id="institucional-sobre" className="relative overflow-hidden bg-white py-section text-ink">
      <GalleryFlowBackground background="#FFFFFF" variant="institucional-sobre" />
      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,100px)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="reveal">
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-[18px] font-sans font-semibold text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.07] tracking-[-.03em] text-ink">
              {t.rich("heading", {
                em: (c) => <span className="font-news font-normal italic text-teal tracking-[-.005em]">{c}</span>,
              })}
            </h2>
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
