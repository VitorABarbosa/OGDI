import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { institucional } from "./institucional.data";

export async function InstitucionalLideranca() {
  const t = await getTranslations("institucional.lideranca");
  const { lideranca } = institucional;
  const leader = lideranca.leaders[0];
  const lk = `leaders.${leader.key}`;

  return (
    <section id="institucional-lideranca" className="py-section text-ink">
      <div className="wrap">
        <div className="reveal mb-[clamp(40px,5vw,68px)] max-w-[660px]">
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="my-4 font-sans font-semibold text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.1] tracking-[-.03em] text-ink">
            {t.rich("heading", {
              em: (c) => <span className="font-news font-normal italic text-teal">{c}</span>,
            })}
          </h2>
          <p className="max-w-[54ch] text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-ink-2">
            {t("intro")}
          </p>
        </div>

        <article className="reveal relative mx-auto lg:left-1/2 lg:h-[590px] lg:w-[min(1437px,calc(100vw-96px))] lg:max-w-none lg:-translate-x-[50%]">
          <div className="relative z-10 flex min-h-[420px] flex-col justify-center bg-[#242424] px-[clamp(28px,8vw,160px)] py-[clamp(42px,6vw,72px)] text-white lg:absolute lg:bottom-0 lg:left-[-108px] lg:h-[520px] lg:w-[calc(100%-298px)] lg:px-[clamp(70px,10vw,162px)] lg:pr-[clamp(230px,22vw,340px)] lg:py-0">
            <p className="mx-auto max-w-[700px] text-center font-news text-[clamp(1.45rem,2.25vw,2.05rem)] leading-[1.12] tracking-[-.02em]">
              {t(`${lk}.statement`)}
            </p>

            <blockquote className="relative mx-auto mt-[clamp(36px,4.2vw,60px)] max-w-[600px] px-[clamp(22px,3.2vw,58px)] text-center">
              <span
                aria-hidden
                className="absolute left-0 top-[-.22em] font-news text-[clamp(4.4rem,7.2vw,7.2rem)] leading-none text-white"
              >
                “
              </span>
              <div className="space-y-4 text-[clamp(.95rem,1.25vw,1.2rem)] font-medium leading-[1.28] tracking-[-.01em]">
                <p>{t(`${lk}.quote1`)}</p>
                <p>{t(`${lk}.quote2`)}</p>
              </div>
              <span
                aria-hidden
                className="absolute bottom-[-.62em] right-0 font-news text-[clamp(4.4rem,7.2vw,7.2rem)] leading-none text-white"
              >
                ”
              </span>
            </blockquote>

            <div className="mx-auto mt-[clamp(30px,3.4vw,44px)] max-w-[600px] text-center">
              <p className="font-sans text-[clamp(.86rem,1vw,1rem)] font-semibold leading-[1.4] tracking-[-.01em] text-white">
                {leader.name} - {t(`${lk}.role`)}
              </p>
            </div>
          </div>

          <div className="relative z-20 mx-auto mt-[-18px] h-[min(520px,118vw)] w-[min(100%,596px)] overflow-hidden bg-dark shadow-[0_28px_70px_rgba(13,25,28,.18)] lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:h-[520px] lg:w-[596px]">
            <MediaPlaceholder tone="t2" src={leader.image} alt={leader.name} />
          </div>
        </article>
      </div>
    </section>
  );
}
