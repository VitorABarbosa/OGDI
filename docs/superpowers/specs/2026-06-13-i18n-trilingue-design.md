# i18n trilíngue (PT/EN/ES) — Design

**Data:** 2026-06-13
**Projeto:** Open Group — Desenvolvimento Imobiliário (OGDI)
**Stack:** Next.js 15.5.19 (App Router) + TypeScript + Tailwind v4 + next-intl

## Objetivo

Internacionalizar o site institucional para **três idiomas**: português (default),
inglês e espanhol. Reestruturar o roteamento, extrair as ~700 strings de prosa
hardcoded + os textos dos `*.data.ts`, e produzir as traduções EN/ES respeitando o
tom de marca B2B (Brand Book: arquétipos Mago + Rei; nunca venda residencial).

O seletor de idioma já existe na UI (`LangSwitcher` no Header), hoje apenas
apresentacional — será ligado à navegação real.

## Decisões travadas (via brainstorming)

1. **Roteamento:** subpath. PT na raiz sem prefixo; EN→`/en`, ES→`/es`.
2. **Biblioteca:** next-intl (v4), mensagens JSON com namespaces por página, `setRequestLocale` para manter SSG.
3. **Tradução:** eu produzo EN/ES a partir de um **glossário de marca** aprovado antes.
4. **Catálogos:** um JSON por idioma (`messages/pt.json`, `en.json`, `es.json`), namespaced.
5. **Páginas `/projetos/[slug]`:** só UI/labels traduzidos agora; a cópia editorial
   PROVISÓRIA de cada empreendimento permanece em PT até a cópia real chegar.

## Arquitetura

### Roteamento e estrutura de arquivos

- Mover todas as rotas de `app/*` para **`app/[locale]/*`**:
  `page.tsx`, `institucional/`, `projetos/`, `projetos/[slug]/`, `clientes/`,
  `investidores/`, `insights/`, `contato/`, `parceiros/`, `politica-de-privacidade/`.
- **Layout raiz passa a ser `app/[locale]/layout.tsx`** (padrão next-intl): ele renderiza
  `<html lang={locale}>`/`<body>`, recebe `params.locale` e monta `NextIntlClientProvider`,
  `LenisProvider`, `Header`, `Footer`. O atual `app/layout.tsx` é removido (não coexiste com
  um root layout dentro de `[locale]`). Toda a metadata global migra para o layout do locale.
- `globals.css`, `favicon.ico`, `icon.png`, `apple-icon.png` permanecem onde o Next exige.
- `robots.ts` permanece na raiz. `sitemap.ts` passa a emitir as 3 variantes por rota
  com `alternates.languages`.

### Config next-intl (v4)

- `i18n/routing.ts` — `defineRouting({ locales: ['pt','en','es'], defaultLocale: 'pt', localePrefix: 'as-needed' })`.
- `i18n/request.ts` — `getRequestConfig` resolvendo o locale do segmento e carregando `messages/<locale>.json`.
- `i18n/navigation.ts` — `createNavigation(routing)` exportando `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` cientes do locale.
- `middleware.ts` — middleware do next-intl para negociação/roteamento de locale. `matcher` excluindo `/_next`, assets estáticos, `/api`.
- `next.config.ts` — envolver com `createNextIntlPlugin('./i18n/request.ts')`.

### Renderização estática (regra "estático primeiro")

- `generateStaticParams` no `app/[locale]/layout.tsx` → `routing.locales.map(locale => ({locale}))`.
- `setRequestLocale(locale)` no layout do locale **e** em cada `page.tsx` (e no `generateMetadata`) para manter SSG.
- `app/[locale]/projetos/[slug]` mantém seu `generateStaticParams` dos 6 slugs; combinado com os 3 locales → 18 páginas estáticas.
- Validação de locale com `hasLocale(routing.locales, locale)` → `notFound()`.

### Acesso às traduções

- **Server components (44 seções + páginas):** `getTranslations('namespace')` (async) ou `useTranslations` se aplicável.
- **Client components (13 seções + Header/MobileMenu/Nav/ContatoForm/carrosséis):** `useTranslations('namespace')` sob `NextIntlClientProvider`.
- O provider no layout recebe as mensagens necessárias ao cliente (estratégia: passar mensagens completas é aceitável para um site deste tamanho; otimizar depois se o bundle pesar).

### Metadata localizada

- `export const metadata` das páginas → `generateMetadata({ params })` async, puxando `title`/`description` do catálogo via `getTranslations`.
- `metadataBase`, openGraph `locale` (`pt_BR`/`en_US`/`es_ES`) e `alternates.languages` por rota.

### Seletor de idioma

- `LangSwitcher` (Header) e o equivalente no `MobileMenu` passam a usar `usePathname`/`useRouter` do `i18n/navigation` para navegar à mesma rota no locale escolhido, marcando o idioma ativo. Remover a marcação "só apresentação" do comentário.

