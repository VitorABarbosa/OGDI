# Empreendimento V2 Narrativa Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Hits Cupece individual project page into a reusable narrative V2 that connects location, product, gallery, and Open Group strategy.

**Architecture:** Keep the existing page route and section-based architecture. Extend `Projeto` with optional narrative fields, add focused narrative sections under `app/_sections/EmpreendimentoPage`, and keep existing components compatible with non-V2 projects.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS v4 theme tokens, Vitest, Testing Library.

---

## File Structure

- Modify: `app/_sections/Projetos/projetos.data.ts`
  - Extend the `Projeto` type with optional narrative fields.
  - Replace provisional Hits Cupece copy with approved content.
  - Populate the V2 fields only for `hits-cupece`.
- Modify: `app/_sections/EmpreendimentoPage/EmpHero.tsx`
  - Add optional hero summary, facts, and CTA.
  - Preserve current fallback behavior for projects without V2 fields.
- Create: `app/_sections/EmpreendimentoPage/EmpLocationStory.tsx`
  - Render the strategic location narrative and highlight cards.
- Create: `app/_sections/EmpreendimentoPage/EmpProductStory.tsx`
  - Render the product-as-response narrative and compact cards.
- Modify: `app/_sections/EmpreendimentoPage/EmpGaleria.tsx`
  - Add optional narrative header before the existing grid.
  - Preserve existing Cupece images, aligned row heights, hover, and lightbox.
- Modify: `app/_sections/EmpreendimentoPage/EmpAtuacao.tsx`
  - Accept optional `Projeto`.
  - Render `strategyStory` before the existing method grid when present.
  - Keep current generic rendering when no project is passed.
- Create: `app/_sections/EmpreendimentoPage/EmpClosing.tsx`
  - Render final synthesis and CTA when `closingStatement` exists.
- Modify: `app/projetos/[slug]/page.tsx`
  - Insert V2 sections in the approved order.
  - Pass `p` into updated sections.
- Create: `app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx`
  - Test Cupece V2 content and fallback safety.
- Modify: `app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx`
  - Update expectations for new sections and `EmpAtuacao` signature.
- Modify: `app/_sections/EmpreendimentoPage/EmpGaleria.test.tsx`
  - Add coverage for optional gallery header while preserving existing lightbox tests.

---

### Task 1: Add Narrative Data Contract and Hits Cupece Content

**Files:**
- Modify: `app/_sections/Projetos/projetos.data.ts`
- Test: `app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx`

- [ ] **Step 1: Write the failing test for Cupece V2 data**

Create `app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx` with:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx
```

Expected: FAIL because `address`, `units`, `unitFeature`, `facts`, `locationStory`, `productStory`, `strategyStory`, and `closingStatement` do not exist on `Projeto`.

- [ ] **Step 3: Extend the `Projeto` type**

In `app/_sections/Projetos/projetos.data.ts`, replace the `Projeto` type with:

```ts
export type ProjetoStoryHighlight = {
  title: string;
  text: string;
};

export type ProjetoStory = {
  kicker: string;
  title: string;
  body: string[];
  highlights?: ProjetoStoryHighlight[];
};

export type ProjetoProductCard = {
  label: string;
  value: string;
  text?: string;
};

export type ProjetoProductStory = {
  kicker: string;
  title: string;
  body: string[];
  cards: ProjetoProductCard[];
};

export type ProjetoClosingStatement = {
  title: string;
  text: string;
  ctaLabel: string;
};

export type Projeto = {
  cat: ProjetoCat;
  status: string;
  name: string;
  slug: string;
  tag: string;
  tone: "t1" | "t2" | "t3";
  ctaLabel: string;
  image?: string;
  segmento: string;
  local: string;
  regiao?: string;
  modelo: string;
  localTbd?: boolean;
  intro: string[];
  gallery: GaleriaSlot[];
  address?: string;
  units?: string;
  unitFeature?: string;
  heroSummary?: string;
  facts?: string[];
  locationStory?: ProjetoStory;
  productStory?: ProjetoProductStory;
  strategyStory?: ProjetoStory;
  galleryIntro?: ProjetoStory;
  closingStatement?: ProjetoClosingStatement;
};
```

- [ ] **Step 4: Populate Hits Cupece narrative fields**

In the `hits-cupece` object, keep existing identity fields and replace the provisional `intro` plus add V2 fields:

```ts
address: "Rua Dom Joao Soares Coelho",
units: "1 e 2 dormitorios",
unitFeature: "Terraco com churrasqueira",
heroSummary:
  "Um empreendimento residencial no Cupece, em uma regiao conectada, conveniente e em valorizacao na zona sul de Sao Paulo.",
