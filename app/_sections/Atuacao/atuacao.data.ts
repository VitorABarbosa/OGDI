// NOTA: title/desc/atuacaoTags continuam aqui em PT porque a página de
// Investidores (InvestidoresCiclo/Curva) ainda consome estes campos. A home
// renderiza via messages (namespace home.atuacao). Migrar quando Investidores
// (Plano 2 / Task 6) for traduzido.
export type AtuacaoStep = { idx: string; title: string; desc: string };
export const atuacaoSteps: AtuacaoStep[] = [
  { idx: "01", title: "Leitura da oportunidade", desc: "Entendimento do ativo, do estágio e do potencial real de desenvolvimento." },
  { idx: "02", title: "Inteligência de mercado", desc: "Contexto de praça, demanda e leitura concorrencial que fundamenta a tese." },
  { idx: "03", title: "Conceituação do empreendimento", desc: "Definição da lógica do produto imobiliário: tipologia, mix e posicionamento." },
  { idx: "04", title: "Viabilidade", desc: "Análise financeira e institucional que destrava o caminho da operação." },
  { idx: "05", title: "Estruturação da operação", desc: "Modelagem para que potencial, capital e execução avancem na mesma direção." },
  { idx: "06", title: "Conexão com parceiros", desc: "Articulação de parceiros e relacionamento com banco, incluindo a CEF quando aplicável." },
  { idx: "07", title: "Preparação para lançamento", desc: "Estratégia comercial e condução da operação até estar pronta para avançar." },
];
// chaves de tag → home.atuacao.tags.* (consumidas pela home)
export const atuacaoTagKeys = ["consultoria", "parceria", "societaria"] as const;
