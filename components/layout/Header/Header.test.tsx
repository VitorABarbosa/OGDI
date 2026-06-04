import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./Header";

const mockUseHeaderScroll = vi.fn();

vi.mock("@/hooks/useHeaderScroll", () => ({
  useHeaderScroll: () => mockUseHeaderScroll(),
}));

describe("Header", () => {
  it("mantem a navegacao branca antes do header mudar no scroll", () => {
    mockUseHeaderScroll.mockReturnValue({ scrolled: false, onDark: false });

    render(<Header />);

    expect(screen.getByRole("link", { name: "Manifesto" })).toHaveClass("text-white");
  });

  it("usa navegacao escura quando o header ganha fundo claro no scroll", () => {
    mockUseHeaderScroll.mockReturnValue({ scrolled: true, onDark: false });

    render(<Header />);

    expect(screen.getByRole("link", { name: "Manifesto" })).toHaveClass("text-ink-2");
  });
});
