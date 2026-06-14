"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { investidoresSteps } from "@/app/_sections/Atuacao/atuacao.data";
import styles from "./InvestidoresCurva.module.css";

// A curva de valor: linha ascendente que nasce embaixo à esquerda e cruza
// o hero — o valor sendo criado antes da obra. Sete nós interativos, um
// por etapa do ciclo; o quinto, onde o capital entra, é o acento verde.
//
// O traçado corre baixo na metade esquerda (sob o texto do hero) e sobe
// forte só à direita, onde o hero está livre.
const curvePath =
  "M -80 770 C -10 766, 50 762, 120 756 C 200 749, 260 738, 340 732 C 420 726, 480 712, 560 700 C 640 688, 700 672, 780 656 C 860 640, 930 614, 1000 580 C 1080 546, 1140 496, 1200 430 C 1260 364, 1330 288, 1400 220 C 1450 168, 1510 148, 1560 135";

const nodes = [
  { x: 120, y: 756 },
  { x: 340, y: 732 },
  { x: 560, y: 700 },
  { x: 780, y: 656 },
  { x: 1000, y: 580, capital: true },
  { x: 1200, y: 430 },
  { x: 1400, y: 220 },
];

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
  const ts = useTranslations("home.atuacao.steps");
  const tc = useTranslations("investidores.curva");

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
        <path className={styles.area} d={`${curvePath} L 1560 800 L -80 800 Z`} fill="url(#inv-curva-area)" />

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

        {/* nós das etapas — o quinto é o capital */}
        {nodes.map((n, i) => (
          <g key={n.x} className={styles.node} style={{ animationDelay: `${0.5 + i * 0.28}s` }}>
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
          const step = investidoresSteps[i];
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
                aria-label={tc("stepAria", { idx: step.idx, title: ts(`${step.idx}.title`) })}
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
                      <span className="font-sans text-[9.5px] font-semibold tracking-[.22em] text-green tabular-nums">{step.idx}</span>
                      <h3 className="font-sans text-[13px] font-semibold leading-[1.3] tracking-[-.01em] text-white">
                        {ts(`${step.idx}.title`)}
                      </h3>
                    </div>
                    <p className="mt-[7px] text-[11.5px] leading-[1.5] text-white/55">{ts(`${step.idx}.desc`)}</p>
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
