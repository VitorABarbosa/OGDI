"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { ProjetoTile } from "@/app/_sections/ProjetosPage/ProjetoTile";
import { ProjetoTileScp } from "@/app/_sections/ProjetosPage/ProjetoTileScp";
import { orderedProjetos } from "@/app/_sections/ProjetosPage/projetosPage.data";
import { projetosScp } from "@/app/_sections/ProjetosPage/projetosScp.data";
import { cn } from "@/lib/cn";

export function InvestidoresOperacoesCarousel() {
  const t = useTranslations("investidores.operacoes");
  const tc = useTranslations("proj");
  const ts = useTranslations("projetos.scp");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    x: number;
    scrollLeft: number;
    dx: number;
    velocity: number; // px/ms do scrollLeft, para a inércia ao soltar
    lastX: number;
    lastT: number;
  } | null>(null);
  const dragged = useRef(false);
  const momentumRaf = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const stopMomentum = () => {
    if (momentumRaf.current !== null) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = null;
    }
  };

  useEffect(() => stopMomentum, []);

  const getCardMetrics = () => {
    const scroller = scrollerRef.current;
    const firstCard = scroller?.querySelector<HTMLElement>("[data-carousel-card]");
    if (!scroller || !firstCard) return null;

    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap || "0");
    return {
      scroller,
      step: firstCard.offsetWidth + gap,
      count: scroller.querySelectorAll("[data-carousel-card]").length,
    };
  };

  const scrollToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    const metrics = getCardMetrics();
    if (!metrics) return;

    const maxIndex = Math.max(0, metrics.count - 1);
    const nextIndex = Math.max(0, Math.min(index, maxIndex));
    metrics.scroller.scrollTo({
      left: nextIndex * metrics.step,
      behavior,
    });
  };

  const scrollByCard = (direction: -1 | 1) => {
    const metrics = getCardMetrics();
    if (!metrics) return;

    const currentIndex = Math.round(metrics.scroller.scrollLeft / metrics.step);
    scrollToIndex(currentIndex + direction);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    stopMomentum();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    drag.current = {
      x: event.clientX,
      scrollLeft: scroller.scrollLeft,
      dx: 0,
      velocity: 0,
      lastX: event.clientX,
      lastT: event.timeStamp,
    };
    dragged.current = false;
    setIsDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    const state = drag.current;
    if (!scroller || !state) return;

    state.dx = event.clientX - state.x;
    if (Math.abs(state.dx) > 6) dragged.current = true;
    scroller.scrollLeft = state.scrollLeft - state.dx * 1.18;

    // Velocidade instantânea (px/ms) p/ alimentar a inércia ao soltar.
    const dt = event.timeStamp - state.lastT;
    if (dt > 0) {
      const vNow = (-(event.clientX - state.lastX) * 1.18) / dt;
      // suaviza p/ não captar ruído do último frame
      state.velocity = state.velocity * 0.7 + vNow * 0.3;
      state.lastX = event.clientX;
      state.lastT = event.timeStamp;
    }
  };

  // Desliza com inércia a partir da velocidade do gesto e encaixa no fim.
  const startMomentum = (velocity: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    let v = Math.max(-4, Math.min(4, velocity)); // clamp p/ evitar flings absurdos
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      // atrito normalizado p/ 60fps — glide consistente em qualquer refresh rate
      v *= Math.pow(0.94, dt / 16.67);
      scroller.scrollLeft += v * dt;

      const hitEdge = scroller.scrollLeft <= 0 || scroller.scrollLeft >= maxScroll;
      if (Math.abs(v) < 0.04 || hitEdge) {
        momentumRaf.current = null;
        settleToNearest();
        return;
      }
      momentumRaf.current = requestAnimationFrame(tick);
    };
    momentumRaf.current = requestAnimationFrame(tick);
  };

  const settleToNearest = () => {
    const metrics = getCardMetrics();
    if (!metrics) return;
    scrollToIndex(Math.round(metrics.scroller.scrollLeft / metrics.step));
  };

  const endDrag = () => {
    const state = drag.current;
    drag.current = null;
    setIsDragging(false);
    if (!state) return;

    // Com velocidade suficiente: deixa a inércia decidir quantos cards passar.
    // Sem velocidade (arrasto lento e parado): encaixa no card mais próximo da
    // posição atual — então arrastar 3 cards devagar para em 3, não volta p/ 1.
    if (Math.abs(state.velocity) > 0.12) {
      startMomentum(state.velocity);
    } else {
      settleToNearest();
    }
  };

  return (
    <div className="reveal reveal-2 mt-[clamp(14px,2vw,28px)]">
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          aria-label={t("prev")}
          className="flex h-11 w-11 items-center justify-center border border-[color:var(--line)] text-ink transition-[background-color,color,border-color] duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-white"
          onClick={() => scrollByCard(-1)}
        >
          <Icon name="chevron-left" className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label={t("next")}
          className="flex h-11 w-11 items-center justify-center border border-[color:var(--line)] text-ink transition-[background-color,color,border-color] duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-white"
          onClick={() => scrollByCard(1)}
        >
          <Icon name="chevron-right" className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className={cn(
          "flex gap-[clamp(14px,1.4vw,22px)] overflow-x-auto overflow-y-hidden touch-pan-y select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStartCapture={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (!dragged.current) return;
          event.preventDefault();
          event.stopPropagation();
          dragged.current = false;
        }}
      >
        {orderedProjetos.map((p, index) => (
          <div
            key={p.slug}
            data-carousel-card
            className="shrink-0 snap-start basis-[min(82vw,360px)] sm:basis-[42%] lg:basis-[24%] xl:basis-[22%]"
          >
            <ProjetoTile
              p={p}
              index={index}
              status={tc(`${p.slug}.card.status`)}
              segmento={tc(`${p.slug}.card.segmento`)}
              local={tc(`${p.slug}.card.local`)}
            />
          </div>
        ))}
        {projetosScp.map((p, index) => (
          <div
            key={p.slug}
            data-carousel-card
            className="shrink-0 snap-start basis-[min(82vw,360px)] sm:basis-[42%] lg:basis-[24%] xl:basis-[22%]"
          >
            <ProjetoTileScp
              index={orderedProjetos.length + index}
              name={p.name}
              segmento={ts(`segmento.${p.segmentoKey}`)}
              local={p.local}
              desc={ts("desc")}
              chip={ts("chip")}
              cta={ts("cta")}
              image={p.image}
              tone={p.tone}
              href={p.href}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
