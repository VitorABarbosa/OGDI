// As 7 etapas da atuação. Apenas a identidade (idx) vive aqui; os textos
// (title/desc) são resolvidos via i18n no namespace home.atuacao.steps.<idx>,
// reutilizado tanto pela home (Atuacao) quanto pela página de Investidores
// (InvestidoresCiclo/Curva).
export type AtuacaoStep = { idx: string };
export const atuacaoSteps: AtuacaoStep[] = [
  { idx: "01" },
  { idx: "02" },
  { idx: "03" },
  { idx: "04" },
  { idx: "05" },
  { idx: "06" },
  { idx: "07" },
];
// chaves de tag → home.atuacao.tags.* (consumidas pela home)
export const atuacaoTagKeys = ["consultoria", "parceria", "societaria"] as const;
