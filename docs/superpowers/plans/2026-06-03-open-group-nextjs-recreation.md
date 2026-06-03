# Open Group — Recriação 1:1 em Next.js — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recriar a Home da Open Group 1:1 a partir do HTML de referência, em Next.js 15 + TypeScript + Tailwind v4, totalmente modularizada (página→pasta, seção→pasta, dados por seção), com rotas placeholder e SEO — **sem movimento decorativo** (fase posterior, sob direção do usuário).

**Architecture:** App Router. A Home (`app/page.tsx`) compõe 7 seções de `app/_sections/*`, cada uma autossuficiente e renderizada por dados (`*.data.ts`). Componentes compartilhados em `components/ui` e `components/layout`. Comportamento funcional (carrossel, abas, menu, form) em hooks testados; estilo via Tailwind v4 (`@theme`) com CSS Modules só para mecânicas bespoke.

**Tech Stack:** Next.js 15 · React 19 · TypeScript · Tailwind v4 (`@tailwindcss/postcss`) · Vitest + Testing Library (lógica) · ESLint · `next/font`. (Lenis e hooks de movimento ficam para a fase de animação.)

---

## Fonte de verdade (referência a portar)

Caminho: `REFERENCE - CLAUDE DESIGN/OGDI/`
- `Open Group - Home.html` — estrutura + comportamento (688 linhas)
- `styles.css` — sistema visual (598 linhas)
- `assets/og-logo.png`, `assets/og-logo-light.png` — logos

**Regra de porte:** ao construir cada componente, traduzir as linhas indicadas do HTML/CSS para JSX + utilitários Tailwind usando os tokens `@theme`. **Os valores devem bater exatamente com a referência** (cores, clamps, gaps, easings). Quando o utilitário não couber, usar o `.module.css` co-localizado com o valor literal da referência.

## Filosofia de teste (adaptação consciente do TDD ao front)

- **TDD de unidade (Vitest):** apenas onde há lógica — `useCarousel` (wrap de índice, autoplay, drag threshold), filtro de abas de Projetos, estado de sucesso do form, `cn()`. Test-first nesses.
- **Verificação de apresentação:** `npx tsc --noEmit` + `npm run lint` + `npm run build` + **checagem visual** (`npm run dev`, comparar com a referência aberta no navegador). Sem teste de unidade para markup/estilo puro.
- **Gate por tarefa:** nenhuma tarefa "fecha" sem o comando de verificação indicado passando.

## Convenção de commits

Conventional commits (`feat:`, `chore:`, `style:`, `test:`). Commit frequente (1 por tarefa, às vezes por step).

---

## Fase 0 — Fundação

### Task 0.1: Inicializar repositório + scaffold Next.js

**Files:**
- Create: raiz do projeto (todos os arquivos do scaffold)

- [ ] **Step 1: Inicializar git na raiz**

Run (na raiz `OPEN GROUP ... ( OGDI )`):
```bash
git init
printf "node_modules/\n.next/\nout/\n.env*\n.DS_Store\n*.tsbuildinfo\nnext-env.d.ts\n" > .gitignore
```

- [ ] **Step 2: Scaffold Next.js (TypeScript, App Router, sem src dir, alias @/*)**

> Confirmar a flag de Tailwind do wizard: criamos Tailwind **manualmente** na Task 0.2 para fixar v4. Responder "No" para Tailwind se perguntado, ou usar as flags abaixo.
```bash
npx create-next-app@latest . --ts --eslint --app --no-src-dir --import-alias "@/*" --no-tailwind --use-npm
```
Expected: scaffold criado na raiz; `app/`, `package.json`, `tsconfig.json` presentes.

- [ ] **Step 3: Verificar dev server**

Run: `npm run dev` → abrir `http://localhost:3000` → ver a página default do Next. Encerrar.
Expected: servidor sobe sem erro.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 (TS, App Router, alias @/*)"
```

---

### Task 0.2: Tailwind v4 + tokens `@theme`

**Files:**
- Create: `postcss.config.mjs`
- Create: `styles/theme.css`
- Create: `styles/base.css`
- Modify: `app/globals.css`
- Modify: `package.json` (deps)

- [ ] **Step 1: Instalar Tailwind v4**

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

- [ ] **Step 2: `postcss.config.mjs`**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

- [ ] **Step 3: `styles/theme.css` — tokens da referência (styles.css:6-37)**

```css
@theme {
  /* cores */
  --color-white: #FFFFFF;
  --color-paper: #FFFFFF;
  --color-bg-soft: #F7F6F4;
  --color-bg-soft-2: #F2F1ED;
  --color-ink: #171A1B;
  --color-ink-2: #565D5E;
  --color-ink-3: #8B9192;
  --color-teal: #1F5A63;
  --color-teal-deep: #143E45;
  --color-green: #5FA83C;
  --color-green-deep: #2C5E22;
  --color-dark: #121617;
  --color-dark-2: #171C1D;
  --color-on-dark: #F2F1ED;
  --color-on-dark-2: #9AA3A4;
  --color-manifesto: #062B3C;
  --color-manifesto-em: #57B13A;

  /* linhas (rgba — usar via var() onde precisar de borda) */
  --line: rgba(23,26,27,0.12);
  --line-2: rgba(23,26,27,0.22);
  --line-dark: rgba(242,241,237,0.14);

  /* tipografia */
  --font-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --font-sans: 'Instrument Sans', system-ui, -apple-system, sans-serif;
  --font-news: 'Newsreader', Georgia, serif;

  /* easings */
  --ease-brand: cubic-bezier(.22,.61,.36,1);
  --ease-brand-2: cubic-bezier(.16,1,.3,1);

  /* ritmo */
  --spacing-pad-x: clamp(20px, 5vw, 88px);
  --spacing-section: clamp(80px, 11vw, 168px);
}
```

- [ ] **Step 4: `styles/base.css` — resets (styles.css:39-54)**

```css
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
html { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; scroll-behavior: smooth; }
body {
  font-family: var(--font-sans);
  background: var(--color-white);
  color: var(--color-ink);
  font-size: 16px; line-height: 1.6;
  overflow-x: hidden;
}
img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; border: none; background: none; color: inherit; }
input, textarea, select { font: inherit; color: inherit; }
::selection { background: var(--color-teal); color: #fff; }
.wrap { width: 100%; max-width: 1440px; margin: 0 auto; padding: 0 var(--spacing-pad-x); }
```

- [ ] **Step 5: `app/globals.css` — montar a ordem de import**

```css
@import "tailwindcss";
@import "../styles/theme.css";
@import "../styles/base.css";
```

- [ ] **Step 6: Verificar utilitário renderiza**

Em `app/page.tsx` (temporário), trocar conteúdo por `<main className="bg-teal text-paper p-pad-x">teste</main>`. `npm run dev` → ver fundo teal e padding responsivo. Reverter o teste.
Expected: utilitário `bg-teal` aplica `#1F5A63`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: Tailwind v4 + design tokens (@theme) da referência"
```

---

### Task 0.3: Fontes via `next/font`

**Files:**
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx`
- Modify: `styles/theme.css` (já tem as font vars — garantir que casam com next/font)

- [ ] **Step 1: `lib/fonts.ts`**

```ts
import { Cormorant_Garamond, Instrument_Sans, Newsreader } from "next/font/google";

export const serif = Cormorant_Garamond({
  subsets: ["latin"], weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"], variable: "--font-serif", display: "swap",
});
export const sans = Instrument_Sans({
  subsets: ["latin"], weight: ["400", "500", "600"],
  variable: "--font-sans", display: "swap",
});
export const news = Newsreader({
  subsets: ["latin"], weight: ["400", "500"],
  style: ["normal", "italic"], variable: "--font-news", display: "swap",
});
```

- [ ] **Step 2: `app/layout.tsx` — aplicar variáveis das fontes**

```tsx
import type { Metadata } from "next";
import { serif, sans, news } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Group — Desenvolvimento Imobiliário",
  description: "Estruturação e desenvolvimento de empreendimentos imobiliários. O valor nasce antes da obra.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable} ${news.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Ajustar `styles/theme.css`** — as font vars do `@theme` devem referenciar as variáveis do next/font:

Trocar no theme.css:
```css
  --font-serif: var(--font-serif), Georgia, 'Times New Roman', serif;
  --font-sans: var(--font-sans), system-ui, -apple-system, sans-serif;
  --font-news: var(--font-news), Georgia, serif;
```
> Nota de execução: o next/font define `--font-serif` etc. no `<html>`. Como o nome colide com o token `@theme`, renomear os tokens para `--font-display`/`--font-body`/`--font-manifesto` OU dar nomes distintos às variáveis do next/font (`variable: "--ff-serif"`) e referenciá-las. **Escolha:** usar `--ff-serif/--ff-sans/--ff-news` no next/font e no `@theme` fazer `--font-serif: var(--ff-serif), Georgia, serif;`. Aplicar essa correção consistente aqui.

- [ ] **Step 4: Verificar**

Run: `npx tsc --noEmit` → PASS. `npm run dev` → texto em Instrument Sans.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: fontes via next/font (Cormorant, Instrument Sans, Newsreader)"
```

---

### Task 0.4: Estrutura de pastas + assets + utilitários

**Files:**
- Create: `components/ui/`, `components/layout/`, `hooks/`, `lib/`, `data/`, `app/_sections/`, `public/assets/logos/`
- Create: `lib/cn.ts`
- Test: `lib/cn.test.ts`
- Copy: logos da referência

- [ ] **Step 1: Copiar logos**

```bash
mkdir -p public/assets/logos public/assets/projetos public/assets/clientes
cp "REFERENCE - CLAUDE DESIGN/OGDI/assets/og-logo.png" public/assets/logos/og-logo.png
cp "REFERENCE - CLAUDE DESIGN/OGDI/assets/og-logo-light.png" public/assets/logos/og-logo-light.png
```

- [ ] **Step 2: Instalar deps de teste + util**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
npm install clsx
```

- [ ] **Step 3: `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true, setupFiles: ["./vitest.setup.ts"] },
  resolve: { alias: { "@": resolve(__dirname, ".") } },
});
```
Create `vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```
Add script to `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4 (TDD): `lib/cn.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("junta classes verdadeiras e ignora falsas", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
  it("mescla condicionais", () => {
    expect(cn("base", { active: true, off: false })).toBe("base active");
  });
});
```

