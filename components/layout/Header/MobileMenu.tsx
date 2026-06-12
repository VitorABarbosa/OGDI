"use client";
import Link from "next/link";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div aria-hidden={!open} className={cn(
      "fixed inset-0 z-[90] bg-dark text-on-dark px-pad-x pt-[120px] pb-12 flex flex-col justify-between",
      "transition-transform duration-[600ms] ease-brand",
      open ? "translate-y-0 visible" : "-translate-y-full invisible")}>
      <nav className="flex flex-col">
        {navItems.map((it) => (
          <Link key={it.label} href={it.href} onClick={onClose}
            className="font-sans font-medium text-[26px] tracking-[-.02em] py-[14px] border-b border-[color:var(--line-dark)] text-on-dark hover:text-green">
            {it.label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col gap-[6px] text-on-dark-2 text-[14px]">
        <Button href="/contato" variant="light" className="self-start mb-[18px]">Apresentar oportunidade</Button>
        <span>{site.email}</span>
        <span>{site.location}</span>
      </div>
    </div>
  );
}
