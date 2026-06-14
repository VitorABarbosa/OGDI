import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Kicker } from "@/components/ui/Kicker";
import { InvestidoresCurva } from "./InvestidoresCurva";

// Minimalismo exagerado: um único statement gigante, espaço negativo
// extremo, verde como único acento — e a curva de valor ao fundo.
export async function InvestidoresHero() {
  const t = await getTranslations("investidores.hero");
  return (
    <section
      id="investidores-inicio"
      data-header-dark
      className="relative flex min-h-svh items-center overflow-hidden bg-dark text-white"
    >
      <InvestidoresCurva />
      <div className="wrap relative z-[1] w-full py-[clamp(150px,18vh,220px)]">
        <nav aria-label="Breadcrumb" className="reveal mb-[26px] flex items-center gap-[10px] text-[12px] uppercase tracking-[.08em] text-white/50">
          <Link href="/" className="text-white/55 transition-colors duration-200 hover:text-white">
            {t("breadcrumbHome")}
          </Link>
          <span aria-hidden className="inline-block h-px w-[14px] shrink-0 bg-white/30" />
          <span aria-current="page" className="text-white/85">{t("breadcrumbCurrent")}</span>
        </nav>
        <Kicker tone="on-dark-green" className="reveal">{t("kicker")}</Kicker>
        <h1 className="reveal reveal-2 mt-[clamp(22px,3vh,38px)] font-news font-normal text-[clamp(1.9rem,4.4vw,4.4rem)] leading-[1.08] tracking-[-.018em]">
          {t.rich("title", {
            br: () => <br />,
            em: (chunks) => <span className="italic text-green">{chunks}</span>,
          })}
        </h1>
        <p className="reveal reveal-3 mt-[clamp(36px,6vh,64px)] max-w-[44ch] text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-white/70">
          {t("intro")}
        </p>
      </div>
      {/* Marcador de scroll no canto inferior direito — área livre da curva */}
      <span
        aria-hidden
        className="reveal reveal-4 absolute bottom-[clamp(30px,5vh,56px)] right-pad-x z-[1] hidden items-center gap-3 text-[11px] uppercase tracking-[.22em] text-white/40 md:flex"
      >
        {t("scrollHint")}
        <span className="inline-block h-10 w-px bg-white/25" />
      </span>
    </section>
  );
}
