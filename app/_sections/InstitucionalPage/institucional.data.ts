export type InstModel = { strong: string; rest: string };
export type InstFact = { v: string; k: string };
export type InstStratum = { n: string; name: string; desc: string; bed?: boolean };
export type InstLeader = {
  name: string;
  role: string;
  bio: string;
  statement: string;
  quote: string[];
  image?: string;
};
export type InstWordSeg = { text: string; em?: boolean };
export type InstGroupCompany = {
  id: string;
  name: string;
  label: string;
  role: string;
  text: string;
  tags: string[];
  /** Imagem de fundo revelada quando o card expande (substitui o line-art). */
  bg?: string;
  /** Vídeo de fundo (mp4) — tem prioridade sobre bg; toca só com o card expandido. */
  bgVideo?: string;
  /** Site externo da empresa — torna o card inteiro clicável. */
  href?: string;
  /** Cor da marca — aplicada no título numerado, número da régua e link. */
  accent?: string;
};

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
    facts: [] as InstFact[],
  },
  grupo: {
    kicker: "Nosso Grupo",
    title: "Um ecossistema para fazer o empreendimento nascer antes da obra.",
    intro:
      "Estratégia, arquitetura, visualização e audiovisual operam como forças complementares. Cada empresa aprofunda uma etapa da jornada: estruturar, desenhar, antecipar e comunicar.",
    companies: [
      {
        id: "flying",
        name: "Flying Studio",
        label: "Flying",
        role: "Futuros visuais e experiências imersivas",
        text:
          "A máquina de antecipar futuros. Imagens e perspectivas 3D, apps, o D.Brave e salas imersivas transportam o cliente para dentro da sua futura realidade — mais de 12 anos traduzindo tijolo e cimento em pura poesia visual.",
        tags: ["Perspectivas 3D", "Apps", "D.Brave", "Salas Imersivas"],
        bg: "/Nosso_Grupo/FlyingStudio/geral-11.png",
        href: "https://flyingstudio.com.br/",
        accent: "#A78BFA", // roxo
      },
      {
        id: "ogdi",
        name: "Open Group Desenvolvimento Imobiliário",
        label: "OGDI",
        role: "Estratégia e estruturação",
        text:
          "O ponto de partida estratégico. Atuamos com consultoria focada na inteligência de mercado, no desenvolvimento de produtos e na estruturação completa de novos lançamentos desde a sua concepção.",
        tags: ["Mercado", "Produto", "Lançamento"],
        bg: "/Nosso_Grupo/OGDI/Cidade.png",
        accent: "#4FA3AD", // azul petróleo
      },
      {
        id: "nid",
        name: "NID Studio",
        label: "NID",
        role: "Arquitetura, interiores e PDV",
        text:
          "Onde a inteligência arquitetônica ganha forma e emoção. O lar como um verdadeiro ninho: projetos de interiores, design de fachadas e PDVs concebidos como espaços de aconchego, segurança e forte personalidade.",
        tags: ["Interiores", "Fachadas", "PDV"],
        bg: "/Nosso_Grupo/NID/TAVARES_LIVIGNO_MOOD_DECORADO_02.png",
        accent: "#F08A24", // laranja
      },
      {
        id: "rinno",
        name: "Rinno Films",
        label: "Rinno",
        role: "Filmes, movimento e conexão emocional",
        text:
          "A produtora audiovisual do grupo. De filmes conceito e de produto a materiais virais e institucionais — dando movimento às histórias e criando a conexão emocional entre o projeto e o seu público.",
        tags: ["Filmes", "Viral", "Institucional"],
        accent: "#4D7CC9", // azul escuro
        bgVideo: "/Nosso_Grupo/RINNO/Talon_Atlantis_Filme.mp4",
      },
    ] as InstGroupCompany[],
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
      {
        name: "Max Barbosa",
        role: "CEO and Founder",
        bio: "Conduz a estruturação das operações, da leitura da oportunidade ao desenho estratégico do empreendimento.",
        statement: "Antes de desenvolver um empreendimento, é preciso enxergar o valor que ainda não foi revelado.",
        quote: [
          "À frente da Open Group, Flying Studio, NID Studio e Rinno Films, conduzo um ecossistema criado para transformar oportunidades imobiliárias em operações mais claras, viáveis e preparadas para avançar.",
          "Cada empresa atua em uma etapa da jornada, da estratégia à comunicação, sempre com a mesma visão: desenvolver com estrutura desde a origem.",
        ],
      },
    ] as InstLeader[],
  },
  assinatura: {
    kicker: "Mensagem central",
    sub: "Conduzindo estruturação, viabilidade, parceiros e caminho até o lançamento, com visão estratégica. Desenvolva com visão desde a origem.",
  },
} as const;