- [ ] **Step 5: Rodar — deve falhar**

Run: `npx vitest run lib/cn.test.ts`
Expected: FAIL (cn não existe).

- [ ] **Step 6: `lib/cn.ts`**

```ts
import clsx, { type ClassValue } from "clsx";
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

- [ ] **Step 7: Rodar — deve passar**

Run: `npx vitest run lib/cn.test.ts`
Expected: PASS (2 testes).

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: estrutura de pastas, assets de logo, cn() + Vitest"
```

---

## Fase 1 — Componentes UI compartilhados (design system)

> Origem: `styles.css` linhas indicadas. Renderizam children/props; verificação por tsc + visual.

### Task 1.1: `Button`

**Files:**
- Create: `components/ui/Button.tsx`

Origem: `.btn`, `.btn-light`, `.btn-solid`, `.btn-sm`, `.ar` (styles.css:80-98).

- [ ] **Step 1: Implementar**

```tsx
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "default" | "light" | "solid";
type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  sm?: boolean;
  arrow?: boolean;
  type?: "button" | "submit";
  className?: string;
};

const base =
  "inline-flex items-center gap-3 font-sans text-[12px] tracking-[.14em] uppercase font-medium " +
  "border transition-[background-color,color,border-color] duration-[400ms] ease-brand";
const variants: Record<Variant, string> = {
  default: "border-ink text-ink hover:bg-ink hover:text-white",
  light: "border-white/50 text-white hover:bg-white hover:text-ink hover:border-white",
  solid: "bg-ink text-white border-ink hover:bg-teal hover:border-teal",
};

export function Button({ children, href, variant = "default", sm, arrow, type = "button", className }: Props) {
  const cls = cn(base, variants[variant], sm ? "px-[22px] py-[13px] text-[11px]" : "px-[30px] py-4", className);
  const inner = (
    <>
      {children}
      {arrow && <span className="transition-transform duration-[400ms] ease-brand group-hover:translate-x-1">→</span>}
    </>
  );
  if (href) return <Link href={href} className={cn("group", cls)}>{inner}</Link>;
  return <button type={type} className={cn("group", cls)}>{inner}</button>;
}
```

- [ ] **Step 2: Verificar** — `npx tsc --noEmit` → PASS.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat(ui): Button"`

---

### Task 1.2: `Kicker`

**Files:** Create: `components/ui/Kicker.tsx`
Origem: `.kicker` + `.dot` + `.kicker.on-dark-green` (styles.css:59-65, 394-395).

- [ ] **Step 1: Implementar**

```tsx
import { cn } from "@/lib/cn";

export function Kicker({ children, tone = "default", className }:
  { children: React.ReactNode; tone?: "default" | "on-dark-green"; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-[10px] font-sans text-[11px] tracking-[.22em] uppercase font-medium",
      tone === "default" ? "text-ink-3" : "text-white/60",
      className,
    )}>
      <span className="w-[5px] h-[5px] rounded-full bg-green" />
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Verificar** — `npx tsc --noEmit` → PASS.
- [ ] **Step 3: Commit** — `git commit -am "feat(ui): Kicker"`

---

### Task 1.3: `SectionHeading` + `TextLink`

**Files:** Create: `components/ui/SectionHeading.tsx`, `components/ui/TextLink.tsx`
Origem: `.h-display`/`.h-1..3` (styles.css:71-74); `.tlink` (styles.css:100-108).

- [ ] **Step 1: `SectionHeading.tsx`**

```tsx
import { cn } from "@/lib/cn";

const sizes = {
  1: "text-[clamp(30px,4vw,56px)]",
  2: "text-[clamp(26px,3vw,42px)]",
  3: "text-[clamp(22px,2.2vw,30px)]",
} as const;

export function SectionHeading({ level = 2, as: Tag = "h2", children, className }:
  { level?: 1 | 2 | 3; as?: "h1" | "h2" | "h3"; children: React.ReactNode; className?: string }) {
  return (
    <Tag className={cn("font-sans font-semibold leading-[1.08] tracking-[-.025em] m-0", sizes[level], className)}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: `TextLink.tsx`**

```tsx
import Link from "next/link";
import { cn } from "@/lib/cn";

export function TextLink({ href, children, className }:
  { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(
      "inline-flex items-center gap-[10px] text-[12px] tracking-[.14em] uppercase font-medium text-ink",
      "pb-1 border-b border-ink transition-[gap,color,border-color] duration-300 ease-brand",
      "hover:gap-4 hover:text-teal hover:border-teal", className,
    )}>{children}</Link>
  );
}
```

- [ ] **Step 3: Verificar** — `npx tsc --noEmit` → PASS.
- [ ] **Step 4: Commit** — `git commit -am "feat(ui): SectionHeading + TextLink"`

---

### Task 1.4: `Icon`

**Files:** Create: `components/ui/Icon.tsx`
Origem: SVGs inline do HTML (chevrons hero/proj linhas 110-111, 207-208; social 420-421; check 364).

- [ ] **Step 1: Implementar** — um componente com `name` discriminado, copiando os `path`/`viewBox` exatos do HTML.

```tsx
type IconName = "chevron-left" | "chevron-right" | "linkedin" | "instagram" | "check";

export function Icon({ name, className }: { name: IconName; className?: string }) {
  switch (name) {
    case "chevron-left":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={className}><path d="M15 5l-7 7 7 7" /></svg>;
    case "chevron-right":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className={className}><path d="M9 5l7 7-7 7" /></svg>;
    case "linkedin":
      return <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.83v2.18h.06c.53-1 1.84-2.18 3.78-2.18 4.04 0 4.79 2.66 4.79 6.12V24h-4v-7.06c0-1.68-.03-3.85-2.35-3.85-2.35 0-2.71 1.83-2.71 3.72V24h-4V8z" /></svg>;
    case "instagram":
      return <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}><rect x={3} y={3} width={18} height={18} rx={5} /><circle cx={12} cy={12} r={4} /><circle cx={17.5} cy={6.5} r={1} fill="currentColor" /></svg>;
    case "check":
      return <svg width={34} height={34} viewBox="0 0 36 36" fill="none" stroke="#5FA83C" strokeWidth={2} className={className}><circle cx={18} cy={18} r={16} /><path d="M11 18 L16 23 L25 13" /></svg>;
  }
}
```

- [ ] **Step 2: Verificar** — `npx tsc --noEmit` → PASS.
- [ ] **Step 3: Commit** — `git commit -am "feat(ui): Icon set"`

---

### Task 1.5: `MediaPlaceholder` (substitui `.ph` e `image-slot`)

**Files:** Create: `components/ui/MediaPlaceholder.tsx`
Origem: `.ph`, `.ph.t2`, `.ph.t3` (styles.css:266-280).

- [ ] **Step 1: Implementar** — placeholder gradiente por `tone`; aceita `src` futuro → `next/image`.

```tsx
import Image from "next/image";
import { cn } from "@/lib/cn";

type Tone = "t1" | "t2" | "t3";
const tones: Record<Tone, string> = {
  t1: "[background:radial-gradient(130%_100%_at_72%_8%,rgba(95,168,60,.10),transparent_52%),linear-gradient(180deg,#1d3940_0%,#122327_60%,#0c1719_100%)]",
  t2: "[background:radial-gradient(120%_100%_at_30%_6%,rgba(31,90,99,.5),transparent_55%),linear-gradient(180deg,#16303a_0%,#0e1f24_100%)]",
  t3: "[background:radial-gradient(120%_100%_at_50%_0%,rgba(242,241,237,.07),transparent_55%),linear-gradient(180deg,#101d20_0%,#0b1416_100%)]",
};

export function MediaPlaceholder({ tone = "t1", src, alt = "", className }:
  { tone?: Tone; src?: string; alt?: string; className?: string }) {
  if (src) {
    return <Image src={src} alt={alt} fill className={cn("object-cover", className)} />;
  }
  return <div aria-hidden className={cn("absolute inset-0 flex items-end", tones[tone], className)} />;
}
```

- [ ] **Step 2: Verificar** — `npx tsc --noEmit` → PASS.
- [ ] **Step 3: Commit** — `git commit -am "feat(ui): MediaPlaceholder (substitui .ph e image-slot)"`

---

## Fase 2 — Dados cross-page + hooks de comportamento

### Task 2.1: Dados de site e navegação

**Files:** Create: `data/site.ts`, `data/nav.ts`

> Nota: na referência o nav aponta `#investidores` e `#insights`, mas **não existem essas seções** na Home. Como o escopo é "Home 1:1 + rotas preparadas", esses dois itens apontam para as **rotas** `/investidores` e `/insights`; os demais para âncoras da Home.

- [ ] **Step 1: `data/site.ts`**

```ts
export const site = {
  name: "Open Group",
  subtitle: "Desenvolvimento Imobiliário",
  email: "contato@opengroup.com.br",
  phone: "+55 11 0000-0000",
  location: "São Paulo · SP",
  tagline: "O valor nasce antes da obra.",
  institutional: "Estruturação e desenvolvimento de empreendimentos imobiliários.",
  social: { linkedin: "#", instagram: "#" },
  copyright: "© 2026 Open Group — Desenvolvimento Imobiliário. Todos os direitos reservados.",
} as const;
```

- [ ] **Step 2: `data/nav.ts`** (HTML linhas 27-36, 384-415)

```ts
export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Manifesto", href: "/#institucional" },
  { label: "Atuação", href: "/#atuacao" },
  { label: "Modelos", href: "/#modelos" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Clientes", href: "/#parceiros" },
  { label: "Investidores", href: "/investidores" },
  { label: "Insights", href: "/insights" },
  { label: "Contato", href: "/#contato" },
];

export const footerAtuacao: NavItem[] = [
  { label: "Leitura da oportunidade", href: "/#atuacao" },
  { label: "Inteligência de mercado", href: "/#atuacao" },
  { label: "Viabilidade", href: "/#atuacao" },
  { label: "Estruturação da operação", href: "/#atuacao" },
  { label: "Conexão com parceiros", href: "/#atuacao" },
  { label: "Preparação para lançamento", href: "/#atuacao" },
];
```

- [ ] **Step 3: Verificar** — `npx tsc --noEmit` → PASS.
- [ ] **Step 4: Commit** — `git commit -am "feat(data): site + nav"`

---

### Task 2.2 (TDD): `useCarousel`

**Files:** Create: `hooks/useCarousel.ts`; Test: `hooks/useCarousel.test.ts`
Origem: lógica do hero (HTML:504-529) e de projetos (HTML:531-625). Cobre: índice com wrap, `next/prev/goTo`, autoplay com reset, e cálculo de drag (threshold → next/prev).

- [ ] **Step 1: Escrever o teste (falha)**

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCarousel } from "./useCarousel";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("useCarousel", () => {
  it("começa no índice 0", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    expect(result.current.index).toBe(0);
  });
  it("next dá wrap no fim", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    act(() => result.current.next());
    act(() => result.current.next());
    expect(result.current.index).toBe(2);
    act(() => result.current.next());
    expect(result.current.index).toBe(0);
  });
  it("prev dá wrap no início", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    act(() => result.current.prev());
    expect(result.current.index).toBe(2);
  });
  it("goTo normaliza fora do range", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    act(() => result.current.goTo(5));
    expect(result.current.index).toBe(2); // clamp/normalize
  });
  it("autoplay avança após o intervalo", () => {
    const { result } = renderHook(() => useCarousel({ length: 3, autoplayMs: 6500 }));
    act(() => { vi.advanceTimersByTime(6500); });
    expect(result.current.index).toBe(1);
  });
  it("dragEnd além do threshold avança", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    act(() => result.current.dragEnd(-200, 120)); // dx, threshold
    expect(result.current.index).toBe(1);
  });
  it("dragEnd aquém do threshold não muda", () => {
    const { result } = renderHook(() => useCarousel({ length: 3 }));
    act(() => result.current.dragEnd(-10, 120));
    expect(result.current.index).toBe(0);
  });
});
```

- [ ] **Step 2: Rodar — falha**

Run: `npx vitest run hooks/useCarousel.test.ts` → FAIL (useCarousel não existe).

- [ ] **Step 3: Implementar**

```ts
import { useCallback, useEffect, useRef, useState } from "react";

