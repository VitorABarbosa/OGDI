import type { ModeloRingKind } from "./modelos.data";

export function ModeloRing({ kind, className }: { kind: ModeloRingKind; className?: string }) {
  const common = { viewBox: "0 0 58 58", fill: "none", stroke: "#1F5A63", strokeWidth: 1.5, className };
  if (kind === "consultoria")
    return <svg {...common}><circle cx={29} cy={29} r={20} /><circle cx={29} cy={29} r={5} fill="#5FA83C" stroke="none" /></svg>;
  if (kind === "parceria")
    return <svg {...common}><circle cx={22} cy={29} r={16} /><circle cx={36} cy={29} r={16} /><circle cx={29} cy={29} r={4} fill="#5FA83C" stroke="none" /></svg>;
  return <svg {...common}><circle cx={29} cy={22} r={13} /><circle cx={21} cy={36} r={13} /><circle cx={37} cy={36} r={13} /><circle cx={29} cy={31} r={4} fill="#5FA83C" stroke="none" /></svg>;
}
