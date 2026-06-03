import Link from "next/link";
import { cn } from "@/lib/cn";

export function TextLink({ href, children, className }:
  { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(
      "inline-flex items-center gap-[10px] text-[12px] tracking-[.14em] uppercase font-medium text-ink",
      "pb-1 border-b border-ink transition-[gap,color,border-color] duration-300 ease-brand",
      "hover:gap-4 hover:text-teal hover:border-teal", className,
    )}>{children}</Link>
  );
}
