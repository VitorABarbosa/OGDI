"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Kicker } from "@/components/ui/Kicker";
import type { Projeto, ProjetoCat } from "@/app/_sections/Projetos/projetos.data";
import { cn } from "@/lib/cn";

// Avanço por etapa. Quando o projeto traz `p.obra` (dados reais), usamos esses
// valores; caso contrário, um avanço genérico por categoria:
//   obra     → em andamento (placeholder)
//   entregue → 100% concluído
//   futuro   → sem canteiro ainda → seção não renderiza
type Obra = { overall: number; bars: { pct: number }[] };
const OBRA_BY_CAT: Partial<Record<ProjetoCat, Obra>> = {
  obra: {
    overall: 52,
    bars: [
      { pct: 100 },
      { pct: 100 },
      { pct: 64 },
      { pct: 38 },
      { pct: 20 },
      { pct: 8 },
      { pct: 4 },
      { pct: 0 },
    ],
  },
  entregue: {
    overall: 100,
    bars: Array.from({ length: 8 }, () => ({ pct: 100 })),
  },
};

const EASE_OUT = (k: number) => 1 - Math.pow(1 - k, 3);
// "100" → "100%", "17.3" → "17.30%", "84.15" → "84.15%".
const fmtPct = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(2)}%`;

export function EmpObra({ p, status }: { p: Projeto; status?: string }) {
  const t = useTranslations("empreendimento.obra");
  const tr = useTranslations();
  // Dados reais do projeto têm prioridade sobre o avanço genérico por categoria.
  const data: Obra | undefined = p.obra ?? OBRA_BY_CAT[p.cat];
  const projObra = p.obra
    ? (tr.raw(`proj.${p.slug}.obra`) as { reference?: string; stages: string[] })
    : null;
  const stages = projObra ? projObra.stages : (t.raw("stages") as string[]);
  const reference = projObra?.reference;

  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!data) return;
    const el = ref.current;
    if (!el) return;
    const prefersReduced =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    // Sem IO (SSR/jsdom) ou movimento reduzido: vai direto ao estado final.
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setStarted(true);
      setCount(data.overall);
      setFinished(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [data]);

  useEffect(() => {
    if (!started || !data) return;
    let raf = 0;
    const dur = 1300;
    let t0: number | null = null;
    const step = (now: number) => {
      if (t0 === null) t0 = now;
      const k = Math.min(1, (now - t0) / dur);
      setCount(data.overall * EASE_OUT(k));
      if (k < 1) raf = requestAnimationFrame(step);
      else setFinished(true);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, data]);

  if (!data) return null;

  return (
    <section id="obra" className="scroll-mt-[120px] bg-[#0B1413] py-section text-white">
      <div className="wrap">
        {/* Cabeçalho centralizado */}
        <div className="reveal mb-[clamp(40px,5vw,64px)] text-center">
          <Kicker tone="on-dark-green" className="justify-center">{t("kicker")}</Kicker>
          <h2 className="mt-[14px] font-sans font-semibold uppercase text-[clamp(26px,3vw,44px)] leading-[1.04] tracking-[-.03em] text-white">
            {t("heading")}
          </h2>
          {status && (
            <span className="mt-6 inline-flex items-center gap-[9px] border border-[rgba(95,168,60,.5)] bg-[rgba(95,168,60,.1)] px-[15px] py-[9px] text-[11px] uppercase tracking-[.14em] text-white">
              <span className="h-2 w-2 rounded-full bg-green motion-safe:animate-pulse" />
              {status}
            </span>
          )}
        </div>

        {/* Progresso centralizado: avanço geral + barras por etapa */}
        <div ref={ref} className="reveal reveal-2 mx-auto max-w-[760px]">
          <div className="mb-[30px] border-b border-white/[.12] pb-[26px]">
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] uppercase tracking-[.12em] text-white/55">{t("overall")}</span>
              <span className="font-serif text-[clamp(32px,3.4vw,48px)] leading-none tabular-nums text-white">
                {finished ? fmtPct(data.overall) : `${Math.round(count)}%`}
              </span>
            </div>
            <div className="mt-3 h-1 overflow-hidden bg-white/[.14]">
              <div
                className="h-full bg-green transition-[width] duration-[1400ms] ease-out"
                style={{ width: started ? `${data.overall}%` : "0%" }}
              />
            </div>
            {reference && (
              <p className="mt-[14px] text-[11px] uppercase tracking-[.16em] text-white/40">{reference}</p>
            )}
          </div>

          <div>
            {data.bars.map((bar, i) => (
              <div key={stages[i] ?? i} className="mb-5 flex flex-col gap-[9px]">
                <div className="flex items-baseline justify-between gap-[14px]">
                  <span className="text-[13.5px] tracking-[.02em] text-white">{stages[i]}</span>
                  <span className="text-[12.5px] tabular-nums text-white/60">{fmtPct(bar.pct)}</span>
                </div>
                <div className="h-[3px] overflow-hidden bg-white/[.14]">
                  <div
                    className={cn("h-full transition-[width] duration-[1200ms] ease-out", bar.pct >= 100 ? "bg-green" : "bg-teal")}
                    style={{ width: started ? `${bar.pct}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