type Opts = { length: number; autoplayMs?: number };

export function useCarousel({ length, autoplayMs }: Opts) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((n: number) => {
    if (length <= 0) return;
    setIndex(((n % length) + length) % length);
  }, [length]);
  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  // ref para autoplay/drag lerem o índice atual sem recriar callbacks
  const indexRef = useRef(0);
  useEffect(() => { indexRef.current = index; }, [index]);

  // clamp do goTo(5) no teste: normalização por módulo já mapeia 5→2 com length 3
  // (5 % 3 = 2). OK.

  useEffect(() => {
    if (!autoplayMs) return;
    timer.current = setTimeout(() => goTo(indexRef.current + 1), autoplayMs);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [index, autoplayMs, goTo]);

  const dragEnd = useCallback((dx: number, threshold: number) => {
    if (dx <= -threshold) next();
    else if (dx >= threshold) prev();
  }, [next, prev]);

  return { index, goTo, next, prev, dragEnd };
}
```
> Atenção: `goTo(5)` com length 3 → `5 % 3 = 2`. O teste espera 2. ✔

- [ ] **Step 4: Rodar — passa**

Run: `npx vitest run hooks/useCarousel.test.ts` → PASS (7 testes).

- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat(hooks): useCarousel (índice/wrap/autoplay/drag) + testes"`

---

### Task 2.3: `useHeaderScroll` + `useMobileMenu`

**Files:** Create: `hooks/useHeaderScroll.ts`, `hooks/useMobileMenu.ts`
Origem: header scroll (HTML:449-484, **versão base = sem o cálculo de shrink do hero**, que é da fase de movimento); menu (HTML:486-496).

- [ ] **Step 1: `useHeaderScroll.ts`** — retorna `{ scrolled, onDark }`. Base: `scrolled` quando `scrollY>20`; `onDark` enquanto o topo da página (hero) está visível (`scrollY < innerHeight - 90`). **Não** calcular `--ht/--hs/...` (fase de movimento).

```ts
import { useEffect, useState } from "react";

export function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sy = window.scrollY, vh = window.innerHeight;
        setScrolled(sy > 20);
        setOnDark(sy < vh - 90);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { scrolled, onDark };
}
```

- [ ] **Step 2: `useMobileMenu.ts`**

```ts
import { useEffect, useState } from "react";

export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);
  return { open, toggle: () => setOpen(v => !v), close: () => setOpen(false) };
}
```

- [ ] **Step 3: Verificar** — `npx tsc --noEmit` → PASS.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat(hooks): useHeaderScroll + useMobileMenu (base, sem shrink)"`

---

## Fase 3 — Layout (Header, MobileMenu, Footer) + montagem

### Task 3.1: `Header` + `Nav` + `MobileMenu`

**Files:** Create: `components/layout/Header/Header.tsx`, `Nav.tsx`, `MobileMenu.tsx`
Origem: HTML:20-59; CSS:132-196. **Client Component** (`"use client"`).

- [ ] **Step 1: Implementar `Nav.tsx`** — mapeia `navItems`; estilo `.nav a` (CSS:160-169) com underline hover.

