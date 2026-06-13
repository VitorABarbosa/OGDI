import type { AtuacaoStep } from "./atuacao.data";

export function AtuacaoRow({ step, title, desc, last }: { step: AtuacaoStep; title: string; desc: string; last: boolean }) {
  return (
    <div className={`grid grid-cols-[52px_1fr] gap-[22px] py-[26px] border-t border-[color:var(--line)] ${last ? "border-b" : ""} transition-[padding-left] duration-[400ms] ease-brand hover:pl-3`}>
      <span className="font-sans text-[18px] text-teal font-semibold leading-none tabular-nums tracking-[.02em]">{step.idx}</span>
      <div>
        <h3 className="font-sans font-semibold text-[clamp(19px,1.6vw,24px)] m-0 mb-2 tracking-[-.015em]">{title}</h3>
        <p className="m-0 text-[14px] text-ink-2 leading-[1.5] max-w-[520px]">{desc}</p>
      </div>
    </div>
  );
}