facts: ["Em obra", "1 e 2 dormitorios", "Terraco com churrasqueira", "Cupece - Sao Paulo"],
intro: [
  "O Hits Cupece nasce de uma leitura objetiva de territorio: uma regiao em ascensao, com comercio, conveniencias e conexoes urbanas que sustentam demanda real por moradia.",
  "A Open Group estruturou a oportunidade olhando antes para o lugar, depois para o produto e, por fim, para a operacao necessaria para transformar potencial em empreendimento.",
],
locationStory: {
  kicker: "A tese do lugar",
  title: "Antes da obra, existe a leitura do territorio.",
  body: [
    "Localizado na Rua Dom Joao Soares Coelho, o Hits Cupece esta inserido em uma regiao em plena ascensao e valorizacao, com comercio forte e conveniencias que simplificam a rotina.",
    "A proximidade com a Avenida Cupece amplia essa leitura. Com 5,3 km de extensao, ela conecta a Ponte do Morumbi, na Marginal Pinheiros, ao centro de Diadema, criando um eixo relevante de mobilidade na zona sul.",
    "A poucos minutos da Rodovia dos Imigrantes, o endereco tambem aproxima a cidade do litoral sul. Para a Open Group, essa combinacao de acesso, vida cotidiana e valorizacao transforma localizacao em tese de produto.",
  ],
  highlights: [
    {
      title: "Regiao em ascensao",
      text: "Um entorno com valorizacao, comercio e servicos que reforcam a consistencia da demanda.",
    },
    {
      title: "Conexoes urbanas",
      text: "Avenida Cupece, Marginal Pinheiros, Diadema e Rodovia dos Imigrantes no raio estrategico do projeto.",
    },
    {
      title: "Cotidiano conveniente",
      text: "Facilidade de acesso e conveniencias proximas para reduzir deslocamentos e dar fluidez a rotina.",
    },
  ],
},
productStory: {
  kicker: "O produto como resposta",
  title: "Tipologias pensadas para uma vida urbana mais pratica.",
  body: [
    "As unidades de 1 e 2 dormitorios respondem a um publico que busca morar bem, com eficiencia e conexao com a cidade.",
    "O terraco com churrasqueira adiciona uma camada de uso e desejo ao produto: um espaco privado para receber, respirar e ampliar a experiencia do apartamento.",
  ],
  cards: [
    {
      label: "Tipologia",
      value: "1 e 2 dormitorios",
      text: "Configuracoes alinhadas a diferentes momentos de vida e perfis de moradia.",
    },
    {
      label: "Endereco",
      value: "Rua Dom Joao Soares Coelho",
      text: "Implantacao em uma area de conveniencia e valorizacao no Cupece.",
    },
    {
      label: "Mobilidade",
      value: "Eixo Avenida Cupece",
      text: "Conexao com Marginal Pinheiros, Diadema e Rodovia dos Imigrantes.",
    },
    {
      label: "Experiencia",
      value: "Terraco com churrasqueira",
      text: "Um diferencial que transforma area privativa em lugar de encontro.",
    },
  ],
},
galleryIntro: {
  kicker: "Do conceito a experiencia",
  title: "A narrativa tambem aparece nos espacos.",
  body: [
    "A galeria apresenta ambientes que traduzem a proposta do Hits Cupece: morar com praticidade, areas de uso bem definidas e uma rotina conectada ao entorno.",
  ],
},
strategyStory: {
  kicker: "Estruturacao Open Group",
  title: "A operacao foi pensada antes da obra chegar ao canteiro.",
  body: [
    "No Hits Cupece, a Open Group atua na etapa em que o valor e construido com mais precisao: leitura da oportunidade, definicao de produto, analise de viabilidade, articulacao de parceiros e conducao ate a fase de obra.",
    "Essa inteligencia transforma uma localizacao promissora em uma operacao estruturada, com produto, mercado e execucao caminhando na mesma direcao.",
  ],
},
closingStatement: {
  title: "Cupece nao e apenas um endereco.",
  text: "E uma operacao estruturada a partir de localizacao, demanda e visao de produto.",
  ctaLabel: "Tenho interesse no empreendimento",
},
```

- [ ] **Step 5: Run data test to verify it passes**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit Task 1**

```bash
git add app/_sections/Projetos/projetos.data.ts app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx
git commit -m "feat(empreendimento): add Cupece narrative data"
```

---

### Task 2: Upgrade the Hero With Summary, Facts, and CTA

**Files:**
- Modify: `app/_sections/EmpreendimentoPage/EmpHero.tsx`
- Modify: `app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx`

- [ ] **Step 1: Add failing hero render test**

Append this test to `EmpreendimentoV2.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { EmpHero } from "./EmpHero";

