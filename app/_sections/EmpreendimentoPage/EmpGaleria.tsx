"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/cn";
import type { GaleriaSlot, Projeto } from "@/app/_sections/Projetos/projetos.data";

type GalleryItem = GaleriaSlot & { src?: string };
type LightboxState = {
  item: GalleryItem;
  visible: boolean;
  closing: boolean;
};

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
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gallery = useMemo<GalleryItem[]>(
    () => (p.slug === "hits-cupece" ? cupeceImages : p.gallery),
    [p.gallery, p.slug],
  );

  const clearLightboxTimers = useCallback(() => {
    if (openFrameRef.current !== null) {
      cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openLightbox = useCallback(
    (item: GalleryItem) => {
      clearLightboxTimers();
      setLightbox({ item, visible: false, closing: false });
      openFrameRef.current = requestAnimationFrame(() => {
        openFrameRef.current = null;
        setLightbox((current) =>
          current?.item.id === item.id && !current.closing ? { ...current, visible: true } : current,
        );
      });
    },
    [clearLightboxTimers],
  );

  const closeLightbox = useCallback(() => {
    if (openFrameRef.current !== null) {
      cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }
    setLightbox((current) => {
      if (!current || current.closing) return current;
      return { ...current, visible: false, closing: true };
    });
    if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setLightbox(null);
    }, 360);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };
    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeLightbox, lightbox]);

  useEffect(() => clearLightboxTimers, [clearLightboxTimers]);

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
                onClick={() => openLightbox(slot)}
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

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.item.alt}
          className={cn(
            "fixed inset-0 z-[400] flex items-center justify-center bg-[rgba(8,12,13,.92)] px-[clamp(18px,4vw,64px)] py-[clamp(24px,5vw,72px)] transition-opacity duration-[360ms] ease-[cubic-bezier(.16,1,.3,1)]",
            lightbox.visible && !lightbox.closing ? "opacity-100" : "opacity-0",
          )}
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label="Fechar imagem"
            onClick={closeLightbox}
            className="absolute right-[clamp(18px,3vw,42px)] top-[clamp(18px,3vw,42px)] z-[3] flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-[28px] leading-none text-white/85 transition-[border-color,color,background-color,transform] duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-105 hover:border-white hover:bg-white/10 hover:text-white"
          >
            x
          </button>
          <div
            className={cn(
              "relative h-full max-h-[86vh] w-full max-w-[min(1280px,92vw)] overflow-hidden bg-dark shadow-[0_30px_90px_rgba(0,0,0,.45)] transition-[opacity,transform] duration-[360ms] ease-[cubic-bezier(.16,1,.3,1)]",
              lightbox.visible && !lightbox.closing
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-[.965] opacity-0",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <MediaPlaceholder tone={p.tone} src={lightbox.item.src} alt={lightbox.item.alt} className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
