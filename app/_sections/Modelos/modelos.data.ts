export type ModeloRingKind = "consultoria" | "parceria" | "societaria";
// ring serve também como chave de tradução → home.modelos.cards.{ring}.*
export type Modelo = { ring: ModeloRingKind };
export const modelos: Modelo[] = [
  { ring: "consultoria" },
  { ring: "parceria" },
  { ring: "societaria" },
];
