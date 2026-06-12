import { Kicker } from "@/components/ui/Kicker";
import { institucional } from "./institucional.data";
import { cn } from "@/lib/cn";

export function InstitucionalOrigem() {
  const { origem } = institucional;
  return (
    <section id="institucional-origem" className="border-t border-[color:var(--line-dark)] bg-dark-2 py-section">
      <div className="wrap">
        <div className="reveal mx-auto mb-[clamp(44px,5.5vw,76px)] max-w-[680px] text-center">
          <Kicker tone="on-dark-green" className="justify-center">{origem.kicker}</Kicker>
          <h2 className="mt-4 font-news font-normal text-white text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.16] tracking-[-.01em]">
            O valor de um empreendimento nasce <span className="italic text-green">antes da obra</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-[58ch] text-[clamp(15px,1.3vw,18px)] leading-[1.62] text-white/[.62]">
            Uma área promissora ou um projeto bem localizado não se sustentam sozinhos. Sem visão, viabilidade, parceiros
            e condução, o potencial se dispersa antes de virar empreendimento. Ele nasce antes — e nasce aqui:
          </p>
        </div>

        <div className="mx-auto max-w-[1060px]">
          {origem.strata.map((s) => (
            <div
              key={s.n}
              className={cn(
                "reveal grid grid-cols-1 items-center gap-[8px] px-[clamp(12px,2vw,28px)] py-[clamp(17px,2.1vw,28px)] md:grid-cols-[88px_1fr_minmax(0,30ch)] md:gap-[clamp(16px,2.4vw,44px)]",
                s.bed
                  ? "border-l-2 border-green pl-[clamp(14px,2vw,30px)] [background:linear-gradient(90deg,rgba(95,168,60,.12),transparent_72%)]"
                  : "border-b border-[color:var(--line-dark)]",
              )}
            >
              <span
                className={cn(
                  "font-serif text-[13.5px] tabular-nums tracking-[.14em]",
                  s.bed ? "text-green" : "text-white/[.38]",
                )}
              >
                {s.n}
              </span>
              <span
                className={cn(
                  "font-news font-normal leading-[1.02] tracking-[-.01em]",
                  s.bed ? "text-white text-[clamp(1.9rem,4.6vw,3.5rem)]" : "text-white/90 text-[clamp(1.5rem,3.1vw,2.5rem)]",
                )}
              >
                {s.name}
              </span>
              <span
                className={cn(
                  "text-[12.5px] leading-[1.45] tracking-[.03em] md:text-right",
                  s.bed ? "text-white/[.72]" : "text-white/[.46]",
                )}
              >
                {s.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
