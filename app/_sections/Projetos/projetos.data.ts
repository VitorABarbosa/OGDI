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

export type ProjetoMapCategoryId = "educacao" | "mobilidade" | "comercio" | "saude" | "lazer";

export type ProjetoMapPoint = {
  title: string;
  category: ProjetoMapCategoryId;
  distance: string;
  lat: number;
  lng: number;
};

export type ProjetoMap = {
  title: string;
  text: string;
  address: string;
  // O embed do Google Maps usa apenas a query de endereço; os campos abaixo são
  // metadados opcionais (ex.: para um mapa de POIs mais rico no futuro).
  zoom?: number;
  center?: { lat: number; lng: number };
  categories?: { id: ProjetoMapCategoryId; label: string }[];
  points?: ProjetoMapPoint[];
};

// Individual project page contract:
// active projects should follow app/_sections/EmpreendimentoPage/README.md.
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
  map?: ProjetoMap;
};

// Tab labels are resolved at render time via i18n namespaces (key === cat):
// the home carousel uses `home.projetos.tabs.*`, the /projetos listing uses
// `projetos.filtros.*`. Only the category identity lives here.
export const projetoTabs: { cat: ProjetoCat }[] = [
  { cat: "obra" },
  { cat: "futuro" },
  { cat: "entregue" },
];

