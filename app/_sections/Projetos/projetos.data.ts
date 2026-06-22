export type ProjetoCat = "obra" | "futuro" | "entregue";

export type GaleriaSlot = { id: string; alt: string }; // no image yet → MediaPlaceholder

// Toda a prosa traduzível por projeto (heroSummary, intro, facts, locationStory,
// productStory, galleryIntro, strategyStory, closingStatement.{title,text,ctaLabel})
// vive em messages/projetos/<slug>/{pt,en,es}.json sob `proj.<slug>.*` e é lida
// pelos componentes via next-intl. Aqui ficam apenas os dados estruturais.

export type ProjetoMapCategoryId = "educacao" | "mobilidade" | "comercio" | "saude" | "lazer";

export type ProjetoMapPoint = {
  title: string;
  category: ProjetoMapCategoryId;
  distance: string;
  lat: number;
  lng: number;
};

// Mídia real da seção "Experiência" (tour 360° + filme). Quando ausente, o
// EmpTour mantém o placeholder. Posters são renders locais (sem imagem remota).
export type ProjetoExperience = {
  tourUrl?: string;
  videoUrl?: string;
  tourPoster?: string;
  videoPoster?: string;
};

// Andamento de obra real por projeto. `bars[i].pct` casa por índice com os
// rótulos traduzidos em `proj.<slug>.obra.stages`. `done` é derivado (pct ≥ 100).
export type ProjetoObra = {
  overall: number;
  bars: { pct: number }[];
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
  // Versão retrato (3:4) para o grid da página /projetos; cai em `image` se ausente.
  imagePortrait?: string;
  // Imagem de destaque da Hero (ex.: portaria/entrada), p/ não repetir a fachada
  // usada na seção "Sobre o projeto". Cai em `image` quando ausente.
  heroImage?: string;
  segmento: string;
  local: string;
  regiao?: string;
  modelo: string;
  localTbd?: boolean;
  gallery: GaleriaSlot[];
  address?: string;
  units?: string;
  unitFeature?: string;
  // Prosa migrada para i18n (`proj.<slug>.*`). Resta aqui só o href estrutural do
  // CTA de fechamento (o restante de closingStatement vive no i18n).
  closingStatement?: { ctaHref?: string };
  experience?: ProjetoExperience;
  obra?: ProjetoObra;
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
    heroImage: "/assets/projetos/CUPECE/IMAGES/Portaria.png",
    segmento: "Residencial", local: "São Paulo · SP", regiao: "Cupecê",
    modelo: "Sócia da operação",
    address: "Rua Dom João Soares Coelho",
    units: "1 e 2 dormitórios",
    unitFeature: "Terraço com churrasqueira",
    closingStatement: { ctaHref: "https://www.tsengenharia.com/imovel/hits-cupece/" },
    // Andamento real (maio/2026). Ordem casa com proj.hits-cupece.obra.stages.
    obra: {
      overall: 85.84,
      bars: [
        { pct: 87.46 }, // Serviços preliminares gerais
        { pct: 100 }, // Fundações e contenções
        { pct: 100 }, // Supraestrutura
        { pct: 96.44 }, // Paredes e painéis
        { pct: 57.2 }, // Coberturas e proteções
        { pct: 85.49 }, // Revestimentos
        { pct: 94.13 }, // Pavimentação
        { pct: 74.18 }, // Instalações
        { pct: 31.91 }, // Complementações
        { pct: 68.96 }, // Infraestrutura e urbanização
      ],
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
    heroImage: "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_Portaria_HR.jpg",
    segmento: "Residencial", local: "São Paulo · SP",
    modelo: "Sócia da operação",
    regiao: "Parque Jabaquara",
    address: "Rua Alba, 570",
    units: "1 e 2 dormitórios",
    unitFeature: "Terraço com churrasqueira",
    closingStatement: { ctaHref: "https://www.tsengenharia.com/imovel/start-park-jabaquara/" },
    // Andamento real (maio/2026). Etapas sem percentual informado ficam como 0%.
    obra: {
      overall: 22.76,
      bars: [
        { pct: 42.57 }, // Serviços preliminares gerais
        { pct: 91.1 }, // Fundações e contenções
        { pct: 15.35 }, // Supraestrutura
        { pct: 8.96 }, // Paredes e painéis
        { pct: 1.47 }, // Coberturas e proteções
        { pct: 0 }, // Revestimentos
        { pct: 0 }, // Pavimentação
        { pct: 6.53 }, // Instalações
        { pct: 0 }, // Complementações
        { pct: 50.95 }, // Infraestrutura e urbanização
      ],
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
    heroImage: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Hall_HR.jpg",
    segmento: "Residencial", local: "São Paulo · SP",
    modelo: "Sócia da operação",
    regiao: "Freguesia do Ó",
    address: "Rua Homero Francisco Terra",
    units: "1 e 2 dormitórios",
    unitFeature: "Terraço com churrasqueira",
    closingStatement: { ctaHref: "https://www.tsengenharia.com/imovel/oh-freguesia/" },
    experience: {
      tourUrl: "https://flyingstudio.com.br/vr/vr-ts-oh-freguesia/",
      videoUrl: "https://www.youtube.com/watch?v=lUUNJzuyf4g",
      tourPoster: "/assets/projetos/OH_FREGUESIA/IMAGES/Ts_Engenharia_Oh_Freguesia_Living_02_HR.jpg",
      videoPoster: "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_FREGUESIA_FACHADA_ATIVA_HR.jpg",
    },
    // Andamento real (abril/2025). Ordem casa com proj.oh-freguesia.obra.stages.
    obra: {
      overall: 84.15,
      bars: [
        { pct: 88.22 }, // Serviços preliminares gerais
        { pct: 100 }, // Fundações e contenções
        { pct: 100 }, // Supraestrutura
        { pct: 97.11 }, // Paredes e painéis
        { pct: 88.28 }, // Coberturas e proteções
        { pct: 81.49 }, // Revestimentos
        { pct: 92.44 }, // Pavimentação
        { pct: 75.72 }, // Instalações
        { pct: 0 }, // Complementações
        { pct: 17.3 }, // Infraestrutura e urbanização
      ],
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
    image: "/assets/projetos/OGDI_FUTURO_LANCAMENTO_HORIZONTAL.png",
    imagePortrait: "/assets/projetos/OGDI_FUTURO_LANCAMENTO_RETRATO.png",
    tag: "Oportunidade originada e operação em estruturação.",
    tone: "t3", ctaLabel: "Falar sobre o projeto",
    segmento: "Residencial", local: "Guarulhos · SP",
    modelo: "Sócia da operação",
    closingStatement: {},
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
    heroImage: "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/favorita.jpg",
    segmento: "Residencial", local: "São Paulo · SP",
    modelo: "Sócia da operação",
    regiao: "Vila Santa Catarina",
    address: "Rua Oito de Março, 65",
    units: "1 e 2 dormitórios",
    unitFeature: "Terraço com churrasqueira",
    closingStatement: { ctaHref: "https://www.tsengenharia.com/imovel/hits-vila-santa-catarina/" },
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