it("renders the Cupece editorial hero summary, facts, and CTA", () => {
  expect(hitsCupece).toBeDefined();

  render(<EmpHero p={hitsCupece!} />);

  expect(screen.getByText(/regiao conectada, conveniente e em valorizacao/i)).toBeInTheDocument();
  expect(screen.getByText("1 e 2 dormitorios")).toBeInTheDocument();
  expect(screen.getByText("Terraco com churrasqueira")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Tenho interesse/i })).toHaveAttribute("href", "/#contato");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx
```

Expected: FAIL because `EmpHero` does not render `heroSummary`, `facts`, or CTA.

- [ ] **Step 3: Update `EmpHero` imports**

At the top of `EmpHero.tsx`, add:

```tsx
import { Button } from "@/components/ui/Button";
```

- [ ] **Step 4: Add hero summary, facts, and CTA markup**

Inside `EmpHero`, after the existing location row, add:

```tsx
          {p.heroSummary && (
            <p className="reveal reveal-4 mt-[clamp(18px,2vw,26px)] max-w-[720px] text-[clamp(16px,1.35vw,21px)] leading-[1.55] text-white/82">
              {p.heroSummary}
            </p>
          )}

          {p.facts && p.facts.length > 0 && (
            <ul className="reveal reveal-4 mt-[clamp(22px,2.4vw,34px)] flex max-w-[900px] flex-wrap gap-2.5">
              {p.facts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-full border border-white/22 bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[.12em] text-white/88 backdrop-blur-md"
                >
                  {fact}
                </li>
              ))}
            </ul>
          )}

          {p.closingStatement && (
            <div className="reveal reveal-4 mt-[clamp(24px,2.8vw,38px)]">
              <Button href="/#contato" variant="light" arrow>
                {p.closingStatement.ctaLabel}
              </Button>
            </div>
          )}
```

- [ ] **Step 5: Run hero test to verify it passes**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Run reveal test to check existing hero expectations**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx
```

Expected: PASS. If it fails because of duplicate reveal expectations, keep the existing heading classes `reveal reveal-3`.

- [ ] **Step 7: Commit Task 2**

```bash
git add app/_sections/EmpreendimentoPage/EmpHero.tsx app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx
git commit -m "feat(empreendimento): add editorial project hero"
```

---

### Task 3: Build Location and Product Narrative Sections

**Files:**
- Create: `app/_sections/EmpreendimentoPage/EmpLocationStory.tsx`
- Create: `app/_sections/EmpreendimentoPage/EmpProductStory.tsx`
- Modify: `app/projetos/[slug]/page.tsx`
- Modify: `app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx`
- Modify: `app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx`

- [ ] **Step 1: Add failing tests for new sections**

Append to `EmpreendimentoV2.test.tsx`:

```tsx
import { EmpLocationStory } from "./EmpLocationStory";
import { EmpProductStory } from "./EmpProductStory";

it("renders the Cupece location thesis section", () => {
  expect(hitsCupece).toBeDefined();

  render(<EmpLocationStory p={hitsCupece!} />);

  expect(screen.getByText("A tese do lugar")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Antes da obra, existe a leitura do territorio/i })).toHaveClass(
    "reveal",
    "reveal-2",
  );
  expect(screen.getByText(/Avenida Cupece amplia essa leitura/i)).toBeInTheDocument();
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx
```

