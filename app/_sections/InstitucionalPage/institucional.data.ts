export type InstModel = { strong: string; rest: string };
export type InstFact = { v: string; k: string };
export type InstStratum = { n: string; name: string; desc: string; bed?: boolean };
export type InstLeader = { name: string; role: string; bio: string };
export type InstWordSeg = { text: string; em?: boolean };

export const institucional = {
  hero: {
    kicker: "Quem somos",
    cue: "Role para conhecer a Open Group",
  },
  about: {
    kicker: "Sobre a Open Group",
    models: [
      { strong: "Consultoria", rest: "contratada" },
      { strong: "Parceria", rest: "estratégica" },
      { strong: "Sócia", rest: "da operação" },
    ] as InstModel[],
    facts: [
      { v: "Empresa já lançada", k: "Atuação prática no mercado — não uma ideia em validação." },
      { v: "Clientes atendidos", k: "Operações conduzidas com construtoras, incorporadoras e investidores." },
      { v: "Projetos realizados", k: "Como sócia da operação e como consultoria contratada." },
    ] as InstFact[],
  },
  manifesto: {
    eyebrow: "Nosso manifesto",
    // Tokenizado pelo componente para o efeito de iluminação por scroll.
    segments: [
      { text: "Muitas oportunidades não fracassam por falta de " },
      { text: "potencial", em: true },
      { text: ". Fracassam porque avançam sem " },
      { text: "estrutura", em: true },
      { text: "." },
    ] as InstWordSeg[],
  },
  origem: {
    kicker: "A origem",
    strata: [
      { n: "— 01", name: "A leitura da oportunidade", desc: "Interpretar o ativo e o potencial real, antes que ele seja óbvio." },
      { n: "— 02", name: "A concepção do produto", desc: "Definir o empreendimento certo para aquela oportunidade." },
      { n: "— 03", name: "A estruturação da operação", desc: "Alinhar potencial, capital e execução na mesma direção." },
      { n: "— 04", name: "A escolha dos parceiros", desc: "Articular parceiros, banco e relacionamento institucional." },
      { n: "— 05", name: "O caminho até o lançamento", desc: "Conduzir com clareza até o projeto estar pronto para avançar.", bed: true },
    ] as InstStratum[],
  },
  lideranca: {
    kicker: "Quem conduz",
    leaders: [
      { name: "[ Nome ]", role: "Sócio · Estruturação & Desenvolvimento", bio: "Conduz a estruturação das operações, da leitura da oportunidade ao desenho estratégico do empreendimento." },
      { name: "[ Nome ]", role: "Sócio · Viabilidade & Relações Institucionais", bio: "Responsável pela viabilidade financeira e institucional e pelo relacionamento com bancos e parceiros." },
      { name: "[ Nome ]", role: "Sócio · Estratégia Comercial & Parcerias", bio: "Articula parceiros estratégicos e a direção comercial até o caminho do lançamento." },
    ] as InstLeader[],
  },
  assinatura: {
    kicker: "Mensagem central",
    sub: "Conduzindo estruturação, viabilidade, parceiros e caminho até o lançamento, com visão estratégica. Desenvolva com visão desde a origem.",
  },
} as const;
