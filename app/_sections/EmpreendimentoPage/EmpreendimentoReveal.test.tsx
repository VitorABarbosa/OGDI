import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpHero } from "./EmpHero";
import { EmpInfo } from "./EmpInfo";
import { EmpGaleria } from "./EmpGaleria";
import { EmpAtuacao } from "./EmpAtuacao";
import { EmpProximos } from "./EmpProximos";
import { EmpLocationStory } from "./EmpLocationStory";
import { EmpProductStory } from "./EmpProductStory";
import { EmpClosing } from "./EmpClosing";

const projeto = projetos[0];

describe("Empreendimento page reveals", () => {
  it("marks the hero copy layers for reveal animation", () => {
    render(<EmpHero p={projeto} />);

    expect(screen.getByLabelText("Breadcrumb")).toHaveClass("reveal");
    expect(screen.getByRole("heading", { name: projeto.name, level: 1 })).toHaveClass("reveal", "reveal-3");
  });

  it("marks project info layers for reveal animation", () => {
    render(<EmpInfo p={projeto} />);

    expect(screen.getByText("Status").closest("div")).toHaveClass("reveal");
    expect(screen.getByRole("heading", { name: /Da leitura/i, level: 2 })).toHaveClass("reveal", "reveal-2");
  });

  it("marks gallery cells for scroll reveal animation", () => {
    const { container } = render(<EmpGaleria p={projeto} />);

    expect(container.querySelectorAll(".reveal-gallery")).toHaveLength(9);
  });

  it("marks method cards and related project cards for scroll reveal animation", () => {
    const { container: atuacao } = render(<EmpAtuacao />);
    expect(atuacao.querySelectorAll(".reveal-step")).toHaveLength(8);

    const { container: atuacaoNarrativa } = render(<EmpAtuacao p={projeto} />);
    expect(atuacaoNarrativa.querySelectorAll(".reveal-step")).toHaveLength(8);
    expect(screen.getByRole("heading", { name: /operação foi pensada antes de a obra/i })).toHaveClass("reveal", "reveal-2");

    const related = projetos.slice(1, 4);
    const { container: proximos } = render(<EmpProximos others={related} />);
    expect(proximos.querySelectorAll(".reveal-card")).toHaveLength(related.length);
    expect(screen.getByRole("heading", { name: /Outros empreendimentos/i })).toHaveClass("reveal", "reveal-2");
  });

  it("marks narrative sections for layered reveal animation", () => {
    const { container: location } = render(<EmpLocationStory p={projeto} />);
    expect(location.querySelectorAll(".reveal-step")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: /leitura do território/i })).toHaveClass("reveal", "reveal-2");

    const { container: product } = render(<EmpProductStory p={projeto} />);
    expect(product.querySelectorAll(".reveal-step")).toHaveLength(4);
    expect(screen.getByRole("heading", { name: /Tipologias pensadas/i })).toHaveClass("reveal", "reveal-2");
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