```tsx
import Link from "next/link";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/cn";

export function Nav({ onDark }: { onDark: boolean }) {
  return (
    <nav aria-label="Principal" className="hidden lg:flex items-center gap-[26px]">
      {navItems.map((it) => (
        <Link key={it.label} href={it.href}
          className={cn("group relative text-[12px] tracking-[.1em] py-1 transition-colors duration-200",
            onDark ? "text-white/80 hover:text-white" : "text-ink-2 hover:text-ink")}>
          {it.label}
          <span className="absolute left-0 bottom-0 h-px w-0 bg-current transition-[width] duration-300 ease-brand group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: `MobileMenu.tsx`** (HTML:42-59; CSS:184-196) — overlay escuro, links grandes, foot com CTA/contato.

```tsx
"use client";
import Link from "next/link";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div aria-hidden={!open} className={cn(
      "fixed inset-0 z-[90] bg-dark text-on-dark px-pad-x pt-[120px] pb-12 flex flex-col justify-between",
      "transition-transform duration-[600ms] ease-brand",
      open ? "translate-y-0 visible" : "-translate-y-full invisible")}>
      <nav className="flex flex-col">
        {navItems.map((it) => (
          <Link key={it.label} href={it.href} onClick={onClose}
            className="font-sans font-medium text-[26px] tracking-[-.02em] py-[14px] border-b border-[color:var(--line-dark)] text-on-dark hover:text-green">
            {it.label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col gap-[6px] text-on-dark-2 text-[14px]">
        <Button href="/#contato" variant="light" className="self-start mb-[18px]">Apresentar oportunidade</Button>
        <span>{site.email}</span>
        <span>{site.location}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `Header.tsx`** (HTML:20-40; CSS:132-182) — logo duplo color/light, Nav, botão hambúrguer; usa `useHeaderScroll` + `useMobileMenu`.

```tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { Nav } from "./Nav";
import { MobileMenu } from "./MobileMenu";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Header() {
  const { scrolled, onDark } = useHeaderScroll();
  const menu = useMobileMenu();
  return (
    <>
      <header className={cn(
        "fixed top-0 inset-x-0 z-[100] px-pad-x flex items-center justify-between",
        "transition-[background-color,padding,border-color,box-shadow] duration-[400ms] ease-brand border-b",
        scrolled && !onDark
          ? "py-3 bg-white/[.78] backdrop-blur-[18px] backdrop-saturate-[1.8] border-[color:var(--line)] shadow-[0_10px_34px_-18px_rgba(23,26,27,0.16)]"
          : "py-[18px] border-transparent",
        onDark && "!bg-transparent !backdrop-blur-none !border-transparent")}>
        <Link href="/#top" aria-label="Open Group — início" className="flex items-center gap-[11px]">
          <Image src={onDark ? "/assets/logos/og-logo-light.png" : "/assets/logos/og-logo.png"}
            alt="Open Group" width={34} height={34} className="w-[34px] h-[34px] object-contain" />
          <span className={cn("font-sans font-medium text-[14.5px] leading-none", onDark ? "text-white" : "text-ink")}>
            {site.name}
            <small className={cn("block text-[8.5px] tracking-[.24em] uppercase mt-1 font-normal",
              onDark ? "text-white/60" : "text-ink-3")}>{site.subtitle}</small>
          </span>
        </Link>
        <Nav onDark={onDark} />
        <button onClick={menu.toggle} aria-label="Abrir menu"
          className="lg:hidden w-11 h-11 flex items-center justify-center">
          {/* barras — estilo CSS:175-182; pode virar SVG simples */}
          <span className={cn("block w-[22px] h-px relative before:absolute before:inset-x-0 before:-top-[3.5px] before:h-px after:absolute after:inset-x-0 after:top-[3.5px] after:h-px",
            onDark ? "before:bg-white after:bg-white" : "before:bg-ink after:bg-ink")} />
        </button>
      </header>
      <MobileMenu open={menu.open} onClose={menu.close} />
    </>
  );
}
```
> Nota: o ícone hambúrguer→X animado é detalhe de microinteração; aqui basta o estado funcional (abre/fecha). Refino do X fica para a fase de movimento.

- [ ] **Step 4: Verificar** — `npx tsc --noEmit` → PASS.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat(layout): Header + Nav + MobileMenu (funcional)"`

---

### Task 3.2: `Footer`

**Files:** Create: `components/layout/Footer/Footer.tsx`
Origem: HTML:374-424; CSS:550-567.

- [ ] **Step 1: Implementar** — 4 colunas (marca/tag, Navegação, Atuação, Contato) + bottom (copy + Política + social). Mapear `navItems`, `footerAtuacao`, `site`.

```tsx
import Link from "next/link";
import Image from "next/image";
import { navItems, footerAtuacao } from "@/data/nav";
import { site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="bg-dark-2 text-on-dark px-pad-x pt-[clamp(64px,7vw,104px)] pb-9">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.1fr] gap-12 pb-16 border-b border-[color:var(--line-dark)]">
        <div>
          <Link href="/#top" className="flex items-center gap-[11px]">
            <Image src="/assets/logos/og-logo-light.png" alt="Open Group" width={34} height={34} className="w-[34px] h-[34px] object-contain" />
            <span className="font-sans font-medium text-[14.5px] leading-none text-white">
              {site.name}<small className="block text-[8.5px] tracking-[.24em] uppercase mt-1 text-on-dark-2 font-normal">{site.subtitle}</small>
            </span>
          </Link>
          <p className="font-serif italic font-light text-[22px] text-on-dark mt-6 max-w-[280px] leading-[1.35]">{site.tagline}</p>
        </div>
        <FooterCol title="Navegação" items={navItems} />
        <FooterCol title="Atuação" items={footerAtuacao} />
        <div>
          <h5 className="text-[11px] tracking-[.16em] uppercase text-on-dark-2 mb-5 font-medium">Contato</h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-3 text-[14px]">
            <li><a href={`mailto:${site.email}`} className="text-on-dark/80 hover:text-green transition-colors">{site.email}</a></li>
            <li><a href="/#contato" className="text-on-dark/80 hover:text-green transition-colors">{site.phone}</a></li>
            <li className="text-on-dark-2">{site.location}</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
        <div className="text-[12.5px] text-on-dark-2">{site.copyright} · <a href="#" className="text-on-dark/70">Política de Privacidade</a></div>
        <div className="flex gap-2">
          <a href={site.social.linkedin} aria-label="LinkedIn" className="w-10 h-10 border border-[color:var(--line-dark)] inline-flex items-center justify-center text-on-dark hover:bg-white hover:text-dark transition-colors"><Icon name="linkedin" /></a>
          <a href={site.social.instagram} aria-label="Instagram" className="w-10 h-10 border border-[color:var(--line-dark)] inline-flex items-center justify-center text-on-dark hover:bg-white hover:text-dark transition-colors"><Icon name="instagram" /></a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 className="text-[11px] tracking-[.16em] uppercase text-on-dark-2 mb-5 font-medium">{title}</h5>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {items.map((it) => (
          <li key={it.label}><Link href={it.href} className="text-[14px] text-on-dark/80 hover:text-green transition-colors">{it.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Verificar** — `npx tsc --noEmit` → PASS.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat(layout): Footer"`

---

### Task 3.3: Montar `layout.tsx` com Header + Footer

**Files:** Modify: `app/layout.tsx`

- [ ] **Step 1: Inserir Header e Footer** ao redor de `{children}`:

```tsx
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
// ...dentro de <body>:
<body>
  <Header />
  {children}
  <Footer />
</body>
```

- [ ] **Step 2: Verificar** — `npm run dev` → Header fixo (claro) e Footer escuro aparecem; menu mobile abre em viewport estreito.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat(layout): montar Header + Footer no root layout"`

---

## Fase 4 — Seções da Home

> Cada seção: dados → componente → verificação (tsc + visual contra a referência) → commit. Porte fiel das linhas citadas.

### Task 4.1: Seção `Hero`

**Files:** Create: `app/_sections/Hero/hero.data.ts`, `Hero.tsx`, `HeroSlide.tsx`
Origem: HTML:63-119; CSS:205-264. **Base = carrossel full-bleed 100vh** (sem shrink/sticky de 168vh — fase de movimento). Client Component (usa `useCarousel`).

- [ ] **Step 1: `hero.data.ts`** (dos `data-*` do HTML:68-102)

```ts
export type HeroSlide = {
  kick: string;
  name: string;
  meta: string[];   // prefixo "@" = "a confirmar" (renderiza em itálico esmaecido)
  sign: string;
  tone: "t1" | "t2" | "t3";
};

export const heroSlides: HeroSlide[] = [
  { kick: "Entregue · Empreendimento", name: "Hits Santa Catarina",
    meta: ["Entregue", "Residencial", "@Localização a confirmar"],
    sign: "Atuação OGDI — estruturação e desenvolvimento, da concepção ao lançamento.", tone: "t1" },
  { kick: "Em obra · Empreendimento", name: "Hits Cupecê",
    meta: ["Em obra", "Residencial", "São Paulo · SP"],
    sign: "Atuação OGDI — leitura da oportunidade, produto e estruturação da operação.", tone: "t2" },
  { kick: "Em obra · Empreendimento", name: "Start Park Jabaquara",
    meta: ["Em obra", "Residencial", "São Paulo · SP"],
    sign: "Atuação OGDI — inteligência de mercado, viabilidade e condução até o lançamento.", tone: "t3" },
  { kick: "Em obra · Empreendimento", name: "Oh Freguesia",
    meta: ["Em obra", "Residencial", "São Paulo · SP"],
    sign: "Atuação OGDI — conceituação do produto e estruturação da operação.", tone: "t2" },
  { kick: "Investimento · SCP", name: "Immensità",
    meta: ["Investimento", "SCP · Operação", "@Localização a confirmar"],
    sign: "Atuação OGDI — estruturação da operação e conexão com investidores.", tone: "t1" },
];
```

- [ ] **Step 2: `HeroSlide.tsx`** — slide absoluto com `MediaPlaceholder` por tone; opacidade controlada por `active`.

```tsx
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { HeroSlide as Slide } from "./hero.data";
import { cn } from "@/lib/cn";

export function HeroSlide({ slide, active }: { slide: Slide; active: boolean }) {
  return (
    <div className={cn("absolute inset-0 transition-opacity duration-[1200ms] ease-brand", active ? "opacity-100" : "opacity-0")}>
      <MediaPlaceholder tone={slide.tone} />
    </div>
  );
}
```

- [ ] **Step 3: `Hero.tsx`** — container 100vh, track de slides, scrim (CSS:217-222), frase fixa (CSS:224-230), setas (HTML:110-111), info do slide ativo embaixo (CSS:232-243). `meta` com `@` → itálico esmaecido.

```tsx
"use client";
import { useCarousel } from "@/hooks/useCarousel";
import { heroSlides } from "./hero.data";
import { HeroSlide } from "./HeroSlide";
import { Icon } from "@/components/ui/Icon";

export function Hero() {
  const { index, next, prev } = useCarousel({ length: heroSlides.length, autoplayMs: 6500 });
  const s = heroSlides[index];
  return (
    <section id="top" className="relative h-screen min-h-[620px] overflow-hidden bg-dark">
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => <HeroSlide key={slide.name} slide={slide} active={i === index} />)}
      </div>
      {/* scrim */}
      <div className="absolute inset-0 z-[2] pointer-events-none [background:linear-gradient(180deg,rgba(10,14,15,.42)_0%,rgba(10,14,15,0)_26%,rgba(10,14,15,0)_50%,rgba(10,14,15,.78)_100%),linear-gradient(90deg,rgba(10,14,15,.45)_0%,rgba(10,14,15,0)_55%)]" />
      {/* frase fixa */}
      <p className="absolute z-[3] left-pad-x top-[clamp(120px,17vh,168px)] font-serif italic font-light text-[clamp(17px,1.7vw,24px)] text-white/90 before:block before:w-[38px] before:h-px before:bg-green before:mb-[18px] max-md:hidden">
        O valor nasce antes da obra.
      </p>
      {/* setas */}
      <button onClick={prev} aria-label="Anterior" className="absolute z-[4] top-1/2 -translate-y-1/2 left-[clamp(10px,2vw,28px)] w-[clamp(44px,4vw,60px)] h-[clamp(44px,4vw,60px)] flex items-center justify-center text-white opacity-75 hover:opacity-100 transition-opacity"><Icon name="chevron-left" className="w-[30px] h-[30px]" /></button>
      <button onClick={next} aria-label="Próximo" className="absolute z-[4] top-1/2 -translate-y-1/2 right-[clamp(10px,2vw,28px)] w-[clamp(44px,4vw,60px)] h-[clamp(44px,4vw,60px)] flex items-center justify-center text-white opacity-75 hover:opacity-100 transition-opacity"><Icon name="chevron-right" className="w-[30px] h-[30px]" /></button>
      {/* info */}
      <div className="absolute z-[3] inset-x-0 bottom-[clamp(36px,6vh,64px)] px-pad-x">
        <div className="text-white max-w-[640px]">
          <div className="font-serif text-[clamp(28px,3.6vw,52px)] leading-[1.04] my-[14px_0_16px]">{s.name}</div>
          <div className="flex flex-wrap items-center gap-[10px_16px] text-[12px] tracking-[.12em] uppercase text-white/85">
            {s.meta.map((m, i) => (
              <span key={i} className="flex items-center gap-[10px_16px]">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-white/50" />}
                {m.startsWith("@")
                  ? <span className="text-white/50 italic normal-case tracking-[.02em]">{m.slice(1)}</span>
                  : <span>{m}</span>}
              </span>
            ))}
          </div>
          <p className="text-[13.5px] text-white/70 mt-4 max-w-[480px] leading-[1.5]">{s.sign}</p>
        </div>
      </div>
    </section>
  );
}
```
> O encolhimento sticky (CSS:208-212) e o fade do overlay (CSS:212) **não** entram aqui — fase de movimento.

- [ ] **Step 4: Verificar** — `npx tsc --noEmit` → PASS. Visual: hero 100vh, troca de slide por setas + autoplay, info atualiza, frase e scrim corretos.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat(home): seção Hero (carrossel base 100vh)"`

---

### Task 4.2: Seção `Projetos`

**Files:** Create: `app/_sections/Projetos/projetos.data.ts`, `Projetos.tsx`, `ProjetoTabs.tsx`, `ProjetoCard.tsx`
Origem: HTML:121-215; CSS:282-347, 531-625. Comportamento: abas filtram; carrossel featured (card central em `scale(1)`), drag/swipe, dots, setas. Client Component.

- [ ] **Step 1: `projetos.data.ts`** (HTML:140-204)

```ts
export type ProjetoCat = "obra" | "futuro" | "entregue";
export type Projeto = {
  cat: ProjetoCat; status: string; name: string; tag: string;
  tone: "t1" | "t2" | "t3"; ctaLabel: string; href: string;
};
export const projetoTabs: { cat: ProjetoCat; label: string }[] = [
  { cat: "obra", label: "Em obra" },
  { cat: "futuro", label: "Futuro lançamento" },
  { cat: "entregue", label: "Entregue" },
];
export const projetos: Projeto[] = [
  { cat: "obra", status: "Em obra", name: "Hits Cupecê", tag: "Operação estruturada na origem, do produto ao lançamento.", tone: "t2", ctaLabel: "Conheça o empreendimento", href: "/#contato" },
  { cat: "obra", status: "Em obra", name: "Start Park Jabaquara", tag: "Da inteligência de mercado à condução até o lançamento.", tone: "t3", ctaLabel: "Conheça o empreendimento", href: "/#contato" },
  { cat: "obra", status: "Em obra", name: "Oh Freguesia", tag: "Produto conceituado e operação estruturada pela OGDI.", tone: "t1", ctaLabel: "Conheça o empreendimento", href: "/#contato" },
  { cat: "futuro", status: "Futuro lançamento", name: "Guarulhos", tag: "Oportunidade originada e operação em estruturação.", tone: "t3", ctaLabel: "Falar sobre o projeto", href: "/#contato" },
  { cat: "futuro", status: "Futuro lançamento", name: "Cupecê", tag: "Desenvolvimento de produto e viabilidade em curso.", tone: "t2", ctaLabel: "Falar sobre o projeto", href: "/#contato" },
  { cat: "entregue", status: "Entregue", name: "Hits Santa Catarina", tag: "Da concepção ao lançamento — operação entregue.", tone: "t1", ctaLabel: "Conheça o empreendimento", href: "/#contato" },
];
```

- [ ] **Step 2: `ProjetoTabs.tsx`** (HTML:129-133; CSS:287-292)

```tsx
import { projetoTabs, type ProjetoCat } from "./projetos.data";
import { cn } from "@/lib/cn";

export function ProjetoTabs({ active, onChange }: { active: ProjetoCat; onChange: (c: ProjetoCat) => void }) {
  return (
    <div className="flex flex-wrap gap-[30px] max-md:gap-5">
      {projetoTabs.map((t) => (
        <button key={t.cat} onClick={() => onChange(t.cat)}
          className={cn("relative text-[13px] tracking-[.04em] pb-2 transition-colors duration-300",
            active === t.cat ? "text-ink" : "text-ink-3 hover:text-ink-2",
            "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ink after:origin-left after:transition-transform after:duration-[350ms]",
            active === t.cat ? "after:scale-x-100" : "after:scale-x-0")}>
          {t.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: `ProjetoCard.tsx`** (HTML:141-150; CSS:298-316) — slide com `MediaPlaceholder`, scrim, status/nome/tag/CTA; `active` → `scale-100`, senão `scale-[.92]` + overlay escuro.

```tsx
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Button } from "@/components/ui/Button";
import type { Projeto } from "./projetos.data";
import { cn } from "@/lib/cn";

export function ProjetoCard({ p, active }: { p: Projeto; active: boolean }) {
  return (
    <div className={cn("relative h-full overflow-hidden bg-dark shrink-0 basis-[78%] max-md:basis-[86%] origin-center transition-transform duration-700 ease-brand-2 cursor-grab",
      active ? "scale-100" : "scale-[.92] max-md:scale-[.95]")}>
      <MediaPlaceholder tone={p.tone} />
      <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(10,14,15,.72)_0%,rgba(10,14,15,.25)_42%,rgba(10,14,15,0)_70%),linear-gradient(0deg,rgba(10,14,15,.55),rgba(10,14,15,0)_50%)]" />
      <div className={cn("absolute inset-0 z-[3] bg-[rgba(10,14,15,.52)] transition-opacity duration-[600ms] ease-brand pointer-events-none", active ? "opacity-0" : "opacity-100")} />
      <div className="absolute left-0 bottom-0 z-[2] p-[clamp(28px,4vw,56px)] text-white max-w-[560px]">
        <span className="text-[11px] tracking-[.2em] uppercase text-green">{p.status}</span>
        <h3 className="font-serif text-[clamp(28px,3.4vw,46px)] leading-[1.04] my-[12px_0_8px]">{p.name}</h3>
        <p className="text-[clamp(14px,1.05vw,16px)] text-white/82 mt-[2px] mb-6 max-w-[440px] leading-[1.5]">{p.tag}</p>
        <Button href={p.href} variant="light" sm arrow>{p.ctaLabel}</Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: `Projetos.tsx`** — cabeçalho (kicker + heading + tabs), stage full-bleed (CSS:294-296), track com `useCarousel`, dots, setas, foot "Ver todos os projetos". Filtro por aba reseta índice.

```tsx
"use client";
import { useMemo, useRef, useState } from "react";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { Icon } from "@/components/ui/Icon";
import { useCarousel } from "@/hooks/useCarousel";
import { projetos, type ProjetoCat } from "./projetos.data";
import { ProjetoTabs } from "./ProjetoTabs";
import { ProjetoCard } from "./ProjetoCard";

export function Projetos() {
  const [cat, setCat] = useState<ProjetoCat>("obra");
  const list = useMemo(() => projetos.filter((p) => p.cat === cat), [cat]);
  const { index, goTo, next, prev, dragEnd } = useCarousel({ length: list.length });
  const drag = useRef<{ x: number } | null>(null);

  const onTab = (c: ProjetoCat) => { setCat(c); goTo(0); };

  return (
    <section id="projetos" className="py-section">
      <div className="wrap">
        <div className="flex items-end justify-between gap-[24px_40px] flex-wrap mb-10">
          <div className="max-w-[520px]">
            <Kicker>Projetos</Kicker>
            <SectionHeading className="mt-[14px]">Estruturados antes da obra.<br />Empreendimentos que avançam.</SectionHeading>
          </div>
          <ProjetoTabs active={cat} onChange={onTab} />
        </div>
      </div>
      <div className="relative">
        <div className="relative overflow-hidden w-screen ml-[calc(50%-50vw)]">
          <div
            className="flex gap-[clamp(16px,2vw,30px)] h-[clamp(440px,50vw,600px)] max-md:h-[78vw] max-md:max-h-[560px] px-pad-x transition-transform duration-700 ease-brand-2 touch-pan-y"
            style={{ transform: `translateX(calc(${50}vw - ${50}% ))` }}
            onPointerDown={(e) => { drag.current = { x: e.clientX }; }}
            onPointerUp={(e) => { if (drag.current) { dragEnd(e.clientX - drag.current.x, 120); drag.current = null; } }}
          >
            {list.map((p, i) => <ProjetoCard key={p.name} p={p} active={i === index} />)}
          </div>
          <button onClick={prev} aria-label="Anterior" className="absolute z-[5] top-1/2 -translate-y-1/2 left-[18px] w-[clamp(40px,3.4vw,54px)] h-[clamp(40px,3.4vw,54px)] flex items-center justify-center text-white opacity-75 hover:opacity-100"><Icon name="chevron-left" className="w-[26px] h-[26px]" /></button>
          <button onClick={next} aria-label="Próximo" className="absolute z-[5] top-1/2 -translate-y-1/2 right-[18px] w-[clamp(40px,3.4vw,54px)] h-[clamp(40px,3.4vw,54px)] flex items-center justify-center text-white opacity-75 hover:opacity-100"><Icon name="chevron-right" className="w-[26px] h-[26px]" /></button>
          <div className="absolute inset-x-0 bottom-[clamp(18px,2.4vw,30px)] z-[5] flex justify-center gap-[9px]">
            {list.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Ir para ${i + 1}`}
                className={`w-9 h-[2px] ${i === index ? "bg-white" : "bg-white/30 hover:bg-white/60"} transition-colors`} />
            ))}
          </div>
        </div>
        <div className="mt-[34px] flex justify-center"><TextLink href="/projetos">Ver todos os projetos</TextLink></div>
      </div>
    </section>
  );
}
```
> **Nota de execução (centralização do card ativo):** o original calcula `translateX` por JS para centralizar o card ativo (CSS/JS:551-568). Aqui a base usa um deslocamento simples; o **ajuste fino de centralização dinâmica** (medir `offsetLeft`/larguras) deve ser portado como um pequeno efeito no `useEffect` medindo o card ativo — implementar de forma que case com a referência (centraliza o card ativo no viewport, com clamp nas bordas). Validar visualmente que o card ativo fica centralizado e os vizinhos "espiam" nas laterais.

- [ ] **Step 5: Verificar** — `npx tsc --noEmit` → PASS. Visual: abas filtram, card ativo centralizado e em escala cheia, setas/dots/drag funcionam.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat(home): seção Projetos (abas + carrossel featured)"`

