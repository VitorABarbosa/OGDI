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

            <div className="mt-[clamp(34px,4vw,54px)] grid grid-cols-2 gap-px border border-[color:var(--line)] bg-[color:var(--line)] max-[680px]:grid-cols-1">
              {productStory.cards.map((card, index) => (
                <article
                  key={`${card.label}-${card.value}`}
                  className={cn(
                    "reveal reveal-step bg-bg-soft p-[clamp(22px,2.8vw,34px)] transition-colors duration-300 hover:bg-white",
                    `reveal-step-${Math.min(index, 5)}`,
                  )}
                >
                  <span className="text-[11px] font-medium uppercase tracking-[.14em] text-ink-3">{card.label}</span>
                  <h3 className="mt-3 text-[clamp(18px,1.55vw,24px)] font-semibold tracking-[-.02em] text-ink">
                    {card.value}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
