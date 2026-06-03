# Open Group — Recriação do site em Next.js (1:1)

**Data:** 2026-06-03
**Status:** Design aprovado — pronto para plano de implementação
**Autor:** Vitor + Claude (brainstorm)

---

## 1. Objetivo

Recriar o site institucional da **Open Group — Desenvolvimento Imobiliário**, hoje
existente como uma página HTML estática produzida pelo "Claude Design", migrando de
uma stack básica (HTML/CSS/JS vanilla) para uma stack moderna (**Next.js**), com
**fidelidade visual e comportamental 1:1**, mas já nascendo com modularização total
de arquivos, seções e componentes, organização de assets, qualidade de código,
escalabilidade, SEO e rotas.

### Fonte de verdade
O design é definido **integralmente** pela pasta de referência:

```
REFERENCE - CLAUDE DESIGN/OGDI/
├── Open Group - Home.html   # estrutura + JS de comportamento
├── styles.css               # sistema visual completo (tokens em :root)
├── assets/
│   ├── og-logo.png          # logo colorido
│   ├── og-logo-light.png    # logo branco (header on-dark, footer, watermark)
│   └── image-slot.js        # ferramenta de edição — NÃO faz parte do site
└── uploads/                 # brand book (PDF), conteúdo, screenshots
```

Quando houver conflito entre decisões antigas e a referência, **a referência manda**.
A pasta de referência será **excluída ao final**, quando a recriação estiver concluída
e validada.

> ⚠️ **Divergência registrada:** o brainstorm de 2026-05-31 havia travado *Playfair
> Display + Inter, direção "Cinematic Imersivo escuro"*. A referência do Claude Design
> usa **Cormorant Garamond + Instrument Sans + Newsreader, direção editorial branca**.
> Como o objetivo é recriar a referência 1:1, as decisões de fonte/cor/direção foram
> **atualizadas para refletir a referência**.

---

## 2. Stack

| Camada | Escolha | Observação |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | rotas, SEO, SSR/SSG |
| Linguagem | **TypeScript** | tipagem em dados e componentes |
| UI | **React 19** | |
| Estilo | **Tailwind v4 (CSS-first, `@theme`)** | sistema padrão |
| Estilo (escape hatch) | **CSS Modules** | só para mecânicas bespoke |
| Smooth scroll | **Lenis** | fase de movimento |
| Animações | **Lógica vanilla portada para React hooks** | fidelidade 1:1, sem reimplementar |
| Deploy | Vercel | |
| SEO | Metadata API + `sitemap.ts` + `robots.ts` | |

> Versões exatas (Next, React, Tailwind, Lenis) serão fixadas e verificadas via
> documentação no início do plano de implementação.

### Decisão de estilo: Tailwind v4 + CSS Modules
- **Tailwind v4 é o sistema padrão** — layout, espaçamento, tipografia, cor,
  responsividade. Config CSS-first: tokens vivem **uma vez** em `@theme` e viram
  utilitários (`bg-teal`, `font-serif`) **e** variáveis CSS (`var(--color-teal)`)
  simultaneamente — fonte única de verdade.
- **CSS Modules é escape hatch estreito** — apenas para mecânicas que o utilitário
  faz mal: scroll-shrink do hero (custom properties inline), arcos concêntricos do
  manifesto, keyframes da intro e do marquee de logos. Regra clara: *Tailwind sempre;
  `.module.css` só para mecânica que não cabe em utilitário* — sem decisão caso a caso.

### Decisão de animação: estático primeiro
Distinção fundamental para honrar a regra "animações só sob orientação":
- **Funcionalidade / comportamento de estado** (entra na base, não é "animação"):
  troca de slide, troca de aba, abrir menu, sucesso de formulário, header sólido ao
  rolar, estados de hover (CSS transitions).
- **Movimento decorativo** (segurado para a fase dedicada, efeito a efeito sob direção
  do usuário): intro letra-a-letra, encolhimento do hero no scroll, reveal/fade das
  seções, fade do overlay do hero, Lenis.

---

## 3. Arquitetura de pastas

