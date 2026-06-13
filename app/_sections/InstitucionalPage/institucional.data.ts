// Estrutura da página institucional. As strings de prosa (role/text/tags/
// statement/quote/nome de seção etc.) vivem nas mensagens i18n (namespace
// "institucional"); aqui ficam apenas a estrutura, ids estáveis e atributos
// técnicos (nomes próprios, cores de marca, mídia, hrefs).

export type InstModelKey = "consultoria" | "parceria" | "societaria";

export type InstStratum = {
  /** Chave estável p/ i18n (institucional.origem.strata.<key>). */
  key: string;
  /** Rótulo numérico exibido (não traduzido — apenas dígitos e ·). */
  n: string;
  /** Última faixa destacada (estilo "bed"). */
  bed?: boolean;
};

export type InstLeader = {
  /** Chave estável p/ i18n (institucional.lideranca.leaders.<key>). */
  key: string;
  /** Nome próprio — não traduzido. */
  name: string;
  image?: string;
};

export type InstGroupCompany = {
  /** id estável: chave de i18n, logo e motif. */
  id: string;
  /** Nome próprio da empresa — não traduzido. */
  name: string;
  /** Sigla/lombada — não traduzida. */
  label: string;
  /** Quantidade de tags (chaves t1..tN nas mensagens). */
  tagCount: number;
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
  about: {
    models: ["consultoria", "parceria", "societaria"] as InstModelKey[],
  },
  grupo: {
    companies: [
      {
        id: "flying",
        name: "Flying Studio",
        label: "Flying",
        tagCount: 4,
        bg: "/Nosso_Grupo/FlyingStudio/geral-11.png",
        href: "https://flyingstudio.com.br/",
        accent: "#A78BFA", // roxo
      },
      {
        id: "ogdi",
        name: "Open Group Desenvolvimento Imobiliário",
        label: "OGDI",
        tagCount: 3,
        bg: "/Nosso_Grupo/OGDI/Cidade.png",
        accent: "#4FA3AD", // azul petróleo
      },
      {
        id: "nid",
        name: "NID Studio",
        label: "NID",
        tagCount: 3,
        bg: "/Nosso_Grupo/NID/TAVARES_LIVIGNO_MOOD_DECORADO_02.png",
        accent: "#F08A24", // laranja
      },
      {
        id: "rinno",
        name: "Rinno Films",
        label: "Rinno",
        tagCount: 3,
        accent: "#4D7CC9", // azul escuro
        bgVideo: "/Nosso_Grupo/RINNO/Talon_Atlantis_Filme.mp4",
      },
    ] as InstGroupCompany[],
  },
  origem: {
    strata: [
      { key: "01", n: "— 01" },
      { key: "02", n: "— 02" },
      { key: "03", n: "— 03" },
      { key: "04", n: "— 04" },
      { key: "05", n: "— 05", bed: true },
    ] as InstStratum[],
  },
  lideranca: {
    leaders: [
      {
        key: "max",
        name: "Max Barbosa",
        image: "/assets/MAX_DONO.jpeg",
      },
    ] as InstLeader[],
  },
} as const;