export const projetos: Projeto[] = [
  {
    cat: "obra", status: "Em obra", name: "Hits Cupecê",
    slug: "hits-cupece",
    tag: "Operação estruturada na origem, do produto ao lançamento.",
    tone: "t2", ctaLabel: "Conheça o empreendimento",
    image: "/assets/projetos/CUPECE/Cupece.png",
    segmento: "Residencial", local: "São Paulo · SP", regiao: "Cupecê",
    modelo: "Sócia da operação",
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
    map: {
      title: "Localização e entorno",
      text: "Explore a localização do Hits Cupecê no Google Maps, com o empreendimento como ponto de referência.",
      address: "Rua Dom João Soares Coelho, Jardim Miriam, São Paulo - SP",
      zoom: 15,
      center: { lat: -23.6730382, lng: -46.6513232 },
      categories: [
        { id: "educacao", label: "Educação" },
        { id: "mobilidade", label: "Mobilidade" },
        { id: "comercio", label: "Comércio" },
        { id: "saude", label: "Saúde" },
        { id: "lazer", label: "Lazer" },
      ],
      points: [
        { title: "Escolas no entorno residencial", category: "educacao", distance: "raio próximo", lat: -23.67092, lng: -46.64978 },
        { title: "Cursos e serviços educacionais", category: "educacao", distance: "raio próximo", lat: -23.67512, lng: -46.65318 },
        { title: "Eixo Avenida Cupecê", category: "mobilidade", distance: "conexão principal", lat: -23.67122, lng: -46.64682 },
        { title: "Acesso Rodovia dos Imigrantes", category: "mobilidade", distance: "acesso regional", lat: -23.66882, lng: -46.65582 },
        { title: "Comércio de bairro", category: "comercio", distance: "raio próximo", lat: -23.67478, lng: -46.64866 },
        { title: "Serviços e conveniências", category: "comercio", distance: "raio próximo", lat: -23.67192, lng: -46.65382 },
        { title: "Farmácias e apoio à saúde", category: "saude", distance: "raio próximo", lat: -23.67628, lng: -46.65042 },
        { title: "Clínicas e atendimento local", category: "saude", distance: "raio próximo", lat: -23.67024, lng: -46.65224 },
        { title: "Praças e áreas de convivência", category: "lazer", distance: "raio próximo", lat: -23.67672, lng: -46.65422 },
        { title: "Rotas para parques da região", category: "lazer", distance: "acesso local", lat: -23.66898, lng: -46.64892 },
      ],
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
    modelo: "Sócia da operação",
    intro: [
      "O Start Park Jabaquara nasce de uma leitura objetiva do Parque Jabaquara, na zona sul de São Paulo — uma região conectada e em valorização, a poucos minutos do Aeroporto de Congonhas e na rota do futuro monotrilho.",
      "A Open Group estruturou a oportunidade alinhando produto, viabilidade e operação: unidades de 1 e 2 dormitórios, com terraço com churrasqueira, e um conjunto de lazer pensado para a vida urbana cotidiana.",
      "Hoje o empreendimento avança em obra, resultado de uma operação organizada desde a origem, com produto, parceiros e execução na mesma direção.",
    ],
    heroSummary:
      "Um empreendimento residencial em obra no Parque Jabaquara, na zona sul de São Paulo, conectado a Congonhas e ao futuro monotrilho.",
    facts: ["Em obra", "1 e 2 dormitórios", "Terraço com churrasqueira", "Parque Jabaquara - SP"],
    regiao: "Parque Jabaquara",
    address: "Rua Alba, 570",
    units: "1 e 2 dormitórios",
    unitFeature: "Terraço com churrasqueira",
    locationStory: {
      kicker: "A tese do lugar",
      title: "No Jabaquara, a oportunidade nasce da leitura da praça.",
      body: [
        "Na Rua Alba, no Parque Jabaquara, o Start Park está inserido em uma região conectada e em valorização, com comércio, serviços e forte oferta de transporte na zona sul de São Paulo.",
        "O endereço fica a poucos minutos do Aeroporto de Congonhas e na rota do futuro monotrilho, com acesso às avenidas Santa Catarina, Cupecê, Roberto Marinho, Washington Luís, Bandeirantes e Imigrantes.",
        "Para a Open Group, essa combinação de mobilidade, vida cotidiana e valorização transforma a localização em tese de produto.",
      ],
      highlights: [
        { title: "Mobilidade ampla", text: "Próximo a Congonhas e ao futuro monotrilho, com acesso a Imigrantes, Bandeirantes e Washington Luís." },
        { title: "Região em valorização", text: "Entorno com comércio e serviços que sustentam a demanda residencial." },
        { title: "Origem estruturada", text: "A oportunidade foi organizada antes da execução, com produto e operação alinhados." },
      ],
    },
    productStory: {
      kicker: "O produto como resposta",
      title: "Tipologias compactas para uma vida urbana conectada.",
      body: [
        "As unidades de 1 e 2 dormitórios respondem a um público que busca morar bem, com eficiência e conexão com a cidade.",
        "O terraço com churrasqueira e um lazer completo ampliam o uso do empreendimento no dia a dia.",
      ],
      cards: [
        { label: "Tipologia", value: "1 e 2 dormitórios", text: "Plantas eficientes, alinhadas a diferentes perfis de moradia urbana." },
        { label: "Endereço", value: "Rua Alba, 570", text: "Parque Jabaquara, zona sul de São Paulo, próximo a Congonhas e ao futuro monotrilho." },
        { label: "Mobilidade", value: "Eixo Santa Catarina · Cupecê", text: "Acesso a Roberto Marinho, Washington Luís, Bandeirantes e Imigrantes." },
        { label: "Experiência", value: "Lazer completo", text: "Piscina, fitness, crossfit, cine aberto, bike station e salão de festas gourmet." },
      ],
    },
    galleryIntro: {
      kicker: "Do conceito à experiência",
      title: "A galeria apresenta a materialização da tese.",
      body: [
        "As imagens do Start Park Jabaquara funcionam como continuidade da narrativa: produto, implantação e percepção de valor ganham forma visual.",
      ],
    },
    strategyStory: {
      kicker: "Estruturação Open Group",
      title: "A operação foi organizada antes de chegar ao canteiro.",
      body: [
        "No Start Park Jabaquara, a Open Group conectou leitura da oportunidade, conceituação do produto, modelagem da operação e articulação dos parceiros necessários.",
        "O resultado é um empreendimento em obra com uma tese construída antes da execução, reduzindo improviso e dando clareza ao processo.",
      ],
    },
    closingStatement: {
      title: "Start Park Jabaquara é resultado de estruturação.",
      text: "Uma operação que saiu da leitura de mercado para a obra com produto, parceiros e execução alinhados.",
      ctaLabel: "Tenho interesse no empreendimento",
      ctaHref: "https://www.tsengenharia.com/imovel/start-park-jabaquara/",
    },
    map: {
      title: "Localização e entorno",
      text: "Explore a localização do Start Park Jabaquara no Google Maps, com o empreendimento como ponto de referência.",
      address: "R. Alba, 570 - Parque Jabaquara, São Paulo - SP",
    },
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
    modelo: "Sócia da operação",
    intro: [
      "O Oh Freguesia nasce na Freguesia do Ó, na zona norte de São Paulo — um dos bairros mais antigos da capital, com vida de bairro consolidada, comércio e serviços no entorno.",
      "A Open Group estruturou a oportunidade conectando produto, viabilidade e operação: unidades de 1 e 2 dormitórios, com terraço com churrasqueira, e um lazer completo, de beach club e sky lounge a cinema open e praça do fogo.",
      "Hoje o empreendimento avança em obra, evidência de uma operação consolidada antes do início da execução.",
    ],
    heroSummary:
      "Um empreendimento residencial em obra na Freguesia do Ó, na zona norte de São Paulo, com lazer completo e terraço com churrasqueira.",
    facts: ["Em obra", "1 e 2 dormitórios", "Terraço com churrasqueira", "Freguesia do Ó - SP"],
    regiao: "Freguesia do Ó",
    address: "Rua Homero Francisco Terra",
    units: "1 e 2 dormitórios",
    unitFeature: "Terraço com churrasqueira",
    locationStory: {
      kicker: "A tese do lugar",
      title: "Na Freguesia do Ó, um bairro consolidado vira tese.",
      body: [
        "Na Rua Homero Francisco Terra, o Oh Freguesia está inserido em um dos bairros mais antigos de São Paulo, com vida de bairro consolidada, comércio e serviços no entorno.",
        "A Freguesia do Ó combina identidade urbana estabelecida e demanda residencial constante na zona norte da capital.",
        "Para a Open Group, esse contexto de bairro consolidado sustenta produto e operação, transformando a localização em tese.",
      ],
      highlights: [
        { title: "Bairro consolidado", text: "Um dos endereços mais tradicionais da zona norte, com vida de bairro estabelecida." },
        { title: "Demanda constante", text: "Comércio, serviços e infraestrutura urbana que sustentam a procura por moradia." },
        { title: "Operação consolidada", text: "Produto, parceiros e execução conectados para viabilizar o avanço da obra." },
      ],
    },
    productStory: {
      kicker: "O produto como resposta",
      title: "Tipologias compactas com lazer de bairro completo.",
      body: [
        "As unidades de 1 e 2 dormitórios respondem à demanda urbana da Freguesia do Ó, com eficiência e conexão com a cidade.",
        "O terraço com churrasqueira e um conjunto de lazer amplo ampliam a experiência do morar no dia a dia.",
      ],
      cards: [
        { label: "Tipologia", value: "1 e 2 dormitórios", text: "Plantas eficientes para diferentes perfis de moradia urbana." },
        { label: "Endereço", value: "Rua Homero Francisco Terra", text: "Freguesia do Ó, zona norte de São Paulo." },
        { label: "Lazer", value: "Beach club e sky lounge", text: "Aqua play, crossfit, cinema open, praça do fogo, pet place e playground." },
        { label: "Experiência", value: "Terraço com churrasqueira", text: "A área privativa vira espaço de uso e convívio." },
      ],
    },
    galleryIntro: {
      kicker: "Do conceito à experiência",
      title: "As imagens mostram a passagem da tese para o produto.",
      body: [
        "A galeria do Oh Freguesia apresenta a materialização da operação: conceito, produto e percepção de valor organizados em uma experiência visual.",
      ],
    },
    strategyStory: {
      kicker: "Estruturação Open Group",
      title: "O valor foi construído antes do início da execução.",
      body: [
        "No Oh Freguesia, a Open Group conduziu a leitura do ativo, a conceituação do produto e a articulação dos parceiros necessários para consolidar a operação.",
        "A obra é consequência desse trabalho anterior: uma sequência de decisões que deu forma, viabilidade e direção ao empreendimento.",
      ],
    },
    closingStatement: {
      title: "Oh Freguesia traduz potencial em operação.",
      text: "Um empreendimento que nasce da inteligência de mercado e avança com produto e execução conectados.",
      ctaLabel: "Tenho interesse no empreendimento",
      ctaHref: "https://www.tsengenharia.com/imovel/oh-freguesia/",
    },
    map: {
      title: "Localização e entorno",
      text: "Explore a localização do Oh Freguesia no Google Maps, com o empreendimento como ponto de referência.",
      address: "Rua Homero Francisco Terra, Freguesia do Ó, São Paulo - SP",
    },
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
    modelo: "Sócia da operação",
    intro: [
      "A oportunidade em Guarulhos foi originada pela Open Group com base em leitura de mercado local e avaliação criteriosa do potencial de desenvolvimento da área.",
      "A operação está em estruturação: viabilidade em análise, parceiros sendo articulados e modelagem financeira em curso para alinhar capital e execução.",
    ],
    heroSummary:
      "Um futuro lançamento residencial em Guarulhos, em fase de estruturação de oportunidade, produto e viabilidade.",
    facts: ["Futuro lançamento", "Residencial", "Guarulhos - SP", "Sócia da operação"],
    locationStory: {
      kicker: "A tese do lugar",
      title: "Em Guarulhos, a leitura da oportunidade vem antes do lançamento.",
      body: [
        "O projeto em Guarulhos está em fase de estruturação a partir de uma leitura de mercado local e do potencial de desenvolvimento da área.",
        "Antes de comunicar produto ou lançamento, a Open Group organiza as variáveis que sustentam a operação: território, demanda, viabilidade e parceiros.",
        "Essa etapa inicial é decisiva para transformar uma oportunidade imobiliária em um empreendimento com direção clara.",
      ],
      highlights: [
        { title: "Mercado local", text: "Leitura da praça e do potencial de absorção antes da definição final do produto." },
        { title: "Viabilidade em curso", text: "Análise técnica, financeira e estratégica para sustentar a evolução da operação." },
        { title: "Estruturação inicial", text: "Articulação de parceiros e desenho de caminho antes do compromisso de lançamento." },
      ],
    },
    productStory: {
      kicker: "O produto como resposta",
      title: "O produto será consequência da viabilidade, não ponto de partida.",
      body: [
        "Em Guarulhos, a Open Group conduz a etapa em que o produto ainda está sendo calibrado a partir da oportunidade.",
        "A definição de posicionamento, mix e estratégia comercial deve nascer da consistência entre território, demanda e execução possível.",
      ],
      cards: [
        { label: "Status", value: "Futuro lançamento", text: "Projeto em estruturação, ainda antes da comunicação final de mercado." },
        { label: "Segmento", value: "Residencial", text: "Direção de produto voltada à moradia e ao potencial local." },
        { label: "Localização", value: "Guarulhos", text: "Praça em análise para definição de posicionamento e viabilidade." },
        { label: "Modelo", value: "Sócia da operação", text: "Operação construída com alinhamento entre capital, parceiros e execução." },
      ],
    },
    galleryIntro: {
      kicker: "Do estudo à materialização",
      title: "A galeria marca o espaço reservado para a evolução do projeto.",
      body: [
        "Enquanto o produto avança, a galeria mantém a estrutura visual da página e será atualizada com imagens, renders ou materiais oficiais do empreendimento.",
      ],
    },
    strategyStory: {
      kicker: "Estruturação Open Group",
      title: "A operação está sendo desenhada antes de chegar ao mercado.",
      body: [
        "No projeto Guarulhos, a Open Group atua na origem: leitura da oportunidade, análise de viabilidade, modelagem financeira e articulação dos parceiros necessários.",
        "O objetivo é preparar a operação com clareza antes do lançamento, evitando decisões desconectadas entre produto, mercado e execução.",
      ],
    },
    closingStatement: {
      title: "Guarulhos ainda está em estruturação.",
      text: "Um projeto em desenvolvimento, conduzido com método para transformar potencial em operação viável.",
      ctaLabel: "Tenho interesse no empreendimento",
    },
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
    cat: "entregue", status: "Entregue", name: "Hits Santa Catarina",
    slug: "hits-santa-catarina",
    tag: "Da concepção ao lançamento — operação entregue.",
    tone: "t1", ctaLabel: "Conheça o empreendimento",
    image: "/assets/projetos/HITS_SANTA_CATARINA/FACHADA.jpg",
    segmento: "Residencial", local: "São Paulo · SP",
    modelo: "Sócia da operação",
    intro: [
      "O Hits Santa Catarina nasceu na Vila Santa Catarina, na zona sul de São Paulo — uma região em valorização contínua, com fácil acesso à Berrini e a importantes avenidas da capital.",
      "A Open Group conduziu a operação da concepção ao lançamento: leitura da oportunidade, conceituação do produto — unidades de 1 e 2 dormitórios com terraço com churrasqueira — e estruturação com parceiros e viabilidade alinhados.",
      "Entregue, o empreendimento traduz o valor construído antes da obra: produto posicionado, operação estruturada e execução concluída.",
    ],
    heroSummary:
      "Um empreendimento residencial entregue na Vila Santa Catarina, na zona sul de São Paulo, com fácil acesso à Berrini e ao Morumbi.",
    facts: ["Entregue", "1 e 2 dormitórios", "Terraço com churrasqueira", "Vila Santa Catarina - SP"],
    regiao: "Vila Santa Catarina",
    address: "Rua Oito de Março, 65",
    units: "1 e 2 dormitórios",
    unitFeature: "Terraço com churrasqueira",
    locationStory: {
      kicker: "A tese do lugar",
      title: "Na Vila Santa Catarina, a leitura do lugar precedeu a obra.",
      body: [
        "Na Rua Oito de Março, o Hits Santa Catarina está inserido em uma região em valorização contínua na zona sul de São Paulo, com fácil acesso à Berrini.",
        "O endereço fica a cerca de 10 minutos do Morumbi Shopping, com diversas linhas de ônibus nas avenidas Santa Catarina, Cupecê e Washington Luís.",
        "Essa combinação de localização e mobilidade orientou a tese do produto e sustentou a operação até a entrega.",
      ],
      highlights: [
        { title: "Acesso à Berrini", text: "Conexão com um dos principais polos corporativos da cidade." },
        { title: "Mobilidade consolidada", text: "Linhas de ônibus nas avenidas Santa Catarina, Cupecê e Washington Luís." },
        { title: "Região em valorização", text: "Entorno com infraestrutura completa e valorização contínua." },
      ],
    },
    productStory: {
      kicker: "O produto como resposta",
      title: "Um produto entregue valida a estruturação feita na origem.",
      body: [
        "As unidades de 1 e 2 dormitórios, com terraço com churrasqueira, responderam à demanda da zona sul com eficiência e localização conectada.",
        "A entrega evidencia o papel da Open Group em transformar oportunidade em empreendimento lançado e concluído.",
      ],
      cards: [
        { label: "Tipologia", value: "1 e 2 dormitórios", text: "Plantas eficientes com terraço com churrasqueira." },
        { label: "Endereço", value: "Rua Oito de Março, 65", text: "Vila Santa Catarina, zona sul de São Paulo." },
        { label: "Mobilidade", value: "Eixo Santa Catarina", text: "Fácil acesso à Berrini e a cerca de 10 min do Morumbi Shopping." },
        { label: "Entrega", value: "Obra concluída", text: "Operação 100% entregue, do conceito ao lançamento." },
      ],
    },
    galleryIntro: {
      kicker: "Da concepção à entrega",
      title: "A galeria organiza a memória visual da operação.",
      body: [
        "As imagens apresentam o empreendimento entregue — fachada, áreas comuns e ambientes que materializam o produto conduzido pela Open Group da concepção ao lançamento.",
      ],
    },
    strategyStory: {
      kicker: "Estruturação Open Group",
      title: "A entrega é consequência de decisões tomadas antes.",
      body: [
        "No Hits Santa Catarina, a Open Group conduziu uma operação que reuniu leitura de oportunidade, conceituação de produto, viabilidade e articulação de parceiros.",
        "O resultado é uma entrega que demonstra a importância da estruturação anterior ao lançamento e à execução.",
      ],
    },
    closingStatement: {
      title: "Hits Santa Catarina é uma operação entregue.",
      text: "Um empreendimento que reflete o valor construído antes da obra: produto posicionado, operação estruturada e lançamento conduzido.",
      ctaLabel: "Tenho interesse no empreendimento",
      ctaHref: "https://www.tsengenharia.com/imovel/hits-vila-santa-catarina/",
    },
    map: {
      title: "Localização e entorno",
      text: "Explore a localização do Hits Santa Catarina no Google Maps, com o empreendimento como ponto de referência.",
      address: "Rua Oito de Março, 65, Vila Santa Catarina, São Paulo - SP",
    },
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
