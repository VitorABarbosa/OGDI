export type NavItem = { key: string; href: string };

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "institucional", href: "/institucional" },
  { key: "projetos", href: "/projetos" },
  { key: "investidores", href: "/investidores" },
  { key: "insights", href: "/insights" },
  { key: "contato", href: "/contato" },
];

// footerAtuacao permanece como está por enquanto (traduzido no Plano 2).
export const footerAtuacao: { label: string; href: string }[] = [
  { label: "Leitura da oportunidade", href: "/#atuacao" },
  { label: "Inteligência de mercado", href: "/#atuacao" },
  { label: "Viabilidade", href: "/#atuacao" },
  { label: "Estruturação da operação", href: "/#atuacao" },
  { label: "Conexão com parceiros", href: "/#atuacao" },
  { label: "Preparação para lançamento", href: "/#atuacao" },
];
