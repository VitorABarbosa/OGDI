// Estrutura do método OGDI — rótulos (title/desc) vivem em messages/*.json
// sob `empreendimento.atuacao.steps.<key>` (UI reutilizável, igual em todos os
// empreendimentos). Aqui ficam apenas o numeral exibido e a chave de tradução.
export type AtuacaoStep = { n: string; key: string };

export const atuacaoSteps: AtuacaoStep[] = [
  { n: "01", key: "01" },
  { n: "02", key: "02" },
  { n: "03", key: "03" },
  { n: "04", key: "04" },
  { n: "05", key: "05" },
  { n: "06", key: "06" },
  { n: "07", key: "07" },
  { n: "↗", key: "em-obra" },
];
