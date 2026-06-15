// Operações em SCP (Sociedade em Conta de Participação) — vias de investimento,
// distintas dos empreendimentos da atuação. NÃO têm página individual: o card
// aparece só sob o filtro "Investimento SCP" em /projetos e leva direto ao
// contato. Nome/local/imagem são fatos próprios (ficam aqui); chip, descrição,
// CTA e o rótulo do segmento vivem em i18n (projetos.scp.*).
export type ProjetoScp = {
  slug: string;
  name: string;
  segmentoKey: "residencial";
  local: string; // bairro · cidade (nomes próprios, não traduzidos)
  image: string; // fachada — path com espaços encodados (%20)
  tone: "t1" | "t2" | "t3"; // fallback caso a imagem não carregue
  href: string; // site do empreendimento — abre em nova aba no "Tenho interesse"
};

export const projetosScp: ProjetoScp[] = [
  {
    slug: "hum-bela-vista",
    name: "HUM Bela Vista",
    segmentoKey: "residencial",
    local: "Bela Vista · Osasco",
    image: "/assets/SCPistas/HUM%20BELA%20VISTA/FACHADA.png",
    tone: "t2",
    href: "https://proxx.com.br/produto/hum-bela-vista/",
  },
  {
    slug: "hum-granada",
    name: "HUM Granada",
    segmentoKey: "residencial",
    local: "Mutinga · Osasco",
    image: "/assets/SCPistas/HUM%20GRANADA/FACHADA.png",
    tone: "t1",
    href: "https://proxx.com.br/produto/hum-osasco/",
  },
  {
    slug: "vip-vila-prudente",
    name: "VIP Vila Prudente",
    segmentoKey: "residencial",
    local: "Vila Prudente · São Paulo",
    image: "/assets/SCPistas/VIP%20VILA%20PRUDENTE/FACHADA.jpg",
    tone: "t2",
    href: "https://chaincorp.com.br/empreendimento/vip-vila-prudente/",
  },
  {
    slug: "rooftop-perdizes",
    name: "Rooftop Perdizes",
    segmentoKey: "residencial",
    local: "Perdizes · São Paulo",
    image: "/assets/SCPistas/ROOFTOP%20PERDIZES/Chaincorp_Iperoig_Cam_Fachada_01_A_HR.jpg",
    tone: "t1",
    href: "https://chaincorp.com.br/empreendimento/rooftop/",
  },
  {
    slug: "the-first-jardim",
    name: "The First Jardim",
    segmentoKey: "residencial",
    local: "Jardim · Santo André",
    image: "/assets/SCPistas/THE%20FIRST/THE%20FIRST.png",
    tone: "t3",
    href: "https://www.bcanton.com.br/the-first-jardim-santo-andre/",
  },
  {
    slug: "immensitta-jardim",
    name: "Immensitta Jardim",
    segmentoKey: "residencial",
    local: "Jardim · Santo André",
    image: "/assets/SCPistas/IMMENSITTA/IMMENSITTA.png",
    tone: "t2",
    href: "https://www.bcanton.com.br/immensitta-jardim/",
  },
  {
    slug: "pina-1875",
    name: "PINA 1875",
    segmentoKey: "residencial",
    local: "Perdizes · São Paulo",
    image: "/assets/SCPistas/PINA_1875/FACHADA.jpg",
    tone: "t3",
    href: "https://chaincorp.com.br/empreendimento/pina1875/",
  },
];
