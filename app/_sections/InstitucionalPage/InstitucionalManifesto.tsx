"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { institucional } from "./institucional.data";
import styles from "./InstitucionalManifesto.module.css";

type Token = { kind: "word"; text: string; em: boolean } | { kind: "space"; text: string };

// Quebra os segmentos em palavras e espaços, preservando a pontuação colada
// (ex.: "potencial." mantém o ponto sem espaço antes), igual à referência.
function tokenize(segments: typeof institucional.manifesto.segments): Token[] {
  const tokens: Token[] = [];
  segments.forEach((seg) => {
    if (seg.em) {
      tokens.push({ kind: "word", text: seg.text, em: true });
      return;
    }
    seg.text.split(/(\s+)/).forEach((part) => {
      if (part === "") return;
      if (part.trim() === "") tokens.push({ kind: "space", text: part });
      else tokens.push({ kind: "word", text: part, em: false });
    });
  });
  return tokens;
}

export function InstitucionalManifesto() {
  const { manifesto } = institucional;
  const tokens = tokenize(manifesto.segments);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  wordsRef.current = [];

  useEffect(() => {
    const track = trackRef.current;
    const words = wordsRef.current;
    if (!track || words.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.classList.add(styles.lit));
      return;
    }

    let pending = false;
    const update = () => {
      pending = false;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      let p = total > 0 ? -rect.top / total : 0;
      p = Math.max(0, Math.min(1, p));
      const lp = Math.max(0, Math.min(1, (p - 0.06) / 0.66));
      const litCount = Math.round(lp * words.length);
      words.forEach((w, i) => w.classList.toggle(styles.lit, i < litCount));
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
    <section className="relative bg-dark">
      <div ref={trackRef} className="h-[240vh]">
        <div className="sticky top-0 flex min-h-svh flex-col justify-center">
          <div className="wrap">
            <div className="mb-[clamp(24px,3vw,40px)] flex items-center gap-[14px] text-[11px] uppercase tracking-[.24em] text-white/40">
              <span aria-hidden className="h-px w-[30px] bg-green" />
              {manifesto.eyebrow}
            </div>
            <p className="max-w-[19ch] font-news font-normal text-[clamp(1.7rem,4.5vw,3.7rem)] leading-[1.34] tracking-[-.01em]">
              {tokens.map((tok, i) =>
                tok.kind === "space" ? (
                  <span key={i}>{tok.text}</span>
                ) : (
                  <span
                    key={i}
                    ref={(el) => {
                      if (el) wordsRef.current.push(el);
                    }}
                    className={cn(styles.word, tok.em && styles.em)}
                  >
                    {tok.text}
                  </span>
                ),
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
