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
      <div className="wrap-wide relative z-[2] text-center">
        <div className="relative mx-auto inline-block max-w-full px-[clamp(28px,4vw,58px)] py-[clamp(16px,2vw,28px)]">
          <span
            aria-hidden
            className="reveal absolute left-0 top-0 font-serif italic leading-none text-[clamp(34px,4vw,56px)] text-green/90"
          >
            “
          </span>
          <p className="reveal reveal-2 max-w-none whitespace-nowrap text-center font-news text-[clamp(.9rem,1.55vw,1.35rem)] font-normal leading-[1.35] tracking-[-.01em] text-white max-[900px]:whitespace-normal">
            {t.rich("text", { em: (chunks) => <em className="italic text-green">{chunks}</em> })}
          </p>
          <span
            aria-hidden
            className="reveal absolute bottom-0 right-0 font-serif italic leading-none text-[clamp(34px,4vw,56px)] text-green/90"
          >
            ”
          </span>
        </div>
        <div className="reveal mt-[clamp(10px,1.4vw,18px)] text-[11.5px] uppercase tracking-[.16em] text-white/55">
          {signature}
        </div>
      </div>
    </section>
  );
}
