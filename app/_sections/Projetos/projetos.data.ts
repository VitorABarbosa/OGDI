export type ProjetoCat = "obra" | "futuro" | "entregue";

export type GaleriaSlot = { id: string; alt: string }; // no image yet → MediaPlaceholder

export type ProjetoStoryHighlight = {
  title: string;
  text: string;
};

export type ProjetoStory = {
  kicker: string;
  title: string;
  body: string[];
  highlights?: ProjetoStoryHighlight[];
};

export type ProjetoProductCard = {
  label: string;
  value: string;
  text?: string;
};

export type ProjetoProductStory = {
  kicker: string;
  title: string;
  body: string[];
  cards: ProjetoProductCard[];
};

export type ProjetoClosingStatement = {
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref?: string;
};

export type Projeto = {
  cat: ProjetoCat;
  status: string;
  name: string;
  slug: string;
  tag: string;
  tone: "t1" | "t2" | "t3";
  ctaLabel: string;
  image?: string;
  segmento: string;
  local: string;
  regiao?: string;
  modelo: string;
  localTbd?: boolean;
  intro: string[];
  gallery: GaleriaSlot[];
  address?: string;
  units?: string;
  unitFeature?: string;
  heroSummary?: string;
  facts?: string[];
  locationStory?: ProjetoStory;
  productStory?: ProjetoProductStory;
  strategyStory?: ProjetoStory;
  galleryIntro?: ProjetoStory;
  closingStatement?: ProjetoClosingStatement;
};

export const projetoTabs: { cat: ProjetoCat; label: string }[] = [
  { cat: "obra", label: "Em obra" },
  { cat: "futuro", label: "Futuro lançamento" },
  { cat: "entregue", label: "Entregue" },
];

