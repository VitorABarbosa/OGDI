# Projetos + Empreendimento — Plano de Implementação (leve)

> **Para executores:** porte visual 1:1 a partir da referência. Steps usam checkbox (`- [ ]`) para tracking. Plano enxuto por decisão do usuário — detalhe concentrado em modelo de dados, lógica de filtro e ordem de commits; o "como pixel" vive na referência, não aqui.

**Goal:** Criar a página de listagem `/projetos` (bento grid) e a página individual `/projetos/[slug]` (empreendimento), 1:1 com a referência, integradas à arquitetura Next existente.

**Architecture:** Páginas estáticas (App Router + `generateStaticParams`) alimentadas por `projetos.data.ts` expandido. Seções em `app/_sections/`, estilo Tailwind inline + tokens `theme.css`, reuso dos componentes UI existentes. Sem novas libs.

**Tech Stack:** Next.js 15.5 (App Router), React 19, TypeScript, Tailwind v4.

**Referência 1:1:** `REFERENCE - CLAUDE DESIGN/OGDI - REFERENCE/` → `Projetos.html`, `Empreendimento.html`, `pages.css` (**usar só a variante v1 `.cases`**; ignorar v2 catálogo-sidebar e v3 índice editorial do `pages.css`).

---

## Decisões travadas (do alinhamento 2026-06-09)

- **6 projetos atuais**, sem Immensità e **sem** categoria "Investimento".
- Abas da listagem: **Todos · Em obra (3) · Futuro (2) · Entregue (1)**.
- Conteúdo das páginas individuais = **estrutura + placeholders editoriais**; usuário envia a cópia real depois.
- Cards de Projetos na **home passam a linkar para `/projetos/[slug]`** (substituir `/#contato`).
- Estilo = **Tailwind inline + tokens `theme.css`**, reusar `Kicker/SectionHeading/Button/Icon/MediaPlaceholder/TextLink`. **Não** portar `pages.css` cru.

---

## Mapa de arquivos

**Criar:**
- `app/_sections/ProjetosPage/ProjetosHero.tsx` — `.ihero` (breadcrumb + título + contador "06")
- `app/_sections/ProjetosPage/ProjetosFiltros.tsx` — barra sticky de filtros (client)
- `app/_sections/ProjetosPage/CaseGrid.tsx` — grid bento 12-col + estado de filtro (client)
- `app/_sections/ProjetosPage/CaseCard.tsx` — card compartilhado (listagem + "outros empreendimentos")
- `app/_sections/EmpreendimentoPage/EmpHero.tsx` — `.ehero` full-bleed
- `app/_sections/EmpreendimentoPage/EmpInfo.tsx` — `.einfo` (meta sticky + descrição)
- `app/_sections/EmpreendimentoPage/EmpGaleria.tsx` — `.gallery` mosaico 6 células
- `app/_sections/EmpreendimentoPage/EmpAtuacao.tsx` — `.eactua` (8 steps)
- `app/_sections/EmpreendimentoPage/EmpProximos.tsx` — `.enext` (3 cards via CaseCard)
- `components/ui/CtaBand.tsx` — faixa `.ecta` (reusada nas duas páginas)
- `app/_sections/ProjetosPage/projetosPage.data.ts` — dados da listagem (abas com contagem + helper)
- `data/empreendimento.ts` — steps "como estruturamos" + breadcrumb helpers (conteúdo compartilhável)

**Modificar:**
- `app/_sections/Projetos/projetos.data.ts` — expandir `Projeto` (+ `slug`, `segmento`, `local`, `regiao`, `modelo`, `gallery`, `intro`) e ajustar `href` → `/projetos/${slug}`
- `app/projetos/page.tsx` — trocar `PagePlaceholder` pela composição real
- `app/projetos/[slug]/page.tsx` — `generateStaticParams` + `generateMetadata` + composição real (404 em slug inválido)
- `app/_sections/Projetos/ProjetoCard.tsx` — `href` do botão usa `p.href` (já usa; confirmar que aponta ao slug)

---

## Task 1 — Fundação de dados

**Files:** Modify `app/_sections/Projetos/projetos.data.ts`; Create `data/empreendimento.ts`.

- [ ] **Step 1:** Expandir o tipo `Projeto` com os campos que alimentam a página individual. Manter os 6 projetos; preencher campos reais quando óbvios (nome, status, cat, local SP) e marcar o resto como placeholder editorial.

