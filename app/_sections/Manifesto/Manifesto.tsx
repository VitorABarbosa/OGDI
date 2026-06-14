import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import styles from "./Manifesto.module.css";

export async function Manifesto() {
  const t = await getTranslations("home.manifesto");
  const em = (chunks: ReactNode) => <span className="text-manifesto-em italic">{chunks}</span>;
  return (
    <section id="institucional" className="relative overflow-clip bg-manifesto text-white py-[clamp(74px,10vw,132px)]">
      <div className={styles.arcs} aria-hidden />
      <div className="wrap relative z-[2]">
        <div className="max-w-[1180px]">
          <Kicker tone="on-dark-green">{t("kicker")}</Kicker>
          <p className="mt-[clamp(30px,4.2vw,58px)] font-news font-normal text-[clamp(1.65rem,2.78vw,3.15rem)] leading-[1.28] tracking-[-.01em] text-white max-w-none max-md:text-[clamp(1.7rem,8vw,2.35rem)]">
            <span className="block whitespace-nowrap max-md:whitespace-normal">{t.rich("line1", { em })}</span>
            <span className="block whitespace-nowrap max-md:whitespace-normal">{t.rich("line2", { em })}</span>
            <span className="block whitespace-nowrap max-md:whitespace-normal">{t.rich("line3", { em })}</span>
          </p>
          <div className="mt-[clamp(42px,5.2vw,68px)] pt-[clamp(30px,4.2vw,54px)] border-t border-white/14">
            <h2 className="font-news font-normal text-[clamp(1.65rem,2.05vw,2.25rem)] leading-[1.12] tracking-[-.01em]">
              {t("whatTitle")}
            </h2>
            <div className="mt-[clamp(30px,4vw,48px)] max-w-[900px] space-y-[clamp(16px,2vw,24px)] text-[clamp(.98rem,1.32vw,1.25rem)] leading-[1.62] text-white/78">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
              <p>{t("body3")}</p>
            </div>
            <div className="mt-[clamp(28px,3.4vw,42px)]">
              <Button href="/institucional" variant="light" arrow>
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