export const projetos: Projeto[] = [
  {
    cat: "obra", status: "Em obra", name: "Hits Cupecê",
    slug: "hits-cupece",
    tag: "Operação estruturada na origem, do produto ao lançamento.",
    tone: "t2", ctaLabel: "Conheça o empreendimento",
    image: "/assets/projetos/CUPECE/Cupece.png",
    segmento: "Residencial", local: "São Paulo · SP", regiao: "Cupecê",
    modelo: "Parceria estratégica",
    address: "Rua Dom João Soares Coelho",
    units: "1 e 2 dormitórios",
    unitFeature: "Terraço com churrasqueira",
    heroSummary:
      "Um empreendimento residencial no Cupecê, em uma região conectada, conveniente e em valorização, na zona sul de São Paulo.",
    facts: ["Em obra", "1 e 2 dormitórios", "Terraço com churrasqueira", "Cupecê - São Paulo"],
    intro: [
      "O Hits Cupecê nasce de uma leitura objetiva do território: uma região em ascensão, com comércio, conveniências e conexões urbanas que sustentam uma demanda real por moradia.",
      "A Open Group estruturou a oportunidade olhando, primeiro, para o lugar; depois, para o produto; e, por fim, para a operação necessária para transformar potencial em empreendimento.",
    ],
    locationStory: {
      kicker: "A tese do lugar",
      title: "Antes da obra, existe a leitura do território.",
      body: [
        "Localizado na Rua Dom João Soares Coelho, o Hits Cupecê está inserido em uma região em plena ascensão e valorização, com comércio forte e conveniências que simplificam a rotina.",
        "A proximidade com a Avenida Cupecê amplia essa leitura. Com 5,3 km de extensão, ela conecta a Ponte do Morumbi, na Marginal Pinheiros, ao centro de Diadema, criando um eixo relevante de mobilidade na zona sul.",
        "A poucos minutos da Rodovia dos Imigrantes, o endereço também aproxima a cidade do litoral sul. Para a Open Group, essa combinação de acesso, vida cotidiana e valorização transforma a localização em tese de produto.",
      ],
      highlights: [
        {
          title: "Região em ascensão",
          text: "Um entorno com valorização, comércio e serviços que reforçam a consistência da demanda.",
        },
        {
          title: "Conexões urbanas",
          text: "Avenida Cupecê, Marginal Pinheiros, Diadema e Rodovia dos Imigrantes no raio estratégico do projeto.",
        },
        {
          title: "Cotidiano conveniente",
          text: "Facilidade de acesso e conveniências próximas para reduzir deslocamentos e dar fluidez à rotina.",
        },
      ],
    },
    productStory: {
      kicker: "O produto como resposta",
      title: "Tipologias pensadas para uma vida urbana mais prática.",
      body: [
        "As unidades de 1 e 2 dormitórios respondem a um público que busca morar bem, com eficiência e conexão com a cidade.",
        "O terraço com churrasqueira adiciona uma camada de uso e desejo ao produto: um espaço privado para receber, respirar e ampliar a experiência do apartamento.",
      ],
      cards: [
        {
          label: "Tipologia",
          value: "1 e 2 dormitórios",
          text: "Configurações alinhadas a diferentes momentos de vida e perfis de moradia.",
        },
        {
          label: "Endereço",
          value: "Rua Dom João Soares Coelho",
          text: "Implantação em uma área de conveniência e valorização no Cupecê.",
        },
        {
          label: "Mobilidade",
          value: "Eixo Avenida Cupecê",
          text: "Conexão com Marginal Pinheiros, Diadema e Rodovia dos Imigrantes.",
        },
        {
          label: "Experiência",
          value: "Terraço com churrasqueira",
          text: "Um diferencial que transforma a área privativa em lugar de encontro.",
        },
      ],
    },
    galleryIntro: {
      kicker: "Do conceito à experiência",
      title: "A narrativa também aparece nos espaços.",
      body: [
        "A galeria apresenta ambientes que traduzem a proposta do Hits Cupecê: morar com praticidade, áreas de uso bem definidas e uma rotina conectada ao entorno.",
      ],
    },
    strategyStory: {
      kicker: "Estruturação Open Group",
      title: "A operação foi pensada antes de a obra chegar ao canteiro.",
      body: [
        "No Hits Cupecê, a Open Group atua na etapa em que o valor é construído com mais precisão: leitura da oportunidade, definição de produto, análise de viabilidade, articulação de parceiros e condução até a fase de obra.",
        "Essa inteligência transforma uma localização promissora em uma operação estruturada, com produto, mercado e execução caminhando na mesma direção.",
      ],
    },
    closingStatement: {
      title: "Cupecê não é apenas um endereço.",
      text: "É uma operação estruturada a partir de localização, demanda e visão de produto.",
      ctaLabel: "Tenho interesse no empreendimento",
      ctaHref: "https://www.tsengenharia.com/imovel/hits-cupece/",
    },
    gallery: [
      { id: "hits-cupece-g1", alt: "Fachada / render principal" },
      { id: "hits-cupece-g2", alt: "Render vertical" },
      { id: "hits-cupece-g3", alt: "Área comum" },
      { id: "hits-cupece-g4", alt: "Apartamento decorado" },
      { id: "hits-cupece-g5", alt: "Detalhe arquitetônico" },
      { id: "hits-cupece-g6", alt: "Render panorâmico / implantação" },
    ],
  },
  {
    cat: "obra", status: "Em obra", name: "Start Park Jabaquara",
    slug: "start-park-jabaquara",
    tag: "Da inteligência de mercado à condução até o lançamento.",
    tone: "t3", ctaLabel: "Conheça o empreendimento",
    image: "/assets/projetos/HITS_START_PARK_JABAQUARA/HITS_PARK.png",
    segmento: "Residencial", local: "São Paulo · SP",
    modelo: "Parceria estratégica",
    intro: [
      "[PROVISÓRIO] No Jabaquara, a leitura da oportunidade precedeu a estruturação. A OGDI identificou o potencial do ativo e construiu a tese com base em contexto de praça e leitura concorrencial consistente.",
      "[PROVISÓRIO] A conceituação do produto e a modelagem da operação alinharam capital, parceiros e execução na mesma direção — condição para que o lançamento fosse viável e sustentável.",
      "[PROVISÓRIO] O empreendimento avança hoje em obra, resultado de uma operação preparada com rigor desde a origem.",
    ],
    gallery: [
      { id: "start-park-jabaquara-g1", alt: "Fachada / render principal" },
      { id: "start-park-jabaquara-g2", alt: "Render vertical" },
      { id: "start-park-jabaquara-g3", alt: "Área comum" },
      { id: "start-park-jabaquara-g4", alt: "Apartamento decorado" },
      { id: "start-park-jabaquara-g5", alt: "Detalhe arquitetônico" },
      { id: "start-park-jabaquara-g6", alt: "Render panorâmico / implantação" },
    ],
  },
  {
    cat: "obra", status: "Em obra", name: "Oh Freguesia",
    slug: "oh-freguesia",
    tag: "Produto conceituado e operação estruturada pela OGDI.",
    tone: "t1", ctaLabel: "Conheça o empreendimento",
    image: "/assets/projetos/OH_FREGUESIA/Oh_freguesia.png",
    segmento: "Residencial", local: "São Paulo · SP",
    modelo: "Parceria estratégica",
    intro: [
      "[PROVISÓRIO] O Oh Freguesia nasceu de uma leitura cuidadosa da oportunidade: ativo avaliado, potencial mapeado e tese de produto construída com base em inteligência de mercado da região.",
      "[PROVISÓRIO] A OGDI conduziu a conceituação do produto e a estruturação da operação, conectando os parceiros necessários e preparando o empreendimento para lançamento.",
      "[PROVISÓRIO] Com a operação consolidada, o empreendimento avança em obra — evidência de que o valor foi construído antes mesmo do início da execução.",
    ],
    gallery: [
      { id: "oh-freguesia-g1", alt: "Fachada / render principal" },
      { id: "oh-freguesia-g2", alt: "Render vertical" },
      { id: "oh-freguesia-g3", alt: "Área comum" },
      { id: "oh-freguesia-g4", alt: "Apartamento decorado" },
      { id: "oh-freguesia-g5", alt: "Detalhe arquitetônico" },
      { id: "oh-freguesia-g6", alt: "Render panorâmico / implantação" },
    ],
  },
  {
    cat: "futuro", status: "Futuro lançamento", name: "Guarulhos",
    slug: "guarulhos",
    tag: "Oportunidade originada e operação em estruturação.",
    tone: "t3", ctaLabel: "Falar sobre o projeto",
    segmento: "Residencial", local: "Guarulhos · SP",
    modelo: "Parceria estratégica",
    intro: [
      "[PROVISÓRIO] A oportunidade em Guarulhos foi originada pela OGDI com base em leitura de mercado local e avaliação criteriosa do potencial de desenvolvimento da área.",
      "[PROVISÓRIO] A operação está em estruturação: viabilidade em análise, parceiros sendo articulados e modelagem financeira em curso para alinhar capital e execução.",
    ],
    gallery: [
      { id: "guarulhos-g1", alt: "Fachada / render principal" },
      { id: "guarulhos-g2", alt: "Render vertical" },
      { id: "guarulhos-g3", alt: "Área comum" },
      { id: "guarulhos-g4", alt: "Apartamento decorado" },
      { id: "guarulhos-g5", alt: "Detalhe arquitetônico" },
      { id: "guarulhos-g6", alt: "Render panorâmico / implantação" },
    ],
  },
  {
    cat: "futuro", status: "Futuro lançamento", name: "Cupecê",
    slug: "cupece",
    tag: "Desenvolvimento de produto e viabilidade em curso.",
    tone: "t2", ctaLabel: "Falar sobre o projeto",
    segmento: "Residencial", local: "São Paulo · SP", regiao: "Cupecê",
    modelo: "Parceria estratégica",
    intro: [
      "[PROVISÓRIO] O projeto no Cupecê está em fase de desenvolvimento de produto e análise de viabilidade. A OGDI conduziu a leitura da oportunidade e trabalha na definição de tipologia, mix e posicionamento.",
      "[PROVISÓRIO] A estruturação da operação avança com foco em alinhar potencial, capital e execução antes de qualquer comprometimento de lançamento.",
    ],
    gallery: [
      { id: "cupece-g1", alt: "Fachada / render principal" },
      { id: "cupece-g2", alt: "Render vertical" },
      { id: "cupece-g3", alt: "Área comum" },
      { id: "cupece-g4", alt: "Apartamento decorado" },
      { id: "cupece-g5", alt: "Detalhe arquitetônico" },
      { id: "cupece-g6", alt: "Render panorâmico / implantação" },
    ],
  },
  {
    cat: "entregue", status: "Entregue", name: "Hits Santa Catarina",
    slug: "hits-santa-catarina",
    tag: "Da concepção ao lançamento — operação entregue.",
    tone: "t1", ctaLabel: "Conheça o empreendimento",
    segmento: "Residencial", local: "Localização a confirmar", localTbd: true,
    modelo: "Parceria estratégica",
    intro: [
      "[PROVISÓRIO] O Hits Santa Catarina representa uma operação conduzida pela OGDI da concepção ao lançamento. A oportunidade foi lida na origem, o produto conceituado com base em inteligência de mercado.",
      "[PROVISÓRIO] A estruturação reuniu viabilidade, parceiros e execução na mesma direção — permitindo que o empreendimento chegasse ao lançamento com a operação consolidada.",
      "[PROVISÓRIO] O resultado é uma entrega que reflete o valor construído antes da obra: produto posicionado, operação estruturada, lançamento bem-sucedido.",
    ],
    gallery: [
      { id: "hits-santa-catarina-g1", alt: "Fachada / render principal" },
      { id: "hits-santa-catarina-g2", alt: "Render vertical" },
      { id: "hits-santa-catarina-g3", alt: "Área comum" },
      { id: "hits-santa-catarina-g4", alt: "Apartamento decorado" },
      { id: "hits-santa-catarina-g5", alt: "Detalhe arquitetônico" },
      { id: "hits-santa-catarina-g6", alt: "Render panorâmico / implantação" },
    ],
  },
];

export function projetoHref(slug: string): string {
  return `/projetos/${slug}`;
}
