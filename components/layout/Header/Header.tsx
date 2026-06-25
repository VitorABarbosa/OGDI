"use client";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { Nav } from "./Nav";
import { MobileMenu } from "./MobileMenu";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useLocale, useTranslations } from "next-intl";
import { LangSwitcher } from "./LangSwitcher";

export function Header() {
  const { scrolled, onDark } = useHeaderScroll();
  const menu = useMobileMenu();
  const locale = useLocale();
  const tc = useTranslations("common");
  // Branco só sobre hero escuro — `!scrolled` deixava a header invisível
  // no topo de páginas claras (Investidores, Insights).
  const lightForeground = onDark;
  return (
    <>
      <header className={cn(
        "fixed top-0 inset-x-0 z-[100] px-pad-x flex items-center justify-between",
        "transition-[background-color,padding,border-color,box-shadow] duration-[400ms] ease-brand border-b",
        scrolled && !onDark
          ? "py-[3px] bg-white/[.92] backdrop-blur-[18px] backdrop-saturate-[1.8] border-[color:var(--line)] shadow-[0_10px_34px_-18px_rgba(23,26,27,0.16)]"
          : "py-[9px] border-transparent",
        // Transparente sobre o hero: o box full-width do header não pode capturar
        // o ponteiro (senão "come" o hover do conteúdo do hero atrás, ex.: o último
        // nó da curva de Investidores). Os controles reativam pointer-events.
        onDark && "!bg-transparent !backdrop-blur-none !border-transparent pointer-events-none")}>
        <Link href="/#top" aria-label="Open Group — início" className="pointer-events-auto flex items-center gap-[11px]">
          <Image src={lightForeground ? "/assets/logos/OGDI_COMPLETO_BRANCO.png" : "/assets/logos/OGDI_COMPLETO_SEM_FUNDO.png"}
            alt="OGDI" width={2400} height={1792} sizes="80px" className="h-[52px] w-auto object-contain" />
          <span className={cn("font-sans font-medium text-[12.5px] leading-none", lightForeground ? "text-white" : "text-ink")}>
            {site.name}
            <small className={cn("block text-[7.5px] tracking-[.24em] uppercase mt-1 font-normal",
              lightForeground ? "text-white/80" : "text-ink-3")}>{site.subtitle}</small>
          </span>
        </Link>
        {/* Nav no centro geométrico da barra (xl+; em lg fica no fluxo para
            não colidir com logo/CTA); CTA dedicado preenche a direita */}
        <div className="pointer-events-auto xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2">
          <Nav onDark={lightForeground} />
        </div>
        <div className="pointer-events-auto hidden lg:flex items-center gap-[clamp(18px,1.6vw,28px)]">
          <LangSwitcher light={lightForeground} locale={locale} />
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
            {tc("ctaHeader")}
            <span aria-hidden className="text-[14px] leading-none transition-transform duration-300 ease-brand group-hover:translate-x-1">→</span>
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-current opacity-35" />
            <span aria-hidden className="absolute left-0 bottom-0 h-px w-0 bg-current transition-[width] duration-300 ease-brand group-hover:w-full" />
          </Link>
        </div>
        <button onClick={menu.toggle} aria-label={menu.open ? "Fechar menu" : "Abrir menu"} aria-expanded={menu.open}
          className="pointer-events-auto lg:hidden relative w-11 h-11 flex items-center justify-center">
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
