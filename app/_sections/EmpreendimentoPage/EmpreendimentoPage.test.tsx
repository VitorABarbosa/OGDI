import { describe, expect, it } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithIntl as render } from "@/test/intl";
import { projetos } from "@/app/_sections/Projetos/projetos.data";
import { projetoMessages } from "@/messages/projetos/_index";
import { EmpHero } from "./EmpHero";
import { EmpInfo } from "./EmpInfo";
import { EmpFicha } from "./EmpFicha";
import { EmpLazer } from "./EmpLazer";
import { EmpTour } from "./EmpTour";
import { EmpObra } from "./EmpObra";
import { EmpQuote } from "./EmpQuote";
import { EmpLocationStory } from "./EmpLocationStory";
import { EmpAtuacao } from "./EmpAtuacao";
import { EmpClosing } from "./EmpClosing";
import { EmpNeighborhoodMap } from "./EmpNeighborhoodMap";

const hitsCupece = projetos.find((p) => p.slug === "hits-cupece");
const startPark = projetos.find((p) => p.slug === "start-park-jabaquara");
const hitsSantaCatarina = projetos.find((p) => p.slug === "hits-santa-catarina");
// Oh Freguesia é o único com mídia real (tour 360° + vídeo) na seção Experiência.
const ohFreguesia = projetos.find((p) => p.slug === "oh-freguesia");
// Guarulhos (futuro lançamento) é o caso sem `map` — usado p/ testar o placeholder.
const semMapa = projetos.find((p) => p.slug === "guarulhos");
// Prosa por projeto agora vive em messages/projetos/<slug>/ (namespace proj.<slug>).
const ptProj = projetoMessages("pt") as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
const TEAM_WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5511995166122&text&type=phone_number&app_absent=0";