```
app/
├── layout.tsx              # <html lang="pt-BR">, fontes, Header, Footer, metadata base
├── globals.css             # @import "tailwindcss" + theme + base
├── page.tsx                # HOME — compõe as 7 seções na ordem
├── _sections/              # SEÇÕES da Home — uma pasta cada (privada, fora do roteamento)
│   ├── Hero/        Hero.tsx · HeroSlide.tsx · Hero.module.css(*) · hero.data.ts
│   ├── Projetos/    Projetos.tsx · ProjetoTabs.tsx · ProjetoCard.tsx · projetos.data.ts
│   ├── Atuacao/     Atuacao.tsx · AtuacaoRow.tsx · atuacao.data.ts
│   ├── Modelos/     Modelos.tsx · ModeloCard.tsx · modelos.data.ts
│   ├── Manifesto/   Manifesto.tsx · Manifesto.module.css(*)
│   ├── Clientes/    Clientes.tsx · Clientes.module.css(*) · clientes.data.ts
│   └── Contato/     Contato.tsx · ContatoForm.tsx · ContatoInfo.tsx
├── institucional/page.tsx
├── atuacao/page.tsx
├── projetos/page.tsx
│   └── [slug]/page.tsx     # página individual de projeto
├── parceiros/page.tsx
├── investidores/page.tsx
├── insights/page.tsx
├── contato/page.tsx
├── sitemap.ts
└── robots.ts

components/
├── layout/   Header/ (Header · Nav · MobileMenu) · Footer/ · Intro/ (Intro.module.css*)
└── ui/       Button · Kicker · SectionHeading · TextLink · MediaPlaceholder · Icon · Carousel/

hooks/        useHeaderScroll · useCarousel · useMobileMenu · useReveal* · useHeroScrollShrink* · useLenis*
lib/          cn.ts (classnames) · utils
data/         nav.ts · site.ts        # dados cross-page (menu, e-mail, social) — fonte única
styles/       theme.css (@theme tokens) · base.css (resets, ::selection)
content/      # MDX (futuro)
public/assets/  logos/ · projetos/ · clientes/

next.config.ts · tsconfig.json (alias @/*) · postcss.config.mjs · package.json · README.md
```

`(*)` = CSS Module onde a mecânica não cabe em utilitário · `*` = hook da fase de movimento

### Convenções
1. **Página → pasta · seção → pasta · cada seção é autossuficiente** (seu `.tsx`,
   subcomponentes e `*.data.ts`).
2. **Seções renderizam por dados, não hardcode.** Conteúdo mora em arrays tipados
   (`*.data.ts`) e a seção mapeia. Editar conteúdo = editar dado.
3. **`MediaPlaceholder`** substitui `image-slot` e os `.ph`: placeholder gradiente
   elegante agora; troca para `next/image` quando o render real chegar, sem mexer no
   layout.
4. **Dados cross-page em `data/`** (menu de navegação, e-mail, telefone, social,
   copyright) — fonte única consumida por Header, MobileMenu e Footer.
5. **Alias `@/*`** apontando para a raiz (ex.: `@/components/ui/Button`,
   `@/hooks/useReveal`).

---

## 4. Design tokens (extraídos da referência → `@theme`)

```
Cores
  --white / --paper     #FFFFFF
  --bg-soft             #F7F6F4   (alternância sutil de seção)
  --bg-soft-2           #F2F1ED
  --ink                 #171A1B   (texto principal)
  --ink-2               #565D5E
  --ink-3               #8B9192
  --line                rgba(23,26,27,0.12)
  --line-2              rgba(23,26,27,0.22)
  --teal                #1F5A63   (institucional)
  --teal-deep           #143E45
  --green               #5FA83C   (acento)
  --green-deep          #2C5E22
  --dark                #121617   (blocos escuros / contato)
  --dark-2              #171C1D   (footer)
  --on-dark             #F2F1ED
  --on-dark-2           #9AA3A4
  --line-dark           rgba(242,241,237,0.14)
  manifesto bg          #062B3C   (petróleo) · acento .em #57B13A

Tipografia
  --serif   'Cormorant Garamond', Georgia, serif
  --sans    'Instrument Sans', system-ui, sans-serif
  manifesto 'Newsreader', Georgia, serif
  escalas   h-1 clamp(30px,4vw,56px) · h-2 clamp(26px,3vw,42px) · h-3 clamp(22px,2.2vw,30px)
            lead clamp(15px,1.15vw,18px) · kicker 11px/.22em uppercase

Espaçamento / ritmo
  --pad-x        clamp(20px, 5vw, 88px)
  --gap-section  clamp(80px, 11vw, 168px)
  wrap max       1440px

Easings
  --ease    cubic-bezier(.22,.61,.36,1)
  --ease-2  cubic-bezier(.16,1,.3,1)
```

Fontes carregadas via `next/font` (Google Fonts): Cormorant Garamond, Instrument Sans,
Newsreader — substituindo o `<link>` do HTML, com otimização e zero CLS.

