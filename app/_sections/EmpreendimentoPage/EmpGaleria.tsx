"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Kicker } from "@/components/ui/Kicker";
import { Gallery, GalleryImage } from "@/components/ui/shared-element-gallery";
import { cn } from "@/lib/cn";
import type { GaleriaSlot, Projeto } from "@/app/_sections/Projetos/projetos.data";

type GalleryItem = GaleriaSlot & { src?: string };

// Mostramos 10 imagens; acima disso, "Mostrar mais" revela mais um lote a cada
// clique (aos poucos, ao desejo do usuário) até exibir todas.
const INITIAL_VISIBLE = 10;
const STEP = 10;

// Mosaico em grade de 4 colunas. O padrão tília em linhas que sempre somam 4
// colunas (no md+), então a leitura é da esquerda p/ direita e cresce p/ baixo —
// nada "vaza" para o lado ao revelar mais. Larguras e alturas variam por linha.
const cellPattern: { span: string; h: string }[] = [
  // linha 1
  { span: "md:col-span-2", h: "md:h-[clamp(300px,30vw,480px)]" },
  { span: "md:col-span-1", h: "md:h-[clamp(300px,30vw,480px)]" },
  { span: "md:col-span-1", h: "md:h-[clamp(300px,30vw,480px)]" },
  // linha 2
  { span: "md:col-span-1", h: "md:h-[clamp(240px,23vw,360px)]" },
  { span: "md:col-span-1", h: "md:h-[clamp(240px,23vw,360px)]" },
  { span: "md:col-span-2", h: "md:h-[clamp(240px,23vw,360px)]" },
  // linha 3
  { span: "md:col-span-1", h: "md:h-[clamp(260px,26vw,400px)]" },
  { span: "md:col-span-2", h: "md:h-[clamp(260px,26vw,400px)]" },
  { span: "md:col-span-1", h: "md:h-[clamp(260px,26vw,400px)]" },
  // linha 4 (quatro iguais)
  { span: "md:col-span-1", h: "md:h-[clamp(280px,27vw,420px)]" },
  { span: "md:col-span-1", h: "md:h-[clamp(280px,27vw,420px)]" },
  { span: "md:col-span-1", h: "md:h-[clamp(280px,27vw,420px)]" },
  { span: "md:col-span-1", h: "md:h-[clamp(280px,27vw,420px)]" },
];

