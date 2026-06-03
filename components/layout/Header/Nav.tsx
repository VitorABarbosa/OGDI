import Link from "next/link";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/cn";

export function Nav({ onDark }: { onDark: boolean }) {
  return (
    <nav aria-label="Principal" className="hidden lg:flex items-center gap-[26px]">
      {navItems.map((it) => (
        <Link key={it.label} href={it.href}
          className={cn("group relative text-[12px] tracking-[.1em] py-1 transition-colors duration-200",
            onDark ? "text-white hover:text-white" : "text-ink-2 hover:text-ink")}>
          {it.label}
          <span className="absolute left-0 bottom-0 h-px w-0 bg-current transition-[width] duration-300 ease-brand group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
}
