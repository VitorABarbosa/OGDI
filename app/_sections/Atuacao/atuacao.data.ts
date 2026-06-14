// As 10 etapas da atuação (jornada completa, da oportunidade ao pós-entrega).
// Apenas a identidade (idx) vive aqui; os textos (title/desc) são resolvidos via
// i18n no namespace home.atuacao.steps.<idx>. A HOME consome as 10; a página de
// Investidores (Ciclo/Curva) consome apenas as 7 primeiras (fase de estruturação,
// "valor antes da obra") — ver INVESTIDORES_STEPS abaixo.
export type AtuacaoStep = { idx: string };
export const atuacaoSteps: AtuacaoStep[] = [
  { idx: "01" },
  { idx: "02" },
  { idx: "03" },
  { idx: "04" },
  { idx: "05" },
  { idx: "06" },
  { idx: "07" },
  { idx: "08" },
  { idx: "09" },
  { idx: "10" },
];
// Investidores mostra só a fase pré-obra (1–7): Leitura → Início de obras.
export const investidoresSteps: AtuacaoStep[] = atuacaoSteps.slice(0, 7);
// chaves de tag → home.atuacao.tags.* (consumidas pela home)
export const atuacaoTagKeys = ["consultoria", "parceria", "societaria"] as const;
