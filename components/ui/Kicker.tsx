import { cn } from "@/lib/cn";

export function Kicker({ children, tone = "default", className }:
  { children: React.ReactNode; tone?: "default" | "on-dark-green" | "on-dark"; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-[10px] font-sans text-[11px] tracking-[.22em] uppercase font-medium",
      tone === "default" ? "text-ink-3" : tone === "on-dark" ? "text-on-dark-2" : "text-white/60",
      className,
    )}>
      <span className="w-[5px] h-[5px] rounded-full bg-green" />
      {children}
    </span>
  );
}