```ts
export type ProjetoCat = "obra" | "futuro" | "entregue";

export type GaleriaSlot = { id: string; alt: string }; // sem imagem ainda → MediaPlaceholder

export type Projeto = {
  cat: ProjetoCat;
  status: string;        // "Em obra" | "Futuro lançamento" | "Entregue"
  name: string;
  slug: string;          // único — base do /projetos/[slug] e do generateStaticParams
  tag: string;           // frase curta (já existe)
  tone: "t1" | "t2" | "t3";
  ctaLabel: string;
  href: string;          // = `/projetos/${slug}`
  image?: string;
  // página individual:
  segmento: string;      // "Residencial"
  local: string;         // "São Paulo · SP"  (ou marcar tbd)
  regiao?: string;       // "Cupecê"
  modelo: string;        // "Parceria estratégica" etc.
  localTbd?: boolean;    // true → render itálico "a confirmar"
  intro: string[];       // parágrafos da descrição (PLACEHOLDER editorial p/ todos menos os que o usuário enviar)
  gallery: GaleriaSlot[]; // 6 slots
};
```

- [ ] **Step 2:** Atualizar cada um dos 6 objetos com `slug` (kebab-case do nome), `href: \`/projetos/${slug}\``, e os novos campos. Para `intro`, usar 2-3 parágrafos genéricos no tom da marca (ver `[[ogdi-tom-marca]]`) marcados claramente como provisórios. Galeria = 6 slots com `alt` descritivo.
- [ ] **Step 3:** Criar `data/empreendimento.ts` com os 8 `atuacaoSteps` da referência (`Empreendimento.html` linhas 116-123: 01 Leitura da oportunidade … ↗ Em obra) como array `{ n, title, desc }`, reutilizável por qualquer projeto.
- [ ] **Step 4:** Gate parcial — `npx tsc --noEmit`. Esperado: sem erros.
- [ ] **Step 5:** Commit — `feat(projetos): expand data model for projetos + empreendimento pages`.

---

## Task 2 — Card compartilhado + faixa CTA

**Files:** Create `app/_sections/ProjetosPage/CaseCard.tsx`, `components/ui/CtaBand.tsx`.

