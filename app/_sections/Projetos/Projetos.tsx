"use client";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { Icon } from "@/components/ui/Icon";
import { useCarousel } from "@/hooks/useCarousel";
import { projetos, type ProjetoCat } from "./projetos.data";
import { ProjetoTabs } from "./ProjetoTabs";
import { ProjetoCard } from "./ProjetoCard";

// useLayoutEffect on the server warns; alias to useEffect when there's no window.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Projetos() {
  const [cat, setCat] = useState<ProjetoCat>("obra");
  const list = useMemo(() => projetos.filter((p) => p.cat === cat), [cat]);
  const { index, goTo, next, prev, dragEnd } = useCarousel({ length: list.length });
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number } | null>(null);
  const [offset, setOffset] = useState(0);

  const onTab = (c: ProjetoCat) => { setCat(c); goTo(0); };

  // Center the active card within the full-bleed viewport.
  const recenter = useCallback(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    setOffset(vp.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2));
  }, [index]);

  useIsoLayoutEffect(() => { recenter(); }, [recenter, list]);
  useEffect(() => {
    window.addEventListener("resize", recenter);
    return () => window.removeEventListener("resize", recenter);
  }, [recenter]);

  return (
    <section id="projetos" className="py-section">
      <div className="wrap">
        <div className="flex items-end justify-between gap-[24px_40px] flex-wrap mb-10">
          <div className="max-w-[520px]">
            <Kicker>Projetos</Kicker>
            <SectionHeading className="mt-[14px]">Estruturados antes da obra.<br />Empreendimentos que avançam.</SectionHeading>
          </div>
          <ProjetoTabs active={cat} onChange={onTab} />
        </div>
      </div>
      <div className="relative">
        <div ref={viewportRef} className="relative overflow-hidden w-screen ml-[calc(50%-50vw)]">
          <div
            ref={trackRef}
            className="flex gap-[clamp(16px,2vw,30px)] h-[clamp(440px,50vw,600px)] max-md:h-[78vw] max-md:max-h-[560px] transition-transform duration-700 ease-brand-2 touch-pan-y"
            style={{ transform: `translateX(${offset}px)` }}
            onPointerDown={(e) => { drag.current = { x: e.clientX }; }}
            onPointerUp={(e) => { if (drag.current) { dragEnd(e.clientX - drag.current.x, 120); drag.current = null; } }}
          >
            {list.map((p, i) => <ProjetoCard key={p.name} p={p} active={i === index} />)}
          </div>
          <button onClick={prev} aria-label="Anterior" className="absolute z-[5] top-1/2 -translate-y-1/2 left-[18px] w-[clamp(40px,3.4vw,54px)] h-[clamp(40px,3.4vw,54px)] flex items-center justify-center text-white opacity-75 hover:opacity-100"><Icon name="chevron-left" className="w-[26px] h-[26px]" /></button>
          <button onClick={next} aria-label="Próximo" className="absolute z-[5] top-1/2 -translate-y-1/2 right-[18px] w-[clamp(40px,3.4vw,54px)] h-[clamp(40px,3.4vw,54px)] flex items-center justify-center text-white opacity-75 hover:opacity-100"><Icon name="chevron-right" className="w-[26px] h-[26px]" /></button>
          <div className="absolute inset-x-0 bottom-[clamp(18px,2.4vw,30px)] z-[5] flex justify-center gap-[9px]">
            {list.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Ir para ${i + 1}`}
                className={`w-9 h-[2px] ${i === index ? "bg-white" : "bg-white/30 hover:bg-white/60"} transition-colors`} />
            ))}
          </div>
        </div>
        <div className="mt-[34px] flex justify-center"><TextLink href="/projetos">Ver todos os projetos</TextLink></div>
      </div>
    </section>
  );
}
