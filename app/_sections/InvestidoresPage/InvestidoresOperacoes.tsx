import Link from "next/link";
import { Kicker } from "@/components/ui/Kicker";
import { projetos } from "@/app/_sections/Projetos/projetos.data";

// Prova em lista tipográfica oversized: o nome da operação é o elemento
// visual — sem cards, hover desloca e revela a seta.
export function InvestidoresOperacoes() {
  return (
    <section className="bg-bg-soft py-[clamp(88px,11vw,160px)]">
      <div className="wrap">
        <Kicker className="reveal">A tese, na prática</Kicker>
        <div className="reveal reveal-2 mt-[clamp(28px,4vw,52px)]">
          {projetos.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projetos/${p.slug}`}
              className={`group grid grid-cols-1 items-baseline gap-1 border-t border-[color:var(--line)] py-[clamp(22px,3vw,38px)] transition-[padding-left] duration-[400ms] ease-brand hover:pl-4 md:grid-cols-[88px_1fr_auto] md:gap-[clamp(20px,3vw,48px)] ${i === projetos.length - 1 ? "border-b" : ""}`}
            >
              <span className="font-sans text-[12px] tracking-[.18em] text-ink-3 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-news text-[clamp(1.7rem,3.8vw,3.4rem)] leading-[1.05] tracking-[-.02em] text-ink transition-colors duration-300 group-hover:text-teal">
                {p.name}
              </span>
              <span className="flex items-baseline gap-5 text-[12px] uppercase tracking-[.14em] text-ink-3">
                {p.status}
                <span aria-hidden className="text-[18px] normal-case text-green opacity-0 transition-[opacity,transform] duration-300 ease-brand group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
