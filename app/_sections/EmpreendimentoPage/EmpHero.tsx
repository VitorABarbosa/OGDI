import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { HeroParallaxImage } from "./HeroParallaxImage";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

const TEAM_WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5511985131748&text&type=phone_number&app_absent=0";

// Hero do empreendimento — imagem full-bleed, breadcrumb no topo e, ao centro,
// eyebrow · wordmark · resumo curto · linha de essenciais · CTAs. Já entrega o
// essencial "de cara" e convida a explorar (Conheça o empreendimento → #sobre).
export function EmpHero({
  p,
  status,
  segmento,
}: {
  p: Projeto;
  // Listing strings translated upstream (proj.<slug>.card). Fall back to PT data.
  status?: string;
  segmento?: string;
  local?: string;
}) {
  const t = useTranslations("empreendimento.hero");
  const tp = useTranslations("proj");
  const statusText = status ?? p.status;
  const segmentoText = segmento ?? p.segmento;

  const facts = tp.raw(`${p.slug}.facts`) as string[];
  const heroSummary = tp(`${p.slug}.heroSummary`);
  // Essenciais = facts sem o status (que já aparece no eyebrow).
  const essentials = (facts ?? []).slice(1);

  return (
    <section
      data-header-dark
      className="relative overflow-hidden bg-dark h-[clamp(580px,90vh,920px)]"
    >
      {/* Imagem full-bleed (portaria/entrada) com parallax leve. */}
      <HeroParallaxImage tone={p.tone} src={p.heroImage ?? p.image} alt={p.heroImage ?? p.image ? p.name : ""} />

      {/* Camada preta 40% — legibilidade das informações */}
      <div aria-hidden className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />

      {/* Scrim — uniforme, para o conteúdo central */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none [background:linear-gradient(180deg,rgba(8,12,13,.62)_0%,rgba(8,12,13,.3)_42%,rgba(8,12,13,.72)_100%)]"
      />

      {/* Breadcrumb — topo */}
      <nav
        aria-label={t("breadcrumbAria")}
        className="reveal absolute left-0 right-0 top-[clamp(94px,11vw,128px)] z-[3] px-pad-x"
      >
        <div className="mx-auto flex max-w-[1440px] items-center gap-[10px] text-[11px] uppercase tracking-[.16em] text-white/70">
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            {t("home")}
          </Link>
          <span aria-hidden className="inline-block h-px w-[14px] shrink-0 bg-white/30" />
          <Link href="/projetos" className="transition-colors duration-200 hover:text-white">
            {t("projetos")}
          </Link>
          <span aria-hidden className="inline-block h-px w-[14px] shrink-0 bg-white/30" />
          <span aria-current="page" className="text-white/90">
            {p.name}
          </span>
        </div>
      </nav>

      {/* Conteúdo centralizado — pointer-events-none p/ não bloquear a breadcrumb;
          os elementos clicáveis (CTAs) reativam com pointer-events-auto. */}
      <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center px-pad-x text-center text-white">
        <span className="reveal text-[11px] font-medium uppercase tracking-[.28em] text-green">
          {segmentoText} · {statusText}
        </span>

        <h1 className="reveal reveal-2 mt-[clamp(12px,1.5vw,20px)] font-serif font-normal text-[clamp(46px,8vw,120px)] leading-[.96] tracking-[-.01em]">
          {p.name}
        </h1>

        {heroSummary && (
          <p className="reveal reveal-3 mt-[clamp(14px,1.8vw,24px)] max-w-[56ch] text-[clamp(14px,1.25vw,18px)] leading-[1.6] text-white/85">
            {heroSummary}
          </p>
        )}

        {/* Essenciais logo de cara */}
        <div className="reveal reveal-4 mt-[clamp(16px,2vw,26px)] flex flex-wrap items-center justify-center gap-y-[8px] text-[11.5px] uppercase tracking-[.16em] text-white/80">
          {essentials.map((fact, i) => (
            <span key={`${fact}-${i}`} className="flex items-center">
              {i > 0 && <span aria-hidden className="mx-[14px] h-[4px] w-[4px] rounded-full bg-green" />}
              {p.localTbd && i === essentials.length - 1 ? (
                <span className="italic normal-case text-white/55">{fact}</span>
              ) : (
                fact
              )}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="reveal reveal-5 pointer-events-auto mt-[clamp(24px,3vw,40px)] flex flex-wrap items-center justify-center gap-4">
          <Button
            href={p.closingStatement?.ctaHref ?? "#sobre"}
            target={p.closingStatement?.ctaHref ? "_blank" : undefined}
            variant="on-dark"
            arrow
          >
            {t("cta")}
          </Button>
          <Button href={TEAM_WHATSAPP_URL} target="_blank" variant="light">
            {t("ctaContato")}
          </Button>
        </div>
      </div>

      {/* Indicador de scroll — chevron animado que leva ao conteúdo */}
      <a
        href="#sobre"
        aria-label={t("scrollCue")}
        className="absolute bottom-[clamp(20px,3vw,40px)] left-1/2 z-[3] grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-white/25 text-white/70 backdrop-blur-sm transition-colors duration-300 hover:border-white/60 hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="h-5 w-5 motion-safe:animate-bounce"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
