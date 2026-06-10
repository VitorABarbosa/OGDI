"use client";

import { useMemo, useState } from "react";
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import type { Projeto, ProjetoMapCategoryId } from "@/app/_sections/Projetos/projetos.data";

const GOOGLE_MAP_QUERIES: Record<ProjetoMapCategoryId | "empreendimento", string> = {
  empreendimento: "",
  educacao: "escolas e faculdades perto de",
  mobilidade: "transporte publico perto de",
  comercio: "mercados comercio e conveniencias perto de",
  saude: "hospitais clinicas e farmacias perto de",
  lazer: "parques praca e lazer perto de",
};

function googleMapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function EmpNeighborhoodMap({ p }: { p: Projeto }) {
  const map = p.map;
  const [activeCategory, setActiveCategory] = useState<ProjetoMapCategoryId | "empreendimento">("empreendimento");

  const iframeSrc = useMemo(() => {
    if (!map) return "";

    const baseQuery =
      activeCategory === "empreendimento"
        ? `${p.name}, ${map.address}`
        : `${GOOGLE_MAP_QUERIES[activeCategory]} ${map.address}`;

    return googleMapsEmbedUrl(baseQuery);
  }, [activeCategory, map, p.name]);

  if (!map) return null;

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
          <button
            type="button"
            aria-pressed={activeCategory === "empreendimento"}
            onClick={() => setActiveCategory("empreendimento")}
            className={cn(
              "rounded-full border px-4 py-2 text-[12px] font-medium uppercase tracking-[.12em] transition-colors duration-300",
              activeCategory === "empreendimento"
                ? "border-ink bg-ink text-white"
                : "border-[color:var(--line)] bg-white text-ink-2 hover:border-ink hover:text-ink",
            )}
          >
            Empreendimento
          </button>
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

        <div className="reveal reveal-4 mt-5 overflow-hidden border border-[color:var(--line)] bg-[#eef0ec]">
          <iframe
            key={iframeSrc}
            title={`Google Maps - ${p.name}`}
            src={iframeSrc}
            className="h-[clamp(420px,58vw,620px)] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
