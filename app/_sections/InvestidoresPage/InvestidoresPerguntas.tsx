import { FaqAccordion } from "@/app/_sections/Faq/FaqAccordion";

// FAQ do investidor — 20 perguntas paginadas 4 em 4 (5 páginas, com setas),
// layout compacto. Cobre os modelos de participação (SCP, permuta,
// coinvestimento), governança, ciclo, tributação e retorno.
const FAQ_IDS = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
] as const;

export function InvestidoresPerguntas() {
  return (
    <FaqAccordion
      namespace="investidores.perguntas"
      sectionId="investidores-perguntas"
      ids={FAQ_IDS}
      compact
      pageSize={4}
    />
  );
}
