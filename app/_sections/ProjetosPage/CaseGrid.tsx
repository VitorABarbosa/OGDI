"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { orderedProjetos, caseLayout, filterTabs, type FilterCat } from "./projetosPage.data";
import { CaseCard } from "./CaseCard";
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

      <section className="py-section">
        <div className="wrap">
          {/*
            12-column grid. CaseCard applies its own col-span-* which works on md+ screens.
            On mobile (max-md) we switch to a single-column grid so all cards stack full-width,
            regardless of their span prop. This matches the reference's ≤560px collapse behaviour
            without modifying CaseCard itself.
          */}
          <div className="grid grid-cols-12 max-md:grid-cols-1 gap-x-[clamp(20px,2vw,32px)] gap-y-[clamp(20px,2.4vw,38px)]">
            {visible.map((p, index) => (
              <CaseCard
                key={p.slug}
                p={p}
                index={index}
                span={caseLayout[p.slug]?.span ?? "6"}
                shape={caseLayout[p.slug]?.shape}
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
