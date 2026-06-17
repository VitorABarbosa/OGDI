import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import ptMessages from "@/messages/pt.json";
import { projetoMessages } from "@/messages/projetos/_index";

// Espelha o merge feito em i18n/request.ts: central + conteúdo por projeto (`proj`).
const ptWithProj = { ...ptMessages, proj: projetoMessages("pt") };

// Renderiza componentes que usam next-intl com as mensagens PT reais.
export function renderWithIntl(
  ui: React.ReactElement,
  { locale = "pt", messages = ptWithProj }: { locale?: string; messages?: Record<string, unknown> } = {},
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}
