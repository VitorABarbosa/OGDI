import { useTranslations } from "next-intl";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

// Faixa de citação (manifesto) — 1:1 com a referência `.em-quote`: fundo escuro
// com brilhos radiais, aspas serif verde, frase serif grande com destaque verde
// e assinatura. Texto compartilhado (`empreendimento.quote`); assinatura vem do
// próprio projeto (nome · região).
export function EmpQuote({ p }: { p: Projeto }) {
  const t = useTranslations("empreendimento.quote");
  const signature = p.regiao ? `${p.name} · ${p.regiao}` : p.name;

  return (
    <section className="relative overflow-hidden bg-[#0B1413] py-[clamp(40px,5.5vw,72px)] text-white">
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[.5] [background:radial-gradient(90%_80%_at_80%_0%,rgba(31,90,99,.4),transparent_56%),radial-gradient(80%_70%_at_8%_110%,rgba(95,168,60,.16),transparent_60%)]"
      />
      <div className="wrap relative z-[2] max-w-[1100px]">
        <span aria-hidden className="reveal font-serif italic leading-[1] text-[clamp(34px,4vw,56px)] text-green/90">
          “
        </span>
        <p className="reveal reveal-2 mt-[clamp(6px,1vw,12px)] max-w-[42ch] font-news font-normal text-[clamp(1.15rem,2.2vw,1.7rem)] leading-[1.35] tracking-[-.01em] text-white">
          {t.rich("text", { em: (chunks) => <em className="italic text-green">{chunks}</em> })}
        </p>
        <div className="reveal mt-[clamp(16px,2vw,26px)] text-[11.5px] uppercase tracking-[.16em] text-white/55">
          {signature}
        </div>
      </div>
    </section>
  );
}
