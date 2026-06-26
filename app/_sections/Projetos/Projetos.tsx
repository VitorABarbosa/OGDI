"use client";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { useTranslations } from "next-intl";
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
const interactiveSelector = "a, button, input, textarea, select, label";

export function Projetos() {
  const t = useTranslations("home.projetos");
  const [cat, setCat] = useState<ProjetoCat>("obra");
  const list = useMemo(() => projetos.filter((p) => p.cat === cat), [cat]);
  const { index, goTo, next, prev, dragEnd } = useCarousel({ length: list.length });
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; dx: number } | null>(null);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

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

  // Drag: follow the finger live, then snap to the nearest card past the threshold.
  const onDragStart = (e: PointerEvent<HTMLDivElement>) => {
    if (e.target instanceof Element && e.target.closest(interactiveSelector)) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, dx: 0 };
    setDragging(true);
    if (trackRef.current) trackRef.current.style.transition = "none";
  };
  const onDragMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    d.dx = e.clientX - d.x;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${offset + d.dx}px)`;
  };
  const onDragEnd = () => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    if (trackRef.current) trackRef.current.style.transition = "";
    if (!d) return;
    const card = trackRef.current?.children[index] as HTMLElement | undefined;
    const threshold = Math.min(120, (card?.offsetWidth ?? 600) * 0.14);
    const navigates = Math.abs(d.dx) >= 5 && Math.abs(d.dx) >= threshold;
    if (Math.abs(d.dx) >= 5) dragEnd(d.dx, threshold);
    // When the drag doesn't cross the threshold the index is unchanged, so React
    // won't re-assert the transform — snap back to center imperatively (animated,
    // since transition was just restored above).
    if (!navigates && trackRef.current) {
      trackRef.current.style.transform = `translateX(${offset}px)`;
    }
  };
  const onDragCancel = () => {
    drag.current = null;
    setDragging(false);
    if (trackRef.current) {
      trackRef.current.style.transition = "";
      trackRef.current.style.transform = `translateX(${offset}px)`;
    }
  };

  return (
    <section id="projetos" className="py-section">
      <div className="wrap">
        <div className="flex items-end justify-between gap-[24px_40px] flex-wrap mb-10">
          <div className="reveal">
            <Kicker>{t("kicker")}</Kicker>
            <SectionHeading className="mt-[14px] whitespace-nowrap max-md:whitespace-normal">{t.rich("heading", { br: () => <br /> })}</SectionHeading>
          </div>
          <div className="reveal reveal-2"><ProjetoTabs active={cat} onChange={onTab} /></div>
        </div>
      </div>
      <div className="relative reveal reveal-2">
        <div ref={viewportRef} className="relative overflow-hidden w-screen ml-[calc(50%-50vw)]">
          <div
            ref={trackRef}
            className={`flex gap-[clamp(16px,2vw,30px)] h-[clamp(440px,50vw,600px)] max-md:h-[78vw] max-md:max-h-[560px] transition-transform duration-700 ease-brand-2 touch-pan-y cursor-grab select-none ${dragging ? "cursor-grabbing" : ""}`}
            style={{ transform: `translateX(${offset}px)` }}
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragCancel}
          >
            {list.map((p, i) => (
              <ProjetoCard
                key={p.name}
                p={p}
                active={i === index}
                status={t(`cards.${p.slug}.status`)}
                ctaLabel={t(`cards.${p.slug}.ctaLabel`)}
              />
            ))}
          </div>
          {/* Setas ancoradas às bordas do card central (largura = basis do card),
              não às bordas full-bleed da tela. */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[5] w-[78%] -translate-x-1/2 max-md:w-[86%]">
            <button onClick={prev} aria-label={t("prev")} className="pointer-events-auto absolute top-1/2 left-[clamp(8px,1.2vw,18px)] flex h-[clamp(40px,3.4vw,54px)] w-[clamp(40px,3.4vw,54px)] -translate-y-1/2 items-center justify-center text-white opacity-100"><Icon name="chevron-left" className="w-[26px] h-[26px]" /></button>
            <button onClick={next} aria-label={t("next")} className="pointer-events-auto absolute top-1/2 right-[clamp(8px,1.2vw,18px)] flex h-[clamp(40px,3.4vw,54px)] w-[clamp(40px,3.4vw,54px)] -translate-y-1/2 items-center justify-center text-white opacity-100"><Icon name="chevron-right" className="w-[26px] h-[26px]" /></button>
          </div>
          <div className="absolute inset-x-0 bottom-[clamp(18px,2.4vw,30px)] z-[5] flex justify-center gap-[9px]">
            {list.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={t("goTo", { n: i + 1 })}
                className={`w-9 h-[2px] ${i === index ? "bg-white" : "bg-white/30 hover:bg-white/60"} transition-colors`} />
            ))}
          </div>
        </div>
        <div className="mt-[34px] flex justify-center"><TextLink href="/projetos">{t("seeAll")}</TextLink></div>
      </div>
    </section>
  );
}
