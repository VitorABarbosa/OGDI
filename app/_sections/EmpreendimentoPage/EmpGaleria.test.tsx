import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpGaleria } from "./EmpGaleria";

const hitsCupece = projetos.find((p) => p.slug === "hits-cupece");

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    arc: vi.fn(),
    beginPath: vi.fn(),
    bezierCurveTo: vi.fn(),
    clearRect: vi.fn(),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    fill: vi.fn(),
    fillRect: vi.fn(),
    lineTo: vi.fn(),
    moveTo: vi.fn(),
    restore: vi.fn(),
    save: vi.fn(),
    setTransform: vi.fn(),
    stroke: vi.fn(),
  } as unknown as CanvasRenderingContext2D);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("EmpGaleria", () => {
  it("renders Cupece images and opens a shared-element fullscreen viewer", async () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    const imageButtons = screen.getAllByRole("button", { name: /Abrir imagem/i });
    expect(imageButtons).toHaveLength(9);

    fireEvent.click(imageButtons[0]);

    expect(screen.getByRole("dialog", { name: /Cine Open/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.getByRole("dialog", { name: /Cine Open/i }).firstChild).toHaveStyle({ opacity: "0" });
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

    expect(screen.getByText("Do conceito à experiência")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /A narrativa também aparece nos espaços/i })).toHaveClass(
      "reveal",
      "reveal-2",
    );
  });
});
