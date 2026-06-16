import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl as render } from "@/test/intl";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpHero } from "./EmpHero";
import { EmpInfo } from "./EmpInfo";
import { EmpLocationStory } from "./EmpLocationStory";
import { EmpAtuacao } from "./EmpAtuacao";
import { EmpClosing } from "./EmpClosing";
import { EmpNeighborhoodMap } from "./EmpNeighborhoodMap";

const hitsCupece = projetos.find((p) => p.slug === "hits-cupece");
// Guarulhos (futuro lançamento) é o caso sem `map` — usado p/ testar o placeholder.
const semMapa = projetos.find((p) => p.slug === "guarulhos");

describe("Empreendimento page data", () => {
  it("does not keep the duplicate standalone Cupece project", () => {
    expect(projetos.find((p) => p.slug === "cupece")).toBeUndefined();
  });

  it("provides the narrative content for Hits Cupece", () => {
    expect(hitsCupece).toBeDefined();

    expect(hitsCupece?.address).toBe("Rua Dom João Soares Coelho");
    expect(hitsCupece?.units).toBe("1 e 2 dormitórios");
    expect(hitsCupece?.unitFeature).toBe("Terraço com churrasqueira");
    expect(hitsCupece?.facts).toEqual([
      "Em obra",
      "1 e 2 dormitórios",
      "Terraço com churrasqueira",
      "Cupecê - São Paulo",
    ]);
    expect(hitsCupece?.heroSummary).toBe(
      "Um empreendimento residencial no Cupecê, em uma região conectada, conveniente e em valorização, na zona sul de São Paulo.",
    );
    expect(hitsCupece?.locationStory?.title).toMatch(/leitura do território/i);
    expect(hitsCupece?.productStory?.cards).toHaveLength(4);
    expect(hitsCupece?.strategyStory?.title).toBe(
      "A operação foi pensada antes de a obra chegar ao canteiro.",
    );
    expect(hitsCupece?.strategyStory?.kicker).toMatch(/estrutura/i);
    expect(hitsCupece?.galleryIntro?.title).toBe("A narrativa também aparece nos espaços.");
    expect(hitsCupece?.closingStatement?.title).toMatch(/não é apenas um endereço/i);
    expect(hitsCupece?.closingStatement?.ctaHref).toBe("https://www.tsengenharia.com/imovel/hits-cupece/");
    expect(hitsCupece?.map?.center).toEqual({ lat: -23.6730382, lng: -46.6513232 });
    expect(hitsCupece?.map?.categories).toHaveLength(5);
    expect(hitsCupece?.map?.points?.length).toBeGreaterThanOrEqual(10);
  });

  it("provides the narrative page standard for every registered project", () => {
    for (const project of projetos) {
      expect(project).toBeDefined();
      expect(project?.heroSummary).toBeTruthy();
      expect(project?.facts).toHaveLength(4);
      expect(project?.locationStory?.highlights).toHaveLength(3);
      expect(project?.productStory?.cards).toHaveLength(4);
      expect(project?.galleryIntro?.body.length).toBeGreaterThan(0);
      expect(project?.strategyStory?.body.length).toBeGreaterThan(0);
      expect(project?.closingStatement?.ctaLabel).toBe("Tenho interesse no empreendimento");
    }
  });

  it("renders the Cupece editorial hero summary, facts, and CTA", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpHero p={hitsCupece!} />);

    expect(screen.getByText(/região conectada, conveniente e em valorização/i)).toBeInTheDocument();
    expect(screen.getByText("1 e 2 dormitórios")).toBeInTheDocument();
    expect(screen.getByText("Terraço com churrasqueira")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Tenho interesse/i })).toHaveAttribute(
      "href",
      "https://www.tsengenharia.com/imovel/hits-cupece/",
    );
  });

  it("renders the Cupece location thesis section", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpLocationStory p={hitsCupece!} />);

    expect(screen.getByText("A tese do lugar")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Antes da obra, existe a leitura do território/i })).toHaveClass(
      "reveal",
      "reveal-2",
    );
    expect(screen.getByText(/Localizado na Rua Dom João Soares Coelho/i)).toBeInTheDocument();
    expect(screen.queryByText(/A proximidade com a Avenida Cupecê amplia essa leitura/i)).not.toBeInTheDocument();
    expect(screen.getByText("Região em ascensão")).toBeInTheDocument();
    expect(screen.getByText("Conexões urbanas")).toBeInTheDocument();
    expect(screen.getByText("Cotidiano conveniente")).toBeInTheDocument();
  });

  it("renders the Cupece product response merged into the empreendimento section", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpInfo p={hitsCupece!} />);

    // Cabeçalho da seção unificada + coda do produto (rótulo + facetas).
    expect(screen.getByRole("heading", { name: /Da leitura/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText("O produto como resposta")).toBeInTheDocument();
    expect(screen.getByText("Rua Dom João Soares Coelho")).toBeInTheDocument();
    expect(screen.getByText("Terraço com churrasqueira")).toBeInTheDocument();
  });

  it("renders the Cupece Open Group strategy intro before the method grid", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpAtuacao p={hitsCupece!} />);

    expect(screen.getByText("Estruturação Open Group")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /operação foi pensada antes de a obra/i })).toBeInTheDocument();
    expect(screen.getByText(/leitura da oportunidade, definição de produto/i)).toBeInTheDocument();
  });

  it("renders the Cupece closing synthesis and CTA", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpClosing p={hitsCupece!} />);

    expect(screen.getByRole("heading", { name: /Cupecê não é apenas um endereço/i })).toHaveClass("reveal");
    expect(screen.getByText(/localização, demanda e visão de produto/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Tenho interesse no empreendimento/i })).toHaveAttribute(
      "href",
      "https://www.tsengenharia.com/imovel/hits-cupece/",
    );
  });

  it("renders the Cupece Google Maps embed for the project location", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpNeighborhoodMap p={hitsCupece!} />);

    expect(screen.getByRole("heading", { name: /Localização e entorno/i })).toBeInTheDocument();
    expect(screen.getByTitle("Google Maps - Hits Cupecê")).toHaveAttribute("src", expect.stringContaining("Hits%20Cupec"));
    expect(screen.queryByRole("button", { name: "Mobilidade" })).not.toBeInTheDocument();
  });

  it("renders the standard map placeholder when the project location is not configured", () => {
    expect(semMapa).toBeDefined();

    render(<EmpNeighborhoodMap p={semMapa!} />);

    expect(screen.getByRole("heading", { name: /Localização em definição/i })).toBeInTheDocument();
    expect(screen.getByText("Endereço em definição")).toBeInTheDocument();
    expect(screen.getByText(/será ativado com Google Maps/i)).toBeInTheDocument();
    expect(screen.queryByTitle("Google Maps - Guarulhos")).not.toBeInTheDocument();
  });
});
