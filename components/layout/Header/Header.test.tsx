import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./Header";

const mockUseHeaderScroll = vi.fn();

vi.mock("@/hooks/useHeaderScroll", () => ({
  useHeaderScroll: () => mockUseHeaderScroll(),
}));

describe("Header", () => {
  it("mantem a navegacao branca enquanto esta sobre hero escuro", () => {
    mockUseHeaderScroll.mockReturnValue({ scrolled: false, onDark: true });

    render(<Header />);

    expect(screen.getByRole("link", { name: "Institucional" })).toHaveClass("text-white");
  });

  it("usa navegacao escura no topo de paginas claras (sem hero escuro)", () => {
    mockUseHeaderScroll.mockReturnValue({ scrolled: false, onDark: false });

    render(<Header />);

    expect(screen.getByRole("link", { name: "Institucional" })).toHaveClass("text-ink-2");
  });

  it("usa navegacao escura quando o header ganha fundo claro no scroll", () => {
    mockUseHeaderScroll.mockReturnValue({ scrolled: true, onDark: false });

    render(<Header />);

    expect(screen.getByRole("link", { name: "Institucional" })).toHaveClass("text-ink-2");
  });
});
