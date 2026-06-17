import Link from "next/link";
import { useTranslations } from "next-intl";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

// Hero do empreendimento — padrão da referência: imagem full-bleed, breadcrumb
// no topo, conteúdo centralizado (eyebrow · wordmark · sub-localização) e um
// "Role" no rodapé. Summary/facts/CTA saíram daqui — voltam nas seções Ficha/Sobre.
export function EmpHero({
  p,
  status,
  segmento,
  local,
}: {
  p: Projeto;
  // Listing strings translated upstream (projetos.cards). Fall back to PT data.
  status?: string;
  segmento?: string;
  local?: string;
}) {
  const t = useTranslations("empreendimento.hero");
  const statusText = status ?? p.status;
  const segmentoText = segmento ?? p.segmento;
  const localText = local ?? p.local;
  return (
    <section
      data-header-dark
      className="relative overflow-hidden bg-dark h-[clamp(580px,90vh,920px)]"
    >
      {/* Imagem full-bleed */}
      <MediaPlaceholder tone={p.tone} src={p.image} alt={p.image ? p.name : ""} />

      {/* Scrim — uniforme, para o conteúdo central */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none [background:linear-gradient(180deg,rgba(8,12,13,.58)_0%,rgba(8,12,13,.22)_40%,rgba(8,12,13,.68)_100%)]"
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

      {/* Conteúdo centralizado */}
      <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-pad-x text-center text-white">
        <span className="reveal text-[11px] font-medium uppercase tracking-[.28em] text-green">
          {segmentoText} · {statusText}
        </span>
        <h1 className="reveal reveal-2 mt-[clamp(14px,1.6vw,22px)] font-serif font-normal text-[clamp(46px,8.5vw,128px)] leading-[.96] tracking-[-.01em]">
          {p.name}
        </h1>
        <div className="reveal reveal-3 mt-[clamp(16px,1.8vw,26px)] flex flex-wrap items-center justify-center gap-x-[16px] gap-y-[8px] text-[11.5px] uppercase tracking-[.16em] text-white/80">
          {p.localTbd ? (
            <span className="italic normal-case text-white/55">{localText}</span>
          ) : (
            <span>{localText}</span>
          )}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-[clamp(26px,3.6vw,50px)] left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-[10px] text-white/60">
        <span className="text-[10px] uppercase tracking-[.24em]">{t("scrollCue")}</span>
        <span aria-hidden className="h-[clamp(26px,3.6vw,44px)] w-px bg-white/40" />
      </div>
    </section>
  );
}
