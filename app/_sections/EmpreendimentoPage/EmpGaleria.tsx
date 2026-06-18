"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Kicker } from "@/components/ui/Kicker";
import { Gallery, GalleryImage } from "@/components/ui/shared-element-gallery";
import { cn } from "@/lib/cn";
import type { GaleriaSlot, Projeto } from "@/app/_sections/Projetos/projetos.data";

// Categorias da galeria (referência: Áreas comuns / Decorado / Plantas / Implantação).
type GalCat = "comuns" | "decorado" | "plantas" | "implant";
const CAT_ORDER: GalCat[] = ["comuns", "decorado", "plantas", "implant"];
// Plantas e implantações são documentos → fundo/letterbox e `contain` (não cortar).
const isDoc = (cat: GalCat) => cat === "plantas" || cat === "implant";

type GalleryItem = GaleriaSlot & { src?: string; cat?: GalCat };

// Mostramos 10 imagens; acima disso, "Mostrar mais" revela mais um lote a cada
// clique até exibir todas (mecânica nossa). O MOSAICO e a forma de abrir/ampliar
// as imagens são NOSSOS; da referência `.em-galeria` vêm apenas o enquadramento
// (cabeçalho Galeria + contagem) e a barra de FILTROS por categoria.
const INITIAL_VISIBLE = 10;
const STEP = 10;

