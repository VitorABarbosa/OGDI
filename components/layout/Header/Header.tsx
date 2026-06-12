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
  // Branco só sobre hero escuro — `!scrolled` deixava a header invisível
  // no topo de páginas claras (Investidores, Insights).
  const lightForeground = onDark;
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
          <Image src={lightForeground ? "/assets/logos/og-logo-light.png" : "/assets/logos/og-logo.png"}
            alt="Open Group" width={34} height={34} className="w-[34px] h-[34px] object-contain" />
          <span className={cn("font-sans font-medium text-[14.5px] leading-none", lightForeground ? "text-white" : "text-ink")}>
            {site.name}
            <small className={cn("block text-[8.5px] tracking-[.24em] uppercase mt-1 font-normal",
              lightForeground ? "text-white/80" : "text-ink-3")}>{site.subtitle}</small>
          </span>
        </Link>
        {/* Nav no centro geométrico da barra (xl+; em lg fica no fluxo para
            não colidir com logo/CTA); CTA dedicado preenche a direita */}
        <div className="xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
          <Nav onDark={lightForeground} />
        </div>
        <div className="hidden lg:flex items-center gap-[clamp(18px,1.6vw,28px)]">
          <LangSwitcher light={lightForeground} />
          <span aria-hidden className={cn("h-[14px] w-px", lightForeground ? "bg-white/25" : "bg-ink/15")} />
          {/* CTA tipográfico: sublinhado fino permanente + varredura no hover,
              na mesma linguagem dos links da nav */}
          <Link
            href="/contato"
            className={cn(
              "group relative inline-flex items-center gap-[10px] pb-[6px] font-sans text-[11px] tracking-[.18em] uppercase font-medium transition-colors duration-200",
              lightForeground ? "text-white" : "text-ink",
            )}
          >
            Fale com a Open Group
            <span aria-hidden className="text-[14px] leading-none transition-transform duration-300 ease-brand group-hover:translate-x-1">→</span>
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-current opacity-35" />
            <span aria-hidden className="absolute left-0 bottom-0 h-px w-0 bg-current transition-[width] duration-300 ease-brand group-hover:w-full" />
          </Link>
        </div>
        <button onClick={menu.toggle} aria-label={menu.open ? "Fechar menu" : "Abrir menu"} aria-expanded={menu.open}
          className="lg:hidden relative w-11 h-11 flex items-center justify-center">
          <span aria-hidden className={cn("absolute block h-px w-[22px]", (menu.open || lightForeground) ? "bg-white" : "bg-ink")}
            style={{ transition: "transform .3s cubic-bezier(.22,.61,.36,1)", transform: menu.open ? "translateY(0) rotate(45deg)" : "translateY(-3.5px)" }} />
          <span aria-hidden className={cn("absolute block h-px w-[22px]", (menu.open || lightForeground) ? "bg-white" : "bg-ink")}
            style={{ transition: "transform .3s cubic-bezier(.22,.61,.36,1)", transform: menu.open ? "translateY(0) rotate(-45deg)" : "translateY(3.5px)" }} />
        </button>
      </header>
      <MobileMenu open={menu.open} onClose={menu.close} />
    </>
  );
}

// Seletor de idioma — somente apresentação por enquanto; a troca real de
// conteúdo (EN/ES) será ligada quando houver i18n no projeto. No hover,
// EN e ES deslizam inline ao lado do PT | BR — sem painel, só tipografia.
const otherLangs = ["EN", "ES"];

function LangSwitcher({ light }: { light: boolean }) {
  const type = "font-sans text-[11px] tracking-[.18em] uppercase font-medium";
  return (
    <div className={cn("group/lang flex items-center py-[6px]", light ? "text-white" : "text-ink")}>
      <div className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-[420ms] ease-brand group-hover/lang:grid-cols-[1fr] group-focus-within/lang:grid-cols-[1fr]">
        <div className="flex min-w-0 items-center gap-[14px] overflow-hidden opacity-0 transition-opacity duration-300 ease-brand group-hover/lang:opacity-100 group-focus-within/lang:opacity-100">
          {otherLangs.map((code) => (
            <button key={code} type="button"
              className={cn(type, "cursor-pointer opacity-50 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100")}>
              {code}
            </button>
          ))}
          <span aria-hidden className="mr-[14px] h-[11px] w-px shrink-0 bg-current opacity-30" />
        </div>
      </div>
      <button type="button" aria-haspopup="true" aria-label="Idioma: Português (Brasil). Ver outros idiomas"
        className={cn(type, "flex cursor-default items-center gap-[9px]")}>
        PT
        <span aria-hidden className="h-[11px] w-px bg-current opacity-40" />
        BR
      </button>
    </div>
  );
}
