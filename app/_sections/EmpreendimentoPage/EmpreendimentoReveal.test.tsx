import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl as render } from "@/test/intl";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpHero } from "./EmpHero";
import { EmpInfo } from "./EmpInfo";
import { EmpGaleria } from "./EmpGaleria";
import { EmpAtuacao } from "./EmpAtuacao";
import { EmpProximos } from "./EmpProximos";
import { EmpLocationStory } from "./EmpLocationStory";
import { EmpClosing } from "./EmpClosing";

const projeto = projetos[0];

describe("Empreendimento page reveals", () => {
  it("marks the hero copy layers for reveal animation", () => {
    render(<EmpHero p={projeto} />);

    expect(screen.getByLabelText("Trilha de navegação")).toHaveClass("reveal");
    expect(screen.getByRole("heading", { name: projeto.name, level: 1 })).toHaveClass("reveal", "reveal-2");
  });

  it("marks project info and merged product layers for reveal animation", () => {
    const { container } = render(<EmpInfo p={projeto} />);

    expect(screen.getByText("Status").closest("div")).toHaveClass("reveal");
    expect(screen.getByRole("heading", { name: /Da leitura/i, level: 2 })).toHaveClass("reveal", "reveal-2");
    // "O produto como resposta" vive na mesma seção como coda: rótulo + 4 facetas marcadas para reveal.
    expect(screen.getByText("O produto como resposta")).toBeInTheDocument();
    expect(container.querySelectorAll(".reveal-step")).toHaveLength(4);
  });

  it("marks gallery cells for scroll reveal animation", () => {
    const { container } = render(<EmpGaleria p={projeto} />);

    expect(container.querySelectorAll(".reveal-gallery")).toHaveLength(9);
  });

  it("marks method cards and related project cards for scroll reveal animation", () => {
    // Etapas recortadas pelo estágio (cat). Sem projeto, cai no padrão: até o início de obras (7).
    const { container: atuacao } = render(<EmpAtuacao />);
    expect(atuacao.querySelectorAll(".reveal-step")).toHaveLength(7);

    // hits-cupece está "em obra" → até o início de obras (7 etapas).
    const { container: atuacaoNarrativa } = render(<EmpAtuacao p={projeto} />);
    expect(atuacaoNarrativa.querySelectorAll(".reveal-step")).toHaveLength(7);
    expect(screen.getByRole("heading", { name: /operação foi pensada antes de a obra/i })).toHaveClass("reveal", "reveal-2");

    // "futuro" → estruturação inicial (3); "entregue" → jornada completa (10).
    const futuro = projetos.find((p) => p.cat === "futuro")!;
    expect(render(<EmpAtuacao p={futuro} />).container.querySelectorAll(".reveal-step")).toHaveLength(3);
    const entregue = projetos.find((p) => p.cat === "entregue")!;
    expect(render(<EmpAtuacao p={entregue} />).container.querySelectorAll(".reveal-step")).toHaveLength(10);

    const related = projetos.slice(1, 4);
    const { container: proximos } = render(<EmpProximos others={related} />);
    expect(proximos.querySelectorAll(".reveal-card")).toHaveLength(related.length);
    expect(screen.getByRole("heading", { name: /Outros empreendimentos/i })).toHaveClass("reveal", "reveal-2");
  });

  it("marks the location narrative for layered reveal animation", () => {
    const { container: location } = render(<EmpLocationStory p={projeto} />);
    expect(location.querySelectorAll(".reveal-step")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: /leitura do território/i })).toHaveClass("reveal", "reveal-2");
  });

  it("marks the closing synthesis for reveal animation", () => {
    render(<EmpClosing p={projeto} />);

    expect(screen.getByRole("heading", { name: /Cupecê não é apenas um endereço/i })).toHaveClass("reveal");
    expect(screen.getByRole("link", { name: /Tenho interesse no empreendimento/i }).closest("div")).toHaveClass(
      "reveal",
      "reveal-3",
    );
  });
});