- [ ] **Step 1:** `CaseCard` — porte do `.case` (`pages.css` 75-118 + `Projetos.html` 91-101): `<Link href={p.href}>`, `MediaPlaceholder` (usa `p.image`/`p.tone`), scrim no hover, `case-chip` colorido por `cat` (obra=verde #8fd06a, futuro=#79c7d4, entregue=#e7e2d6), botão circular `case-go` com seta surgindo no hover. Props: `{ p: Projeto; span?: "6"|"4"|"8"; shape?: "tall"|"wide" }`.
- [ ] **Step 2:** `CtaBand` — porte do `.ecta` (`pages.css` 215-220): faixa escura, `h2` + `p` + `Button variant="light" arrow`. Props: `{ title; text; ctaLabel; href }`.
- [ ] **Step 3:** Gate — `npx tsc --noEmit`. Commit — `feat(projetos): add shared CaseCard and CtaBand`.

---

## Task 3 — Página `/projetos` (listagem)

**Files:** Create `ProjetosHero.tsx`, `ProjetosFiltros.tsx`, `CaseGrid.tsx`, `projetosPage.data.ts`; Modify `app/projetos/page.tsx`.

- [ ] **Step 1:** `projetosPage.data.ts` — abas com contagem derivada de `projetos` (`all` + 3 cats); mapa de spans bento por projeto (ex.: Oh Freguesia = `span-4 tall`, Hits Santa Catarina = `span-8 wide`) replicando o layout da referência.
- [ ] **Step 2:** `ProjetosHero` (server) — `.ihero`: breadcrumb (`Início › Projetos`), `Kicker`, `h1` "Empreendimentos / estruturados na origem.", contador `06`. Sub-parágrafo.
- [ ] **Step 3:** `CaseGrid` (client) — estado `cat`, grid 12-col, aplica spans, filtra por `data-cat`. Inclui os filtros (sticky) ou recebe `cat`/`setCat` de `ProjetosFiltros`. Lógica de filtro é a única parte testável.
- [ ] **Step 4 (TDD):** Teste `CaseGrid.test.tsx` — render com 6 projetos, clicar aba "Em obra" mostra 3 cards; "Todos" mostra 6. Rodar `npx vitest run` → primeiro FAIL, depois PASS.
- [ ] **Step 5:** Recompor `app/projetos/page.tsx`: `<ProjetosHero/> <CaseGrid/> <CtaBand title="Tem uma área ou projeto com potencial?" .../>`. Manter `export const metadata`.
- [ ] **Step 6:** Gates — `tsc`, `next lint`, `vitest`. Commit — `feat(projetos): build /projetos listing page`.

---

## Task 4 — Página `/projetos/[slug]` (empreendimento)

**Files:** Create `EmpHero.tsx`, `EmpInfo.tsx`, `EmpGaleria.tsx`, `EmpAtuacao.tsx`, `EmpProximos.tsx`; Modify `app/projetos/[slug]/page.tsx`.

- [ ] **Step 1:** `app/projetos/[slug]/page.tsx`:
  - `generateStaticParams()` → `projetos.map(p => ({ slug: p.slug }))`
  - `page({ params })` faz `await params`, acha o projeto, `notFound()` se não existir
  - `generateMetadata` → título `${name}` (template já adiciona `· Open Group`)
- [ ] **Step 2:** `EmpHero` — `.ehero` full-bleed: `MediaPlaceholder` fundo + scrim, breadcrumb (`Início › Projetos › Nome`), `ehero-status`, `h1` serif grande, `ehero-loc`.
- [ ] **Step 3:** `EmpInfo` — `.einfo`: aside meta **sticky** (`emeta-row` k/v: Status, Segmento, Localização, Região, Atuação, Modelo, Tipologia=tbd) + `Button` "Tenho interesse"; corpo com `Kicker`, `h2`, parágrafos `p.intro` (`.em` destaca termos).
- [ ] **Step 4:** `EmpGaleria` — `.gallery`: mosaico 12-col com 6 `gal-cell` nas proporções da referência (`gal-a` span-8 16/10, `gal-b..e` span-4 4/5, `gal-f` span-12 21/9), cada uma `MediaPlaceholder`.
- [ ] **Step 5:** `EmpAtuacao` — `.eactua`: faixa `bg-soft`, head + grid de 8 steps (de `data/empreendimento.ts`), hover→branco.
- [ ] **Step 6:** `EmpProximos` — `.enext`: head + `TextLink` "Ver todos" + 3 `CaseCard` (os 3 outros projetos, excluindo o atual).
- [ ] **Step 7:** Compor a página: Hero, Info, Galeria, Atuacao, Proximos, `CtaBand title="Interesse no ${name}?"`.
- [ ] **Step 8:** Gates — `tsc`, `next lint`, `next build` (confirmar rotas estáticas dos 6 slugs). Commit — `feat(projetos): build /projetos/[slug] empreendimento page`.

---

## Task 5 — Religar a home

**Files:** Modify `app/_sections/Projetos/projetos.data.ts` (já feito na Task 1) e confirmar `ProjetoCard.tsx`.

- [ ] **Step 1:** Confirmar que os cards do carrossel da home usam `p.href` (= `/projetos/${slug}`) — `ProjetoCard.tsx:17` já passa `href={p.href}`. Como o `href` mudou na Task 1, isso religa automaticamente. Verificar também o botão "Ver todos os projetos" → `/projetos` (já correto).
- [ ] **Step 2:** Gate — `next build`. Commit (se houve ajuste) — `feat(home): point projeto cards to detail pages`.

---

## Gates finais (antes de fechar)

- [ ] `npx tsc --noEmit` — sem erros
- [ ] `npx next lint` — limpo
- [ ] `npx vitest run` — todos verdes (incl. novo `CaseGrid.test.tsx`)
- [ ] `npx next build` — build ok, 6 rotas `/projetos/[slug]` pré-renderizadas
- [ ] **QA visual** lado a lado com a referência (`Projetos.html` / `Empreendimento.html`) — pendente review do usuário
- [ ] Conferir guias em `node_modules/next/dist/docs/` para qualquer API usada (`generateStaticParams`, `generateMetadata`, `notFound`) — mandato do `AGENTS.md`

---

## Fora de escopo (não fazer agora)

- Cópia real dos empreendimentos (usuário envia depois) — usar placeholders.
- Imagens de galeria/hero dos projetos sem foto — `MediaPlaceholder`.
- Categoria "Investimento" / projeto Immensità.
- Backend do form, exclusão da pasta de referência.
