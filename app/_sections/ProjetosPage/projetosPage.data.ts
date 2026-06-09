import { projetos, projetoTabs, type Projeto, type ProjetoCat } from "@/app/_sections/Projetos/projetos.data";

export type CaseLayout = { span: "6" | "4" | "8"; shape?: "tall" | "wide" };

// keyed by slug
export const caseLayout: Record<string, CaseLayout> = {
  "hits-cupece":          { span: "6" },
  "start-park-jabaquara": { span: "6" },
  "oh-freguesia":         { span: "4", shape: "tall" },
  "hits-santa-catarina":  { span: "8", shape: "wide" },
  "guarulhos":            { span: "6" },
  "cupece":               { span: "6" },
};

const order = [
  "hits-cupece",
  "start-park-jabaquara",
  "oh-freguesia",
  "hits-santa-catarina",
  "guarulhos",
  "cupece",
];

// ordered list of the actual Projeto objects for the grid
export const orderedProjetos: Projeto[] = order
  .map((slug) => projetos.find((p) => p.slug === slug))
  .filter((p): p is Projeto => Boolean(p));

// filter tabs: "all" + the 3 categories, with live counts derived from projetos
export type FilterCat = "all" | ProjetoCat;

export const filterTabs: { cat: FilterCat; label: string; count: number }[] = [
  { cat: "all", label: "Todos", count: projetos.length },
  ...projetoTabs.map((t) => ({
    cat: t.cat as FilterCat,
    label: t.label,
    count: projetos.filter((p) => p.cat === t.cat).length,
  })),
];
