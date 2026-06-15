import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

export function EmpProductStory({ p }: { p: Projeto }) {
  if (!p.productStory) return null;

  const { productStory } = p;
  const visibleBody = productStory.body.slice(0, 1);

  return (
    <section className="py-section">
      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-[clamp(42px,6vw,100px)] lg:grid-cols-[.9fr_1.1fr]">
          <div className="lg:sticky lg:top-[110px]">
            <Kicker className="reveal">{productStory.kicker}</Kicker>
            <h2 className="reveal reveal-2 mt-5 max-w-[620px] font-sans text-[clamp(28px,3.8vw,54px)] font-semibold leading-[1.05] tracking-[-.03em]">
              {productStory.title}
            </h2>
          </div>

          <div>
            <div className="max-w-[680px] space-y-5 text-[clamp(15px,1.12vw,18px)] leading-[1.72] text-ink-2">
              {visibleBody.map((paragraph, index) => (
                <p key={`${p.slug}-product-${index}`} className={cn("reveal", `reveal-info-${Math.min(index + 1, 5)}`)}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Lista editorial: label à esquerda, valor + texto à direita,
                divisória fina entre itens. No mobile empilha (label sobre valor). */}
            <div className="mt-[clamp(34px,4vw,54px)] border-t border-[color:var(--line)]">
              {productStory.cards.map((card, index) => (
                <article
                  key={`${card.label}-${card.value}`}
                  className={cn(
                    "reveal reveal-step grid grid-cols-[140px_1fr] gap-x-6 border-b border-[color:var(--line)] py-6",
                    "max-[680px]:grid-cols-1 max-[680px]:gap-y-1",
                    `reveal-step-${Math.min(index, 5)}`,
                  )}
                >
                  <span className="pt-1 text-[11px] font-medium uppercase tracking-[.14em] text-ink-3">{card.label}</span>
                  <div>
                    <h3 className="text-[clamp(18px,1.55vw,24px)] font-semibold tracking-[-.02em] text-ink">
                      {card.value}
                    </h3>
                    {card.text && (
                      <p className="mt-2 max-w-[52ch] text-[clamp(14px,1.05vw,15.5px)] leading-[1.6] text-ink-2">
                        {card.text}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
