import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithIntl } from "@/test/intl";
import { Header } from "./Header";

const mockUseHeaderScroll = vi.fn();

vi.mock("@/hooks/useHeaderScroll", () => ({
  useHeaderScroll: () => mockUseHeaderScroll(),
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => "/",
  useRouter: () => ({ replace: vi.fn() }),
}));

describe("Header", () => {
  it("mantem a navegacao branca enquanto esta sobre hero escuro", () => {
    mockUseHeaderScroll.mockReturnValue({ scrolled: false, onDark: true });
    renderWithIntl(<Header />);
    expect(screen.getByRole("link", { name: "A OGDI" })).toHaveClass("text-white");
  });

  it("usa navegacao escura no topo de paginas claras (sem hero escuro)", () => {
    mockUseHeaderScroll.mockReturnValue({ scrolled: false, onDark: false });
    renderWithIntl(<Header />);
    expect(screen.getByRole("link", { name: "A OGDI" })).toHaveClass("text-ink-2");
  });

  it("usa navegacao escura quando o header ganha fundo claro no scroll", () => {
    mockUseHeaderScroll.mockReturnValue({ scrolled: true, onDark: false });
    renderWithIntl(<Header />);
    expect(screen.getByRole("link", { name: "A OGDI" })).toHaveClass("text-ink-2");
  });
});
