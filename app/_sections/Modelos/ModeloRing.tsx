import type { ModeloRingKind } from "./modelos.data";

// Verde = formas de relação; azul-petróleo = Investimento SCP (categoria distinta).
const STROKE = { green: "#1F5A63", blue: "#4FA3AD" } as const;
const DOT = { green: "#5FA83C", blue: "#4FA3AD" } as const;

export function ModeloRing({ kind, accent = "green", className }:
  { kind: ModeloRingKind; accent?: "green" | "blue"; className?: string }) {
  const common = { viewBox: "0 0 58 58", fill: "none", stroke: STROKE[accent], strokeWidth: 1.5, className };
  const dot = DOT[accent];
  if (kind === "consultoria")
    return <svg {...common}><circle cx={29} cy={29} r={20} /><circle cx={29} cy={29} r={5} fill={dot} stroke="none" /></svg>;
  if (kind === "parceria")
    return <svg {...common}><circle cx={22} cy={29} r={16} /><circle cx={36} cy={29} r={16} /><circle cx={29} cy={29} r={4} fill={dot} stroke="none" /></svg>;
  if (kind === "investimento")
    // Anéis concêntricos: capital que entra direto no núcleo da operação (aporte SCP).
    return <svg {...common}><circle cx={29} cy={29} r={20} /><circle cx={29} cy={29} r={11} /><circle cx={29} cy={29} r={4} fill={dot} stroke="none" /></svg>;
  return <svg {...common}><circle cx={29} cy={22} r={13} /><circle cx={21} cy={36} r={13} /><circle cx={37} cy={36} r={13} /><circle cx={29} cy={31} r={4} fill={dot} stroke="none" /></svg>;
}
