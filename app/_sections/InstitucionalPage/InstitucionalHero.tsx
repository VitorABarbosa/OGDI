import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import { Kicker } from "@/components/ui/Kicker";
import { InstitucionalHeroWaves } from "./InstitucionalHeroWaves";
import styles from "./InstitucionalHero.module.css";

export async function InstitucionalHero() {
  const t = await getTranslations("institucional.hero");
  return (
    <section
      id="institucional-inicio"
      data-header-dark
      className="relative flex min-h-svh items-center overflow-hidden bg-dark"
    >
      <InstitucionalHeroWaves />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[.62] [background:radial-gradient(92%_72%_at_84%_-8%,rgba(31,90,99,.46),transparent_56%),radial-gradient(82%_70%_at_6%_110%,rgba(95,168,60,.17),transparent_60%)]"
      />
      <div className="wrap relative z-[2] w-full">
        <div className="pt-[clamp(130px,18vh,200px)] pb-[clamp(96px,14vh,160px)]">
          <nav
            aria-label="Breadcrumb"
            className="mb-[30px] flex items-center gap-[10px] text-[12px] uppercase tracking-[.08em] text-white/50"
          >
            <Link href="/" className="text-white/55 transition-colors duration-200 hover:text-white">
              {t("breadcrumbHome")}
            </Link>
            <span aria-hidden className="inline-block h-px w-[14px] shrink-0 bg-white/30" />
            <span aria-current="page" className="text-white/85">
              {t("breadcrumbCurrent")}
            </span>
          </nav>

          <Kicker tone="on-dark-green">{t("kicker")}</Kicker>

          <h1 className="mt-[clamp(22px,3vw,34px)] max-w-[30ch] font-news font-normal text-white text-[clamp(2.1rem,6.4vw,5.6rem)] leading-[1.07] tracking-[-.018em]">
            <span className="reveal block" style={{ transitionDelay: "0s" }}>
              {t.rich("title1", {
                br: () => <br />,
                em: (c) => <span className="italic text-green">{c}</span>,
              })}
            </span>
            <span className="reveal block whitespace-nowrap" style={{ transitionDelay: ".2s" }}>
              {t("title2")}
            </span>
          </h1>
        </div>
      </div>

      <div className="absolute bottom-8 left-pad-x z-[2] flex items-center gap-[14px] text-[10.5px] uppercase tracking-[.22em] text-white/50">
        <span aria-hidden className={`${styles.cueLine} h-[50px] w-px bg-white/50`} />
        {t("cue")}
      </div>

      <a
        href="#institucional-sobre"
        aria-label="Ir para a próxima seção"
        className={`${styles.scrollAction} absolute bottom-8 left-1/2 z-[3] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/25 bg-white/[.07] text-white/80 backdrop-blur-sm transition-[background-color,border-color,color] duration-300 ease-brand hover:border-green/70 hover:bg-green/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-dark`}
      >
        <span className={styles.scrollBox} aria-hidden>
          <ChevronDown size={24} strokeWidth={1.8} />
        </span>
      </a>
    </section>
  );
}
