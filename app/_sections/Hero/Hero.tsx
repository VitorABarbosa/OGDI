"use client";
import { useCarousel } from "@/hooks/useCarousel";
import { heroSlides } from "./hero.data";
import { HeroSlide } from "./HeroSlide";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  const { index, next, prev } = useCarousel({ length: heroSlides.length, autoplayMs: 6500 });
  const s = heroSlides[index];
  return (
    <section id="top" className="relative h-screen min-h-[620px] overflow-hidden bg-dark">
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => <HeroSlide key={slide.name} slide={slide} active={i === index} />)}
      </div>
      {/* scrim */}
      <div className="absolute inset-0 z-[2] pointer-events-none [background:linear-gradient(180deg,rgba(10,14,15,.42)_0%,rgba(10,14,15,0)_26%,rgba(10,14,15,0)_50%,rgba(10,14,15,.78)_100%),linear-gradient(90deg,rgba(10,14,15,.45)_0%,rgba(10,14,15,0)_55%)]" />
      {/* frase fixa */}
      <p className="absolute z-[3] left-pad-x top-[clamp(120px,17vh,168px)] font-serif italic font-light text-[clamp(17px,1.7vw,24px)] text-white/90 before:content-[''] before:block before:w-[38px] before:h-px before:bg-green before:mb-[18px] max-md:hidden">
        O valor nasce antes da obra.
      </p>
      {/* setas */}
      <button onClick={prev} aria-label="Anterior" className="absolute z-[4] top-1/2 -translate-y-1/2 left-[clamp(10px,2vw,28px)] w-[clamp(44px,4vw,60px)] h-[clamp(44px,4vw,60px)] flex items-center justify-center text-white opacity-75 hover:opacity-100 transition-opacity"><Icon name="chevron-left" className="w-[30px] h-[30px]" /></button>
      <button onClick={next} aria-label="Próximo" className="absolute z-[4] top-1/2 -translate-y-1/2 right-[clamp(10px,2vw,28px)] w-[clamp(44px,4vw,60px)] h-[clamp(44px,4vw,60px)] flex items-center justify-center text-white opacity-75 hover:opacity-100 transition-opacity"><Icon name="chevron-right" className="w-[30px] h-[30px]" /></button>
      {/* info */}
      <div className="absolute z-[3] inset-x-0 bottom-[clamp(36px,6vh,64px)] px-pad-x">
        <div className="text-white max-w-[640px]">
          <div className="font-serif text-[clamp(28px,3.6vw,52px)] leading-[1.04] mt-[14px] mb-[16px]">{s.name}</div>
          <div className="flex flex-wrap items-center gap-[10px_16px] text-[12px] tracking-[.12em] uppercase text-white/85">
            {s.meta.map((m, i) => (
              <span key={i} className="flex items-center gap-[10px_16px]">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-white/50" />}
                {m.startsWith("@")
                  ? <span className="text-white/50 italic normal-case tracking-[.02em]">{m.slice(1)}</span>
                  : <span>{m}</span>}
              </span>
            ))}
          </div>
          <p className="text-[13.5px] text-white/70 mt-4 max-w-[480px] leading-[1.5]">{s.sign}</p>
        </div>
      </div>
    </section>
  );
}
