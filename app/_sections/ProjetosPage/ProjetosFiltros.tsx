import { cn } from "@/lib/cn";
import type { FilterCat } from "./projetosPage.data";

type Tab = { cat: FilterCat; label: string; count: number };

export function ProjetosFiltros({
  tabs,
  active,
  note,
  ariaLabel,
  onChange,
}: {
  tabs: Tab[];
  active: FilterCat;
  note: string;
  ariaLabel: string;
  onChange: (c: FilterCat) => void;
}) {
  return (
    <div
      className="reveal reveal-filter sticky top-0 z-50 border-b border-[color:var(--line)]"
      style={{
        background: "rgba(255,255,255,.85)",
        backdropFilter: "saturate(180%) blur(16px)",
        WebkitBackdropFilter: "saturate(180%) blur(16px)",
      }}
    >
      <div className="wrap-wide">
        <div className="flex items-center justify-between flex-wrap" style={{ gap: "24px", padding: "16px 0" }}>
          {/* Tab buttons */}
          <div className="flex flex-wrap" role="group" aria-label={ariaLabel} style={{ gap: "26px" }}>
            {tabs.map((tab) => {
              const isActive = active === tab.cat;
              return (
                <button
                  key={tab.cat}
                  onClick={() => onChange(tab.cat)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative pb-[6px] transition-colors duration-300",
                    "text-[13px] tracking-[.03em]",
                    "after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ink after:origin-left after:transition-transform after:duration-[350ms]",
                    isActive
                      ? "text-ink after:scale-x-100"
                      : "text-ink-3 hover:text-ink-2 after:scale-x-0",
                  )}
                >
                  {tab.label}
                  <span
                    className="text-ink-3"
                    style={{ fontSize: "10px", verticalAlign: "super", marginLeft: "3px" }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filter note */}
          <span
            aria-live="polite"
            aria-atomic="true"
            className="text-ink-3"
            style={{ fontSize: "12px", letterSpacing: ".04em" }}
          >
            {note}
          </span>
        </div>
      </div>
    </div>
  );
}