// Mosaico em grade de 4 colunas. O padrão tília em linhas que sempre somam 4
// colunas (no md+), então a leitura é da esquerda p/ direita e cresce p/ baixo —
// nada "vaza" para o lado ao revelar/filtrar. Larguras e alturas variam por linha.
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
    { id: "hits-cupece-portaria", alt: "Portaria", src: "/assets/projetos/CUPECE/IMAGES/Portaria.png", cat: "comuns" },
    { id: "hits-cupece-piscina", alt: "Piscina", src: "/assets/projetos/CUPECE/IMAGES/Piscina.png", cat: "comuns" },
    { id: "hits-cupece-cine-open", alt: "CineOpen", src: "/assets/projetos/CUPECE/IMAGES/Cine_Open.png", cat: "comuns" },
    { id: "hits-cupece-churrasqueira", alt: "Churrasqueira", src: "/assets/projetos/CUPECE/IMAGES/Churrasqueira.png", cat: "comuns" },
    { id: "hits-cupece-coworking", alt: "Coworking", src: "/assets/projetos/CUPECE/IMAGES/CoWorking.png", cat: "comuns" },
    { id: "hits-cupece-gourmet", alt: "Espaço gourmet", src: "/assets/projetos/CUPECE/IMAGES/Gourmet.png", cat: "comuns" },
    { id: "hits-cupece-fitness", alt: "Fitness externo", src: "/assets/projetos/CUPECE/IMAGES/Fitness_Externo.png", cat: "comuns" },
    { id: "hits-cupece-lounge", alt: "Lounge", src: "/assets/projetos/CUPECE/IMAGES/Loungue.png", cat: "comuns" },
    { id: "hits-cupece-pet-place", alt: "Pet place", src: "/assets/projetos/CUPECE/IMAGES/Pet_place.png", cat: "comuns" },
    { id: "hits-cupece-playground", alt: "Playground", src: "/assets/projetos/CUPECE/IMAGES/Playground.png", cat: "comuns" },
    { id: "hits-cupece-lavanderia", alt: "Lavanderia", src: "/assets/projetos/CUPECE/IMAGES/Lavanderia.png", cat: "comuns" },
    { id: "hits-cupece-solarium", alt: "Solarium", src: "/assets/projetos/CUPECE/IMAGES/Solarium.png", cat: "comuns" },
    { id: "hits-cupece-living", alt: "Living", src: "/assets/projetos/CUPECE/IMAGES/Living.png", cat: "decorado" },
    { id: "hits-cupece-varanda", alt: "Varanda", src: "/assets/projetos/CUPECE/IMAGES/Varanda.png", cat: "decorado" },
    { id: "hits-cupece-planta-tipo-1", alt: "Tipo 1", src: "/assets/projetos/CUPECE/PLANTAS/Ts_Engenharia_Cupece_Tipo_1_A4.jpg", cat: "plantas" },
    { id: "hits-cupece-planta-tipo-2", alt: "Tipo 2", src: "/assets/projetos/CUPECE/PLANTAS/Ts_Engenharia_Cupece_Tipo_2_A4.jpg", cat: "plantas" },
    { id: "hits-cupece-planta-tipo-3", alt: "Tipo 3 · Garden", src: "/assets/projetos/CUPECE/PLANTAS/Ts_Engenharia_Cupece_Tipo_3_Garden_A4.jpg", cat: "plantas" },
    { id: "hits-cupece-impl-terreo", alt: "Térreo", src: "/assets/projetos/CUPECE/IMPLANTACOES/TS_Cupece_Implantacao_Terreo_Bolotario_A4.jpg", cat: "implant" },
    { id: "hits-cupece-impl-sub1", alt: "1º Subsolo", src: "/assets/projetos/CUPECE/IMPLANTACOES/TS_Cupece_Implantacao_1o-Subsolo_Bolotario_A4.jpg", cat: "implant" },
    { id: "hits-cupece-impl-sub2", alt: "2º Subsolo", src: "/assets/projetos/CUPECE/IMPLANTACOES/TS_Cupece_Implantacao_2a-Subsolo_Bolotario_A4.jpg", cat: "implant" },
    { id: "hits-cupece-impl-sub3", alt: "3º Subsolo", src: "/assets/projetos/CUPECE/IMPLANTACOES/TS_Cupece_Implantacao_3a-Subsolo_Bolotario_A4.jpg", cat: "implant" },
    { id: "hits-cupece-impl-pav5", alt: "5º Pavimento", src: "/assets/projetos/CUPECE/IMPLANTACOES/TS_Cupece_Implantacao_5o_Pavimento_Bolotario_A4.jpg", cat: "implant" },
  ],
  "start-park-jabaquara": [
    { id: "start-park-portaria", alt: "Portaria", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Portaria_HR.jpg", cat: "comuns" },
    { id: "start-park-piscina", alt: "Piscina", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Piscina_HR.jpg", cat: "comuns" },
    { id: "start-park-churrasqueira", alt: "Churrasqueira", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Churrasqueira_HR.jpg", cat: "comuns" },
    { id: "start-park-cine-open", alt: "Cine Open", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_CineOpen_HR.jpg", cat: "comuns" },
    { id: "start-park-crossfit", alt: "CrossFit", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_CrossFit_HR.jpg", cat: "comuns" },
    { id: "start-park-fachada", alt: "Fachada", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Fachada_HR.jpg", cat: "comuns" },
    { id: "start-park-fotomontagem", alt: "Fotomontagem", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Fotomontagem_HR.jpg", cat: "comuns" },
    { id: "start-park-grab-and-go", alt: "Grab and Go", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Grab_and_Go_HR.jpg", cat: "comuns" },
    { id: "start-park-hall", alt: "Hall", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Hall_HR.jpg", cat: "comuns" },
    { id: "start-park-play-aventura", alt: "Play aventura", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_PlayAventura_HR.jpg", cat: "comuns" },
    { id: "start-park-salao-gourmet", alt: "Salao de festas gourmet", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Salao_Festas_Gourmet_HR.jpg", cat: "comuns" },
    { id: "start-park-bike-station", alt: "Bike station", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Hits_Park_Bike_Station_HR.jpg", cat: "comuns" },
    { id: "start-park-delivery", alt: "Delivery", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Hits_Park_Delivery_HR.jpg", cat: "comuns" },
    { id: "start-park-fitness", alt: "Fitness", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Hits_Park_Fitness_HR.jpg", cat: "comuns" },
    { id: "start-park-brinquedoteca", alt: "Brinquedoteca", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Hits_Park_Brinquedoteca_HR.jpg", cat: "comuns" },
    { id: "start-park-planta-tipo-1", alt: "Tipo 1", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/PLANTAS/TS_HITS_PARK_TIPO_01_HR.jpg", cat: "plantas" },
    { id: "start-park-planta-tipo-1-ampliada", alt: "Tipo 1 ampliada", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/PLANTAS/TS_HITS_PARK_TIPO_01_Ampliada_HR.jpg", cat: "plantas" },
    { id: "start-park-planta-tipo-1-dormitorio", alt: "Tipo 1 dormitório", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/PLANTAS/TS_HITS_PARK_TIPO_01_Dormit%C3%B3rio_HR.jpg", cat: "plantas" },
    { id: "start-park-impl-terreo", alt: "Térreo", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMPLANTACOES/Ts_Engenharia_Hits_Park_implantacao_Terreo_HR.jpg", cat: "implant" },
    { id: "start-park-impl-subsolo", alt: "Subsolo", src: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMPLANTACOES/Ts_Engenharia_Hits_Park_implantacao_Subssolo_HR.jpg", cat: "implant" },
  ],
  "oh-freguesia": [
    { id: "oh-freguesia-fachada", alt: "Fachada ativa", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_FREGUESIA_FACHADA_ATIVA_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-aqua-play", alt: "Aqua play", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Aqua_Play_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-beach", alt: "Beach", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Beach_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-gourmet", alt: "Gourmet", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Gourmet_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-fitness", alt: "Fitness", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Fitness_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-hall", alt: "Hall", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Hall_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-living", alt: "Living", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Living_02_HR.jpg", cat: "decorado" },
    { id: "oh-freguesia-quarto-casal", alt: "Quarto casal", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_Quarto_Casal_HR.jpg", cat: "decorado" },
    { id: "oh-freguesia-sky-lounge", alt: "Sky Lounge", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Sky_Louge_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-cine-open", alt: "Cine Open", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_Cine_Open_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-crossfit", alt: "CrossFit", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Crossfit_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-espaco-familia", alt: "Espaço família", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Espa%C3%A7o_Fam%C3%ADlia_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-grab-and-go", alt: "Grab and Go", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Grab_and_Go_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-pet-place", alt: "Pet place", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_PetPlace_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-playground", alt: "Playground", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_Playground_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-praca-do-fogo", alt: "Praça do fogo", src: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_Praca_do_fogo_HR.jpg", cat: "comuns" },
    { id: "oh-freguesia-quarto-solteiro", alt: "Quarto solteiro", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Quarto_Solteiro_HR.jpg", cat: "decorado" },
    { id: "oh-freguesia-banheiro", alt: "Banheiro", src: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Banheiro_HR.jpg", cat: "decorado" },
    { id: "oh-freguesia-planta-tipo-1", alt: "Tipo 1", src: "/assets/projetos/OH_FREGUESIA/PLANTAS/TS_OH_FREGUESIA_TIPO_01_HR.jpg", cat: "plantas" },
    { id: "oh-freguesia-planta-tipo-2", alt: "Tipo 2", src: "/assets/projetos/OH_FREGUESIA/PLANTAS/TS_OH_FREGUESIA_TIPO_02_HR.jpg", cat: "plantas" },
    { id: "oh-freguesia-impl-terreo", alt: "Térreo", src: "/assets/projetos/OH_FREGUESIA/IMPLANTACOES/TS_Oh_Freguesia_Terreo_HR.jpg", cat: "implant" },
    { id: "oh-freguesia-impl-terreo-bolotario", alt: "Térreo bolotário", src: "/assets/projetos/OH_FREGUESIA/IMPLANTACOES/TS_Oh_Freguesia_Terreo_Bolotario_HR.jpg", cat: "implant" },
    { id: "oh-freguesia-impl-pavimento-15", alt: "Pavimento 15", src: "/assets/projetos/OH_FREGUESIA/IMPLANTACOES/TS_Oh_Freguesia_Pavimento_15_HR.jpg", cat: "implant" },
    { id: "oh-freguesia-impl-pavimento-15-bolotario", alt: "Pavimento 15 bolotário", src: "/assets/projetos/OH_FREGUESIA/IMPLANTACOES/TS_Oh_Freguesia_Pavimento_15_Bolotario_HR.jpg", cat: "implant" },
    { id: "oh-freguesia-impl-pavimento-16", alt: "Pavimento 16", src: "/assets/projetos/OH_FREGUESIA/IMPLANTACOES/TS_Oh_Freguesia_Pavimento_16_HR.jpg", cat: "implant" },
    { id: "oh-freguesia-impl-pavimento-16-bolotario", alt: "Pavimento 16 bolotário", src: "/assets/projetos/OH_FREGUESIA/IMPLANTACOES/TS_Oh_Freguesia_Pavimento_16_Bolotario_HR.jpg", cat: "implant" },
  ],
  "hits-santa-catarina": [
    { id: "hits-santa-catarina-favorita", alt: "Imagem principal do empreendimento", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/favorita.jpg", cat: "comuns" },
    { id: "hits-santa-catarina-fachada", alt: "Fachada", src: "/assets/projetos/HITS_SANTA_CATARINA/FACHADA.jpg", cat: "comuns" },
    { id: "hits-santa-catarina-lou", alt: "Ambiente do empreendimento", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/LOU02326.jpg", cat: "comuns" },
    { id: "hits-santa-catarina-1", alt: "Area comum", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/1-1-scaled.jpeg", cat: "comuns" },
    { id: "hits-santa-catarina-20", alt: "Area externa", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/20-scaled.jpeg", cat: "comuns" },
    { id: "hits-santa-catarina-3", alt: "Detalhe do projeto", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/3-scaled.jpeg", cat: "comuns" },
    { id: "hits-santa-catarina-30", alt: "Ambiente de convivencia", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/30-scaled.jpeg", cat: "comuns" },
    { id: "hits-santa-catarina-2-13", alt: "Area interna", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/2-13.jpg", cat: "decorado" },
    { id: "hits-santa-catarina-2-14", alt: "Perspectiva do empreendimento", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/2-14.jpg", cat: "comuns" },
    { id: "hits-santa-catarina-img-1", alt: "Ambiente do empreendimento", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/1.jpeg", cat: "comuns" },
    { id: "hits-santa-catarina-1-16", alt: "Perspectiva do projeto", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/1-16.jpg", cat: "comuns" },
    { id: "hits-santa-catarina-1-17", alt: "Detalhe arquitetonico", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/1-17.jpg", cat: "comuns" },
    { id: "hits-santa-catarina-4-3", alt: "Area de convivencia", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/4-3.jpg", cat: "comuns" },
    { id: "hits-santa-catarina-6-3", alt: "Espaco comum", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/6-3.jpg", cat: "comuns" },
    { id: "hits-santa-catarina-8-2", alt: "Ambiente interno", src: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/8-2.jpg", cat: "decorado" },
    { id: "hits-santa-catarina-planta-1", alt: "Planta 1", src: "/assets/projetos/HITS_SANTA_CATARINA/PLANTAS/foto-1.png", cat: "plantas" },
    { id: "hits-santa-catarina-planta-2", alt: "Planta 2", src: "/assets/projetos/HITS_SANTA_CATARINA/PLANTAS/foto-2.png", cat: "plantas" },
    { id: "hits-santa-catarina-planta-3", alt: "Planta 3", src: "/assets/projetos/HITS_SANTA_CATARINA/PLANTAS/foto-3.png", cat: "plantas" },
    { id: "hits-santa-catarina-planta-4", alt: "Planta 4", src: "/assets/projetos/HITS_SANTA_CATARINA/PLANTAS/foto-4.png", cat: "plantas" },
  ],
};

export function EmpGaleria({ p }: { p: Projeto }) {
  const t = useTranslations("empreendimento.gallery");
  const tp = useTranslations("proj");
  const galleryIntro = tp.raw(`${p.slug}.galleryIntro`) as { kicker: string; title: string; body: string[] };

  const gallery = useMemo<GalleryItem[]>(
    () => projectGalleryImages[p.slug] ?? p.gallery,
    [p.gallery, p.slug],
  );

  // Categorias presentes (na ordem fixa); barra de filtros só aparece se houver
  // mais de uma — senão "Todas" + uma categoria seria redundante.
  const presentCats = useMemo(
    () => CAT_ORDER.filter((c) => gallery.some((g) => (g.cat ?? "comuns") === c)),
    [gallery],
  );
  const hasFilters = presentCats.length > 1;

  const [activeCat, setActiveCat] = useState<"todas" | GalCat>("todas");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filtered = useMemo(
    () => (activeCat === "todas" ? gallery : gallery.filter((g) => (g.cat ?? "comuns") === activeCat)),
    [gallery, activeCat],
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const isExpanded = visibleCount > INITIAL_VISIBLE;
  // Vista de documentos (Plantas/Implantação): masonry respeitando a proporção.
  const docView = activeCat !== "todas" && isDoc(activeCat);

  // Lista navegável do lightbox (só imagens reais, na ordem exibida).
  const lightboxImages = useMemo(
    () => visible.filter((s): s is GalleryItem & { src: string } => Boolean(s.src)).map((s) => ({ id: s.id, src: s.src, alt: s.alt })),
    [visible],
  );

  const selectCat = (cat: "todas" | GalCat) => {
    setActiveCat(cat);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const countFor = (cat: "todas" | GalCat) =>
    cat === "todas" ? gallery.length : gallery.filter((g) => (g.cat ?? "comuns") === cat).length;

  return (
    <section id="galeria" className="scroll-mt-[120px] pb-section pt-[clamp(68px,8vw,112px)]" aria-label={t("aria")}>
      <div className="wrap-wide">
        {/* Cabeçalho (referência .em-gal-head): kicker + h2 à esq, contagem à dir. */}
        <div className="reveal mb-[clamp(28px,3vw,44px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-[14px] font-sans font-semibold text-[clamp(26px,3vw,42px)] leading-[1.06] tracking-[-.03em]">
              {galleryIntro?.title}
            </h2>
          </div>
          <span className="text-[12px] uppercase tracking-[.12em] text-ink-3">
            {t("count", { count: filtered.length })}
          </span>
        </div>

        {/* Filtros (referência .em-gal-filters) */}
        {hasFilters && (
          <div className="reveal mb-[clamp(24px,3vw,40px)] flex flex-wrap gap-2">
            {(["todas", ...presentCats] as const).map((cat) => {
              const active = activeCat === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => selectCat(cat)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-[9px] border px-[17px] py-[10px] text-[12.5px] tracking-[.02em] transition-colors duration-200",
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-[color:var(--line-2)] bg-white text-ink-2 hover:border-ink",
                  )}
                >
                  {t(`filters.${cat}`)}
                  <span className={cn("text-[11px] tabular-nums", active ? "text-white/55" : "text-ink-3")}>
                    {countFor(cat)}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <Gallery images={lightboxImages} caption={t("disclaimer")}>
          {docView ? (
            // Plantas/Implantações: masonry (colunas CSS) respeitando a proporção
            // de cada documento — sem cortar e sem bordas pretas.
            <div className="columns-1 gap-[clamp(10px,1.1vw,16px)] min-[540px]:columns-2 min-[900px]:columns-3">
              {visible.map((slot) =>
                slot.src ? (
                  <GalleryImage
                    key={slot.id}
                    id={slot.id}
                    src={slot.src}
                    alt={slot.alt}
                    naturalSize
                    className="group mb-[clamp(10px,1.1vw,16px)] block w-full break-inside-avoid bg-[#11201f]"
                  >
                    <span
                      aria-hidden
                      className="absolute right-3 bottom-3 z-[3] flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/45 bg-white/12 text-[22px] leading-none text-white opacity-0 backdrop-blur-md transition-[opacity,transform,background-color] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-white/18"
                    >
                      +
                    </span>
                  </GalleryImage>
                ) : null,
              )}
            </div>
          ) : (
          /* Mosaico de 4 colunas (nosso): lê da esquerda p/ direita e cresce p/ baixo. */
          <div className="grid grid-cols-2 gap-[clamp(10px,1.1vw,16px)] md:grid-cols-4">
            {visible.map((slot, i) => {
              const cell = cellPattern[i % cellPattern.length];
              const doc = isDoc(slot.cat ?? "comuns");
              // Sem reveal-on-scroll aqui: o mosaico reordena ao filtrar/expandir,
              // e o `visible` que o RevealController grava no DOM era apagado pelo
              // re-render do React (className muda com o índice), deixando o tile
              // em opacity:0. Os tiles ficam visíveis e animam no hover.
              const className = cn(
                "relative col-span-1 h-[clamp(220px,46vw,300px)] overflow-hidden",
                doc ? "bg-[#11201f]" : "bg-dark",
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
                <GalleryImage
                  key={slot.id}
                  id={slot.id}
                  src={slot.src}
                  alt={slot.alt}
                  fit={doc ? "contain" : "cover"}
                  className={cn(className, "group")}
                >
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
          )}

          {(hasMore || isExpanded) && (
            <div className="mt-[clamp(26px,3.2vw,44px)] flex justify-center">
              {hasMore ? (
                <GalleryToggle
                  expanded={false}
                  label={t("showMore")}
                  onClick={() => setVisibleCount((c) => Math.min(c + STEP, filtered.length))}
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
