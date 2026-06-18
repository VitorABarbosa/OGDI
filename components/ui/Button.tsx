import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "default" | "light" | "solid" | "on-dark";
type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  sm?: boolean;
  arrow?: boolean;
  type?: "button" | "submit";
  className?: string;
  // Abre o link em nova aba (links externos, ex.: site da incorporadora).
  target?: "_blank";
};

const base =
  "inline-flex items-center gap-3 font-sans text-[12px] tracking-[.14em] uppercase font-medium " +
  "border transition-[background-color,color,border-color] duration-[400ms] ease-brand";
const variants: Record<Variant, string> = {
  default: "border-ink text-ink hover:bg-ink hover:text-white",
  light: "border-white/50 text-white hover:bg-white hover:text-ink hover:border-white",
  solid: "bg-ink text-white border-ink hover:bg-teal hover:border-teal",
  "on-dark": "bg-white text-ink border-white hover:bg-green hover:text-white hover:border-green",
};

export function Button({ children, href, variant = "default", sm, arrow, type = "button", className, target }: Props) {
  const cls = cn(base, variants[variant], sm ? "px-[22px] py-[13px] text-[11px]" : "px-[30px] py-4", className);
  const inner = (
    <>
      {children}
      {arrow && <span className="transition-transform duration-[400ms] ease-brand group-hover:translate-x-1">→</span>}
    </>
  );
  if (href)
    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={cn("group", cls)}
      >
        {inner}
      </Link>
    );
  return <button type={type} className={cn("group", cls)}>{inner}</button>;
}
