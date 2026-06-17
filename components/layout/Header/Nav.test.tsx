import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithIntl } from "@/test/intl";
import enMessages from "@/messages/en.json";
import { Nav } from "./Nav";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => "/",
  useRouter: () => ({ replace: vi.fn() }),
}));

describe("Nav", () => {
  it("renderiza os rotulos a partir das traducoes", () => {
    renderWithIntl(<Nav onDark={false} />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "A OGDI" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projetos" })).toBeInTheDocument();
    // Clientes saiu do menu principal.
    expect(screen.queryByRole("link", { name: "Clientes" })).not.toBeInTheDocument();
  });

  // Prova que os rótulos vêm da camada de tradução (não de strings PT fixas):
  // em EN os mesmos itens aparecem traduzidos.
  it("usa o idioma ativo nos rotulos (EN)", () => {
    renderWithIntl(<Nav onDark={false} />, { locale: "en", messages: enMessages });
    expect(screen.getByRole("link", { name: "About OGDI" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "A OGDI" })).not.toBeInTheDocument();
  });
});