describe("Empreendimento page data", () => {
  it("does not keep the duplicate standalone Cupece project", () => {
    expect(projetos.find((p) => p.slug === "cupece")).toBeUndefined();
  });

  it("provides the narrative content for Hits Cupece", () => {
    expect(hitsCupece).toBeDefined();

    // Dados estruturais seguem em projetos.data.ts
    expect(hitsCupece?.address).toBe("Rua Dom João Soares Coelho");
    expect(hitsCupece?.units).toBe("1 e 2 dormitórios");
    expect(hitsCupece?.unitFeature).toBe("Terraço com churrasqueira");
    expect(hitsCupece?.closingStatement?.ctaHref).toBe("https://www.tsengenharia.com/imovel/hits-cupece/");
    expect(hitsCupece?.obra?.overall).toBe(85.84);
    expect(hitsCupece?.obra?.bars).toHaveLength(10);
    expect(hitsCupece?.obra?.bars[0].pct).toBe(87.46);
    expect(hitsCupece?.obra?.bars[9].pct).toBe(68.96);
    expect(hitsCupece?.map?.center).toEqual({ lat: -23.6730382, lng: -46.6513232 });
    expect(hitsCupece?.map?.categories).toHaveLength(5);
    expect(hitsCupece?.map?.points?.length).toBeGreaterThanOrEqual(10);

    // Prosa migrada para o i18n por projeto
    const hc = ptProj["hits-cupece"];
    expect(hc.facts).toEqual([
      "Em obra",
      "Studio e 2 dormitórios",
      "Terraço com churrasqueira",
      "Cupecê - São Paulo",
    ]);
    expect(hc.heroSummary).toMatch(/região conectada, conveniente e em valorização/i);
    expect(hc.locationStory.title).toMatch(/leitura do território/i);
    expect(hc.productStory.cards).toHaveLength(4);
    expect(hc.strategyStory.title).toBe("A operação foi pensada antes de a obra chegar ao canteiro.");
    expect(hc.strategyStory.kicker).toMatch(/estrutura/i);
    expect(hc.galleryIntro.title).toBe("A narrativa também aparece nos espaços.");
    expect(hc.obra.reference).toBe("Atualizado em maio de 2026");
    expect(hc.obra.stages).toHaveLength(10);
    expect(hc.closingStatement.title).toMatch(/não é apenas um endereço/i);
  });

  it("provides the construction-progress data for Start Park Jabaquara", () => {
    expect(startPark).toBeDefined();

    expect(startPark?.obra?.overall).toBe(22.76);
    expect(startPark?.obra?.bars).toHaveLength(10);
    expect(startPark?.obra?.bars[0].pct).toBe(42.57);
    expect(startPark?.obra?.bars[1].pct).toBe(91.1);
    expect(startPark?.obra?.bars[5].pct).toBe(0);
    expect(startPark?.obra?.bars[9].pct).toBe(50.95);

    const sp = ptProj["start-park-jabaquara"];
    expect(sp.obra.reference).toBe("Atualizado em maio de 2026");
    expect(sp.obra.stages).toHaveLength(10);
  });

  it("provides the narrative page standard for every registered project", () => {
    for (const project of projetos) {
      expect(project).toBeDefined();
      const m = ptProj[project.slug];
      expect(m).toBeDefined();
      expect(m.heroSummary).toBeTruthy();
      expect(m.facts).toHaveLength(4);
      expect(m.locationStory.highlights).toHaveLength(3);
      expect(m.productStory.cards).toHaveLength(4);
      expect(m.galleryIntro.body.length).toBeGreaterThan(0);
      expect(m.strategyStory.body.length).toBeGreaterThan(0);
      expect(m.closingStatement.ctaLabel).toBe("Tenho interesse no empreendimento");
      // Ficha técnica: toda em pares value/label (paridade nos 3 idiomas via cópia PT).
      expect(Array.isArray(m.ficha)).toBe(true);
      expect(m.ficha.length).toBeGreaterThanOrEqual(8);
      for (const cell of m.ficha) {
        expect(cell.value).toBeTruthy();
        expect(cell.label).toBeTruthy();
      }
    }
  });

  it("renders the Cupece technical specs band with serif values and labels", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpFicha p={hitsCupece!} />);

    // Faixa só com a grade (sem cabeçalho), 1:1 com a referência .em-ficha.
    expect(screen.getByText("Studio e 2 dormitórios")).toBeInTheDocument();
    expect(screen.getByText("Tipologias")).toBeInTheDocument();
    expect(screen.getByText("TS Engenharia")).toBeInTheDocument();
    expect(screen.getByText("Construtora")).toBeInTheDocument();
    expect(screen.getByText("MCMV")).toBeInTheDocument();
  });

  it("renders the elaborated hero: eyebrow, wordmark, summary, essentials, CTA and scroll cue", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpHero p={hitsCupece!} status="Em obra" segmento="Residencial" local="Cupecê - São Paulo" />);

    // eyebrow (segmento · status) + wordmark + indicador de scroll (chevron → #sobre)
    expect(screen.getByText(/Residencial · Em obra/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: hitsCupece!.name, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Role" })).toHaveAttribute("href", "#sobre");

    // Resumo + essenciais (localização entre eles) logo de cara.
    expect(screen.getByText(/região conectada, conveniente e em valorização/i)).toBeInTheDocument();
    expect(screen.getByText("Studio e 2 dormitórios")).toBeInTheDocument();
    expect(screen.getByText("Cupecê - São Paulo")).toBeInTheDocument();

    // CTAs — primária leva ao site da incorporadora (nova aba); secundária ao contato.
    const conheca = screen.getByRole("link", { name: /Conheça o empreendimento/i });
    expect(conheca).toHaveAttribute("href", "https://www.tsengenharia.com/imovel/hits-cupece/");
    expect(conheca).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: /Falar com a equipe/i })).toHaveAttribute("href", TEAM_WHATSAPP_URL);
  });

  it("renders the Cupece amenities (lazer) grid and feature band", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpLazer p={hitsCupece!} />);

    expect(screen.getByText("Áreas comuns completas.")).toBeInTheDocument();
    expect(screen.getByText("Piscina adulto")).toBeInTheDocument();
    expect(screen.getByText("Sky lounge")).toBeInTheDocument();
    expect(screen.getByText("Destaque")).toBeInTheDocument();
    expect(screen.getByText("CineOpen")).toBeInTheDocument();
  });

  it("renders Beach Tennis as the Santa Catarina amenities highlight", () => {
    expect(hitsSantaCatarina).toBeDefined();

    render(<EmpLazer p={hitsSantaCatarina!} />);

    expect(screen.getByText("Destaque")).toBeInTheDocument();
    expect(screen.getAllByText("Beach Tennis")).toHaveLength(2);
  });

  it("renders the Cupece manifesto quote with highlight and signature", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpQuote p={hitsCupece!} />);

    expect(screen.getByText(/elevar o dia a dia/i)).toBeInTheDocument();
    expect(screen.getByText("Hits Cupecê · Cupecê")).toBeInTheDocument();
  });

  it("renders the Oh Freguesia tour & video experience blocks with the real tour link", () => {
    expect(ohFreguesia).toBeDefined();

    const { container } = render(<EmpTour p={ohFreguesia!} />);

    expect(screen.getByText("Experiência")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Conheça todos os detalhes/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Tour virtual 360°")).toBeInTheDocument();
    expect(screen.getByText("Vídeo do empreendimento")).toBeInTheDocument();
    // O texto do vídeo interpola o nome do projeto.
    expect(screen.getByText(/arquitetura e a localização do Oh Freguesia/i)).toBeInTheDocument();
    // O CTA do tour aponta para a URL real do VR, em nova aba.
    const tourLink = container.querySelector('a[href="https://flyingstudio.com.br/vr/vr-ts-oh-freguesia/"]');
    expect(tourLink).not.toBeNull();
    expect(tourLink).toHaveAttribute("target", "_blank");
  });

  it("disables the experience section for a project without tour/video (Cupece)", () => {
    expect(hitsCupece).toBeDefined();
    expect(hitsCupece?.experience).toBeUndefined();

    const { container } = render(<EmpTour p={hitsCupece!} />);
    // Sem mídia → seção não renderiza (e o link some do EmpNav).
    expect(container.querySelector("#tour")).toBeNull();
    expect(screen.queryByText("Experiência")).toBeNull();
  });

  it("renders the construction-progress section for an in-progress project, with stages and status badge", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpObra p={hitsCupece!} status="Em obra" />);

    expect(screen.getByRole("heading", { name: /Acompanhe a evolução da obra/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Avanço geral da obra")).toBeInTheDocument();
    expect(screen.getByText("85.84%")).toBeInTheDocument();
    expect(screen.getByText("Serviços preliminares gerais")).toBeInTheDocument();
    expect(screen.getByText("Supraestrutura")).toBeInTheDocument();
    expect(screen.getByText("Infraestrutura e urbanização")).toBeInTheDocument();
    expect(screen.getByText("Atualizado em maio de 2026")).toBeInTheDocument();
    expect(screen.getByText("Em obra")).toBeInTheDocument();
  });

  it("renders the Start Park construction progress with May 2026 data", () => {
    expect(startPark).toBeDefined();

    render(<EmpObra p={startPark!} status="Em obra" />);

    expect(screen.getByText("22.76%")).toBeInTheDocument();
    expect(screen.getByText("91.10%")).toBeInTheDocument();
    expect(screen.getByText("Revestimentos")).toBeInTheDocument();
    expect(screen.getAllByText("0%")).toHaveLength(3);
    expect(screen.getByText("Atualizado em maio de 2026")).toBeInTheDocument();
  });

  it("omits the construction-progress section for a future launch (no site yet)", () => {
    const futuro = projetos.find((p) => p.cat === "futuro");
    expect(futuro).toBeDefined();

    const { container } = render(<EmpObra p={futuro!} status="Futuro lançamento" />);
    expect(container.querySelector("#obra")).toBeNull();
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

  it("renders the Cupece 'Sobre o projeto' section (reference em-sobre layout)", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpInfo p={hitsCupece!} />);

    // Layout da referência: kicker + título de produto + intro + imagem com etiqueta.
    expect(screen.getByText("Sobre o projeto")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Plantas inteligentes pensadas para uma vida urbana mais prática/i, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/O Hits Cupecê nasce de uma leitura objetiva do território/i)).toBeInTheDocument();
  });

  it("renders the Cupece Open Group strategy intro before the method grid", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpAtuacao p={hitsCupece!} />);

    expect(screen.getByText("Estruturação OGDI")).toBeInTheDocument();
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
    expect(screen.getByRole("button", { name: "Mobilidade" })).toBeInTheDocument();
  });

  it("filters the neighborhood map by category (changes the map search query)", () => {
    expect(hitsCupece).toBeDefined();

    render(<EmpNeighborhoodMap p={hitsCupece!} />);

    fireEvent.click(screen.getByRole("button", { name: "Educação" }));

    // O embed (fallback sem chave) passa a buscar "escolas perto de {endereço}".
    expect(screen.getByTitle("Google Maps - Hits Cupecê")).toHaveAttribute(
      "src",
      expect.stringContaining("escolas"),
    );
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
