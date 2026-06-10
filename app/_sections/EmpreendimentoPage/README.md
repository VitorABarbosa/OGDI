# Padrão EmpreendimentoPage

Este módulo define o padrão da página individual de projeto usada em `/projetos/[slug]`.

## Composição da rota

Mantenha a composição da página nesta ordem:

1. `RevealController`
2. `EmpHero`
3. `EmpInfo`
4. `EmpLocationStory`
5. `EmpProductStory`
6. `EmpGaleria`
7. `EmpAtuacao`
8. `EmpNeighborhoodMap` com Google Maps quando o projeto tiver `map`, ou `EmpClosing` como fallback
9. `EmpProximos`
10. `CtaBand`

Não crie uma rota paralela `V2` nem uma versão duplicada da página. Melhorias devem evoluir estes componentes e o contrato de dados do projeto.

## Contrato de dados para um projeto completo

Novos projetos ativos devem incluir estes campos de `Projeto` em `app/_sections/Projetos/projetos.data.ts`:

- `heroSummary`
- `facts` com 4 fatos curtos
- `intro`
- `locationStory` com `kicker`, `title`, `body` e 3 `highlights`
- `productStory` com `kicker`, `title`, `body` e 4 `cards`
- `galleryIntro`
- `strategyStory`
- `map` quando houver coordenadas e pontos de entorno
- `closingStatement`
- `gallery`

A narrativa pretendida é:

1. Apresentar o projeto e os fatos principais no hero.
2. Explicar a oportunidade e o território em `EmpInfo` e `EmpLocationStory`.
3. Mostrar como o produto responde a essa leitura em `EmpProductStory`.
4. Usar a galeria como prova visual do conceito.
5. Explicar a estrutura da Open Group por trás da operação em `EmpAtuacao`.
6. Mostrar localização e entorno filtrável via Google Maps em `EmpNeighborhoodMap`, quando houver mapa configurado.
7. Fechar com uma síntese objetiva e CTA em `EmpClosing` quando o mapa ainda não estiver configurado.

## Testes

`EmpreendimentoPage.test.tsx` protege o padrão de dados dos projetos ativos. Ao adicionar um novo projeto ativo, inclua os mesmos campos narrativos e estenda o teste se o projeto fizer parte do conjunto padronizado.