---

## 5. Componentes compartilhados (design system)

Extraídos da referência:

| Componente | Origem na referência | Variantes / notas |
|---|---|---|
| `Button` | `.btn` | default, `btn-light`, `btn-solid`, `btn-sm`; ícone `.ar` (seta) com hover translate |
| `Kicker` | `.kicker` | label uppercase + dot verde; variante `on-dark-green` |
| `SectionHeading` | `.h-display` | níveis h-1/h-2/h-3 |
| `TextLink` | `.tlink` | underline + gap-grow no hover |
| `MediaPlaceholder` | `.ph` / `.ph t2` / `.ph t3` + `image-slot` | gradientes arquitetônicos; aceita `src` futuro → `next/image` |
| `Icon` | SVGs inline | setas chevron, social (LinkedIn/Instagram), check, rings dos modelos |
| `Carousel` | lógica do hero + projetos | hook `useCarousel` (autoplay, drag/swipe, dots); render por seção |
| `Header` / `Nav` / `MobileMenu` | `.header` / `.nav` / `.mobile-menu` | estado scrolled + on-dark; toggle mobile |
| `Footer` | `.footer` | 4 colunas + bottom (copy + social) |
| `Intro` | `.intro` | overlay; animação na fase de movimento |

---

## 6. Especificação por seção (Home)

Ordem real do HTML de referência. Cada seção lista **conteúdo/dados**, **comportamento
base** e **movimento deferido**.

### 6.1 Intro (overlay)
- Frase: **"O valor nasce antes da obra."**
- Base: overlay escuro cobrindo a tela no load; remove e libera scroll.
- Movimento (deferido): texto sobe letra a letra (`introRise`), ponto final verde,
  overlay desliza pra cima e é removido; body travado durante a intro.

### 6.2 Header + MobileMenu
- Nav: Manifesto · Atuação · Modelos · Projetos · Clientes · Investidores · Insights ·
  Contato (âncoras `#...`).
- Logo duplo (color / light) trocando conforme `on-dark`.
- Base: fixo; vira sólido + blur ao rolar (`scrolled`); transparente sobre o hero
  (`on-dark`); menu mobile abre/fecha (hambúrguer → X).
- Dados: itens de menu em `data/nav.ts`.

### 6.3 Hero
- Carrossel full-bleed de 5 slides (Hits Santa Catarina, Hits Cupecê, Start Park
  Jabaquara, Oh Freguesia, Immensità), cada um com `kick`, `name`, `meta` (status |
  tipo | localização, com `@` = a confirmar) e `sign` (atuação OGDI).
- Frase fixa: "O valor nasce antes da obra." · scrim (gradientes) · setas prev/next ·
  info do slide ativo embaixo.
- Base: carrossel 100vh com autoplay (6.5s), setas e troca de slide; placeholders `.ph`.
- Movimento (deferido): `hero-stage` 168vh + sticky → frame encolhe e ganha
  border-radius no scroll (`--ht/--hs/--hb/--hr`); overlay faz fade.
- Dados: `hero.data.ts`.

### 6.4 Projetos (estilo Cyrela)
- Abas: **Em obra · Futuro lançamento · Entregue**.
- Carrossel "featured" com card central em destaque (escala), scrim, status/nome/tag,
  CTA por card; dots; setas que reposicionam.
- Base: troca de aba filtra slides; carrossel arrastável (pointer drag/swipe), dots e
  setas funcionais; card ativo em `scale(1)`.
- Dados: `projetos.data.ts` (cada projeto: cat, status, nome, tag, placeholderTone,
  cta).
- CTA rodapé: "Ver todos os projetos" → `/projetos`.

### 6.5 Nossa Atuação
- Coluna esquerda (sticky): kicker, título "Da origem ao lançamento", lead, tags
  (Consultoria contratada · Parceira estratégica · Sócia da operação).
- Lista de **7 etapas** (01–07) com título + descrição; hover desliza padding.
- Watermark do logo (light) ao fundo.
- Base: lista mapeada de `atuacao.data.ts`; coluna sticky; hover.
- Seção em fundo `soft`.

### 6.6 Modelos de Atuação
- 3 cards: Consultoria contratada (i.) · Parceria estratégica (ii.) · Participação
  societária (iii.), cada um com SVG "ring" próprio + descrição.
- Base: grid 3→1 responsivo; hover lift; mapeado de `modelos.data.ts` (o SVG do ring é
  parte do dado/variante).