Expected: FAIL because `EmpLocationStory` and `EmpProductStory` do not exist.

- [ ] **Step 3: Create `EmpLocationStory.tsx`**

Create `app/_sections/EmpreendimentoPage/EmpLocationStory.tsx`:

```tsx
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

export function EmpLocationStory({ p }: { p: Projeto }) {
  if (!p.locationStory) return null;

  const { locationStory } = p;

  return (
    <section className="bg-manifesto py-section text-white">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-[clamp(38px,6vw,92px)] lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Kicker tone="on-dark-green" className="reveal">
              {locationStory.kicker}
            </Kicker>
            <h2 className="reveal reveal-2 mt-5 max-w-[820px] font-news text-[clamp(34px,5vw,72px)] font-normal leading-[1.06] tracking-[-.01em]">
              {locationStory.title}
            </h2>
          </div>

          <div className="space-y-5 self-end text-[clamp(15px,1.16vw,18px)] leading-[1.75] text-white/76">
            {locationStory.body.map((paragraph, index) => (
              <p key={`${p.slug}-location-${index}`} className={cn("reveal", `reveal-info-${Math.min(index + 1, 5)}`)}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {locationStory.highlights && locationStory.highlights.length > 0 && (
          <div className="mt-[clamp(44px,5.5vw,76px)] grid grid-cols-3 gap-px bg-white/14 max-[820px]:grid-cols-1">
            {locationStory.highlights.map((highlight, index) => (
              <article
                key={highlight.title}
                className={cn(
                  "reveal reveal-step bg-manifesto p-[clamp(24px,3vw,38px)] transition-colors duration-300 hover:bg-white/[.055]",
                  `reveal-step-${Math.min(index, 5)}`,
                )}
              >
                <h3 className="text-[clamp(17px,1.35vw,21px)] font-semibold tracking-[-.01em] text-white">
                  {highlight.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.65] text-white/68">{highlight.text}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `EmpProductStory.tsx`**

Create `app/_sections/EmpreendimentoPage/EmpProductStory.tsx`:

```tsx
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

