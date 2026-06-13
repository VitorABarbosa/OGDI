import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import ptMessages from "@/messages/pt.json";

// Renderiza componentes que usam next-intl com as mensagens PT reais.
export function renderWithIntl(
  ui: React.ReactElement,
  { locale = "pt", messages = ptMessages }: { locale?: string; messages?: Record<string, unknown> } = {},
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}
