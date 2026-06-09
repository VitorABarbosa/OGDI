import Link from "next/link";
import { Kicker } from "@/components/ui/Kicker";
import { projetos } from "@/app/_sections/Projetos/projetos.data";

const count = String(projetos.length).padStart(2, "0");

export function ProjetosHero() {
  return (
    <section
      className="relative bg-dark text-white overflow-hidden"
      style={{ padding: "clamp(150px,20vh,230px) 0 clamp(56px,7vw,96px)" }}
    >
      {/* Decorative radial-gradient glow — aria-hidden, z-0 */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(120% 90% at 80% 0%, rgba(31,90,99,.45), transparent 55%)",
            "radial-gradient(90% 80% at 12% 110%, rgba(95,168,60,.16), transparent 60%)",
          ].join(", "),
          opacity: 0.5,
        }}
      />

      <div className="wrap relative z-[2]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-[10px] mb-[26px]"
          style={{ fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}
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
            className="inline-block"
            style={{ width: "14px", height: "1px", background: "rgba(255,255,255,.3)", flexShrink: 0 }}
          />
          <span>Projetos</span>
        </nav>

        {/* Top row: heading + count */}
        <div className="flex items-end justify-between flex-wrap" style={{ gap: "40px" }}>
          <div>
            <Kicker tone="on-dark-green">Projetos · Cases</Kicker>
            <h1
              className="font-sans font-semibold text-white mt-5"
              style={{
                fontSize: "clamp(34px,5.4vw,76px)",
                letterSpacing: "-.03em",
                lineHeight: 1.04,
                maxWidth: "14ch",
                margin: "20px 0 0",
              }}
            >
              Empreendimentos<br />estruturados na origem.
            </h1>
          </div>

          {/* Counter */}
          <div className="flex items-baseline" style={{ gap: "10px" }}>
            <b
              className="font-serif font-normal text-white"
              style={{
                fontSize: "clamp(40px,5vw,68px)",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {count}
            </b>
            <span
              className="uppercase"
              style={{
                fontSize: "12px",
                letterSpacing: ".16em",
                color: "rgba(255,255,255,.55)",
                lineHeight: 1.4,
              }}
            >
              empreendimentos<br />em portfólio
            </span>
          </div>
        </div>

        {/* Sub-line */}
        <p
          className="leading-[1.6]"
          style={{
            fontSize: "clamp(15px,1.2vw,18px)",
            color: "rgba(242,241,237,.72)",
            maxWidth: "440px",
            marginTop: "28px",
          }}
        >
          Da leitura da oportunidade ao lançamento — cada projeto reflete a atuação da Open Group na
          estruturação da operação imobiliária.
        </p>
      </div>
    </section>
  );
}
