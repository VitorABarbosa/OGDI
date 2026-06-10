"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import type { Projeto, ProjetoMapPoint } from "@/app/_sections/Projetos/projetos.data";

const TILE_SIZE = 256;
const DEFAULT_SIZE = { width: 1040, height: 520 };

function lngToX(lng: number, zoom: number) {
  return ((lng + 180) / 360) * 2 ** zoom * TILE_SIZE;
}

function latToY(lat: number, zoom: number) {
  const rad = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** zoom * TILE_SIZE;
}

function projectPoint(point: { lat: number; lng: number }, center: { lat: number; lng: number }, zoom: number, size: typeof DEFAULT_SIZE) {
  const centerX = lngToX(center.lng, zoom);
  const centerY = latToY(center.lat, zoom);
  return {
    left: lngToX(point.lng, zoom) - centerX + size.width / 2,
    top: latToY(point.lat, zoom) - centerY + size.height / 2,
  };
}

function categoryTone(category: ProjetoMapPoint["category"]) {
  switch (category) {
    case "educacao":
      return "bg-[#2f7dbd]";
    case "mobilidade":
      return "bg-teal";
    case "comercio":
      return "bg-[#6aa646]";
    case "saude":
      return "bg-[#c65f4a]";
    case "lazer":
      return "bg-[#a07a35]";
  }
}

export function EmpNeighborhoodMap({ p }: { p: Projeto }) {
  const map = p.map;
  const frameRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [activeCategory, setActiveCategory] = useState(map?.categories[0]?.id);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateSize = () => {
      const rect = frame.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) setSize({ width: rect.width, height: rect.height });
    };

    updateSize();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const tiles = useMemo(() => {
    if (!map) return [];

    const centerX = lngToX(map.center.lng, map.zoom);
    const centerY = latToY(map.center.lat, map.zoom);
    const startX = Math.floor((centerX - size.width / 2) / TILE_SIZE);
    const endX = Math.floor((centerX + size.width / 2) / TILE_SIZE);
    const startY = Math.floor((centerY - size.height / 2) / TILE_SIZE);
    const endY = Math.floor((centerY + size.height / 2) / TILE_SIZE);
    const nextTiles: { x: number; y: number; left: number; top: number; src: string }[] = [];

    for (let x = startX; x <= endX; x += 1) {
      for (let y = startY; y <= endY; y += 1) {
        nextTiles.push({
          x,
          y,
          left: x * TILE_SIZE - centerX + size.width / 2,
          top: y * TILE_SIZE - centerY + size.height / 2,
          src: `https://a.basemaps.cartocdn.com/light_nolabels/${map.zoom}/${x}/${y}.png`,
        });
      }
    }

    return nextTiles;
  }, [map, size]);

  if (!map || !activeCategory) return null;

  const activePoints = map.points.filter((point) => point.category === activeCategory);
  const projectPosition = projectPoint(map.center, map.center, map.zoom, size);

  return (
    <section className="bg-bg py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <div className="grid grid-cols-1 items-end gap-[clamp(28px,5vw,72px)] lg:grid-cols-[.86fr_1.14fr]">
          <div>
            <Kicker className="reveal">Entorno do empreendimento</Kicker>
            <h2 className="reveal reveal-2 mt-5 max-w-[720px] font-news text-[clamp(36px,5vw,70px)] font-normal leading-[1.04] tracking-[-.01em]">
              {map.title}
            </h2>
          </div>
          <div className="reveal reveal-3 max-w-[620px] text-[clamp(15px,1.12vw,18px)] leading-[1.72] text-ink-2 lg:justify-self-end">
            <p>{map.text}</p>
            <p className="mt-4 text-[13px] uppercase tracking-[.14em] text-ink-3">{map.address}</p>
          </div>
        </div>

        <div className="reveal reveal-3 mt-[clamp(34px,5vw,68px)] flex flex-wrap gap-2">
          {map.categories.map((category) => {
            const active = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[12px] font-medium uppercase tracking-[.12em] transition-colors duration-300",
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-[color:var(--line)] bg-white text-ink-2 hover:border-ink hover:text-ink",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div
          ref={frameRef}
          className="reveal reveal-4 relative mt-5 h-[clamp(420px,58vw,620px)] overflow-hidden border border-[color:var(--line)] bg-[#eef0ec]"
          aria-label={`Mapa do entorno de ${p.name}`}
        >
          <div className="absolute inset-0 opacity-[.92]">
            {tiles.map((tile) => (
              // Map tiles are remote, dynamic and intentionally bypass next/image optimization.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${tile.x}-${tile.y}`}
                src={tile.src}
                alt=""
                aria-hidden
                width={TILE_SIZE}
                height={TILE_SIZE}
                className="absolute max-w-none select-none"
                style={{ left: tile.left, top: tile.top, width: TILE_SIZE, height: TILE_SIZE }}
                draggable={false}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(242,241,237,.08),rgba(242,241,237,.22))]" />

          <div
            className="absolute z-[2] -translate-x-1/2 -translate-y-1/2"
            style={{ left: projectPosition.left, top: projectPosition.top }}
          >
            <div className="relative grid h-14 w-14 place-items-center rounded-full bg-manifesto text-white shadow-[0_18px_48px_rgba(11,24,27,.24)]">
              <span className="absolute h-20 w-20 rounded-full border border-teal/45" />
              <span className="h-3 w-3 rounded-full bg-teal" />
            </div>
            <div className="mt-3 w-[220px] -translate-x-[83px] bg-white/95 p-3 shadow-[0_18px_48px_rgba(11,24,27,.14)]">
              <p className="text-[11px] uppercase tracking-[.14em] text-ink-3">Empreendimento</p>
              <p className="mt-1 text-[14px] font-semibold text-ink">{p.name}</p>
            </div>
          </div>

          {activePoints.map((point, index) => {
            const position = projectPoint(point, map.center, map.zoom, size);
            return (
              <div
                key={`${point.category}-${point.title}`}
                className="absolute z-[2] -translate-x-1/2 -translate-y-1/2"
                style={{ left: position.left, top: position.top }}
              >
                <div className={cn("h-3.5 w-3.5 rounded-full border-2 border-white shadow-[0_10px_24px_rgba(11,24,27,.28)]", categoryTone(point.category))} />
                <div
                  className={cn(
                    "mt-2 w-[190px] bg-white/94 p-3 shadow-[0_14px_36px_rgba(11,24,27,.12)]",
                    index % 2 === 0 ? "-translate-x-[18px]" : "-translate-x-[150px]",
                  )}
                >
                  <p className="text-[13px] font-semibold leading-tight text-ink">{point.title}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[.12em] text-ink-3">{point.distance}</p>
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-3 right-3 z-[3] bg-white/88 px-2.5 py-1.5 text-[10px] uppercase tracking-[.1em] text-ink-3">
            Tiles © CARTO © OpenStreetMap
          </div>
        </div>
      </div>
    </section>
  );
}