export function EmpProductStory({ p }: { p: Projeto }) {
  if (!p.productStory) return null;

  const { productStory } = p;

  return (
    <section className="bg-bg-soft py-section">
      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-[clamp(42px,6vw,100px)] lg:grid-cols-[.9fr_1.1fr]">
          <div className="lg:sticky lg:top-[110px]">
            <Kicker className="reveal">{productStory.kicker}</Kicker>
            <h2 className="reveal reveal-2 mt-5 max-w-[620px] font-sans text-[clamp(28px,3.8vw,54px)] font-semibold leading-[1.05] tracking-[-.03em]">
              {productStory.title}
            </h2>
          </div>

          <div>
            <div className="max-w-[680px] space-y-5 text-[clamp(15px,1.12vw,18px)] leading-[1.72] text-ink-2">
              {productStory.body.map((paragraph, index) => (
                <p key={`${p.slug}-product-${index}`} className={cn("reveal", `reveal-info-${Math.min(index + 1, 5)}`)}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-[clamp(34px,4vw,54px)] grid grid-cols-2 gap-px bg-[color:var(--line)] border border-[color:var(--line)] max-[680px]:grid-cols-1">
              {productStory.cards.map((card, index) => (
                <article
                  key={`${card.label}-${card.value}`}
                  className={cn(
                    "reveal reveal-step bg-bg-soft p-[clamp(22px,2.8vw,34px)] transition-colors duration-300 hover:bg-white",
                    `reveal-step-${Math.min(index, 5)}`,
                  )}
                >
                  <span className="text-[11px] font-medium uppercase tracking-[.14em] text-ink-3">{card.label}</span>
                  <h3 className="mt-3 text-[clamp(18px,1.55vw,24px)] font-semibold tracking-[-.02em] text-ink">
                    {card.value}
                  </h3>
                  {card.text && <p className="mt-4 text-[13.5px] leading-[1.6] text-ink-2">{card.text}</p>}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Insert sections in the page route**

In `app/projetos/[slug]/page.tsx`, add imports:

```tsx
import { EmpLocationStory } from "@/app/_sections/EmpreendimentoPage/EmpLocationStory";
import { EmpProductStory } from "@/app/_sections/EmpreendimentoPage/EmpProductStory";
```

Then replace:

```tsx
      <EmpInfo p={p} />
      <EmpGaleria p={p} />
```

with:

```tsx
      <EmpInfo p={p} />
      <EmpLocationStory p={p} />
      <EmpProductStory p={p} />
      <EmpGaleria p={p} />
```

- [ ] **Step 6: Update reveal tests for new section classes**

Append to `EmpreendimentoReveal.test.tsx`:

```tsx
import { EmpLocationStory } from "./EmpLocationStory";
import { EmpProductStory } from "./EmpProductStory";

it("marks narrative V2 sections for layered reveal animation", () => {
  const { container: location } = render(<EmpLocationStory p={projeto} />);
  expect(location.querySelectorAll(".reveal-step")).toHaveLength(3);
  expect(screen.getByRole("heading", { name: /leitura do territorio/i })).toHaveClass("reveal", "reveal-2");

  const { container: product } = render(<EmpProductStory p={projeto} />);
  expect(product.querySelectorAll(".reveal-step")).toHaveLength(4);
  expect(screen.getByRole("heading", { name: /Tipologias pensadas/i })).toHaveClass("reveal", "reveal-2");
});
```

- [ ] **Step 7: Run tests for Task 3**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx
```

Expected: PASS.

- [ ] **Step 8: Commit Task 3**

```bash
git add app/projetos/[slug]/page.tsx app/_sections/EmpreendimentoPage/EmpLocationStory.tsx app/_sections/EmpreendimentoPage/EmpProductStory.tsx app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx
git commit -m "feat(empreendimento): add narrative location and product sections"
```

---

### Task 4: Contextualize Gallery and Open Group Strategy

**Files:**
- Modify: `app/_sections/EmpreendimentoPage/EmpGaleria.tsx`
- Modify: `app/_sections/EmpreendimentoPage/EmpAtuacao.tsx`
- Modify: `app/projetos/[slug]/page.tsx`
- Modify: `app/_sections/EmpreendimentoPage/EmpGaleria.test.tsx`
- Modify: `app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx`
- Modify: `app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx`

- [ ] **Step 1: Add failing gallery header test**

Append to `EmpGaleria.test.tsx`:

```tsx
it("renders the Cupece gallery narrative header", () => {
  expect(hitsCupece).toBeDefined();

  render(<EmpGaleria p={hitsCupece!} />);

  expect(screen.getByText("Do conceito a experiencia")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /A narrativa tambem aparece nos espacos/i })).toHaveClass(
    "reveal",
    "reveal-2",
  );
});
```

- [ ] **Step 2: Add failing strategy intro test**

Append to `EmpreendimentoV2.test.tsx`:

```tsx
it("renders the Cupece Open Group strategy intro before the method grid", () => {
  expect(hitsCupece).toBeDefined();

  render(<EmpAtuacao p={hitsCupece!} />);

  expect(screen.getByText("Estruturacao Open Group")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /operacao foi pensada antes da obra/i })).toBeInTheDocument();
  expect(screen.getByText(/leitura da oportunidade, definicao de produto/i)).toBeInTheDocument();
});
```

Also update imports in `EmpreendimentoV2.test.tsx`:

```tsx
import { EmpAtuacao } from "./EmpAtuacao";
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpGaleria.test.tsx app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx
```

Expected: FAIL because gallery header and strategy intro do not render yet.

- [ ] **Step 4: Add gallery header to `EmpGaleria`**

Inside `EmpGaleria`, before the grid wrapper, insert:

```tsx
        {p.galleryIntro && (
          <div className="mb-[clamp(34px,4.5vw,62px)] max-w-[760px]">
            <Kicker className="reveal">{p.galleryIntro.kicker}</Kicker>
            <h2 className="reveal reveal-2 mt-5 font-sans text-[clamp(28px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-.025em]">
              {p.galleryIntro.title}
            </h2>
            {p.galleryIntro.body.map((paragraph, index) => (
              <p
                key={`${p.slug}-gallery-intro-${index}`}
                className={cn("reveal mt-5 max-w-[640px] text-[clamp(15px,1.12vw,18px)] leading-[1.7] text-ink-2", `reveal-info-${Math.min(index + 1, 5)}`)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
```

Add import:

```tsx
import { Kicker } from "@/components/ui/Kicker";
```

- [ ] **Step 5: Update `EmpAtuacao` signature and strategy intro**

Change:

```tsx
export function EmpAtuacao() {
```

to:

```tsx
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

export function EmpAtuacao({ p }: { p?: Projeto }) {
```

Inside the section, before the existing head block, render:

```tsx
        {p?.strategyStory && (
          <div className="mb-[clamp(52px,7vw,96px)] grid grid-cols-1 gap-[clamp(28px,5vw,76px)] lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <Kicker className="reveal">{p.strategyStory.kicker}</Kicker>
              <h2 className="reveal reveal-2 mt-5 max-w-[680px] font-sans text-[clamp(28px,3.6vw,52px)] font-semibold leading-[1.06] tracking-[-.03em]">
                {p.strategyStory.title}
              </h2>
            </div>
            <div className="space-y-5 self-end text-[clamp(15px,1.12vw,18px)] leading-[1.72] text-ink-2">
              {p.strategyStory.body.map((paragraph, index) => (
                <p key={`${p.slug}-strategy-${index}`} className={cn("reveal", `reveal-info-${Math.min(index + 1, 5)}`)}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
```

Keep the existing generic method head and grid after this intro.

- [ ] **Step 6: Pass project into `EmpAtuacao` route usage**

In `app/projetos/[slug]/page.tsx`, replace:

```tsx
      <EmpAtuacao />
```

with:

```tsx
      <EmpAtuacao p={p} />
```

- [ ] **Step 7: Update reveal test for optional `EmpAtuacao` prop**

In `EmpreendimentoReveal.test.tsx`, keep this line valid:

```tsx
const { container: atuacao } = render(<EmpAtuacao />);
```

Append an assertion for strategy intro:

```tsx
const { container: atuacaoV2 } = render(<EmpAtuacao p={projeto} />);
expect(atuacaoV2.querySelectorAll(".reveal-step")).toHaveLength(8);
expect(screen.getByRole("heading", { name: /operacao foi pensada antes da obra/i })).toHaveClass("reveal", "reveal-2");
```

- [ ] **Step 8: Run Task 4 tests**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpGaleria.test.tsx app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Commit Task 4**

```bash
git add app/projetos/[slug]/page.tsx app/_sections/EmpreendimentoPage/EmpGaleria.tsx app/_sections/EmpreendimentoPage/EmpAtuacao.tsx app/_sections/EmpreendimentoPage/EmpGaleria.test.tsx app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx
git commit -m "feat(empreendimento): connect gallery and strategy narrative"
```

---

### Task 5: Add Closing Synthesis and Final Page Order

**Files:**
- Create: `app/_sections/EmpreendimentoPage/EmpClosing.tsx`
- Modify: `app/projetos/[slug]/page.tsx`
- Modify: `app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx`
- Modify: `app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx`

- [ ] **Step 1: Add failing closing section test**

Append to `EmpreendimentoV2.test.tsx`:

```tsx
import { EmpClosing } from "./EmpClosing";

it("renders the Cupece closing synthesis and CTA", () => {
  expect(hitsCupece).toBeDefined();

  render(<EmpClosing p={hitsCupece!} />);

  expect(screen.getByRole("heading", { name: /Cupece nao e apenas um endereco/i })).toHaveClass("reveal");
  expect(screen.getByText(/localizacao, demanda e visao de produto/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Tenho interesse no empreendimento/i })).toHaveAttribute("href", "/#contato");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx
```

Expected: FAIL because `EmpClosing` does not exist.

- [ ] **Step 3: Create `EmpClosing.tsx`**

Create `app/_sections/EmpreendimentoPage/EmpClosing.tsx`:

```tsx
import { Button } from "@/components/ui/Button";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

export function EmpClosing({ p }: { p: Projeto }) {
  if (!p.closingStatement) return null;

  return (
    <section className="bg-dark py-[clamp(72px,9vw,128px)] text-white">
      <div className="wrap">
        <div className="grid grid-cols-1 items-end gap-[clamp(30px,5vw,80px)] lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="reveal max-w-[860px] font-news text-[clamp(36px,5.4vw,78px)] font-normal leading-[1.04] tracking-[-.01em]">
              {p.closingStatement.title}
            </h2>
            <p className="reveal reveal-2 mt-6 max-w-[680px] text-[clamp(16px,1.35vw,21px)] leading-[1.62] text-white/72">
              {p.closingStatement.text}
            </p>
          </div>
          <div className="reveal reveal-3 flex lg:justify-end">
            <Button href="/#contato" variant="light" arrow>
              {p.closingStatement.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Insert closing section before related projects**

In `app/projetos/[slug]/page.tsx`, add:

```tsx
import { EmpClosing } from "@/app/_sections/EmpreendimentoPage/EmpClosing";
```

Then place:

```tsx
      <EmpClosing p={p} />
```

between:

```tsx
      <EmpAtuacao p={p} />
      <EmpProximos others={others} />
```

- [ ] **Step 5: Add reveal coverage for closing**

Append to `EmpreendimentoReveal.test.tsx`:

```tsx
import { EmpClosing } from "./EmpClosing";

it("marks the closing synthesis for reveal animation", () => {
  render(<EmpClosing p={projeto} />);

  expect(screen.getByRole("heading", { name: /Cupece nao e apenas um endereco/i })).toHaveClass("reveal");
  expect(screen.getByRole("link", { name: /Tenho interesse no empreendimento/i }).closest("div")).toHaveClass(
    "reveal",
    "reveal-3",
  );
});
```

- [ ] **Step 6: Run Task 5 tests**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit Task 5**

```bash
git add app/projetos/[slug]/page.tsx app/_sections/EmpreendimentoPage/EmpClosing.tsx app/_sections/EmpreendimentoPage/EmpreendimentoV2.test.tsx app/_sections/EmpreendimentoPage/EmpreendimentoReveal.test.tsx
git commit -m "feat(empreendimento): add narrative closing section"
```

---

### Task 6: Final Verification and Polish

**Files:**
- Modify only files touched in Tasks 1-5 if verification reveals issues.

- [ ] **Step 1: Run focused empreendimento tests**

Run:

```bash
npm test -- app/_sections/EmpreendimentoPage
```

Expected: PASS for all empreendimento tests.

- [ ] **Step 2: Run full test suite**

Run:

```bash
npm test
```

Expected: PASS for all tests.

- [ ] **Step 3: Run TypeScript**

Run:

```bash
npx tsc --noEmit
```

Expected: no output and exit code 0.

- [ ] **Step 4: Run lint**

Run:

```bash
npm run lint
```

Expected: no ESLint warnings or errors. The existing `next lint` deprecation warning is acceptable.

- [ ] **Step 5: Run production build**

Run:

```bash
npm run build
```

Expected: production build compiles successfully and prerenders `/projetos/hits-cupece`.

- [ ] **Step 6: Inspect git diff**

Run:

```bash
git status --short
git diff --stat
```

Expected: only intended files from this plan are modified.

- [ ] **Step 7: Commit final verification fixes if any were needed**

If Step 1-6 required code changes, commit them:

```bash
git add app/_sections/EmpreendimentoPage app/_sections/Projetos/projetos.data.ts app/projetos/[slug]/page.tsx
git commit -m "fix(empreendimento): polish narrative v2 page"
```

If no changes were needed after Task 5, do not create an empty commit.

---

## Self-Review

- Spec coverage: Task 1 implements the data model and Cupece content. Task 2 implements the editorial hero. Task 3 implements the location and product narrative. Task 4 contextualizes gallery and Open Group strategy. Task 5 implements the closing synthesis. Task 6 verifies tests, typecheck, lint, and build.
- Scope check: This plan applies V2 only to Hits Cupece while preserving fallback behavior for the other projects.
- Type consistency: The plan uses one consistent field set on `Projeto`: `address`, `units`, `unitFeature`, `heroSummary`, `facts`, `locationStory`, `productStory`, `galleryIntro`, `strategyStory`, and `closingStatement`.
- Motion coverage: New sections use existing `reveal`, `reveal-2`, `reveal-info-*`, and `reveal-step-*` classes. No new background experiment is introduced.
