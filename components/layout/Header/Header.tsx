"use client";
import Link from "next/link";
import Image from "next/image";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { Nav } from "./Nav";
import { MobileMenu } from "./MobileMenu";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Header() {
  const { scrolled, onDark } = useHeaderScroll();
  const menu = useMobileMenu();
  return (
    <>
      <header className={cn(
        "fixed top-0 inset-x-0 z-[100] px-pad-x flex items-center justify-between",
        "transition-[background-color,padding,border-color,box-shadow] duration-[400ms] ease-brand border-b",
        scrolled && !onDark
          ? "py-3 bg-white/[.92] backdrop-blur-[18px] backdrop-saturate-[1.8] border-[color:var(--line)] shadow-[0_10px_34px_-18px_rgba(23,26,27,0.16)]"
          : "py-[18px] border-transparent",
        onDark && "!bg-transparent !backdrop-blur-none !border-transparent")}>
        <Link href="/#top" aria-label="Open Group — início" className="flex items-center gap-[11px]">
          <Image src={onDark ? "/assets/logos/og-logo-light.png" : "/assets/logos/og-logo.png"}
            alt="Open Group" width={34} height={34} className="w-[34px] h-[34px] object-contain" />
          <span className={cn("font-sans font-medium text-[14.5px] leading-none", onDark ? "text-white" : "text-ink")}>
            {site.name}
            <small className={cn("block text-[8.5px] tracking-[.24em] uppercase mt-1 font-normal",
              onDark ? "text-white/80" : "text-ink-3")}>{site.subtitle}</small>
          </span>
        </Link>
        <Nav onDark={onDark} />
        <button onClick={menu.toggle} aria-label={menu.open ? "Fechar menu" : "Abrir menu"} aria-expanded={menu.open}
          className="lg:hidden relative w-11 h-11 flex items-center justify-center">
          <span aria-hidden className={cn("absolute block h-px w-[22px]", (menu.open || onDark) ? "bg-white" : "bg-ink")}
            style={{ transition: "transform .3s cubic-bezier(.22,.61,.36,1)", transform: menu.open ? "translateY(0) rotate(45deg)" : "translateY(-3.5px)" }} />
          <span aria-hidden className={cn("absolute block h-px w-[22px]", (menu.open || onDark) ? "bg-white" : "bg-ink")}
            style={{ transition: "transform .3s cubic-bezier(.22,.61,.36,1)", transform: menu.open ? "translateY(0) rotate(-45deg)" : "translateY(3.5px)" }} />
        </button>
      </header>
      <MobileMenu open={menu.open} onClose={menu.close} />
    </>
  );
}
