# SEO · Google Ads · Logística de leads — plano de ação

> Auditoria de 2026-06-16. Estado do site no commit `b2c23e5` (branch `feat/i18n`).
> Objetivo: deixar o site pronto para indexação forte e para rodar Google Ads com conversão medida.

## Estado atual

**Já existe (OK):**
- `app/robots.ts` (libera tudo + aponta sitemap) e `app/sitemap.ts` com alternates de idioma (pt/en/es).
- Metadata raiz (`app/[locale]/layout.tsx`): `metadataBase` = `https://opengroup.com.br`, title template, description, Open Graph (`og-logo.png` 1200×630), Twitter card, `og:locale` pt_BR/en_US/es_ES.
- `html lang={locale}`, favicon/icon/apple-icon.

**Faltando (gaps):**
- ❌ `hreflang` + `canonical` no `<head>` (layout não define `alternates`). Crítico num site trilíngue.
- ❌ Dados estruturados JSON-LD (Organization, Residence/RealEstateListing, BreadcrumbList).
- ❌ Metadata própria por página e por projeto (hoje `projetos/[slug]` só tem `title`; sem description/OG por empreendimento).
- ❌ Galeria usa `<img>` cru (não `next/image`) → impacto em LCP/Core Web Vitals.
- ❌ Rastreamento: sem GA4, tag do Google Ads, GTM ou analytics. **Bloqueia Ads.**
- ❌ Formulário de contato é no-op (`ContatoForm.tsx`: `onSubmit` só faz `preventDefault()` + `setSent(true)`). Lead não vai a lugar nenhum e não gera conversão.
- ❌ Banner de consentimento LGPD + Consent Mode v2.
- ❌ Google Search Console (verificação + submissão de sitemap).

---

## Fase 1 — Fundação SEO (código puro, sem contas externas)

- [ ] `alternates` no `layout.tsx` e por página: `canonical` + `languages` (pt/en/es) + `x-default`.
- [ ] Metadata própria por página (description única) e **por projeto**: description + **OG image = fachada do empreendimento** (não o logo genérico).
- [ ] JSON-LD:
  - [ ] `Organization` global (nome, logo, url, sameAs/redes, contato).
  - [ ] `Residence`/`RealEstateListing` por projeto (nome, endereço, imagem, status).
  - [ ] `BreadcrumbList` nas páginas internas.
- [ ] Migrar galeria (`shared-element-gallery` / `EmpGaleria`) para `next/image` (lazy + `srcset` responsivo).
- [ ] Conferir `next.config.ts` (image config) e `sizes`/`priority` nas imagens de hero.

## Fase 2 — Rastreamento (precisa de contas/IDs)

- [ ] Decidir abordagem: **GTM** (1 container, marketing gerencia) _ou_ **GA4 + Ads direto via gtag**.
- [ ] Instalar via `next/script` (strategy `afterInteractive`), com **Consent Mode v2** (default `denied` até consentimento).
- [ ] Banner de consentimento LGPD (carrega tags só após aceite).
- [ ] Eventos de conversão:
  - [ ] `generate_lead` — submit do formulário de contato.
  - [ ] clique no **WhatsApp** (`wa.me`/telefone).
  - [ ] clique em **"Tenho interesse"** (CTA dos empreendimentos).
  - [ ] clique no telefone.
- [ ] Importar conversões no Google Ads e marcar a principal (lead) como conversão primária.

**IDs necessários:** `G-XXXXXXX` (GA4), `AW-XXXXXXX` + label de conversão (Ads), `GTM-XXXXX` (se GTM).

## Fase 3 — Logística do lead (decisão)

- [ ] Definir destino do formulário (`ContatoForm.tsx`):
  - **E-mail** (Resend/SMTP via route handler `app/api/contato`) — mais simples.
  - **CRM** (RD Station / HubSpot / Pipedrive) — gestão de funil.
  - **WhatsApp** (monta mensagem + abre `wa.me`, sem backend).
- [ ] Implementar envio real + estado de sucesso/erro + anti-spam (honeypot/rate-limit).
- [ ] Disparar o evento de conversão no sucesso do envio.

## Fase 4 — Infra de marketing / monitoramento

- [ ] Google Search Console: verificar domínio (DNS ou meta) e submeter `sitemap.xml`.
- [ ] Google Business Profile (imobiliário/local).
- [ ] (Opcional) Landing pages dedicadas por empreendimento/campanha para Quality Score.
- [ ] Revisar performance (Lighthouse/PageSpeed) após Fase 1.

---

## Decisões pendentes (preencher antes de executar)

| Item | Decisão |
|------|---------|
| Domínio final em produção | `https://opengroup.com.br` ? |
| GTM ou gtag direto | |
| GA4 Measurement ID | |
| Google Ads ID + label de conversão | |
| Destino do lead (e-mail/CRM/WhatsApp) | |
| E-mail/CRM de destino | |

## Ordem recomendada
1. **Fase 1** (impacto alto, sem dependências) → 2. **Fase 3** (capturar lead de verdade) → 3. **Fase 2** (medir conversão) → 4. **Fase 4** (monitorar/escalar).
