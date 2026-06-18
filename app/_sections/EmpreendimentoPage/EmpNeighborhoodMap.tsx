"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import type { Projeto, ProjetoMap } from "@/app/_sections/Projetos/projetos.data";

type MapFilter = { key: string; label: string; q?: string };

// Chave pública opcional. Com ela, usamos o mapa interativo (pin fixo + filtro dos
// POIs nativos do Google). Sem ela, caímos no embed keyless (fallback).
const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function googleMapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

// ===================== AJUSTES MANUAIS DO MAPA =====================
const MAP_ZOOM = 17; // zoom do mapa (maior = mais perto). Típico: 14–17.
const PIN_W = 60; // largura do pin (px).
const PIN_H = 60; // altura do pin (px).
const PIN_BULB_CY = 22; // centro vertical onde a logo fica (no SVG do pin).
const PIN_FILL = "#1f5a63"; // cor do pin (teal).
const LOGO_SIZE = 36; // tamanho (px) da logo dentro do pin.
// ===================================================================

// Pin (gota teal sólida) como SVG data-URI; a logo BRANCA entra por cima,
// centrada na parte arredondada — contraste sem fundo.
const PIN_SVG =
  `<svg xmlns='http://www.w3.org/2000/svg' width='${PIN_W}' height='${PIN_H}' viewBox='0 0 48 60'>` +
  `<path d='M24 0C10.7 0 0 10.7 0 24c0 17 24 36 24 36s24-19 24-36C48 10.7 37.3 0 24 0z' fill='${PIN_FILL}'/></svg>`;
const PIN_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(PIN_SVG)}`;

// Mapeamento das categorias para os tipos de POI nativos do Google. Ao filtrar,
// escondemos todos os POIs e mostramos só os tipos da categoria escolhida.
// (Restaurante/mercado/loja caem todos em "poi.business" — limite do Google.)
const POI_FEATURES: Record<string, string[]> = {
  educacao: ["poi.school"],
  comercio: ["poi.business"],
  saude: ["poi.medical"],
  mobilidade: ["transit.station"],
  lazer: ["poi.park", "poi.attraction", "poi.sports_complex"],
};

function stylesFor(key: string) {
  const features = POI_FEATURES[key];
  if (!features) return []; // "Empreendimento"/desconhecido → mostra tudo.
  return [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    ...features.map((featureType) => ({ featureType, stylers: [{ visibility: "on" }] })),
  ];
}

// Loader único do script da Maps JavaScript API (carrega uma vez por página).
// Usa `callback` para garantir que `google.maps` está pronto antes de usar.
let mapsPromise: Promise<any> | null = null;
function loadGoogleMaps(key: string): Promise<any> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if ((window as any).google?.maps) return Promise.resolve((window as any).google);
  if (mapsPromise) return mapsPromise;
  mapsPromise = new Promise((resolve, reject) => {
    const cb = "__ogdiGmapsReady";
    (window as any)[cb] = () => resolve((window as any).google);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=${cb}`;
    script.async = true;
    script.onerror = () => reject(new Error("maps script failed"));
    document.head.appendChild(script);
  });
  return mapsPromise;
}

