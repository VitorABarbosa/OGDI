"use client";

import { useEffect, useMemo, useState } from "react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/cn";
import type { GaleriaSlot, Projeto } from "@/app/_sections/Projetos/projetos.data";

type GalleryItem = GaleriaSlot & { src?: string };

const cupeceImages: GalleryItem[] = [
  { id: "hits-cupece-cine-open", alt: "Cine Open", src: "/assets/projetos/CUPECE/IMAGES/Cine_Open.png" },
  { id: "hits-cupece-fitness", alt: "Fitness externo", src: "/assets/projetos/CUPECE/IMAGES/Fitness_Externo.png" },
  { id: "hits-cupece-living", alt: "Living", src: "/assets/projetos/CUPECE/IMAGES/Living.png" },
  { id: "hits-cupece-pet-place", alt: "Pet place", src: "/assets/projetos/CUPECE/IMAGES/Pet_place.png" },
  { id: "hits-cupece-piscina", alt: "Piscina", src: "/assets/projetos/CUPECE/IMAGES/Piscina.png" },
  { id: "hits-cupece-playground", alt: "Playground", src: "/assets/projetos/CUPECE/IMAGES/Playground.png" },
  { id: "hits-cupece-portaria", alt: "Portaria", src: "/assets/projetos/CUPECE/IMAGES/Portaria.png" },
  { id: "hits-cupece-solarium", alt: "Solarium", src: "/assets/projetos/CUPECE/IMAGES/Solarium.png" },
  { id: "hits-cupece-varanda", alt: "Varanda", src: "/assets/projetos/CUPECE/IMAGES/Varanda.png" },
];

const cellLayout: { span: string; height: string }[] = [
  { span: "col-span-8", height: "h-[clamp(340px,36vw,540px)]" },
  { span: "col-span-4", height: "h-[clamp(340px,36vw,540px)]" },
  { span: "col-span-4", height: "h-[clamp(280px,30vw,440px)]" },
  { span: "col-span-4", height: "h-[clamp(280px,30vw,440px)]" },
  { span: "col-span-4", height: "h-[clamp(280px,30vw,440px)]" },
  { span: "col-span-6", height: "h-[clamp(300px,30vw,460px)]" },
  { span: "col-span-6", height: "h-[clamp(300px,30vw,460px)]" },
  { span: "col-span-4", height: "h-[clamp(300px,32vw,480px)]" },
  { span: "col-span-8", height: "h-[clamp(300px,32vw,480px)]" },
];

export function EmpGaleria({ p }: { p: Projeto }) {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const gallery = useMemo<GalleryItem[]>(
    () => (p.slug === "hits-cupece" ? cupeceImages : p.gallery),
    [p.gallery, p.slug],
  );

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <section className="pb-section" aria-label="Galeria de imagens">
      <div className="wrap">
        <div className="grid grid-cols-12 gap-[clamp(14px,1.6vw,24px)]">
          {gallery.map((slot, i) => {
            const cell = cellLayout[i];
            if (!cell) return null;
            const className = cn(
              "relative overflow-hidden bg-dark",
              "reveal reveal-gallery",
              `reveal-gallery-${Math.min(i, 5)}`,
              cell.span,
              cell.height,
              "max-md:col-span-12 max-md:h-[clamp(240px,70vw,420px)]",
            );

            if (!slot.src) {
              return (
                <div key={slot.id} className={className}>
                  <MediaPlaceholder tone={p.tone} alt={slot.alt} />
                </div>
              );
            }

            return (
              <button
                key={slot.id}
                type="button"
                aria-label={`Abrir imagem ${slot.alt}`}
                onClick={() => setActive(slot)}
                className={cn(
                  className,
                  "group cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal",
                )}
              >
                <MediaPlaceholder
                  tone={p.tone}
                  src={slot.src}
                  alt={slot.alt}
                  className="transition-transform duration-[900ms] ease-brand group-hover:scale-[1.045]"
                />
                <span aria-hidden className="absolute inset-0 z-[2] bg-dark/0 transition-colors duration-500 group-hover:bg-dark/18" />
                <span
                  aria-hidden
                  className="absolute right-4 bottom-4 z-[3] flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/45 bg-white/12 text-[24px] leading-none text-white opacity-0 backdrop-blur-md transition-[opacity,transform,background-color] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-white/18"
                >
                  +
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[400] flex items-center justify-center bg-[rgba(8,12,13,.92)] px-[clamp(18px,4vw,64px)] py-[clamp(24px,5vw,72px)] opacity-100 transition-opacity duration-500 ease-brand"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Fechar imagem"
            onClick={() => setActive(null)}
            className="absolute right-[clamp(18px,3vw,42px)] top-[clamp(18px,3vw,42px)] z-[3] flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-[28px] leading-none text-white/85 transition-colors duration-300 hover:border-white hover:text-white"
          >
            x
          </button>
          <div
            className="relative h-full max-h-[86vh] w-full max-w-[min(1280px,92vw)] scale-100 overflow-hidden bg-dark shadow-[0_30px_90px_rgba(0,0,0,.45)] transition-transform duration-500 ease-brand"
            onClick={(event) => event.stopPropagation()}
          >
            <MediaPlaceholder tone={p.tone} src={active.src} alt={active.alt} className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
