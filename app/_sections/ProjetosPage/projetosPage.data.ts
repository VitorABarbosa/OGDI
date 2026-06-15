import { projetos, projetoTabs, type Projeto, type ProjetoCat } from "@/app/_sections/Projetos/projetos.data";

// Ordem de exibição na grade (todos os cards têm o mesmo formato — retrato).
const order = [
  "hits-cupece",
  "start-park-jabaquara",
  "oh-freguesia",
  "hits-santa-catarina",
  "guarulhos",
];

// ordered list of the actual Projeto objects for the grid
export const orderedProjetos: Projeto[] = order
  .map((slug) => projetos.find((p) => p.slug === slug))
  .filter((p): p is Projeto => Boolean(p));

// filter tabs: "all" + the 3 categories, with live counts derived from projetos.
// Labels are resolved at render time via the `projetos.filtros.*` namespace
// (key = "all" | the ProjetoCat), so no copy lives here.
export type FilterCat = "all" | ProjetoCat;

export const filterTabs: { cat: FilterCat; count: number }[] = [
  { cat: "all", count: projetos.length },
  ...projetoTabs.map((t) => ({
    cat: t.cat as FilterCat,
    count: projetos.filter((p) => p.cat === t.cat).length,
  })),
];
