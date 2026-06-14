import { useTranslations } from "next-intl";
import { projetoTabs, type ProjetoCat } from "./projetos.data";
import { cn } from "@/lib/cn";

export function ProjetoTabs({ active, onChange }: { active: ProjetoCat; onChange: (c: ProjetoCat) => void }) {
  const t = useTranslations("home.projetos.tabs");
  return (
    <div className="flex flex-wrap gap-[30px] max-md:gap-5">
      {projetoTabs.map((t0) => (
        <button key={t0.cat} onClick={() => onChange(t0.cat)}
          className={cn("relative text-[13px] tracking-[.04em] pb-2 transition-colors duration-300",
            active === t0.cat ? "text-ink" : "text-ink-3 hover:text-ink-2",
            "after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ink after:origin-left after:transition-transform after:duration-[350ms]",
            active === t0.cat ? "after:scale-x-100" : "after:scale-x-0")}>
          {t(t0.cat)}
        </button>
      ))}
    </div>
  );
}