const projectGalleryImages: Record<string, GalleryItem[]> = {
  "hits-cupece": [
    { id: "hits-cupece-cine-open", alt: "Cine Open", src: "/assets/projetos/CUPECE/IMAGES/Cine_Open.png" },
    { id: "hits-cupece-fitness", alt: "Fitness externo", src: "/assets/projetos/CUPECE/IMAGES/Fitness_Externo.png" },
    { id: "hits-cupece-living", alt: "Living", src: "/assets/projetos/CUPECE/IMAGES/Living.png" },
    { id: "hits-cupece-pet-place", alt: "Pet place", src: "/assets/projetos/CUPECE/IMAGES/Pet_place.png" },
    { id: "hits-cupece-piscina", alt: "Piscina", src: "/assets/projetos/CUPECE/IMAGES/Piscina.png" },
    { id: "hits-cupece-playground", alt: "Playground", src: "/assets/projetos/CUPECE/IMAGES/Playground.png" },
    { id: "hits-cupece-portaria", alt: "Portaria", src: "/assets/projetos/CUPECE/IMAGES/Portaria.png" },
    { id: "hits-cupece-solarium", alt: "Solarium", src: "/assets/projetos/CUPECE/IMAGES/Solarium.png" },
    { id: "hits-cupece-varanda", alt: "Varanda", src: "/assets/projetos/CUPECE/IMAGES/Varanda.png" },
  ],
  "start-park-jabaquara": [
    { id: "start-park-portaria", alt: "Portaria", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Portaria_HR.jpg" },
    { id: "start-park-piscina", alt: "Piscina", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Piscina_HR.jpg" },
    { id: "start-park-churrasqueira", alt: "Churrasqueira", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Churrasqueira_HR.jpg" },
    { id: "start-park-cine-open", alt: "Cine Open", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_CineOpen_HR.jpg" },
    { id: "start-park-crossfit", alt: "CrossFit", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_CrossFit_HR.jpg" },
    { id: "start-park-play-aventura", alt: "Play aventura", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_PlayAventura_HR.jpg" },
    { id: "start-park-salao-gourmet", alt: "Salao de festas gourmet", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Salao_Festas_Gourmet_HR.jpg" },
    { id: "start-park-bike-station", alt: "Bike station", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Hits_Park_Bike_Station_HR.jpg" },
    { id: "start-park-fitness", alt: "Fitness", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Hits_Park_Fitness_HR.jpg" },
    { id: "start-park-brinquedoteca", alt: "Brinquedoteca", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Hits_Park_Brinquedoteca_HR.jpg" },
  ],
  "oh-freguesia": [
    { id: "oh-freguesia-fachada", alt: "Fachada ativa", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_FREGUESIA_FACHADA_ATIVA_HR.jpg" },
    { id: "oh-freguesia-aqua-play", alt: "Aqua play", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Aqua_Play_HR.jpg" },
    { id: "oh-freguesia-beach", alt: "Beach", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Beach_HR.jpg" },
    { id: "oh-freguesia-gourmet", alt: "Gourmet", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Gourmet_HR.jpg" },
    { id: "oh-freguesia-fitness", alt: "Fitness", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Fitness_HR.jpg" },
    { id: "oh-freguesia-hall", alt: "Hall", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Hall_HR.jpg" },
    { id: "oh-freguesia-living", alt: "Living", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Living_02_HR.jpg" },
    { id: "oh-freguesia-quarto-casal", alt: "Quarto casal", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_Quarto_Casal_HR.jpg" },
    { id: "oh-freguesia-sky-lounge", alt: "Sky Lounge", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Sky_Louge_HR.jpg" },
    { id: "oh-freguesia-cine-open", alt: "Cine Open", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_Cine_Open_HR.jpg" },
    { id: "oh-freguesia-crossfit", alt: "CrossFit", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Crossfit_HR.jpg" },
    { id: "oh-freguesia-espaco-familia", alt: "Espaço família", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Espa%C3%A7o_Fam%C3%ADlia_HR.jpg" },
    { id: "oh-freguesia-grab-and-go", alt: "Grab and Go", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Grab_and_Go_HR.jpg" },
    { id: "oh-freguesia-pet-place", alt: "Pet place", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_PetPlace_HR.jpg" },
    { id: "oh-freguesia-playground", alt: "Playground", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_Playground_HR.jpg" },
    { id: "oh-freguesia-praca-do-fogo", alt: "Praça do fogo", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_Praca_do_fogo_HR.jpg" },
    { id: "oh-freguesia-quarto-solteiro", alt: "Quarto solteiro", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Quarto_Solteiro_HR.jpg" },
    { id: "oh-freguesia-banheiro", alt: "Banheiro", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Banheiro_HR.jpg" },
  ],
  "hits-santa-catarina": [
    { id: "hits-santa-catarina-favorita", alt: "Imagem principal do empreendimento", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/favorita.jpg" },
    { id: "hits-santa-catarina-fachada", alt: "Fachada", src: "/assets/projetos/HITS_SANTA_CATARINA/FACHADA.jpg" },
    { id: "hits-santa-catarina-lou", alt: "Ambiente do empreendimento", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/LOU02326.jpg" },
    { id: "hits-santa-catarina-1", alt: "Area comum", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/1-1-scaled.jpeg" },
    { id: "hits-santa-catarina-20", alt: "Area externa", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/20-scaled.jpeg" },
    { id: "hits-santa-catarina-3", alt: "Detalhe do projeto", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/3-scaled.jpeg" },
    { id: "hits-santa-catarina-30", alt: "Ambiente de convivencia", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/30-scaled.jpeg" },
    { id: "hits-santa-catarina-2-13", alt: "Area interna", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/2-13.jpg" },
    { id: "hits-santa-catarina-2-14", alt: "Perspectiva do empreendimento", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/2-14.jpg" },
    { id: "hits-santa-catarina-img-1", alt: "Ambiente do empreendimento", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/1.jpeg" },
    { id: "hits-santa-catarina-1-16", alt: "Perspectiva do projeto", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/1-16.jpg" },
    { id: "hits-santa-catarina-1-17", alt: "Detalhe arquitetonico", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/1-17.jpg" },
    { id: "hits-santa-catarina-4-3", alt: "Area de convivencia", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/4-3.jpg" },
    { id: "hits-santa-catarina-6-3", alt: "Espaco comum", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/6-3.jpg" },
    { id: "hits-santa-catarina-8-2", alt: "Ambiente interno", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/8-2.jpg" },
  ],
};

export function EmpGaleria({ p }: { p: Projeto }) {
  const t = useTranslations("empreendimento.gallery");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const gallery = useMemo<GalleryItem[]>(
    () => projectGalleryImages[p.slug] ?? p.gallery,
    [p.gallery, p.slug],
  );

  const visible = gallery.slice(0, visibleCount);
  const hasMore = visibleCount < gallery.length;
  const isExpanded = visibleCount > INITIAL_VISIBLE;

  return (
    <section className="pb-section pt-[clamp(68px,8vw,112px)]" aria-label={t("aria")}>
      <div className="wrap-wide">
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
          {/* Grade de 4 colunas: lê da esquerda p/ direita e cresce p/ baixo. */}
          <div className="grid grid-cols-2 gap-[clamp(10px,1.1vw,16px)] md:grid-cols-4">
            {visible.map((slot, i) => {
              const cell = cellPattern[i % cellPattern.length];
              const className = cn(
                "relative col-span-1 h-[clamp(220px,46vw,300px)] overflow-hidden bg-dark",
                "reveal reveal-gallery",
                `reveal-gallery-${Math.min(i, 5)}`,
                cell.span,
                cell.h,
              );

              if (!slot.src) {
                return (
                  <div key={slot.id} className={className}>
                    <MediaPlaceholder tone={p.tone} alt={slot.alt} />
                  </div>
                );
              }

              return (
                <GalleryImage key={slot.id} id={slot.id} src={slot.src} alt={slot.alt} className={cn(className, "group")}>
                  <span
                    aria-hidden
                    className="absolute right-3 bottom-3 z-[3] flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/45 bg-white/12 text-[22px] leading-none text-white opacity-0 backdrop-blur-md transition-[opacity,transform,background-color] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-white/18"
                  >
                    +
                  </span>
                </GalleryImage>
              );
            })}
          </div>

          {(hasMore || isExpanded) && (
            <div className="mt-[clamp(26px,3.2vw,44px)] flex justify-center">
              {hasMore ? (
                <GalleryToggle
                  expanded={false}
                  label={t("showMore")}
                  onClick={() => setVisibleCount((c) => Math.min(c + STEP, gallery.length))}
                />
              ) : (
                <GalleryToggle expanded label={t("showLess")} onClick={() => setVisibleCount(INITIAL_VISIBLE)} />
              )}
            </div>
          )}
        </Gallery>
      </div>
    </section>
  );
}

function GalleryToggle({ expanded, label, onClick }: { expanded: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2.5 border border-[color:var(--line-2)] bg-bg-soft/85 px-[clamp(22px,2.4vw,34px)] py-[13px] text-[12px] font-semibold uppercase tracking-[.1em] text-ink backdrop-blur-sm transition-colors hover:border-ink"
    >
      {label}
      <svg
        viewBox="0 0 16 16"
        aria-hidden
        className={cn("h-3.5 w-3.5 transition-transform duration-300", expanded && "rotate-180")}
      >
        <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
