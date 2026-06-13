import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithIntl } from "@/test/intl";
import { LangSwitcher } from "./LangSwitcher";

const replace = vi.fn();
vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/institucional",
  useRouter: () => ({ replace }),
}));

describe("LangSwitcher", () => {
  it("oferece os outros idiomas como botoes", () => {
    renderWithIntl(<LangSwitcher light={false} locale="pt" />);
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
  });

  it("navega para o mesmo caminho no locale escolhido", () => {
    renderWithIntl(<LangSwitcher light={false} locale="pt" />);
    screen.getByRole("button", { name: "EN" }).click();
    expect(replace).toHaveBeenCalledWith("/institucional", { locale: "en" });
  });
});
