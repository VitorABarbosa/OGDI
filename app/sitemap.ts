import type { MetadataRoute } from "next";
import { projetos, projetoHref } from "@/app/_sections/Projetos/projetos.data";

const routes = ["", "/institucional", "/atuacao", "/projetos", "/parceiros", "/investidores", "/insights", "/contato"];
const base = "https://opengroup.com.br";

function withAlternates(path: string) {
  return {
    pt: `${base}${path}`,
    en: `${base}/en${path}`,
    es: `${base}/es${path}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
    alternates: { languages: withAlternates(r) },
  }));
  const projetoEntries: MetadataRoute.Sitemap = projetos.map((p) => ({
    url: `${base}${projetoHref(p.slug)}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: { languages: withAlternates(projetoHref(p.slug)) },
  }));
  return [...staticEntries, ...projetoEntries];
}