export function EmpNeighborhoodMap({ p }: { p: Projeto }) {
  const t = useTranslations("empreendimento.neighborhood");
  const map = p.map;
  const filters = t.raw("filters") as MapFilter[];
  const near = t("near");

  const [active, setActive] = useState<string>(filters[0]?.key ?? "empreendimento");

  const activeFilter = filters.find((f) => f.key === active);
  const fallbackQuery = map
    ? !activeFilter?.q
      ? `${p.name}, ${map.address}`
      : `${activeFilter.q} ${near} ${map.address}`
    : "";

  return (
    <section id="localizacao" className="scroll-mt-[120px] bg-bg py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <div className="grid grid-cols-1 items-end gap-[clamp(28px,5vw,72px)] lg:grid-cols-[.86fr_1.14fr]">
          <div>
            <Kicker className="reveal">{t("kicker")}</Kicker>
            <h2 className="reveal reveal-2 mt-5 max-w-[720px] font-news text-[clamp(36px,5vw,70px)] font-normal leading-[1.04] tracking-[-.01em]">
              {map?.title ?? t("fallbackTitle")}
            </h2>
          </div>
          <div className="reveal reveal-3 max-w-[620px] text-[clamp(15px,1.12vw,18px)] leading-[1.72] text-ink-2 lg:justify-self-end">
            <p>{map?.text ?? t("fallbackText")}</p>
            <p className="mt-4 text-[13px] uppercase tracking-[.14em] text-ink-3">
              {map?.address ?? t("fallbackAddress")}
            </p>
          </div>
        </div>

        {/* Chips de filtro do entorno (Educação, Comércio, Saúde…). */}
        {map && (
          <div className="reveal reveal-4 mt-[clamp(28px,4vw,52px)] flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = filter.key === active;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActive(filter.key)}
                  aria-pressed={isActive}
                  className={cn(
                    "border px-[17px] py-[10px] text-[12.5px] tracking-[.02em] transition-colors duration-200",
                    isActive
                      ? "border-ink bg-ink text-white"
                      : "border-[color:var(--line-2)] bg-white text-ink-2 hover:border-ink",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="wrap-wide">
        <div className="reveal reveal-4 mt-[clamp(20px,3vw,32px)] overflow-hidden border border-[color:var(--line)] bg-[#eef0ec]">
          {map ? (
            MAPS_KEY ? (
              <InteractiveMap name={p.name} map={map} active={active} mapTitle={t("mapTitle", { name: p.name })} />
            ) : (
              <iframe
                key={fallbackQuery}
                title={t("mapTitle", { name: p.name })}
                src={googleMapsEmbedUrl(fallbackQuery)}
                className="h-[clamp(420px,58vw,620px)] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            )
          ) : (
            <div className="grid h-[clamp(420px,58vw,620px)] place-items-center bg-[radial-gradient(90%_90%_at_50%_30%,rgba(31,90,99,.16),transparent_58%),linear-gradient(180deg,#f2f1ed_0%,#e7e7e0_100%)] px-6 text-center">
              <div className="max-w-[460px]">
                <p className="text-[12px] uppercase tracking-[.16em] text-ink-3">{t("mapUnavailable")}</p>
                <p className="mt-4 font-news text-[clamp(30px,4vw,52px)] leading-[1.05] text-ink">{t("addressTbd")}</p>
                <p className="mt-5 text-[15px] leading-[1.7] text-ink-2">{t("placeholderText")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Mapa interativo: pin fixo do empreendimento + filtro dos POIs nativos do Google
// por categoria (sem pins/popups nossos — clicar no lugar abre o card do Maps).
function InteractiveMap({
  name,
  map,
  active,
  mapTitle,
}: {
  name: string;
  map: ProjetoMap;
  active: string;
  mapTitle: string;
}) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const centerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Inicialização: carrega o script, resolve o centro (coords ou geocode do
  // endereço), cria o mapa e o marcador fixo do empreendimento.
  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps(MAPS_KEY as string)
      .then(async (google) => {
        if (cancelled || !elRef.current) return;
        let center = map.center;
        if (!center) {
          const geocoder = new google.maps.Geocoder();
          const res = await geocoder.geocode({ address: map.address });
          const loc = res.results?.[0]?.geometry?.location;
          center = loc ? { lat: loc.lat(), lng: loc.lng() } : { lat: -23.55, lng: -46.63 };
        }
        if (cancelled) return;
        centerRef.current = center;
        const gmap = new google.maps.Map(elRef.current, {
          center,
          zoom: MAP_ZOOM,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: "cooperative",
          clickableIcons: true, // POIs nativos clicáveis → card do próprio Maps.
          styles: [],
        });
        mapRef.current = gmap;
        // Pin fixo do empreendimento (gota teal) com a NOSSA logo dentro — dois
        // marcadores empilhados na mesma posição. Permanece em todos os filtros.
        new google.maps.Marker({
          position: center,
          map: gmap,
          title: name,
          zIndex: 998,
          icon: {
            url: PIN_URL,
            scaledSize: new google.maps.Size(PIN_W, PIN_H),
            anchor: new google.maps.Point(PIN_W / 2, PIN_H),
          },
        });
        new google.maps.Marker({
          position: center,
          map: gmap,
          clickable: false,
          zIndex: 999,
          icon: {
            url: "/assets/logos/og-logo-light.png",
            scaledSize: new google.maps.Size(LOGO_SIZE, LOGO_SIZE),
            // Centro da logo na parte arredondada: (PIN_H - PIN_BULB_CY) px acima da ponta.
            anchor: new google.maps.Point(LOGO_SIZE / 2, LOGO_SIZE / 2 + (PIN_H - PIN_BULB_CY)),
          },
        });
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [map.address, map.center, name]);

  // Troca de categoria: filtra os POIs nativos via styles (sem recriar o mapa).
  // "Empreendimento" mostra tudo; o zoom manual é preservado nas categorias.
  useEffect(() => {
    if (!ready) return;
    const isHome = !POI_FEATURES[active];
    mapRef.current.setOptions({ styles: isHome ? [] : stylesFor(active) });
    mapRef.current.panTo(centerRef.current);
    if (isHome) mapRef.current.setZoom(MAP_ZOOM);
  }, [active, ready]);

  if (failed) {
    return (
      <iframe
        title={mapTitle}
        src={googleMapsEmbedUrl(`${name}, ${map.address}`)}
        className="h-[clamp(420px,58vw,620px)] w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return <div ref={elRef} aria-label={mapTitle} className="h-[clamp(420px,58vw,620px)] w-full" />;
}
