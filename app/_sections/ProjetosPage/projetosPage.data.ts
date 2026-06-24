import { projetos, projetoTabs, type Projeto, type ProjetoCat } from "@/app/_sections/Projetos/projetos.data";
import { projetosScp } from "./projetosScp.data";

// Ordem de exibição na grade (todos os cards têm o mesmo formato — retrato).
const order = [
  "hits-cupece",
  "start-park-jabaquara",
  "oh-freguesia",
  "hits-santa-catarina",
  "guarulhos",
  "jabaquara",
];

// ordered list of the actual Projeto objects for the grid
export const orderedProjetos: Projeto[] = order
  .map((slug) => projetos.find((p) => p.slug === slug))
  .filter((p): p is Projeto => Boolean(p));

// filter tabs: "all" + the 3 categories (+ "scp" se houver operações SCP).
// Labels são resolvidos via `projetos.filtros.*` (key = "all" | ProjetoCat | "scp").
// "scp" é um eixo distinto (via de investimento), fora do recorte por estágio e
// fora de "Todos": só aparece quando a própria aba está ativa.
export type FilterCat = "all" | ProjetoCat | "scp";

export const filterTabs: { cat: FilterCat; count: number }[] = [
  // "Todos" inclui empreendimentos + operações SCP (ambos visíveis sem filtro).
  { cat: "all", count: projetos.length + projetosScp.length },
  ...projetoTabs.map((t) => ({
    cat: t.cat as FilterCat,
    count: projetos.filter((p) => p.cat === t.cat).length,
  })),
  ...(projetosScp.length ? [{ cat: "scp" as FilterCat, count: projetosScp.length }] : []),
];
