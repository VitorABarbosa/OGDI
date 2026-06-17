// Registry de mensagens por projeto.
// Cada projeto vive em messages/projetos/<slug>/ com pt.json · en.json · es.json,
// e contém TODO o conteúdo traduzível daquele projeto (card, e futuramente a
// ficha, lazer, tour, obra, etc. do Empreendimento).
//
// Adicionar um projeto = criar a pasta + os 3 jsons + 1 entrada no REGISTRY.
// O merge no objeto `messages` acontece em i18n/request.ts, sob o namespace `proj`.
import hitsCupecePt from "./hits-cupece/pt.json";
import hitsCupeceEn from "./hits-cupece/en.json";
import hitsCupeceEs from "./hits-cupece/es.json";
import startParkPt from "./start-park-jabaquara/pt.json";
import startParkEn from "./start-park-jabaquara/en.json";
import startParkEs from "./start-park-jabaquara/es.json";
import ohFreguesiaPt from "./oh-freguesia/pt.json";
import ohFreguesiaEn from "./oh-freguesia/en.json";
import ohFreguesiaEs from "./oh-freguesia/es.json";
import guarulhosPt from "./guarulhos/pt.json";
import guarulhosEn from "./guarulhos/en.json";
import guarulhosEs from "./guarulhos/es.json";
import hitsScPt from "./hits-santa-catarina/pt.json";
import hitsScEn from "./hits-santa-catarina/en.json";
import hitsScEs from "./hits-santa-catarina/es.json";

type Locale = "pt" | "en" | "es";

const REGISTRY: Record<string, Record<Locale, unknown>> = {
  "hits-cupece": { pt: hitsCupecePt, en: hitsCupeceEn, es: hitsCupeceEs },
  "start-park-jabaquara": { pt: startParkPt, en: startParkEn, es: startParkEs },
  "oh-freguesia": { pt: ohFreguesiaPt, en: ohFreguesiaEn, es: ohFreguesiaEs },
  guarulhos: { pt: guarulhosPt, en: guarulhosEn, es: guarulhosEs },
  "hits-santa-catarina": { pt: hitsScPt, en: hitsScEn, es: hitsScEs },
};

// Devolve { <slug>: <mensagens do projeto no locale> } para fundir em `proj`.
// Cai para PT quando um projeto ainda não tem o locale pedido.
export function projetoMessages(locale: string): Record<string, unknown> {
  const loc: Locale = locale === "en" || locale === "es" ? locale : "pt";
  const out: Record<string, unknown> = {};
  for (const slug of Object.keys(REGISTRY)) {
    out[slug] = REGISTRY[slug][loc] ?? REGISTRY[slug].pt;
  }
  return out;
}
