import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { projetoMessages } from "../messages/projetos/_index";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const base = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    // Central + conteúdo por projeto (messages/projetos/<slug>/) sob o namespace `proj`.
    messages: { ...base, proj: projetoMessages(locale) },
  };
});
