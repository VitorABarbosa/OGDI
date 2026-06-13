"use client";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const ALL = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const;

// Seletor de idioma: o locale ativo fica visível; os outros deslizam inline no
// hover. Clicar troca o locale preservando a rota atual (via next-intl router).
export function LangSwitcher({ light, locale }: { light: boolean; locale: string }) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();
  const type = "font-sans text-[11px] tracking-[.18em] uppercase font-medium";
  const active = ALL.find((l) => l.code === locale) ?? ALL[0];
  const others = ALL.filter((l) => l.code !== active.code);

  return (
    <div className={cn("group/lang flex items-center py-[6px]", light ? "text-white" : "text-ink")}>
      <div className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-[420ms] ease-brand group-hover/lang:grid-cols-[1fr] group-focus-within/lang:grid-cols-[1fr]">
        <div className="flex min-w-0 items-center gap-[14px] overflow-hidden opacity-0 transition-opacity duration-300 ease-brand group-hover/lang:opacity-100 group-focus-within/lang:opacity-100">
          {others.map((l) => (
            <button key={l.code} type="button" onClick={() => router.replace(pathname, { locale: l.code })}
              className={cn(type, "cursor-pointer opacity-50 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100")}>
              {l.label}
            </button>
          ))}
          <span aria-hidden className="mr-[14px] h-[11px] w-px shrink-0 bg-current opacity-30" />
        </div>
      </div>
      <button type="button" aria-label={t("langLabel")}
        className={cn(type, "flex cursor-default items-center gap-[9px]")}>
        {active.label}
      </button>
    </div>
  );
}
