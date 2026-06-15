"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { orderedProjetos, filterTabs, type FilterCat } from "./projetosPage.data";
import { ProjetoTile } from "./ProjetoTile";
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

  // Build the filter note.
  const activeLabel = t(`filtros.${cat}`);
  const note = useMemo(() => {
    if (cat === "all") return t("grid.noteAll");
    const n = visible.length;
    return t(n === 1 ? "grid.noteOne" : "grid.noteMany", { count: n, label: activeLabel });
  }, [cat, visible.length, activeLabel, t]);

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
          {/*
            Grade uniforme (referência Vitacon): 4 cards por fileira no desktop,
            2 em tablet, 1 empilhado no mobile. Todos com o mesmo formato retrato.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(14px,1.4vw,22px)]">
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
          </div>
        </div>
      </section>
    </>
  );
}
