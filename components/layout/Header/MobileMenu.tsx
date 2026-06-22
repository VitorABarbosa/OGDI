"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const LANGS = [
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
] as const;

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  // Mesma lógica do header: "contato" sai da lista (vira a CTA abaixo).
  const items = navItems.filter((it) => it.key !== "contato");

  return (
    <div aria-hidden={!open} className={cn(
      "fixed inset-0 z-[90] bg-dark text-on-dark px-pad-x pt-[120px] pb-12 flex flex-col justify-between",
      "transition-transform duration-[600ms] ease-brand",
      open ? "translate-y-0 visible" : "-translate-y-full invisible")}>
      <nav className="flex flex-col">
        {items.map((it) => (
          <Link key={it.key} href={it.href} onClick={onClose}
            className="font-sans font-medium uppercase text-[26px] tracking-[-.02em] py-[14px] border-b border-[color:var(--line-dark)] text-on-dark hover:text-green">
            {t(it.key)}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col gap-[18px] text-on-dark-2 text-[14px]">
        <Button href="/contato" variant="light" onClick={onClose} className="self-start">{tc("ctaHeader")}</Button>
        {/* Seletor de idioma (toque): os 3 visíveis, ativo destacado. */}
        <div className="flex items-center gap-6">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                router.replace(pathname, { locale: l.code });
                onClose();
              }}
              className={cn(
                "font-sans text-[13px] tracking-[.18em] uppercase font-medium transition-colors",
                l.code === locale ? "text-white" : "text-on-dark-2 hover:text-on-dark",
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-[6px]">
          <span>{site.email}</span>
          <span>{site.location}</span>
        </div>
      </div>
    </div>
  );
}
