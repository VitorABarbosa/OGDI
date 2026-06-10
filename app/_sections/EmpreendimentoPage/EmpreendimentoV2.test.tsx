import { describe, expect, it } from "vitest";
import { projetos } from "@/app/_sections/Projetos/projetos.data";

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
    expect(hitsCupece?.locationStory?.title).toMatch(/leitura do territorio/i);
    expect(hitsCupece?.productStory?.cards).toHaveLength(4);
    expect(hitsCupece?.strategyStory?.title).toMatch(/estrutura/i);
    expect(hitsCupece?.closingStatement?.title).toMatch(/nao e apenas um endereco/i);
  });

  it("keeps non-V2 projects valid during the transition", () => {
    expect(startPark).toBeDefined();
    expect(startPark?.name).toBe("Start Park Jabaquara");
    expect(startPark?.facts).toBeUndefined();
  });
});
