import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpHero } from "./EmpHero";
import { EmpLocationStory } from "./EmpLocationStory";
import { EmpProductStory } from "./EmpProductStory";
import { EmpAtuacao } from "./EmpAtuacao";
import { EmpClosing } from "./EmpClosing";

const hitsCupece = projetos.find((p) => p.slug === "hits-cupece");
const startPark = projetos.find((p) => p.slug === "start-park-jabaquara");

describe("Empreendimento V2 data", () => {
  it("provides the narrative content for Hits Cupece", () => {
    expect(hitsCupece).toBeDefined();

    expect(hitsCupece?.address).toBe("Rua Dom Joao Soares Coelho");
    expect(hitsCupece?.units).toBe("1 e 2 dormitorios");
    expect(hitsCupece?.unitFeature).toBe("Terraco com churrasqueira");
    expect(hitsCupece?.facts).toEqual([
      "Em obra",
      "1 e 2 dormitorios",
      "Terraco com churrasqueira",
      "Cupece - Sao Paulo",
    ]);
    expect(hitsCupece?.heroSummary).toBe(
      "Um empreendimento residencial no Cupece, em uma regiao conectada, conveniente e em valorizacao na zona sul de Sao Paulo.",
    );
    expect(hitsCupece?.locationStory?.title).toMatch(/leitura do territorio/i);
    expect(hitsCupece?.productStory?.cards).toHaveLength(4);
    expect(hitsCupece?.strategyStory?.title).toBe(
      "A operacao foi pensada antes da obra chegar ao canteiro.",
    );
    expect(hitsCupece?.strategyStory?.kicker).toMatch(/estrutura/i);
    expect(hitsCupece?.galleryIntro?.title).toBe("A narrativa tambem aparece nos espacos.");
    expect(hitsCupece?.closingStatement?.title).toMatch(/nao e apenas um endereco/i);
  });

  it("keeps non-V2 projects valid during the transition", () => {
    expect(startPark).toBeDefined();
    expect(startPark?.name).toBe("Start Park Jabaquara");
    expect(startPark?.facts).toBeUndefined();
  });

  it("renders the Cupece editorial hero summary, facts, and CTA", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpHero p={hitsCupece!} />);

    expect(screen.getByText(/regiao conectada, conveniente e em valorizacao/i)).toBeInTheDocument();
    expect(screen.getByText("1 e 2 dormitorios")).toBeInTheDocument();
    expect(screen.getByText("Terraco com churrasqueira")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Tenho interesse/i })).toHaveAttribute("href", "/#contato");
  });

  it("renders the Cupece location thesis section", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpLocationStory p={hitsCupece!} />);

    expect(screen.getByText("A tese do lugar")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Antes da obra, existe a leitura do territorio/i })).toHaveClass(
      "reveal",
      "reveal-2",
    );
    expect(screen.getByText(/A proximidade com a Avenida Cupece amplia essa leitura/i)).toBeInTheDocument();
    expect(screen.getByText("Regiao em ascensao")).toBeInTheDocument();
    expect(screen.getByText("Conexoes urbanas")).toBeInTheDocument();
    expect(screen.getByText("Cotidiano conveniente")).toBeInTheDocument();
  });

  it("renders the Cupece product response section", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpProductStory p={hitsCupece!} />);

    expect(screen.getByText("O produto como resposta")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Tipologias pensadas/i })).toHaveClass("reveal", "reveal-2");
    expect(screen.getByText("Rua Dom Joao Soares Coelho")).toBeInTheDocument();
    expect(screen.getByText("Terraco com churrasqueira")).toBeInTheDocument();
  });

  it("renders the Cupece Open Group strategy intro before the method grid", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpAtuacao p={hitsCupece!} />);

    expect(screen.getByText("Estruturacao Open Group")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /operacao foi pensada antes da obra/i })).toBeInTheDocument();
    expect(screen.getByText(/leitura da oportunidade, definicao de produto/i)).toBeInTheDocument();
  });

  it("renders the Cupece closing synthesis and CTA", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpClosing p={hitsCupece!} />);

    expect(screen.getByRole("heading", { name: /Cupece nao e apenas um endereco/i })).toHaveClass("reveal");
    expect(screen.getByText(/localizacao, demanda e visao de produto/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Tenho interesse no empreendimento/i })).toHaveAttribute("href", "/#contato");
  });
});
