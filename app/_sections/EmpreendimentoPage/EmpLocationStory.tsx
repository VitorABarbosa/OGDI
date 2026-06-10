import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

export function EmpLocationStory({ p }: { p: Projeto }) {
  if (!p.locationStory) return null;

  const { locationStory } = p;

  return (
    <section className="bg-manifesto py-section text-white">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-[clamp(38px,6vw,92px)] lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Kicker tone="on-dark-green" className="reveal">
              {locationStory.kicker}
            </Kicker>
            <h2 className="reveal reveal-2 mt-5 max-w-[820px] font-news text-[clamp(34px,5vw,72px)] font-normal leading-[1.06] tracking-[-.01em]">
              {locationStory.title}
            </h2>
          </div>

          <div className="space-y-5 self-end text-[clamp(15px,1.16vw,18px)] leading-[1.75] text-white/76">
            {locationStory.body.map((paragraph, index) => (
              <p key={`${p.slug}-location-${index}`} className={cn("reveal", `reveal-info-${Math.min(index + 1, 5)}`)}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {locationStory.highlights && locationStory.highlights.length > 0 && (
          <div className="mt-[clamp(44px,5.5vw,76px)] grid grid-cols-3 gap-px bg-white/14 max-[820px]:grid-cols-1">
            {locationStory.highlights.map((highlight, index) => (
              <article
                key={highlight.title}
                className={cn(
                  "reveal reveal-step bg-manifesto p-[clamp(24px,3vw,38px)] transition-colors duration-300 hover:bg-white/[.055]",
                  `reveal-step-${Math.min(index, 5)}`,
                )}
              >
                <h3 className="text-[clamp(17px,1.35vw,21px)] font-semibold tracking-[-.01em] text-white">
                  {highlight.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.65] text-white/68">{highlight.text}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