---

### Task 4.3: Seção `Atuacao`

**Files:** Create: `app/_sections/Atuacao/atuacao.data.ts`, `Atuacao.tsx`, `AtuacaoRow.tsx`
Origem: HTML:217-243; CSS:349-375. Fundo `soft`, coluna esquerda sticky + watermark do logo.

- [ ] **Step 1: `atuacao.data.ts`** (HTML:233-239)

```ts
export type AtuacaoStep = { idx: string; title: string; desc: string };
export const atuacaoSteps: AtuacaoStep[] = [
  { idx: "01", title: "Leitura da oportunidade", desc: "Entendimento do ativo, do estágio e do potencial real de desenvolvimento." },
  { idx: "02", title: "Inteligência de mercado", desc: "Contexto de praça, demanda e leitura concorrencial que fundamenta a tese." },
  { idx: "03", title: "Conceituação do empreendimento", desc: "Definição da lógica do produto imobiliário: tipologia, mix e posicionamento." },
  { idx: "04", title: "Viabilidade", desc: "Análise financeira e institucional que destrava o caminho da operação." },
  { idx: "05", title: "Estruturação da operação", desc: "Modelagem para que potencial, capital e execução avancem na mesma direção." },
  { idx: "06", title: "Conexão com parceiros", desc: "Articulação de parceiros e relacionamento com banco, incluindo a CEF quando aplicável." },
  { idx: "07", title: "Preparação para lançamento", desc: "Estratégia comercial e condução da operação até estar pronta para avançar." },
];
export const atuacaoTags = ["Consultoria contratada", "Parceira estratégica", "Sócia da operação"];
```

