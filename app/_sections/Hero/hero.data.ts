export type HeroSlide = {
  kick: string;
  name: string;
  meta: string[];   // prefixo "@" = "a confirmar" (renderiza em itálico esmaecido)
  sign: string;
  tone: "t1" | "t2" | "t3";
  image?: string;   // foto do empreendimento; sem imagem cai no gradiente (tone)
};

export const heroSlides: HeroSlide[] = [
  { kick: "Entregue · Empreendimento", name: "Hits Santa Catarina",
    meta: ["Entregue", "Residencial", "@Localização a confirmar"],
    sign: "Atuação OGDI — estruturação e desenvolvimento, da concepção ao lançamento.", tone: "t1",
    image: "/assets/projetos/HITS_SANTA_CATARINA/FACHADA.png" },
  { kick: "Em obra · Empreendimento", name: "Hits Cupecê",
    meta: ["Em obra", "Residencial", "São Paulo · SP"],
    sign: "Atuação OGDI — leitura da oportunidade, produto e estruturação da operação.", tone: "t2",
    image: "/assets/projetos/CUPECE/Cupece.png" },
  { kick: "Em obra · Empreendimento", name: "Start Park Jabaquara",
    meta: ["Em obra", "Residencial", "São Paulo · SP"],
    sign: "Atuação OGDI — inteligência de mercado, viabilidade e condução até o lançamento.", tone: "t3",
    image: "/assets/projetos/HITS_START_PARK_JABAQUARA/HITS_PARK.png" },
  { kick: "Em obra · Empreendimento", name: "Oh Freguesia",
    meta: ["Em obra", "Residencial", "São Paulo · SP"],
    sign: "Atuação OGDI — conceituação do produto e estruturação da operação.", tone: "t2",
    image: "/assets/projetos/OH_FREGUESIA/Oh_freguesia.png" },
  // OFF por hora (sem imagem/conteúdo) — reativar quando tiver foto:
  // { kick: "Investimento · SCP", name: "Immensità",
  //   meta: ["Investimento", "SCP · Operação", "@Localização a confirmar"],
  //   sign: "Atuação OGDI — estruturação da operação e conexão com investidores.", tone: "t1" },
];
