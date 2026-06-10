# Empreendimento V2 Narrativa - Design

Data: 2026-06-10

## Objetivo

Recriar a pagina individual de empreendimento usando o Hits Cupece como modelo V2 para as proximas paginas. A pagina deve deixar de ser uma sequencia informativa simples e passar a construir uma narrativa: primeiro despertar interesse pelo empreendimento, depois revelar a inteligencia e a estruturacao da Open Group por tras da operacao.

## Direcao Aprovada

Usar uma abordagem hibrida narrativa:

- A primeira camada deve ser compreensivel para quem quer conhecer o empreendimento.
- A camada principal deve mostrar a leitura estrategica da Open Group: lugar, produto, operacao e execucao.
- O tom deve dialogar com o manifesto da home: antes da obra existe decisao, estrutura e visao.
- A pagina deve servir como matriz reutilizavel para outros empreendimentos.

## Conteudo Base do Hits Cupece

- Nome: Hits Cupece
- Endereco: Rua Dom Joao Soares Coelho
- Regiao: Cupece, Sao Paulo
- Unidades: 1 e 2 dormitorios
- Diferencial de unidade: terraco com churrasqueira
- Contexto territorial: proximo a Avenida Cupece, comercio, conveniencias, acesso a Ponte do Morumbi, Marginal Pinheiros, centro de Diadema e Rodovia dos Imigrantes.
- Tese editorial: localizacao em ascensao e valorizacao, com facil acesso e conveniencia cotidiana.

## Narrativa da Pagina

### 1. Hero Editorial

O hero continua full-bleed e visual, mas passa a entregar mais contexto logo na primeira dobra.

Conteudo:

- Breadcrumb discreto.
- Status e categoria.
- Titulo `Hits Cupece`.
- Subtexto curto conectando endereco, regiao e proposta.
- Chips de fatos essenciais: `Em obra`, `1 e 2 dormitorios`, `Terraco com churrasqueira`, `Cupece - Sao Paulo`.
- CTA primario para interesse no empreendimento.

Intencao:

O usuario deve entender rapidamente o que e o projeto, onde esta e por que continuar rolando.

### 2. A Tese do Lugar

Secao inspirada no manifesto da home.

Mensagem central:

> Antes da obra, existe a leitura do territorio.

Conteudo:

- Texto editorial explicando que o Cupece foi tratado como uma oportunidade pela combinacao de valorizacao, comercio, conveniencia e mobilidade.
- Destaques em tres blocos: `Regiao em ascensao`, `Conexoes urbanas`, `Cotidiano conveniente`.
- Uso da Avenida Cupece como eixo narrativo: ela conecta a zona sul, Diadema, Marginal Pinheiros e acesso ao litoral via Imigrantes.

Intencao:

Transformar a localizacao em tese, nao apenas em informacao.

### 3. O Produto Como Resposta

Secao que mostra que a definicao de produto nao e generica.

Conteudo:

- Texto sobre 1 e 2 dormitorios como resposta a uma demanda urbana de moradia pratica, conectada e eficiente.
- Destaque para terraco com churrasqueira como extensao da experiencia de morar.
- Cards compactos com:
  - Tipologia
  - Endereco
  - Mobilidade
  - Experiencia

Intencao:

Mostrar que o produto nasce da leitura do publico, do territorio e da operacao.

### 4. Galeria Como Respiro Narrativo

A galeria atual permanece, com as imagens reais do Cupece e lightbox suave ja implementado.

Mudancas:

- Adicionar abertura textual antes da grade.
- Tratar as imagens como prova visual da experiencia do produto.
- Manter animacao por scroll e hover suave.

Intencao:

Fazer a galeria deixar de ser um bloco isolado e virar continuidade da narrativa.

### 5. Estruturacao Open Group

A secao atual de atuacao deve continuar, mas com uma entrada especifica para o caso Cupece antes dos passos genericos.

Conteudo:

- Texto curto explicando como a Open Group participa antes da obra: leitura da oportunidade, desenvolvimento de produto, viabilidade, articulacao e conducao ate a obra.
- Os passos atuais podem ser mantidos, mas devem parecer conectados ao caso exibido.

Intencao:

Reforcar autoridade institucional sem deixar a pagina fria.

### 6. Fechamento de Sintese

Faixa final antes de `Outros empreendimentos`.

Mensagem:

> Cupece nao e apenas um endereco. E uma operacao estruturada a partir de localizacao, demanda e visao de produto.

CTA:

- `Tenho interesse no empreendimento`

Intencao:

Encerrar a leitura com uma ideia memoravel e uma acao clara.

## Estrutura de Dados

Expandir o tipo `Projeto` para suportar conteudo narrativo reutilizavel:

- `address?: string`
- `units?: string`
- `unitFeature?: string`
- `heroSummary?: string`
- `facts?: string[]`
- `locationStory?: { kicker: string; title: string; body: string[]; highlights: { title: string; text: string }[] }`
- `productStory?: { kicker: string; title: string; body: string[]; cards: { label: string; value: string; text?: string }[] }`
- `strategyStory?: { kicker: string; title: string; body: string[] }`
- `closingStatement?: { title: string; text: string; ctaLabel: string }`

Os campos devem ser opcionais para preservar os demais projetos durante a transicao. Quando um projeto nao tiver os campos V2, a pagina pode usar os dados atuais.

## Componentes

Atualizar ou criar componentes dentro de `app/_sections/EmpreendimentoPage`:

- `EmpHero`: incluir resumo, fatos e CTA quando disponiveis.
- `EmpInfo`: evoluir de ficha + texto para bloco narrativo ou ser substituido por secoes V2.
- `EmpLocationStory`: nova secao para tese do lugar.
- `EmpProductStory`: nova secao para produto como resposta.
- `EmpGaleria`: manter galeria e adicionar cabecalho narrativo opcional.
- `EmpAtuacao`: aceitar contexto opcional do projeto para abrir a secao com mais especificidade.
- `EmpClosing`: nova faixa de sintese antes dos proximos empreendimentos.

## Movimento e Camadas

Usar as animacoes existentes de `RevealController` e `styles/reveal.css`, com novas classes se necessario.

Diretrizes:

- Entrada por camadas: kicker, titulo, texto, cards e imagens.
- Nada deve aparecer como bloco unico pesado.
- Animacoes devem ser suaves, sem delays excessivos.
- Evitar efeitos de background experimentais nesta fase.
- Preservar `prefers-reduced-motion`.

## Responsividade

Desktop:

- Hero com conteudo editorial na base.
- Secoes narrativas em grids assimetricos, com texto e cards.
- Galeria mantendo alturas alinhadas por linha.

Mobile:

- Sequencia linear clara.
- Chips e cards quebrando sem overflow.
- Tipografia editorial, mas sem ocupar a tela inteira em secoes internas.
- CTA sempre legivel e sem sobreposicao.

## Fora de Escopo

- Criar novo efeito de background ondulado.
- Alterar a home.
- Criar CMS ou fonte externa de dados.
- Aplicar a V2 para todos os projetos agora.
- Trocar as imagens do Cupece.

## Validacao

Automatica:

- Testes de renderizacao da pagina do Cupece.
- Testes garantindo que os novos dados aparecem: endereco, unidades, terraco com churrasqueira e tese do lugar.
- Testes existentes da galeria continuam passando.
- `npm test`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

Manual:

- Usuario fara validacao visual e de narrativa.
- A leitura deve parecer progressiva, com interesse ate o fim.
- A pagina deve deixar claro que a Open Group estrutura valor antes da obra.

## Criterios de Sucesso

- A pagina do Hits Cupece parece mais profunda, editorial e estrategica.
- A narrativa conecta localizacao, produto e estruturacao OGDI.
- A experiencia visual segue a linguagem da home e do manifesto.
- A estrutura fica pronta para ser copiada para outros empreendimentos.
- Nenhum comportamento ja aprovado da galeria e do lightbox regride.
