import type { MetadataRoute } from "next";

const routes = ["", "/institucional", "/atuacao", "/projetos", "/parceiros", "/investidores", "/insights", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://opengroup.com.br";
  return routes.map((r) => ({ url: `${base}${r}`, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 }));
}
