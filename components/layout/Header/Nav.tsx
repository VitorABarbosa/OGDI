import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/cn";

const headerItems = navItems.filter((it) => it.key !== "contato");

export function Nav({ onDark }: { onDark: boolean }) {
  const t = useTranslations("nav");
  return (
    <nav aria-label="Principal" className="hidden lg:flex items-center gap-[clamp(20px,1.8vw,34px)]">
      {headerItems.map((it) => (
        <Link key={it.key} href={it.href}
          className={cn("group relative text-[12px] tracking-[.1em] py-1 transition-colors duration-200",
            onDark ? "text-white hover:text-white" : "text-ink-2 hover:text-ink")}>
          {t(it.key)}
          <span className="absolute left-0 bottom-0 h-px w-0 bg-current transition-[width] duration-300 ease-brand group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
}