- [ ] **Step 2: `AtuacaoRow.tsx`** (CSS:368-373)

```tsx
import type { AtuacaoStep } from "./atuacao.data";

export function AtuacaoRow({ step, last }: { step: AtuacaoStep; last: boolean }) {
  return (
    <div className={`grid grid-cols-[52px_1fr] gap-[22px] py-[26px] border-t border-[color:var(--line)] ${last ? "border-b" : ""} transition-[padding-left] duration-[400ms] ease-brand hover:pl-3`}>
      <span className="font-sans text-[18px] text-teal font-semibold leading-none tabular-nums tracking-[.02em]">{step.idx}</span>
      <div>
        <h4 className="font-sans font-semibold text-[clamp(19px,1.6vw,24px)] m-0 mb-2 tracking-[-.015em]">{step.title}</h4>
        <p className="m-0 text-[14px] text-ink-2 leading-[1.5] max-w-[520px]">{step.desc}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `Atuacao.tsx`** (HTML:218-242; CSS:352-375) — grid 0.85fr/1.15fr; esquerda sticky com kicker/heading/lead/tags; watermark `og-logo-light` (CSS:353-364).

```tsx
import Image from "next/image";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { atuacaoSteps, atuacaoTags } from "./atuacao.data";
import { AtuacaoRow } from "./AtuacaoRow";

