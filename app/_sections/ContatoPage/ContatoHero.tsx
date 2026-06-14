import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/data/site";

type Canal = { key: string; value: string; href?: string };

const canais: Canal[] = [
  {
    key: "email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    key: "whatsapp",
    value: site.phone,
    href: `tel:${site.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    key: "localizacao",
    value: site.location,
  },
];

export async function ContatoHero() {
  const t = await getTranslations("contato.hero");
  return (
    <section className="relative overflow-hidden pt-[clamp(150px,20vh,230px)] pb-[clamp(48px,6vw,84px)]">
      {/* Glow radial — mesma linguagem dos heroes de Projetos e Institucional */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-60 [background:radial-gradient(110%_85%_at_82%_-6%,rgba(31,90,99,.42),transparent_56%),radial-gradient(85%_75%_at_8%_112%,rgba(95,168,60,.15),transparent_60%)]"
      />
      <div className="wrap relative z-[1]">
        <nav aria-label="Breadcrumb" className="reveal mb-[26px] flex items-center gap-[10px] text-[12px] uppercase tracking-[.08em] text-white/50">
          <Link href="/" className="text-white/55 transition-colors duration-200 hover:text-white">
            {t("breadcrumbHome")}
          </Link>
          <span aria-hidden className="inline-block h-px w-[14px] shrink-0 bg-white/30" />
          <span aria-current="page" className="text-white/85">{t("breadcrumbCurrent")}</span>
        </nav>
        <Kicker tone="on-dark-green" className="reveal">{t("kicker")}</Kicker>
        <h1 className="reveal reveal-2 mt-6 max-w-[18ch] font-news font-normal text-[clamp(2.3rem,5.8vw,4.8rem)] leading-[1.05] tracking-[-.018em] text-white">
          {t.rich("title", {
            em: (chunks) => <span className="italic text-green">{chunks}</span>,
          })}
        </h1>
        <p className="reveal reveal-3 mt-7 max-w-[52ch] text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-white/70">
          {t("intro")}
        </p>

        {/* Canais diretos em réguas editoriais */}
        <div className="reveal reveal-4 mt-[clamp(48px,6vw,84px)]">
          {canais.map((c, i) => {
            const inner = (
              <div className="grid grid-cols-1 items-baseline gap-2 py-[clamp(20px,2.4vw,30px)] md:grid-cols-[220px_1fr_auto] md:gap-[clamp(20px,3vw,48px)]">
                <span className="text-[11px] tracking-[.18em] uppercase text-on-dark-2">{t(`canais.${c.key}.label`)}</span>
                <span className="font-sans font-medium text-[clamp(19px,2vw,28px)] tracking-[-.015em] text-white">
                  {c.value}
                </span>
                <span className="hidden items-baseline gap-4 text-[12.5px] text-white/45 md:flex">
                  {t(`canais.${c.key}.hint`)}
                  {c.href && (
                    <span aria-hidden className="text-[16px] text-white/60 transition-transform duration-300 ease-brand group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </span>
              </div>
            );
            const rowCls = `block border-t border-[color:var(--line-dark)] ${i === canais.length - 1 ? "border-b" : ""} transition-[padding-left] duration-[400ms] ease-brand`;
            return c.href ? (
              <a key={c.key} href={c.href} className={`group ${rowCls} hover:pl-3`}>
                {inner}
              </a>
            ) : (
              <div key={c.key} className={rowCls}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
