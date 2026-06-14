"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export type SectionRailItem = {
  id: string;
  label: string;
};

export function PageSectionRail({
  items,
  ariaLabel,
  revealAfter,
}: {
  items: readonly SectionRailItem[];
  ariaLabel?: string;
  revealAfter?: { id: string; viewportRatio: number };
}) {
  const t = useTranslations("common.rail");
  const resolvedAria = ariaLabel ?? t("defaultAria");
  const lenis = useLenis();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [isRevealed, setIsRevealed] = useState(!revealAfter);

  useEffect(() => {
    if (!revealAfter) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const trigger = document.getElementById(revealAfter.id);
      if (!trigger) return;

      const scrolled = Math.max(0, -trigger.getBoundingClientRect().top);
      setIsRevealed(scrolled >= window.innerHeight * revealAfter.viewportRatio);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [revealAfter]);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.08, 0.18, 0.32, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  function scrollToSection(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.15 });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label={resolvedAria}
      className={cn(
        "fixed right-[clamp(18px,2.8vw,48px)] top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 lg:block",
        isRevealed ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="relative flex flex-col items-center gap-[18px] py-2">
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top bg-ink/12 transition-transform duration-700 ease-out",
            isRevealed ? "scale-y-100" : "scale-y-0",
          )}
        />
        {items.map((item, index) => {
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              aria-label={t("goTo", { label: item.label })}
              aria-current={isActive ? "location" : undefined}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "group relative z-10 flex h-5 w-5 items-center justify-center rounded-full transition-[opacity,transform] duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/70 focus-visible:ring-offset-4",
                isRevealed ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
              )}
              style={{ transitionDelay: isRevealed ? `${index * 70}ms` : "0ms" }}
            >
              <span
                aria-hidden
                className={cn(
                  "block rounded-full border border-white/70 bg-ink/28 shadow-[0_0_0_1px_rgba(15,30,34,.06)] transition-all duration-300 group-hover:h-[10px] group-hover:w-[10px] group-hover:bg-teal",
                  isActive ? "h-[12px] w-[12px] border-teal bg-teal" : "h-[7px] w-[7px]",
                )}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
