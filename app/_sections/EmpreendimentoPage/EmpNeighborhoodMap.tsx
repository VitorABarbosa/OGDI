"use client";

import { useTranslations } from "next-intl";
import { Kicker } from "@/components/ui/Kicker";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

function googleMapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function EmpNeighborhoodMap({ p }: { p: Projeto }) {
  const t = useTranslations("empreendimento.neighborhood");
  const map = p.map;
  const iframeSrc = map ? googleMapsEmbedUrl(`${p.name}, ${map.address}`) : "";

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
            <p>
              {map?.text ?? t("fallbackText")}
            </p>
            <p className="mt-4 text-[13px] uppercase tracking-[.14em] text-ink-3">
              {map?.address ?? t("fallbackAddress")}
            </p>
          </div>
        </div>

        <div className="reveal reveal-4 mt-[clamp(34px,5vw,68px)] overflow-hidden border border-[color:var(--line)] bg-[#eef0ec]">
          {map ? (
            <iframe
              key={iframeSrc}
              title={t("mapTitle", { name: p.name })}
              src={iframeSrc}
              className="h-[clamp(420px,58vw,620px)] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="grid h-[clamp(420px,58vw,620px)] place-items-center bg-[radial-gradient(90%_90%_at_50%_30%,rgba(31,90,99,.16),transparent_58%),linear-gradient(180deg,#f2f1ed_0%,#e7e7e0_100%)] px-6 text-center">
              <div className="max-w-[460px]">
                <p className="text-[12px] uppercase tracking-[.16em] text-ink-3">{t("mapUnavailable")}</p>
                <p className="mt-4 font-news text-[clamp(30px,4vw,52px)] leading-[1.05] text-ink">
                  {t("addressTbd")}
                </p>
                <p className="mt-5 text-[15px] leading-[1.7] text-ink-2">
                  {t("placeholderText")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
