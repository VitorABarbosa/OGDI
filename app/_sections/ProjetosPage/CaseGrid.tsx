"use client";

import { useMemo, useState } from "react";
import { orderedProjetos, caseLayout, filterTabs, type FilterCat } from "./projetosPage.data";
import { CaseCard } from "./CaseCard";
import { ProjetosFiltros } from "./ProjetosFiltros";

export function CaseGrid() {
  const [cat, setCat] = useState<FilterCat>("all");

  const visible = useMemo(
    () => (cat === "all" ? orderedProjetos : orderedProjetos.filter((p) => p.cat === cat)),
    [cat],
  );

  // Build the filter note
  const activeTab = filterTabs.find((t) => t.cat === cat) ?? filterTabs[0];
  const note = useMemo(() => {
    if (cat === "all") return "Mostrando todos os projetos";
    const n = visible.length;
    return `${n} ${n === 1 ? "projeto" : "projetos"} · ${activeTab.label}`;
  }, [cat, visible.length, activeTab.label]);

  return (
    <>
      <ProjetosFiltros tabs={filterTabs} active={cat} note={note} onChange={setCat} />

      <section className="py-section">
        <div className="wrap">
          {/*
            12-column grid. CaseCard applies its own col-span-* which works on md+ screens.
            On mobile (max-md) we switch to a single-column grid so all cards stack full-width,
            regardless of their span prop. This matches the reference's ≤560px collapse behaviour
            without modifying CaseCard itself.
          */}
          <div className="grid grid-cols-12 max-md:grid-cols-1 gap-x-[clamp(20px,2vw,32px)] gap-y-[clamp(20px,2.4vw,38px)]">
            {visible.map((p) => (
              <CaseCard
                key={p.slug}
                p={p}
                span={caseLayout[p.slug]?.span ?? "6"}
                shape={caseLayout[p.slug]?.shape}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
