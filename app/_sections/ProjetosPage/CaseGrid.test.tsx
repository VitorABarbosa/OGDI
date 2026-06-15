import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithIntl } from "@/test/intl";
import { CaseGrid } from "./CaseGrid";

// ProjetoTileScp usa o Link localizado (@/i18n/navigation → next/navigation).
vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => "/",
  useRouter: () => ({ replace: vi.fn() }),
}));

describe("CaseGrid", () => {
  it("renders all 5 projects by default", () => {
    renderWithIntl(<CaseGrid />);

    expect(screen.getByText("Hits Cupecê")).toBeInTheDocument();
    expect(screen.getByText("Start Park Jabaquara")).toBeInTheDocument();
    expect(screen.getByText("Oh Freguesia")).toBeInTheDocument();
    expect(screen.getByText("Hits Santa Catarina")).toBeInTheDocument();
    expect(screen.getByText("Guarulhos")).toBeInTheDocument();
    expect(screen.queryByText("Cupecê", { exact: true })).not.toBeInTheDocument();
    // SCP também aparecem sem filtro ("Todos").
    expect(screen.getByText("HUM Bela Vista")).toBeInTheDocument();
  });

  it("marks project cards for scroll reveal animation", () => {
    renderWithIntl(<CaseGrid />);

    const card = screen.getByText("Start Park Jabaquara").closest("a");

    expect(card).toHaveClass("reveal", "reveal-card");
  });

  it('filters to 3 obra projects when "Em obra" tab is clicked', () => {
    renderWithIntl(<CaseGrid />);

    fireEvent.click(screen.getByRole("button", { name: /Em obra/i }));

    expect(screen.getByText("Hits Cupecê")).toBeInTheDocument();
    expect(screen.getByText("Start Park Jabaquara")).toBeInTheDocument();
    expect(screen.getByText("Oh Freguesia")).toBeInTheDocument();
    expect(screen.queryByText("Hits Santa Catarina")).not.toBeInTheDocument();
    expect(screen.queryByText("Guarulhos")).not.toBeInTheDocument();
    expect(screen.queryByText("Cupecê", { exact: true })).not.toBeInTheDocument();
  });

  it('shows SCP operations (and hides empreendimentos) under the "Investimento SCP" tab', () => {
    renderWithIntl(<CaseGrid />);

    fireEvent.click(screen.getByRole("button", { name: /Investimento SCP/i }));

    expect(screen.getByText("HUM Bela Vista")).toBeInTheDocument();
    expect(screen.getByText("Rooftop Perdizes")).toBeInTheDocument();
    expect(screen.queryByText("Hits Cupecê")).not.toBeInTheDocument();

    // Card SCP abre o site do empreendimento em nova aba.
    const link = screen.getByText("HUM Bela Vista").closest("a");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(link).toHaveAttribute("href", "https://proxx.com.br/produto/hum-bela-vista/");
  });

  it('returns to 5 projects when "Todos" tab is clicked after filtering', () => {
    renderWithIntl(<CaseGrid />);

    fireEvent.click(screen.getByRole("button", { name: /Em obra/i }));
    fireEvent.click(screen.getByRole("button", { name: /Todos/i }));

    expect(screen.getByText("Hits Cupecê")).toBeInTheDocument();
    expect(screen.getByText("Start Park Jabaquara")).toBeInTheDocument();
    expect(screen.getByText("Oh Freguesia")).toBeInTheDocument();
    expect(screen.getByText("Hits Santa Catarina")).toBeInTheDocument();
    expect(screen.getByText("Guarulhos")).toBeInTheDocument();
    expect(screen.queryByText("Cupecê", { exact: true })).not.toBeInTheDocument();
  });
});