export function Atuacao() {
  return (
    <section id="atuacao" className="relative py-section bg-bg-soft">
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image src="/assets/logos/og-logo-light.png" alt="" width={660} height={660}
          className="sticky top-[calc(50vh-clamp(180px,21vw,330px))] w-[clamp(360px,42vw,660px)] max-w-[48vw] ml-[clamp(-40px,1vw,24px)] opacity-[.06] [filter:brightness(0)_invert(1)] max-md:opacity-[.04]" />
      </div>
      <div className="wrap relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[clamp(40px,6vw,96px)] items-start">
          <div className="lg:sticky lg:top-[120px] flex flex-col gap-[22px]">
            <Kicker>Nossa atuação</Kicker>
            <SectionHeading>Da origem<br />ao lançamento.</SectionHeading>
            <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-ink-2">A Open Group não apenas participa de projetos — estrutura a oportunidade imobiliária, organizando potencial, capital, parceiros e execução na mesma direção.</p>
            <div className="mt-[26px] flex flex-wrap gap-2 text-[13px] text-ink-3">
              {atuacaoTags.map((t) => <span key={t} className="px-[13px] py-[7px] border border-[color:var(--line-2)] text-[12px] tracking-[.02em]">{t}</span>)}
            </div>
          </div>
          <div className="flex flex-col">
            {atuacaoSteps.map((s, i) => <AtuacaoRow key={s.idx} step={s} last={i === atuacaoSteps.length - 1} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
```
> Watermark: na referência o `--atua-watermark` é `position: sticky` com opacidade .9 e `brightness(0) invert(1)` (branco). Em fundo claro isso fica branco quase invisível; o mobile usa opacity .04. Validar visualmente e ajustar opacity para casar com o efeito da referência (marca d'água sutil).

- [ ] **Step 4: Verificar** — `npx tsc --noEmit` → PASS. Visual: 7 linhas, coluna esquerda sticky no desktop, fundo soft.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat(home): seção Nossa Atuação"`

---

### Task 4.4: Seção `Modelos`

**Files:** Create: `app/_sections/Modelos/modelos.data.ts`, `Modelos.tsx`, `ModeloCard.tsx`, `ModeloRing.tsx`
Origem: HTML:245-274; CSS:435-452. 3 cards com SVG ring distinto.

- [ ] **Step 1: `modelos.data.ts`** (HTML:254-271)

```ts
export type ModeloRingKind = "consultoria" | "parceria" | "societaria";
export type Modelo = { idx: string; ring: ModeloRingKind; title: string; desc: string };
export const modelos: Modelo[] = [
  { idx: "i.", ring: "consultoria", title: "Consultoria contratada", desc: "Apoiamos a estruturação da operação com leitura estratégica e condução técnica, dentro de um escopo definido." },
  { idx: "ii.", ring: "parceria", title: "Parceria estratégica", desc: "Atuamos lado a lado na construção do empreendimento, compartilhando visão, estrutura e direção." },
  { idx: "iii.", ring: "societaria", title: "Participação societária", desc: "Entramos como sócios da operação, comprometidos com o resultado do empreendimento de ponta a ponta." },
];
```

- [ ] **Step 2: `ModeloRing.tsx`** — os 3 SVGs exatos (HTML:256, 262, 268), por `kind`.

```tsx
import type { ModeloRingKind } from "./modelos.data";

export function ModeloRing({ kind, className }: { kind: ModeloRingKind; className?: string }) {
  const common = { viewBox: "0 0 58 58", fill: "none", stroke: "#1F5A63", strokeWidth: 1.5, className };
  if (kind === "consultoria")
    return <svg {...common}><circle cx={29} cy={29} r={20} /><circle cx={29} cy={29} r={5} fill="#5FA83C" stroke="none" /></svg>;
  if (kind === "parceria")
    return <svg {...common}><circle cx={22} cy={29} r={16} /><circle cx={36} cy={29} r={16} /><circle cx={29} cy={29} r={4} fill="#5FA83C" stroke="none" /></svg>;
  return <svg {...common}><circle cx={29} cy={22} r={13} /><circle cx={21} cy={36} r={13} /><circle cx={37} cy={36} r={13} /><circle cx={29} cy={31} r={4} fill="#5FA83C" stroke="none" /></svg>;
}
```

- [ ] **Step 3: `ModeloCard.tsx`** (CSS:441-451) — card branco, idx serif itálico verde, ring, h3, p; hover lift.

```tsx
import type { Modelo } from "./modelos.data";
import { ModeloRing } from "./ModeloRing";

export function ModeloCard({ m }: { m: Modelo }) {
  return (
    <article className="relative overflow-hidden border border-[color:var(--line)] rounded-[14px] px-[34px] py-10 bg-white transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:-translate-y-[3px] hover:shadow-[0_30px_55px_-38px_rgba(23,26,27,.4)]">
      <span className="font-serif italic text-[1.15rem] text-green font-medium">{m.idx}</span>
      <ModeloRing kind={m.ring} className="block w-[58px] h-[58px] my-[10px_0_26px]" />
      <h3 className="font-sans font-semibold text-[1.34rem] leading-[1.15] tracking-[-.02em] m-0 mb-3 text-ink">{m.title}</h3>
      <p className="text-[15px] leading-[1.6] text-ink-2 m-0">{m.desc}</p>
    </article>
  );
}
```

- [ ] **Step 4: `Modelos.tsx`** (HTML:246-273) — cabeçalho + grid 3→1.

```tsx
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { modelos } from "./modelos.data";
import { ModeloCard } from "./ModeloCard";

export function Modelos() {
  return (
    <section id="modelos" className="py-section">
      <div className="wrap">
        <div className="max-w-[760px]">
          <Kicker>Modelos de atuação</Kicker>
          <SectionHeading className="my-[14px] mb-[18px]">Atuação flexível conforme<br />o perfil da oportunidade.</SectionHeading>
          <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-ink-2">Cada oportunidade exige uma lógica própria. A Open Group avalia o estágio, o potencial e a complexidade da operação para definir o modelo de atuação mais adequado.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mt-[clamp(48px,6vw,72px)]">
          {modelos.map((m) => <ModeloCard key={m.idx} m={m} />)}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verificar** — `npx tsc --noEmit` → PASS. Visual: 3 cards com rings corretos, hover lift.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat(home): seção Modelos de Atuação"`

---

### Task 4.5: Seção `Manifesto`

**Files:** Create: `app/_sections/Manifesto/Manifesto.tsx`, `Manifesto.module.css`
Origem: HTML:276-289; CSS:377-416. Fundo petróleo + arcos concêntricos (escape hatch). Estático (sem leitura cinética).

- [ ] **Step 1: `Manifesto.module.css`** (CSS:385-391, arcos)

```css
.arcs {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .5;
  background:
    radial-gradient(circle at 78% 50%, transparent 0 23.7vw, rgba(255,255,255,.07) 23.7vw 23.8vw, transparent 23.8vw),
    radial-gradient(circle at 78% 50%, transparent 0 31.7vw, rgba(255,255,255,.06) 31.7vw 31.8vw, transparent 31.8vw),
    radial-gradient(circle at 78% 50%, transparent 0 39.7vw, rgba(255,255,255,.05) 39.7vw 39.8vw, transparent 39.8vw);
}
@media (max-width: 760px) { .arcs { opacity: .4; } }
```

- [ ] **Step 2: `Manifesto.tsx`** (HTML:277-288) — Newsreader, palavras-acento `.em` verde itálico, assinatura.

```tsx
import Image from "next/image";
import { Kicker } from "@/components/ui/Kicker";
import styles from "./Manifesto.module.css";

export function Manifesto() {
  return (
    <section id="institucional" className="relative overflow-clip bg-manifesto text-white py-[clamp(96px,17vh,200px)]">
      <div className={styles.arcs} aria-hidden />
      <div className="wrap relative z-[2]">
        <div className="max-w-[720px]">
          <Kicker tone="on-dark-green">Manifesto</Kicker>
          <p className="mt-[clamp(24px,3vw,36px)] font-news font-normal text-[clamp(1.9rem,3.9vw,3.2rem)] leading-[1.28] tracking-[-.01em] text-white max-w-[20ch]">
            Antes da obra, existe a <span className="text-manifesto-em italic">decisão</span>.<br />
            Antes do lançamento, existe a <span className="text-manifesto-em italic">estrutura</span>.<br />
            Antes do valor, existe <span className="text-manifesto-em italic">visão</span>.
          </p>
          <div className="mt-[clamp(52px,7vw,84px)] flex items-center gap-4 flex-wrap">
            <Image src="/assets/logos/og-logo.png" alt="Open Group" width={36} height={36} className="h-9 w-auto" />
            <span className="text-[15px] text-white/60"><b className="text-white font-semibold">Open Group.</b> Desenvolva com visão desde a origem.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar** — `npx tsc --noEmit` → PASS. Visual: fundo petróleo, arcos sutis à direita, acentos verdes itálicos.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat(home): seção Manifesto (estática)"`

---

### Task 4.6: Seção `Clientes`

**Files:** Create: `app/_sections/Clientes/clientes.data.ts`, `Clientes.tsx`, `Clientes.module.css`
Origem: HTML:291-321; CSS:454-478. Faixa full-bleed de logos em loop contínuo + máscara de fade.

- [ ] **Step 1: `clientes.data.ts`** (nomes do HTML:302-309)

```ts
export type Cliente = { id: string; name: string };
export const clientes: Cliente[] = [
  { id: "atrio", name: "ATRIO" }, { id: "vertice", name: "VÉRTICE" },
  { id: "meridiano", name: "MERIDIANO" }, { id: "prisma", name: "PRISMA" },
  { id: "norte", name: "NORTE" }, { id: "patio", name: "PÁTIO" },
  { id: "terra", name: "TERRA" }, { id: "horizonte", name: "HORIZONTE" },
];
```

- [ ] **Step 2: `Clientes.module.css`** (CSS:465-477, keyframe do marquee)

```css
.track {
  display: flex; align-items: center; width: max-content;
  gap: clamp(48px, 6vw, 96px);
  padding: 8px clamp(24px, 3vw, 48px);
  animation: scroll 48s linear infinite;
}
.band:hover .track { animation-play-state: paused; }
@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .track { animation: none; } }
```
> O marquee é comportamento contínuo do visual (não é entrada decorativa) — entra na base. Renderiza a lista **duplicada** para o loop perfeito.

- [ ] **Step 3: `Clientes.tsx`** (HTML:292-320) — cabeçalho centrado + band full-bleed com máscara; wordmarks cinza como placeholder de logo (substituível por `MediaPlaceholder`/SVG real depois).

```tsx
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clientes } from "./clientes.data";
import styles from "./Clientes.module.css";

export function Clientes() {
  const loop = [...clientes, ...clientes];
  return (
    <section id="parceiros" className="py-section">
      <div className="wrap">
        <div className="flex flex-col items-center text-center gap-[14px] mb-[clamp(48px,6vw,72px)]">
          <Kicker>Clientes</Kicker>
          <SectionHeading>Quem confia na<br />Open Group.</SectionHeading>
          <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-ink-2 max-w-[600px]">Incorporadoras, construtoras, fundos e proprietários de área que estruturaram suas operações com a Open Group, da origem ao lançamento.</p>
        </div>
      </div>
      <div className={`${styles.band} w-screen ml-[calc(50%-50vw)] overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]`}>
        <div className={styles.track}>
          {loop.map((c, i) => (
            <div key={`${c.id}-${i}`} aria-hidden={i >= clientes.length}
              className="flex-none w-[clamp(150px,14vw,210px)] h-[clamp(64px,6vw,88px)] flex items-center justify-center">
              <span className="font-sans font-semibold text-[21px] tracking-[.04em] text-[#7A858A]">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verificar** — `npx tsc --noEmit` → PASS. Visual: faixa rola continuamente, pausa no hover, fade nas bordas.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat(home): seção Clientes (marquee)"`

---

### Task 4.7: Seção `Contato`

**Files:** Create: `app/_sections/Contato/Contato.tsx`, `ContatoForm.tsx`, `ContatoInfo.tsx`
Test: `app/_sections/Contato/ContatoForm.test.tsx`
Origem: HTML:323-371; CSS:515-548. Fundo escuro, form controlado → estado de sucesso (sem backend).

- [ ] **Step 1 (TDD): `ContatoForm.test.tsx`** — submit mostra o sucesso e esconde o form.

```tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContatoForm } from "./ContatoForm";

describe("ContatoForm", () => {
  it("ao enviar, esconde o form e mostra a mensagem de sucesso", () => {
    render(<ContatoForm />);
    fireEvent.submit(screen.getByRole("form", { name: /contato/i }));
    expect(screen.getByText("Mensagem recebida.")).toBeInTheDocument();
    expect(screen.queryByLabelText("Nome")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Rodar — falha**

Run: `npx vitest run app/_sections/Contato/ContatoForm.test.tsx` → FAIL.

- [ ] **Step 3: `ContatoForm.tsx`** (HTML:338-367; CSS:527-548) — campos (Nome, Empresa, E-mail, WhatsApp, Tipo, Mensagem), botão; submit `preventDefault` → `success`.

```tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const fieldCls = "bg-transparent border-0 border-b border-[color:var(--line-dark)] py-[10px] text-[16px] text-white outline-none transition-colors focus:border-green placeholder:text-[rgba(242,241,237,.36)]";
const labelCls = "text-[11px] tracking-[.14em] uppercase text-on-dark-2";

export function ContatoForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="p-[34px] border border-[color:var(--line-dark)]">
        <Icon name="check" />
        <h4 className="font-sans font-semibold text-[23px] my-[14px_0_8px] text-white tracking-[-.02em]">Mensagem recebida.</h4>
        <p className="text-[rgba(242,241,237,.7)] m-0">A equipe da Open Group faz a primeira leitura e retorna com os próximos passos.</p>
      </div>
    );
  }
  return (
    <form aria-label="Formulário de contato" onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-[22px]">
      <div className="flex flex-col gap-2"><label htmlFor="f-nome" className={labelCls}>Nome</label><input id="f-nome" type="text" placeholder="Seu nome completo" required className={fieldCls} /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        <div className="flex flex-col gap-2"><label htmlFor="f-empresa" className={labelCls}>Empresa</label><input id="f-empresa" type="text" placeholder="Empresa ou fundo" className={fieldCls} /></div>
        <div className="flex flex-col gap-2"><label htmlFor="f-email" className={labelCls}>E-mail</label><input id="f-email" type="email" placeholder="voce@empresa.com" required className={fieldCls} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        <div className="flex flex-col gap-2"><label htmlFor="f-wpp" className={labelCls}>WhatsApp</label><input id="f-wpp" type="tel" placeholder="+55 11 90000-0000" className={fieldCls} /></div>
        <div className="flex flex-col gap-2"><label htmlFor="f-tipo" className={labelCls}>Tipo de contato</label>
          <select id="f-tipo" className={`${fieldCls} appearance-none cursor-pointer`}>
            {["Apresentar oportunidade","Falar sobre projeto","Parceria","Investimento","Imprensa","Outro"].map(o => <option key={o} className="text-[#15282c]">{o}</option>)}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2"><label htmlFor="f-msg" className={labelCls}>Mensagem</label><textarea id="f-msg" rows={2} placeholder="Tipo de ativo, localização, estágio do projeto…" className={`${fieldCls} resize-y min-h-[70px]`} /></div>
      <div className="mt-2 flex items-center gap-5 flex-wrap">
        <Button type="submit" variant="light" arrow>Enviar mensagem</Button>
        <span className="text-[12px] text-on-dark-2 max-w-[220px] leading-[1.4]">Ao enviar, você concorda em ser contatado pela equipe da Open Group.</span>
      </div>
    </form>
  );
}
```

- [ ] **Step 4: Rodar — passa**

Run: `npx vitest run app/_sections/Contato/ContatoForm.test.tsx` → PASS.

- [ ] **Step 5: `ContatoInfo.tsx` + `Contato.tsx`** (HTML:327-336; CSS:518-525)

```tsx
// ContatoInfo.tsx
import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/data/site";

