# Contato funcional + mensagem automática no WhatsApp — Design

Data: 2026-06-26

## Objetivo

Deixar o formulário de contato realmente enviando mensagens e fazer o ícone
do WhatsApp abrir uma conversa com mensagem pré-preenchida.

## Decisões

- **Envio do form:** Web3Forms (serviço externo, sem backend). O navegador faz
  `POST` para `https://api.web3forms.com/submit`; o Web3Forms encaminha por
  e-mail para o destino. Escolhido por não exigir nada no host (Napolean/cPanel
  só serve arquivos), sem SMTP nem credenciais privadas. Ver [[ogdi-deploy-cpanel-next-versionado]].
- **Destino:** `contato@ogdi.com.br`.
- **E-mail do site:** atualizar `site.email` de `max@ogdi.com.br` para
  `contato@ogdi.com.br` (fonte única — reflete em footer, contato, ContatoInfo,
  política de privacidade).
- **WhatsApp:** saudação única (sem nome de projeto), nas 3 línguas.

## 1. Formulário de contato

Arquivo: `app/_sections/Contato/ContatoForm.tsx` (client component).

- **Campos** (já existem): nome*, empresa, e-mail*, whatsapp, tipo, mensagem
  (* obrigatórios). Adicionar `name` em cada input/select/textarea.
- **Access key:** constante pública no código (a key do Web3Forms é pública e
  segura de versionar; não usar env, que complica com o build baked do `.next`).
  Placeholder até o usuário gerar a key real para `contato@ogdi.com.br`.
- **Submit:** `fetch` para a API com `FormData` contendo `access_key`, os campos,
  `subject` ("Site OGDI — <tipo>"), `from_name` ("Site OGDI"). O e-mail digitado
  vai no campo `email` (o Web3Forms usa como Reply-To).
- **Estados:**
  - `idle` → formulário normal.
  - `sending` → botão "Enviando…" desabilitado.
  - `success` → tela de sucesso já existente (`contato.form.sucesso.*`).
  - `error` → mensagem de erro com fallback ("tente de novo ou fale pelo WhatsApp").
- **Anti-spam:** input honeypot escondido `name="botcheck"` (campo que humanos
  não veem; se preenchido, o Web3Forms descarta).
- **i18n:** novas chaves `contato.form.sending` e `contato.form.erro` (PT/EN/ES).
- O componente é compartilhado entre a home (`Contato`) e a página `/contato`.

## 2. Mensagem automática no WhatsApp

- Hoje o `text` da URL está vazio em: `FloatingWhatsAppButton.tsx`,
  `app/[locale]/projetos/[slug]/page.tsx`, `EmpHero.tsx`.
- Preencher `text=` com uma saudação única, codificada na URL. Conteúdo i18n
  (PT/EN/ES). Sugestão PT:
  > "Olá! Vim pelo site da Open Group e gostaria de conversar sobre uma oportunidade."
- Como a URL do WhatsApp aparece em componentes server e em pelo menos um lugar
  fora de contexto de request, centralizar a montagem da URL (número + mensagem)
  num helper único e usar a mensagem traduzida onde houver `getTranslations`.

## Fora de escopo

- Captcha visível (só honeypot).
- E-mail saindo do próprio domínio (exigiria SMTP/route handler — opção 2).
- Mensagem de WhatsApp contextual por projeto.

## Pré-requisito do usuário

Gerar a access key em web3forms.com informando `contato@ogdi.com.br` como
destino, e me passar a key para fixar no código.
