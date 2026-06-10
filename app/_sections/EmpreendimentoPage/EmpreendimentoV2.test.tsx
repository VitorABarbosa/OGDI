import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { EmpHero } from "./EmpHero";

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
});
