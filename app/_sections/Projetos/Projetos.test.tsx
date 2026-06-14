import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithIntl } from "@/test/intl";
import { Projetos } from "./Projetos";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => "/",
  useRouter: () => ({ replace: vi.fn() }),
}));

describe("Projetos", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not start carousel drag when the pointer starts on a project CTA", () => {
    const setPointerCapture = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "setPointerCapture", {
      configurable: true,
      value: setPointerCapture,
    });

    renderWithIntl(<Projetos />);

    fireEvent.pointerDown(screen.getAllByRole("link", { name: /Conhe/i })[0], {
      pointerId: 1,
      clientX: 10,
    });

    expect(setPointerCapture).not.toHaveBeenCalled();
  });
});
