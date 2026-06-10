"use client";

import { Kicker } from "@/components/ui/Kicker";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

function googleMapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function EmpNeighborhoodMap({ p }: { p: Projeto }) {
  const map = p.map;

  if (!map) return null;

  const iframeSrc = googleMapsEmbedUrl(`${p.name}, ${map.address}`);

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

        <div className="reveal reveal-4 mt-[clamp(34px,5vw,68px)] overflow-hidden border border-[color:var(--line)] bg-[#eef0ec]">
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