export function ContatoInfo() {
  const items = [
    { k: "E-mail", v: site.email },
    { k: "WhatsApp / Telefone", v: site.phone },
    { k: "Localização", v: site.location },
  ];
  return (
    <div>
      <Kicker tone="on-dark-green">Vamos conversar</Kicker>
      <h2 className="font-sans font-semibold text-[clamp(28px,3.2vw,46px)] leading-[1.1] my-[22px] text-white tracking-[-.025em]">Apresente sua oportunidade.</h2>
      <p className="text-[16px] text-[rgba(242,241,237,.72)] max-w-[440px] leading-[1.65]">Conte sobre o ativo, o terreno ou o projeto. Fazemos a primeira leitura da oportunidade e indicamos os próximos passos possíveis.</p>
      <div className="mt-[52px] flex flex-col gap-[22px]">
        {items.map((it) => (
          <div key={it.k}>
            <div className="text-[11px] tracking-[.14em] uppercase text-on-dark-2 mb-[5px]">{it.k}</div>
            <div className="font-sans font-medium text-[18px] text-white tracking-[-.01em]">{it.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
```tsx
// Contato.tsx
import { ContatoInfo } from "./ContatoInfo";
import { ContatoForm } from "./ContatoForm";

export function Contato() {
  return (
    <section id="contato" className="py-section bg-dark text-on-dark">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(48px,6vw,100px)] items-start">
          <ContatoInfo />
          <ContatoForm />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Verificar** — `npx tsc --noEmit` → PASS; `npx vitest run` → PASS. Visual: bloco escuro, form, submit mostra sucesso.
- [ ] **Step 7: Commit** — `git add -A && git commit -m "feat(home): seção Contato (form + sucesso) + teste"`

---

### Task 4.8: Montar a Home (`app/page.tsx`)

**Files:** Modify: `app/page.tsx`
Origem: ordem do HTML (Hero → Projetos → Atuação → Modelos → Manifesto → Clientes → Contato).

- [ ] **Step 1: Compor as seções**

```tsx
import { Hero } from "./_sections/Hero/Hero";
import { Projetos } from "./_sections/Projetos/Projetos";
import { Atuacao } from "./_sections/Atuacao/Atuacao";
import { Modelos } from "./_sections/Modelos/Modelos";
import { Manifesto } from "./_sections/Manifesto/Manifesto";
import { Clientes } from "./_sections/Clientes/Clientes";
import { Contato } from "./_sections/Contato/Contato";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Projetos />
      <Atuacao />
      <Modelos />
      <Manifesto />
      <Clientes />
      <Contato />
    </main>
  );
}
```

- [ ] **Step 2: Verificar** — `npm run dev` → Home completa na ordem certa; comparar lado a lado com `Open Group - Home.html` aberto no navegador. Anotar divergências visuais e ajustar utilitários até bater.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat(home): composição da página inicial"`

---

## Fase 5 — Rotas placeholder + SEO

### Task 5.1: Páginas placeholder

**Files:** Create: `app/institucional/page.tsx`, `app/atuacao/page.tsx`, `app/projetos/page.tsx`, `app/projetos/[slug]/page.tsx`, `app/parceiros/page.tsx`, `app/investidores/page.tsx`, `app/insights/page.tsx`, `app/contato/page.tsx`
Create: `components/layout/PagePlaceholder.tsx`

- [ ] **Step 1: `PagePlaceholder.tsx`** — bloco simples reutilizável (espaço pro Header fixo, kicker, título, texto "em breve"), consistente com a marca.

```tsx
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

export function PagePlaceholder({ kicker, title }: { kicker: string; title: string }) {
  return (
    <main className="wrap pt-[160px] pb-section min-h-[70vh]">
      <Kicker>{kicker}</Kicker>
      <SectionHeading level={1} as="h1" className="mt-4 mb-6">{title}</SectionHeading>
      <p className="text-[clamp(15px,1.15vw,18px)] text-ink-2 max-w-[560px]">Conteúdo em preparação. Esta página faz parte da arquitetura do site e receberá conteúdo em breve.</p>
      <div className="mt-8"><TextLink href="/">Voltar para a home</TextLink></div>
    </main>
  );
}
```

- [ ] **Step 2: Criar as 8 páginas** — cada uma exporta `metadata` própria + renderiza `PagePlaceholder`. Exemplo (`app/institucional/page.tsx`):

```tsx
import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Institucional — Open Group" };

export default function Page() {
  return <PagePlaceholder kicker="Institucional" title="Quem é a Open Group." />;
}
```
Repetir com os títulos: Atuação ("O que a Open Group faz."), Projetos ("Projetos estruturados antes da obra."), Parceiros ("Ecossistema de parceiros."), Investidores ("Oportunidades estruturadas."), Insights ("Análises e inteligência de mercado."), Contato ("Apresente sua oportunidade.").
Para `app/projetos/[slug]/page.tsx`:
```tsx
import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = { title: "Projeto — Open Group" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PagePlaceholder kicker="Projeto" title={slug.replace(/-/g, " ")} />;
}
```

- [ ] **Step 3: Verificar** — `npx tsc --noEmit` → PASS. `npm run dev` → navegar `/institucional`, `/investidores`, `/projetos/teste` etc. com Header/Footer.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat(routes): páginas placeholder + metadata"`

---

### Task 5.2: SEO — metadata base, sitemap, robots, OG

**Files:** Modify: `app/layout.tsx`; Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Metadata base rica** no `layout.tsx`:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://opengroup.com.br"),
  title: { default: "Open Group — Desenvolvimento Imobiliário", template: "%s · Open Group" },
  description: "Estruturação e desenvolvimento de empreendimentos imobiliários. O valor nasce antes da obra.",
  openGraph: {
    type: "website", locale: "pt_BR", siteName: "Open Group",
    title: "Open Group — Desenvolvimento Imobiliário",
    description: "Estruturação e desenvolvimento de empreendimentos imobiliários.",
    images: [{ url: "/assets/logos/og-logo.png", width: 1200, height: 630, alt: "Open Group" }],
  },
  twitter: { card: "summary_large_image" },
};
```
> Nota: trocar a URL base pelo domínio real quando definido.

- [ ] **Step 2: `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

const routes = ["", "/institucional", "/atuacao", "/projetos", "/parceiros", "/investidores", "/insights", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://opengroup.com.br";
  return routes.map((r) => ({ url: `${base}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
```

- [ ] **Step 3: `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://opengroup.com.br/sitemap.xml" };
}
```

- [ ] **Step 4: Verificar** — `npm run dev` → `/sitemap.xml` e `/robots.txt` respondem; `npm run build` → sem erros.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat(seo): metadata base + sitemap + robots"`

---

## Fase 6 — Verificação final (sem animações)

### Task 6.1: Gates completos + checagem visual e responsiva

- [ ] **Step 1: Typecheck** — `npx tsc --noEmit` → PASS.
- [ ] **Step 2: Lint** — `npm run lint` → PASS (corrigir o que aparecer).
- [ ] **Step 3: Testes** — `npx vitest run` → PASS (cn, useCarousel, ContatoForm).
- [ ] **Step 4: Build** — `npm run build` → sucesso, sem warnings de tipo/SSR.
- [ ] **Step 5: Checagem visual 1:1** — `npm run dev` com a referência aberta lado a lado. Percorrer cada seção (Hero→Footer) em desktop (1440px) e mobile (≤700px). Conferir: tipografia, cores, espaçamentos, alternância clara/escura, header on-dark→sólido, menu mobile, carrosséis, abas, marquee, form. Anotar e corrigir divergências.
- [ ] **Step 6: Acessibilidade básica** — headings hierárquicos, `alt`/`aria-label` presentes, foco visível, contraste. Ajustar.
- [ ] **Step 7: Commit** — `git add -A && git commit -m "chore: verificação final 1:1 (typecheck, lint, testes, build, visual)"`

---

## Fase 7 — Limpeza (após validação do usuário)

### Task 7.1: Remover a pasta de referência

> **Só executar após o usuário confirmar que a recriação 1:1 está aprovada.**

- [ ] **Step 1: Confirmar aprovação do usuário** (gate humano).
- [ ] **Step 2: Remover** `REFERENCE - CLAUDE DESIGN/` e, se desejado, mover assets úteis de `uploads/` para `public/assets/` antes.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "chore: remover pasta de referência (recriação 1:1 concluída)"`

---

## Itens deixados explicitamente para depois (não são placeholders do plano)

- **Fase de movimento** (sob direção do usuário, efeito a efeito): intro letra-a-letra, hero scroll-shrink (sticky 168vh + `--ht/--hs/--hb/--hr`), reveal/fade das seções (`useReveal` + IntersectionObserver), fade do overlay do hero, Lenis (smooth scroll), refino do hambúrguer→X, leitura cinética do manifesto (se desejado).
- **Backend do formulário** (Resend) — hoje só estado de sucesso no front.
- **Conteúdo real das rotas internas** e **renders/logos reais** (via `MediaPlaceholder`/`next/image`).
- **i18n EN.**

## Auto-revisão do plano (cobertura do spec)

- §2 stack → Fase 0 ✔ · §3 arquitetura/convenções → Fases 0-4 ✔ · §4 tokens → Task 0.2 ✔ ·
  §5 componentes → Fase 1 ✔ · §6 seções (todas as 7 + Intro deferida) → Fase 4 ✔ ·
  §7 rotas placeholder → Task 5.1 ✔ · §8 SEO → Task 5.2 ✔ · §9 não-portados → respeitado (image-slot/legado fora) ✔ ·
  §10 tom de marca → conteúdo dos `*.data.ts` segue o vocabulário ✔ · §11 git → Task 0.1 ✔.
- **Intro:** componente/arquivo será criado apenas na fase de movimento (é puramente decorativo); a base não o monta — coerente com "estático primeiro".
- **Consistência de tipos:** `useCarousel` expõe `{ index, goTo, next, prev, dragEnd }` usado igual em Hero e Projetos ✔ · `MediaPlaceholder` `tone` t1/t2/t3 usado em Hero/Projetos ✔ · `ProjetoCat` consistente em data/tabs/seção ✔.
