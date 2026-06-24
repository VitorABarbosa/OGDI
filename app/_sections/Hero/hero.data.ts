export type HeroSlide = {
  key: string;        // chave de tradução → home.hero.slides.{key}.*
  name: string;       // nome próprio do empreendimento (não traduzir)
  localTbd?: boolean; // local "a confirmar" → renderiza em itálico esmaecido
  tone: "t1" | "t2" | "t3";
  image?: string;     // foto do empreendimento; sem imagem cai no gradiente (tone)
};

export const heroSlides: HeroSlide[] = [
  { key: "hits-santa-catarina", name: "Hits Santa Catarina", localTbd: true, tone: "t1",
    image: "/assets/projetos/HITS_SANTA_CATARINA/FACHADA.jpg" },
  { key: "hits-cupece", name: "Hits Cupecê", tone: "t2",
    image: "/assets/projetos/CUPECE/Cupece.png" },
  { key: "start-park-jabaquara", name: "Start Park Jabaquara", tone: "t3",
    image: "/assets/projetos/HITS_START_PARK_JABAQUARA/HITS_PARK.png" },
  { key: "oh-freguesia", name: "Oh Freguesia", tone: "t2",
    image: "/assets/projetos/OH_FREGUESIA/Oh_freguesia.png" },
  // OFF por hora (sem imagem/conteúdo) — reativar quando tiver foto:
  // { key: "immensita", name: "Immensità", localTbd: true, tone: "t1" },
];