### 6.7 Manifesto
- Fundo petróleo `#062B3C`, arcos concêntricos (`Manifesto.module.css`), Newsreader.
- Texto: "Antes da obra, existe a **decisão**. / Antes do lançamento, existe a
  **estrutura**. / Antes do valor, existe **visão**." (palavras-acento em verde itálico).
- Assinatura: logo + "Open Group. Desenvolva com visão desde a origem."
- Base: estático (a leitura cinética do HTML é legado/no-op — não portada nesta fase;
  pode entrar na fase de movimento se desejado).

### 6.8 Clientes
- Faixa full-bleed de logos rolando em loop infinito (8 logos fictícios: ATRIO,
  VÉRTICE, MERIDIANO, PRISMA, NORTE, PÁTIO, TERRA, HORIZONTE), com máscara de fade nas
  bordas; pausa no hover.
- Base: marquee CSS (`Clientes.module.css`) — comportamento contínuo, parte do visual.
- Dados: `clientes.data.ts` (logos reais entram em `public/assets/clientes/` depois,
  via `MediaPlaceholder`/SVG).

### 6.9 Contato
- Fundo escuro. Coluna esquerda: kicker, "Apresente sua oportunidade.", subtítulo,
  infos (e-mail, WhatsApp/Telefone, Localização).
- Form: Nome · Empresa · E-mail · WhatsApp · Tipo de contato (select: Apresentar
  oportunidade / Falar sobre projeto / Parceria / Investimento / Imprensa / Outro) ·
  Mensagem. Estado de sucesso ("Mensagem recebida.").
- Base: form controlado; submit → estado de sucesso (sem backend nesta fase; integração
  Resend fica como item futuro).

### 6.10 Footer
- Marca + tag "O valor nasce antes da obra." · colunas: Navegação · Atuação · Contato ·
  bottom: copyright + Política de Privacidade + social (LinkedIn, Instagram).
- Dados de navegação/contato/social de `data/nav.ts` + `data/site.ts`.

---

## 7. Rotas placeholder (preparadas, sem conteúdo final)

`/institucional` · `/atuacao` · `/projetos` · `/projetos/[slug]` · `/parceiros` ·
`/investidores` · `/insights` · `/contato`.

Cada uma: página mínima com Header/Footer compartilhados, título e metadata própria,
pronta para receber conteúdo futuro (estrutura completa documentada em
`uploads/Estrutura_Site_OGDI.txt`). A navegação da Home permanece por âncoras; links
externos à Home usam `/#secao`.

---

## 8. SEO

- `Metadata` no `layout.tsx` (base) + por rota (title, description, OpenGraph com
  `og-logo.png`, lang pt-BR).
- `app/sitemap.ts` e `app/robots.ts`.
- HTML semântico (header/main/section/footer), headings hierárquicos, `alt` em imagens,
  `aria-label` preservados da referência.

---

## 9. O que NÃO é portado / fica para o futuro

- **`image-slot.js`** — ferramenta de edição do ambiente Claude Design (drag-drop +
  sidecar). Substituída por `MediaPlaceholder` + `next/image`.
- **CSS legado não usado** na referência: `.inst`, `.parc-intro`/`.marquee`,
  `.grupo-acc`.
- **Seção "Conheça nosso grupo"** (Flying Studio / Rinno Films / NID) — descrita na
  estrutura mas ausente do HTML renderizado. Roadmap.
- **Backend do formulário** (Resend) — fase futura; agora só estado de sucesso no front.
- **Conteúdo real** das rotas internas e **renders/logos reais** — entram depois.
- **i18n EN** — arquitetura amigável, mas só PT agora.

---

## 10. Tom de marca (guarda-corpo de conteúdo)

Comunicação institucional, estratégica, B2B — nunca venda residencial/promocional.
- **Usar:** estruturação, viabilidade, operação, parceiros, lançamento, visão,
  estratégia, valor, potencial, desenvolvimento, inteligência de mercado, produto
  imobiliário, CEF.
- **Evitar:** sonho, lar, conquista, família, barato, promoção, imperdível, facilitado.
- **Âncora:** "O valor nasce antes da obra."
- **Arquétipos:** Mago (transformação) + Rei (autoridade).

---

## 11. Itens em aberto

- Versões exatas das dependências (fixar no plano).
- Repositório git: a raiz ainda não é repo git — decidir inicialização no início da
  implementação.
- Manifesto: avaliar (na fase de movimento) se a leitura cinética do HTML legado deve
  ser reativada ou se o manifesto permanece estático.
```