## Catálogos de mensagem

- `messages/pt.json`, `messages/en.json`, `messages/es.json`.
- **Namespaces espelham a arquitetura seção→pasta:** `common`, `nav`, `footer`,
  `home.*`, `institucional.*`, `projetos.*`, `empreendimento.*`, `clientes.*`,
  `investidores.*`, `insights.*`, `contato.*`, `parceiros.*`, `privacidade.*`.
- Textos hoje em `*.data.ts` que são **prosa** viram chaves de tradução; a estrutura
  do data file (ids, hrefs, ordenação, flags) permanece em TS. Listas editoriais
  (ex.: `footerAtuacao`, perfis de cliente, passos de atuação) são modeladas como
  arrays de chaves ou objetos com `key` → texto no catálogo.
- Conteúdo PROVISÓRIO dos `[slug]` fica como chave PT; EN/ES recebem cópia do PT
  (marcado) até a versão real.

## Glossário de marca (PT→EN→ES) — aprovar antes de traduzir

Semente; refinada e expandida na Fase 2 antes da tradução página a página.

| PT | EN | ES |
|---|---|---|
| estruturação | structuring | estructuración |
| viabilidade | feasibility | viabilidad |
| incorporação / desenvolvimento | (real estate) development | desarrollo inmobiliario |
| operação | venture / deal | operación |
| produto imobiliário | real estate product | producto inmobiliario |
| inteligência de mercado | market intelligence | inteligencia de mercado |
| potencial | potential | potencial |
| lançamento | launch | lanzamiento |
| parceiros | partners | socios / aliados |
| visão / estratégia | vision / strategy | visión / estrategia |
| "O valor nasce antes da obra." | "Value is created before ground is broken." | "El valor nace antes de la obra." |
| "Estruturação e Desenvolvimento de Empreendimentos Imobiliários." | "Structuring and Development of Real Estate Ventures." | "Estructuración y Desarrollo de Emprendimientos Inmobiliarios." |

Restrições de tom (do Brand Book, válidas nos 3 idiomas): institucional/estratégico;
**evitar** equivalentes de sonho/lar/conquista/família/barato/promoção/imperdível/
assessoria genérica.

## Faseamento da execução

1. **Infra** — instalar next-intl; criar `i18n/routing.ts`, `i18n/request.ts`,
   `i18n/navigation.ts`, `middleware.ts`; plugin no `next.config.ts`; mover
   `app/*`→`app/[locale]/*`; `NextIntlClientProvider` no layout; `generateStaticParams`
   + `setRequestLocale`; ligar `LangSwitcher`/`MobileMenu`. Criar `messages/{pt,en,es}.json`
   inicialmente só com `pt` populado e `en`/`es` = cópia do PT.
   **Gate:** `tsc`, `next lint`, `vitest`, `next build` (18+ páginas) verdes; navegação
   `/`, `/en`, `/es` funcionando com conteúdo PT em todos.
2. **Glossário** — fechar a tabela completa com o usuário.
3. **Extração + tradução por página** — ordem: `common`/`nav`/`footer` → `home` →
   `institucional` → `projetos` → `empreendimento (UI only)` → `clientes` →
   `investidores` → `insights` → `contato` → `parceiros` → `privacidade`. Por página:
   extrair PT para o catálogo, traduzir EN/ES com o glossário. Gates verdes a cada página.
4. **Revisão final** — usuário revisa EN/ES; ajustes de tom.

## Riscos e cuidados

- **Lockfile/Railway:** adicionar next-intl regenera `package-lock.json`. Gerar **no Docker
  node:22 (Linux)**, nunca no Windows, senão `npm ci` no Railway quebra. (Ver memória
  `ogdi-lockfile-linux`.)
- **Build pesado:** rodar `next build` só nos gates de fase (não em tweaks pequenos).
- **Mover `app/`→`app/[locale]/`** quebra todos os imports relativos a páginas e os
  caminhos de teste; os imports usam alias `@/` então a maioria sobrevive, mas validar.
- **Testes existentes** (`Header.test`, `ContatoForm.test`, etc.) podem precisar de um
  wrapper `NextIntlClientProvider` com mensagens de teste.
- **`generateStaticParams` aninhado** (locale × slug) precisa de verificação para não
  cair em renderização dinâmica.

## Critérios de sucesso

- `/`, `/en`, `/es` e todas as sub-rotas renderizam estaticamente nos 3 idiomas.
- Nenhuma URL PT atual quebra (PT sem prefixo).
- Seletor de idioma navega entre locales preservando a rota.
- Zero strings de prosa hardcoded restantes nas seções/`data` (exceto cópia provisória
  dos `[slug]`, intencionalmente PT).
- EN/ES coerentes com o glossário; gates `tsc`/`lint`/`vitest`/`build` verdes.
