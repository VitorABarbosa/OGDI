import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpHero } from "./EmpHero";
import { EmpLocationStory } from "./EmpLocationStory";
import { EmpProductStory } from "./EmpProductStory";
import { EmpAtuacao } from "./EmpAtuacao";
import { EmpClosing } from "./EmpClosing";
import { EmpNeighborhoodMap } from "./EmpNeighborhoodMap";

const hitsCupece = projetos.find((p) => p.slug === "hits-cupece");
const startPark = projetos.find((p) => p.slug === "start-park-jabaquara");
const ohFreguesia = projetos.find((p) => p.slug === "oh-freguesia");

describe("Empreendimento page data", () => {
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
    expect(hitsCupece?.map?.points.length).toBeGreaterThanOrEqual(10);
  });

  it("provides the narrative page standard for current projects in progress", () => {
    for (const project of [hitsCupece, startPark, ohFreguesia]) {
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
    expect(screen.getByText(/A proximidade com a Avenida Cupecê amplia essa leitura/i)).toBeInTheDocument();
    expect(screen.getByText("Região em ascensão")).toBeInTheDocument();
    expect(screen.getByText("Conexões urbanas")).toBeInTheDocument();
    expect(screen.getByText("Cotidiano conveniente")).toBeInTheDocument();
  });

  it("renders the Cupece product response section", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpProductStory p={hitsCupece!} />);

    expect(screen.getByText("O produto como resposta")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Tipologias pensadas/i })).toHaveClass("reveal", "reveal-2");
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

  it("renders the Cupece controlled neighborhood map filters", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpNeighborhoodMap p={hitsCupece!} />);

    expect(screen.getByRole("heading", { name: /Localização e entorno/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Educação" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Escolas no entorno residencial")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Mobilidade" }));

    expect(screen.getByRole("button", { name: "Mobilidade" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Eixo Avenida Cupecê")).toBeInTheDocument();
    expect(screen.queryByText("Escolas no entorno residencial")).not.toBeInTheDocument();
  });
});
