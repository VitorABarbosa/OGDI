import type { MetadataRoute } from "next";
import { projetos, projetoHref } from "@/app/_sections/Projetos/projetos.data";

const routes = ["", "/institucional", "/atuacao", "/projetos", "/parceiros", "/investidores", "/insights", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://opengroup.com.br";
  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({ url: `${base}${r}`, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 }));
  const projetoEntries: MetadataRoute.Sitemap = projetos.map((p) => ({ url: `${base}${projetoHref(p.slug)}`, changeFrequency: "monthly" as const, priority: 0.8 }));
  return [...staticEntries, ...projetoEntries];
}
