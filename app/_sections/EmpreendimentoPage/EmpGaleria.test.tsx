import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpGaleria } from "./EmpGaleria";

const hitsCupece = projetos.find((p) => p.slug === "hits-cupece");

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("EmpGaleria", () => {
  it("renders Cupece images and opens a smooth fullscreen viewer", async () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    const imageButtons = screen.getAllByRole("button", { name: /Abrir imagem/i });
    expect(imageButtons).toHaveLength(9);

    fireEvent.click(imageButtons[0]);

    expect(screen.getByRole("dialog", { name: /Cine Open/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.getByRole("dialog", { name: /Cine Open/i })).toHaveClass("opacity-0");

    act(() => vi.advanceTimersByTime(360));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps gallery items in the same row at the same height", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    const imageButtons = screen.getAllByRole("button", { name: /Abrir imagem/i });

    expect(imageButtons[0]).toHaveClass("h-[clamp(340px,36vw,540px)]");
    expect(imageButtons[1]).toHaveClass("h-[clamp(340px,36vw,540px)]");
    expect(imageButtons[2]).toHaveClass("h-[clamp(280px,30vw,440px)]");
    expect(imageButtons[3]).toHaveClass("h-[clamp(280px,30vw,440px)]");
    expect(imageButtons[4]).toHaveClass("h-[clamp(280px,30vw,440px)]");
  });

  it("renders the Cupece gallery narrative header", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    expect(screen.getByText("Do conceito a experiencia")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /A narrativa tambem aparece nos espacos/i })).toHaveClass(
      "reveal",
      "reveal-2",
    );
  });
});
