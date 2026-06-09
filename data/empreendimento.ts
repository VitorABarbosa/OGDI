export type AtuacaoStep = { n: string; title: string; desc: string };

export const atuacaoSteps: AtuacaoStep[] = [
  { n: "01", title: "Leitura da oportunidade", desc: "Entendimento do ativo, do estágio e do potencial real de desenvolvimento na região." },
  { n: "02", title: "Inteligência de mercado", desc: "Contexto de praça, demanda e leitura concorrencial que fundamentou a tese." },
  { n: "03", title: "Conceituação do produto", desc: "Definição da lógica do empreendimento: tipologia, mix e posicionamento." },
  { n: "04", title: "Viabilidade", desc: "Análise financeira e institucional que destravou o caminho da operação." },
  { n: "05", title: "Estruturação da operação", desc: "Modelagem para alinhar potencial, capital e execução na mesma direção." },
  { n: "06", title: "Conexão com parceiros", desc: "Articulação de parceiros e relacionamento com banco, incluindo a CEF quando aplicável." },
  { n: "07", title: "Preparação para lançamento", desc: "Estratégia comercial e condução da operação até estar pronta para avançar." },
  { n: "↗", title: "Em obra", desc: "O empreendimento avança na fase de execução, conduzido com a estrutura definida na origem." },
];
