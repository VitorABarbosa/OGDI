import Link from "next/link";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Button } from "@/components/ui/Button";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

export function EmpHero({ p }: { p: Projeto }) {
  return (
    <section
      className="relative overflow-hidden bg-dark h-[clamp(560px,86vh,880px)]"
    >
      {/* Full-bleed image / gradient */}
      <MediaPlaceholder tone={p.tone} src={p.image} alt={p.image ? p.name : ""} />

      {/* Scrim */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none [background:linear-gradient(0deg,rgba(8,12,13,.82)_0%,rgba(8,12,13,.1)_46%,rgba(8,12,13,.34)_100%),linear-gradient(90deg,rgba(8,12,13,.5)_0%,rgba(8,12,13,0)_60%)]"
      />

      {/* Body — positioned at bottom */}
      <div
        className="absolute left-0 right-0 z-[3] px-pad-x text-white bottom-[clamp(40px,6vw,76px)]"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="reveal flex items-center gap-[10px] mb-[22px] text-[12px] tracking-[.08em] uppercase"
          >
            <Link
              href="/"
              className="text-white/60 transition-colors duration-200 hover:text-white"
            >
              Início
            </Link>
            <span
              aria-hidden
              className="inline-block shrink-0 w-[14px] h-px bg-white/30"
            />
            <Link
              href="/projetos"
              className="text-white/60 transition-colors duration-200 hover:text-white"
            >
              Projetos
            </Link>
            <span
              aria-hidden
              className="inline-block shrink-0 w-[14px] h-px bg-white/30"
            />
            <span aria-current="page" className="text-white/85">
              {p.name}
            </span>
          </nav>

          {/* Status badge */}
          <span className="reveal reveal-2 inline-block text-green text-[11px] tracking-[.2em] uppercase">
            {p.status} · Empreendimento
          </span>

          {/* Heading */}
          <h1
            className="reveal reveal-3 font-serif font-normal text-white mt-[14px] text-[clamp(44px,7vw,104px)] leading-[.98] tracking-[-.01em]"
          >
            {p.name}
          </h1>

          {/* Location row */}
          <div
            className="reveal reveal-4 flex flex-wrap items-center mt-[18px] gap-[10px_16px] text-[12.5px] tracking-[.12em] uppercase text-white/85"
          >
            <span>{p.segmento}</span>
            <span
              aria-hidden
              className="w-1 h-1 rounded-full shrink-0 bg-white/50"
            />
            {p.localTbd ? (
              <span className="italic normal-case text-white/55">
                {p.local}
              </span>
            ) : (
              <span>{p.local}</span>
            )}
            <span
              aria-hidden
              className="w-1 h-1 rounded-full shrink-0 bg-white/50"
            />
            <span>Estruturação OGDI</span>
          </div>

          {p.heroSummary && (
            <p className="reveal reveal-4 mt-[clamp(18px,2vw,26px)] max-w-[720px] text-[clamp(16px,1.35vw,21px)] leading-[1.55] text-white/82">
              {p.heroSummary}
            </p>
          )}

          {p.facts && p.facts.length > 0 && (
            <ul className="reveal reveal-4 mt-[clamp(22px,2.4vw,34px)] flex max-w-[900px] flex-wrap gap-2.5">
              {p.facts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-full border border-white/22 bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[.12em] text-white/88 backdrop-blur-md"
                >
                  {fact}
                </li>
              ))}
            </ul>
          )}

          {p.closingStatement && (
            <div className="reveal reveal-4 mt-[clamp(24px,2.8vw,38px)]">
              <Button href={p.closingStatement.ctaHref ?? "/#contato"} variant="light" arrow>
                {p.closingStatement.ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
