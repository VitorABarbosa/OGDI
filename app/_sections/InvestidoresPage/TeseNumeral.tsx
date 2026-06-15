"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// Numeral gigante vazado (contorno) que se preenche de baixo para cima conforme
// o scroll passa por ele. Decorativo (aria-hidden), atrás do statement.
export function TeseNumeral({ idx, align }: { idx: string; align: "left" | "right" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFill(100);
      return;
    }

    let pending = false;
    const update = () => {
      pending = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2;
      // Enche enquanto o numeral sobe de ~85% para ~40% da viewport.
      const p = (vh * 0.85 - center) / (vh * 0.85 - vh * 0.4);
      setFill(Math.max(0, Math.min(1, p)) * 100);
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-[.62em] select-none font-news text-[clamp(7rem,18vw,17rem)] leading-none tracking-[-.04em]",
        align === "right" ? "-right-[.08em]" : "-left-[.08em]",
      )}
      style={{
        color: "transparent",
        // contorno tingido de azul-petróleo; preenchimento sobe em degradê
        // (teal escuro → azul-petróleo) com a borda superior suave.
        WebkitTextStroke: "1px rgba(31,90,99,.5)",
        backgroundImage: `linear-gradient(to top, rgba(20,62,69,.96) 0%, rgba(31,90,99,.9) ${Math.max(fill - 8, 0)}%, rgba(79,163,173,.78) ${fill}%, transparent ${fill}%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
    >
      {idx}
    </span>
  );
}
