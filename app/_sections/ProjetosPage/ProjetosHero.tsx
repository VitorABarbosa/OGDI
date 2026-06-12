import Link from "next/link";
import { Kicker } from "@/components/ui/Kicker";
import { projetos } from "@/app/_sections/Projetos/projetos.data";

const count = String(projetos.length).padStart(2, "0");

export function ProjetosHero() {
  return (
    <section
      data-header-dark
      className="relative bg-dark text-white overflow-hidden pt-[clamp(150px,20vh,230px)] pb-[clamp(56px,7vw,96px)]"
    >
      {/* Decorative radial-gradient glow — aria-hidden, z-0 */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none opacity-50 [background:radial-gradient(120%_90%_at_80%_0%,rgba(31,90,99,.45),transparent_55%),radial-gradient(90%_80%_at_12%_110%,rgba(95,168,60,.16),transparent_60%)]"
      />

      <div className="wrap relative z-[2]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="reveal flex items-center gap-[10px] mb-[26px] text-[12px] tracking-[.08em] uppercase text-white/50"
        >
          <Link
            href="/"
            className="transition-colors duration-200 text-white/55 hover:text-white"
          >
            Início
          </Link>
          {/* Separator bar */}
          <span
            aria-hidden
            className="inline-block w-[14px] h-px bg-white/30 shrink-0"
          />
          <span aria-current="page">Projetos</span>
        </nav>

        {/* Top row: heading + count */}
        <div className="flex items-end justify-between flex-wrap gap-[40px]">
          <div className="reveal reveal-2">
            <Kicker tone="on-dark-green">Projetos · Cases</Kicker>
            <h1
              className="font-sans font-semibold text-white text-[clamp(34px,5.4vw,76px)] tracking-[-.03em] leading-[1.04] max-w-[14ch] mt-[20px]"
            >
              Empreendimentos<br />estruturados na origem.
            </h1>
          </div>

          {/* Counter */}
          <div className="reveal reveal-3 flex items-baseline gap-[10px]">
            <b
              className="font-serif font-normal text-white text-[clamp(40px,5vw,68px)] leading-none [font-variant-numeric:tabular-nums]"
            >
              {count}
            </b>
            <span
              className="uppercase text-[12px] tracking-[.16em] text-white/55 leading-[1.4]"
            >
              empreendimentos<br />em portfólio
            </span>
          </div>
        </div>

        {/* Sub-line */}
        <p
          className="reveal reveal-4 leading-[1.6] text-[clamp(15px,1.2vw,18px)] text-[rgba(242,241,237,.72)] max-w-[440px] mt-[28px]"
        >
          Da leitura da oportunidade ao lançamento — cada projeto reflete a atuação da Open Group na
          estruturação da operação imobiliária.
        </p>
      </div>
    </section>
  );
}
