"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { orderedProjetos, filterTabs, type FilterCat } from "./projetosPage.data";
import { projetosScp } from "./projetosScp.data";
import { ProjetoTile } from "./ProjetoTile";
import { ProjetoTileScp } from "./ProjetoTileScp";
import { ProjetosFiltros } from "./ProjetosFiltros";

export function CaseGrid() {
  const t = useTranslations("projetos");
  const [cat, setCat] = useState<FilterCat>("all");

  const visible = useMemo(
    () => (cat === "all" ? orderedProjetos : orderedProjetos.filter((p) => p.cat === cat)),
    [cat],
  );

  // Tab labels come from the `projetos.filtros.*` namespace (key === cat).
  const tabs = useMemo(
    () => filterTabs.map((tab) => ({ ...tab, label: t(`filtros.${tab.cat}`) })),
    [t],
  );

  const isScp = cat === "scp";
  // SCP aparecem sem filtro ("Todos") e sob a própria aba — nunca nas abas de estágio.
  const showScp = cat === "all" || cat === "scp";

  // Build the filter note.
  const activeLabel = t(`filtros.${cat}`);
  const note = useMemo(() => {
    if (cat === "all") return t("grid.noteAll");
    const n = isScp ? projetosScp.length : visible.length;
    return t(n === 1 ? "grid.noteOne" : "grid.noteMany", { count: n, label: activeLabel });
  }, [cat, isScp, visible.length, activeLabel, t]);

  return (
    <>
      <ProjetosFiltros
        tabs={tabs}
        active={cat}
        note={note}
        ariaLabel={t("filtros.aria")}
        onChange={setCat}
      />

      <section className="pt-[clamp(28px,3.5vw,52px)] pb-[clamp(48px,6vw,88px)]">
        <div className="wrap-wide">
          {/* SCP é via de investimento — não empreendimento da atuação; banner demarca. */}
          {isScp && (
            <p
              className="reveal mb-[clamp(22px,3vw,36px)] max-w-[760px] border-l-2 pl-4 text-[clamp(13px,1.05vw,15px)] leading-[1.6] text-ink-2"
              style={{ borderColor: "#4FA3AD" }}
            >
              {t("scp.note")}
            </p>
          )}
          {/*
            Grade uniforme (referência Vitacon): 4 cards por fileira no desktop,
            2 em tablet, 1 empilhado no mobile. Todos com o mesmo formato retrato.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(14px,1.4vw,22px)]">
            {/* Empreendimentos (vazio sob a aba SCP) */}
            {visible.map((p, index) => (
              <ProjetoTile
                key={p.slug}
                p={p}
                index={index}
                status={t(`cards.${p.slug}.status`)}
                segmento={t(`cards.${p.slug}.segmento`)}
                local={t(`cards.${p.slug}.local`)}
              />
            ))}
            {/* Operações SCP — em "Todos" (após os empreendimentos) e na aba SCP */}
            {showScp &&
              projetosScp.map((s, index) => (
                <ProjetoTileScp
                  key={s.slug}
                  index={index}
                  name={s.name}
                  segmento={t(`scp.segmento.${s.segmentoKey}`)}
                  local={s.local}
                  desc={t("scp.desc")}
                  chip={t("scp.chip")}
                  cta={t("scp.cta")}
                  image={s.image}
                  tone={s.tone}
                  href={s.href}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
