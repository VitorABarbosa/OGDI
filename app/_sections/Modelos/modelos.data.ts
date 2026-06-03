export type ModeloRingKind = "consultoria" | "parceria" | "societaria";
export type Modelo = { idx: string; ring: ModeloRingKind; title: string; desc: string };
export const modelos: Modelo[] = [
  { idx: "i.", ring: "consultoria", title: "Consultoria contratada", desc: "Apoiamos a estruturação da operação com leitura estratégica e condução técnica, dentro de um escopo definido." },
  { idx: "ii.", ring: "parceria", title: "Parceria estratégica", desc: "Atuamos lado a lado na construção do empreendimento, compartilhando visão, estrutura e direção." },
  { idx: "iii.", ring: "societaria", title: "Participação societária", desc: "Entramos como sócios da operação, comprometidos com o resultado do empreendimento de ponta a ponta." },
];
