"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export type EmpNavItem = { id: string; label: string };

// Nav âncora sticky do empreendimento: nome + status à esquerda, links de seção
// à direita com scroll-spy. Mostra apenas os links cujas seções existem no DOM,
// então seções ainda não construídas (Lazer, Tour, Obra…) surgem sozinhas
// quando ganharem o `id` correspondente.
// Ao "grudar" no topo (sticky), troca do tema claro para o escuro/contrastado da
// referência — detectado por uma sentinela + IntersectionObserver.
export function EmpNav({
  name,
  status,
  items,
}: {
  name: string;
  status: string;
  items: EmpNavItem[];
}) {
  const t = useTranslations("empreendimento.nav");
  const [visible, setVisible] = useState<EmpNavItem[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const present = items.filter((it) => document.getElementById(it.id));
    setVisible(present);
    if (present.length) setActive((cur) => cur ?? present[0].id);

    const targets = present
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  // "Grudou" quando o topo da barra encosta na linha sticky (56px do topo).
  useEffect(() => {
    const onScroll = () => {
      const el = navRef.current;
      if (!el) return;
      setStuck(el.getBoundingClientRect().top <= 57);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [visible.length]);

  const goTo = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 116;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (visible.length === 0) return null;

  return (
    <nav
      ref={navRef}
      aria-label={t("ariaLabel")}
      data-stuck={stuck ? "true" : undefined}
      className={cn(
        "sticky top-[56px] z-[60] border-b backdrop-blur-[18px] backdrop-saturate-[1.6] transition-colors duration-300",
        stuck ? "border-white/[.08] bg-[rgba(11,20,19,.92)]" : "border-[color:var(--line)] bg-white/[.9]",
      )}
    >
        <div className="mx-auto flex h-[clamp(50px,5vw,60px)] max-w-[1440px] items-center justify-between gap-6 px-pad-x">
          <div className="flex shrink-0 items-baseline gap-2.5">
            <b
              className={cn(
                "font-sans text-[14px] font-semibold tracking-[-.01em] transition-colors duration-300",
                stuck ? "text-white" : "text-ink",
              )}
            >
              {name}
            </b>
            <span className="text-[10px] font-medium uppercase tracking-[.16em] text-green">{status}</span>
          </div>
          <div className="flex min-w-0 items-center gap-[clamp(14px,1.7vw,30px)] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {visible.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                onClick={(e) => goTo(e, it.id)}
                aria-current={active === it.id ? "true" : undefined}
                className={cn(
                  "relative shrink-0 whitespace-nowrap py-2 font-sans text-[12px] tracking-[.04em] transition-colors duration-200",
                  "after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-green after:origin-center after:transition-transform after:duration-300",
                  active === it.id ? "after:scale-x-100" : "after:scale-x-0",
                  active === it.id
                    ? stuck
                      ? "text-white"
                      : "text-ink"
                    : stuck
                      ? "text-white/55 hover:text-white"
                      : "text-ink-3 hover:text-ink",
                )}
              >
                {it.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
  );
}
