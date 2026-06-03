export type ProjetoCat = "obra" | "futuro" | "entregue";
export type Projeto = {
  cat: ProjetoCat; status: string; name: string; tag: string;
  tone: "t1" | "t2" | "t3"; ctaLabel: string; href: string;
};
export const projetoTabs: { cat: ProjetoCat; label: string }[] = [
  { cat: "obra", label: "Em obra" },
  { cat: "futuro", label: "Futuro lançamento" },
  { cat: "entregue", label: "Entregue" },
];
export const projetos: Projeto[] = [
  { cat: "obra", status: "Em obra", name: "Hits Cupecê", tag: "Operação estruturada na origem, do produto ao lançamento.", tone: "t2", ctaLabel: "Conheça o empreendimento", href: "/#contato" },
  { cat: "obra", status: "Em obra", name: "Start Park Jabaquara", tag: "Da inteligência de mercado à condução até o lançamento.", tone: "t3", ctaLabel: "Conheça o empreendimento", href: "/#contato" },
  { cat: "obra", status: "Em obra", name: "Oh Freguesia", tag: "Produto conceituado e operação estruturada pela OGDI.", tone: "t1", ctaLabel: "Conheça o empreendimento", href: "/#contato" },
  { cat: "futuro", status: "Futuro lançamento", name: "Guarulhos", tag: "Oportunidade originada e operação em estruturação.", tone: "t3", ctaLabel: "Falar sobre o projeto", href: "/#contato" },
  { cat: "futuro", status: "Futuro lançamento", name: "Cupecê", tag: "Desenvolvimento de produto e viabilidade em curso.", tone: "t2", ctaLabel: "Falar sobre o projeto", href: "/#contato" },
  { cat: "entregue", status: "Entregue", name: "Hits Santa Catarina", tag: "Da concepção ao lançamento — operação entregue.", tone: "t1", ctaLabel: "Conheça o empreendimento", href: "/#contato" },
];
