import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithIntl as render } from "@/test/intl";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpGaleria } from "./EmpGaleria";

const hitsCupece = projetos.find((p) => p.slug === "hits-cupece");

describe("EmpGaleria", () => {
  it("renders Cupece images and opens a shared-element fullscreen viewer", async () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    // 22 imagens no total; mostramos as 10 iniciais ("Mostrar mais" revela o resto).
    const imageButtons = screen.getAllByRole("button", { name: /Abrir imagem/i });
    expect(imageButtons).toHaveLength(10);

    fireEvent.click(imageButtons[0]);

    expect(screen.getByRole("dialog", { name: /Portaria/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.getByRole("dialog", { name: /Portaria/i }).firstChild).toHaveStyle({ opacity: "0" });
  });

  it("navigates between images with arrows and shows the illustrative caption", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    fireEvent.click(screen.getAllByRole("button", { name: /Abrir imagem/i })[0]);

    // Legenda: aviso meramente ilustrativo + ambiente + contador (10 visíveis).
    expect(screen.getByText(/Perspectiva meramente ilustrativa/)).toBeInTheDocument();
    expect(screen.getByText("Portaria")).toBeInTheDocument();
    expect(screen.getByText(/1\s*\/\s*10/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Próxima imagem" }));
    expect(screen.getByText("Piscina")).toBeInTheDocument();
    expect(screen.getByText(/2\s*\/\s*10/)).toBeInTheDocument();

    // Voltar do primeiro envolve (wrap-around) para a última visível (índice 9).
    fireEvent.click(screen.getByRole("button", { name: "Imagem anterior" }));
    expect(screen.getByText("Portaria")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByText("Playground")).toBeInTheDocument();
  });

  it("lays the gallery out as a 4-column grid mosaic with varied widths", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    const imageButtons = screen.getAllByRole("button", { name: /Abrir imagem/i });

    // Grade de 4 colunas (md+): larguras variam por linha via col-span do padrão.
    expect(imageButtons[0]).toHaveClass("md:col-span-2");
    expect(imageButtons[1]).toHaveClass("md:col-span-1");
    expect(imageButtons[5]).toHaveClass("md:col-span-2");
  });

  it("renders the reference header (Galeria + count) and per-project title", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    expect(screen.getByText("Galeria")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /A narrativa também aparece nos espaços/i })).toBeInTheDocument();
    expect(screen.getByText("22 imagens")).toBeInTheDocument();
  });

  it("renders reference category filters and narrows the mosaic when one is picked", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    // Filtros da referência (dinâmicos): hits-cupece tem Áreas comuns + Decorado.
    expect(screen.getByRole("button", { name: /Áreas comuns/ })).toBeInTheDocument();
    const decorado = screen.getByRole("button", { name: /Decorado/ });

    fireEvent.click(decorado);

    // Decorado = Living + Varanda → 2 imagens no mosaico.
    expect(screen.getAllByRole("button", { name: /Abrir imagem/i })).toHaveLength(2);
    expect(screen.getByText("2 imagens")).toBeInTheDocument();
  });

  it("separates plantas and implantações into their own filters (masonry)", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpGaleria p={hitsCupece!} />);

    fireEvent.click(screen.getByRole("button", { name: /Plantas/ }));
    expect(screen.getAllByRole("button", { name: /Abrir imagem/i })).toHaveLength(3);
    expect(screen.getByText("3 imagens")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Implantação/ }));
    expect(screen.getAllByRole("button", { name: /Abrir imagem/i })).toHaveLength(5);
    expect(screen.getByText("5 imagens")).toBeInTheDocument();
  });
});
