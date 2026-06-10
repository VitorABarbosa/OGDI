"use client";

import { useMemo } from "react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Kicker } from "@/components/ui/Kicker";
import { GalleryFlowBackground } from "@/components/ui/gallery-flow-background";
import { Gallery, GalleryGrid, GalleryImage } from "@/components/ui/shared-element-gallery";
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
  const gallery = useMemo<GalleryItem[]>(
    () => (p.slug === "hits-cupece" ? cupeceImages : p.gallery),
    [p.gallery, p.slug],
  );

  return (
    <section className="relative overflow-hidden bg-bg-soft pb-section pt-[clamp(68px,8vw,112px)]" aria-label="Galeria de imagens">
      <GalleryFlowBackground />
      <div className="wrap relative z-[2]">
        {p.galleryIntro && (
          <div className="mb-[clamp(34px,4.5vw,62px)] max-w-[760px]">
            <Kicker className="reveal">{p.galleryIntro.kicker}</Kicker>
            <h2 className="reveal reveal-2 mt-5 font-sans text-[clamp(28px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-.025em]">
              {p.galleryIntro.title}
            </h2>
            {p.galleryIntro.body.map((paragraph, index) => (
              <p
                key={`${p.slug}-gallery-intro-${index}`}
                className={cn(
                  "reveal mt-5 max-w-[640px] text-[clamp(15px,1.12vw,18px)] leading-[1.7] text-ink-2",
                  `reveal-info-${Math.min(index + 1, 5)}`,
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <Gallery>
          <GalleryGrid>
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
                <GalleryImage
                  key={slot.id}
                  id={slot.id}
                  src={slot.src}
                  alt={slot.alt}
                  className={cn(className, "group")}
                >
                  <span
                    aria-hidden
                    className="absolute right-4 bottom-4 z-[3] flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/45 bg-white/12 text-[24px] leading-none text-white opacity-0 backdrop-blur-md transition-[opacity,transform,background-color] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-white/18"
                  >
                    +
                  </span>
                </GalleryImage>
              );
            })}
          </GalleryGrid>
        </Gallery>
      </div>
    </section>
  );
}
