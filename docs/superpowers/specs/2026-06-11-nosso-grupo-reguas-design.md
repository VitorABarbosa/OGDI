# Nosso Grupo — Redesign "Réguas" (Variação B)

**Data:** 2026-06-11 · **Status:** Aprovado pelo usuário via mockup interativo (companion visual)

## Decisão

Substituir o acordeão de cards escuros atual da seção `InstitucionalGrupo` pela
**Variação B — Réguas/Lombadas**, escolhida entre 6 direções exploradas em mockups
interativos (`.superpowers/brainstorm/1809-1781202354/content/`).

O título "Nosso Grupo" e a frase de introdução permanecem intocados (aprovados).

## Comportamento

- **Palco:** 4 cards escuros (`--color-dark`) lado a lado, gap fino, sobre a seção clara.
- **Idle:** cada card mostra o wordmark da empresa centralizado + papel (role) abaixo.
- **Hover/focus em um card:** os outros colapsam em réguas finas (~72px) com o nome
  rotacionado na vertical (como lombadas de livro) — as 4 empresas ficam sempre visíveis.
  O card ativo expande (flex 5) com borda verde.
- **Card expandido:** wordmark no topo-esquerdo, bloco de informações na base
  (kicker numerado + role, nome em Newsreader, texto, tags em chips), entrando em
  cascata escalonada. Ao fundo, uma assinatura visual em line-art SVG única por
  empresa se desenha (stroke draw) — OGDI: grade + linha ascendente; NID: arcos de
  ninho; Flying: portal em perspectiva; Rinno: fotogramas de filme.
- **Extras de animação:** varredura de brilho (sheen) atravessa o card ao expandir;
  transição de flex com easing mais pronunciado que o `--ease-brand` padrão.
- **Mobile (≤900px):** cards empilhados, todos no estado expandido (sem acordeão),
  motif estático.
- **Acessibilidade:** `tabIndex={0}` + `:focus-within` espelha o hover;
  `prefers-reduced-motion` desliga transições e mostra motifs desenhados.

## Conteúdo

- Textos por empresa conforme copy aprovada no mockup; **Flying atualizada** para
  incluir imagens e perspectivas 3D (pedido do usuário).
- **Logos:** wordmarks tipográficos provisórios (só existe asset da OGDI no repo).
  Substituir pelos arquivos reais quando fornecidos.

## Arquivos

- `app/_sections/InstitucionalPage/InstitucionalGrupo.tsx` — reescrita do palco.
- `app/_sections/InstitucionalPage/InstitucionalGrupo.module.css` — reescrita.
- `app/_sections/InstitucionalPage/institucional.data.ts` — textos/tags da Flying.
