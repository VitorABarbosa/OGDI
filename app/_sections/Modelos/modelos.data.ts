export type ModeloRingKind = "consultoria" | "parceria" | "societaria" | "investimento";
// ring serve também como chave de tradução → home.modelos.cards.{ring}.*
// accent "blue" = Investimento SCP, via de investimento distinta das três
// formas de relação (verde) — mesmo azul-petróleo de Clientes/Institucional.
export type Modelo = { ring: ModeloRingKind; accent?: "green" | "blue" };
export const modelos: Modelo[] = [
  { ring: "consultoria" },
  { ring: "parceria" },
  { ring: "societaria" },
  { ring: "investimento", accent: "blue" },
];
