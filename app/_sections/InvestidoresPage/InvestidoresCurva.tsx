"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./InvestidoresCurva.module.css";

// A curva de valor: linha ascendente que nasce embaixo à esquerda e cruza
// o hero — o valor sendo criado ao longo da operação. Dez nós interativos,
// um por etapa; o quarto (Estruturação Financeira), onde o capital entra,
// é o acento verde.
//
// O traçado corre baixo na metade esquerda (sob o texto do hero) e sobe
// forte só à direita, onde o hero está livre. Os últimos nós estendem a curva
// até Entrega de Chaves e Retorno do Capital.
//
// Cada nó referencia o título/desc por `idx` no namespace investidores.ciclo.steps.
type CurveNode = {
  x: number;
  y: number;
  num: string;
  idx: string;
  capital?: boolean;
};

const nodes: CurveNode[] = [
  { x: 120, y: 760, num: "01", idx: "01" },
  { x: 260, y: 754, num: "02", idx: "02" },
  { x: 400, y: 738, num: "03", idx: "03" },
  { x: 540, y: 708, num: "04", idx: "04", capital: true },
  { x: 680, y: 664, num: "05", idx: "05" },
  { x: 820, y: 602, num: "06", idx: "06" },
  { x: 960, y: 522, num: "07", idx: "07" },
  { x: 1100, y: 430, num: "08", idx: "08" },
  { x: 1250, y: 310, num: "09", idx: "09" },
  { x: 1400, y: 160, num: "10", idx: "10" },
];

// Traçado suave (Catmull-Rom → Bézier) pelos nós, com pontos virtuais para a
// linha entrar/sair do quadro como antes.
const buildSmoothPath = (pts: { x: number; y: number }[]) => {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }
  return d;
};

const PATH_PTS = [
  { x: -120, y: 772 },
  ...nodes.map(({ x, y }) => ({ x, y })),
  { x: 1600, y: 118 },
];
const curvePath = buildSmoothPath(PATH_PTS);

const VIEW_W = 1440;
const POP_W = 218;
const POP_H = 140;
const POP_GAP = 16;

const svgProps = {
  viewBox: `0 0 ${VIEW_W} 800`,
  preserveAspectRatio: "xMidYMax slice",
  fill: "none",
} as const;

export function InvestidoresCurva() {
  const [active, setActive] = useState<number | null>(null);
  const tcs = useTranslations("investidores.ciclo.steps");
  const tc = useTranslations("investidores.curva");

  const titleOf = (n: CurveNode) => tcs(`${n.idx}.title`);
  const descOf = (n: CurveNode) => tcs(`${n.idx}.desc`);

  return (
    <>
      {/* Camada visual da curva — atrás do texto do hero */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 z-0 h-full w-full" {...svgProps}>
        <defs>
          <linearGradient id="inv-curva-stroke" x1="0" y1="800" x2="1440" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1F5A63" stopOpacity=".25" />
            <stop offset=".55" stopColor="#1F5A63" stopOpacity=".75" />
            <stop offset="1" stopColor="#5FA83C" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id="inv-curva-area" x1="720" y1="140" x2="720" y2="800" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1F5A63" stopOpacity=".12" />
            <stop offset="1" stopColor="#1F5A63" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* preenchimento de "gráfico" sob a curva */}
        <path className={styles.area} d={`${curvePath} L 1600 800 L -120 800 Z`} fill="url(#inv-curva-area)" />

        {/* halo difuso da linha */}
        <path
          className={styles.path}
          d={curvePath}
          pathLength={1}
          stroke="url(#inv-curva-stroke)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity=".18"
        />
        {/* linha principal */}
        <path
          className={styles.path}
          d={curvePath}
          pathLength={1}
          stroke="url(#inv-curva-stroke)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* nós das etapas — o quarto (Estruturação Financeira) é o capital */}
        {nodes.map((n, i) => (
          <g key={n.x} className={styles.node} style={{ animationDelay: `${0.5 + i * 0.2}s` }}>
            {n.capital ? (
              <>
                <circle className={styles.halo} cx={n.x} cy={n.y} r="16" fill="#5FA83C" />
                <circle cx={n.x} cy={n.y} r={active === i ? 6 : 4.5} fill="#5FA83C" className={styles.dot} />
                <text
                  x={n.x + 18}
                  y={n.y + 4}
                  className="max-md:hidden"
                  fill="#5FA83C"
                  fillOpacity=".8"
                  fontSize="10.5"
                  letterSpacing="1.8"
                  style={{ textTransform: "uppercase", fontFamily: "var(--font-sans)" }}
                >
                  {tc("capitalLabel")}
                </text>
              </>
            ) : (
              <circle
                cx={n.x}
                cy={n.y}
                r={active === i ? 5 : 3}
                fill="#F2F1ED"
                fillOpacity={active === i ? ".9" : ".28"}
                className={styles.dot}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Camada interativa — acima do texto: áreas de toque e popups */}
      <svg className="pointer-events-none absolute inset-0 z-[2] h-full w-full" {...svgProps}>
        {nodes.map((n, i) => {
          const isActive = active === i;
          const popX = Math.min(Math.max(n.x - POP_W / 2, 24), VIEW_W - POP_W - 24);
          // abre para baixo sempre que couber (área livre da curva);
          // para cima só nos nós rentes à base
          const below = n.y + POP_GAP + POP_H <= 800;
          const popY = below ? n.y + POP_GAP : n.y - POP_H - POP_GAP;
          return (
            <g key={n.x}>
              {/* anel de foco para navegação por teclado */}
              {isActive && (
                <circle cx={n.x} cy={n.y} r="13" stroke={n.capital ? "#5FA83C" : "#F2F1ED"} strokeOpacity=".4" strokeWidth="1" />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r="24"
                fill="transparent"
                className="cursor-pointer [pointer-events:auto] focus:outline-none"
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={tc("stepAria", { idx: n.num, title: titleOf(n) })}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((a) => (a === i ? null : a))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((a) => (a === i ? null : a))}
                onClick={() => setActive((a) => (a === i ? null : i))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive((a) => (a === i ? null : i));
                  }
                  if (e.key === "Escape") setActive(null);
                }}
              />
              {/* fio conector nó → popup */}
              <line
                x1={n.x}
                y1={below ? n.y + 9 : n.y - 9}
                x2={n.x}
                y2={below ? popY : popY + POP_H}
                stroke="#F2F1ED"
                strokeOpacity={isActive ? ".22" : "0"}
                strokeWidth="1"
                className="transition-[stroke-opacity] duration-200"
              />
              <foreignObject x={popX} y={popY} width={POP_W} height={POP_H} className="overflow-visible">
                <div
                  className={`transition-[opacity,transform] duration-200 ease-brand ${isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[4px] opacity-0"}`}
                >
                  <div className="border-l border-l-green/70 bg-[#171C1D]/[.94] px-[15px] py-[13px] shadow-[0_10px_30px_rgba(0,0,0,.32)] [border-top:1px_solid_var(--line-dark)] [border-right:1px_solid_var(--line-dark)] [border-bottom:1px_solid_var(--line-dark)]">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-[9.5px] font-semibold tracking-[.22em] text-green tabular-nums">{n.num}</span>
                      <h3 className="font-sans text-[13px] font-semibold leading-[1.3] tracking-[-.01em] text-white">
                        {titleOf(n)}
                      </h3>
                    </div>
                    <p className="mt-[7px] text-[11.5px] leading-[1.5] text-white/55">{descOf(n)}</p>
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </>
  );
}
