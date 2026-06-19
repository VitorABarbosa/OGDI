"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { institucional } from "./institucional.data";
import { InstitucionalOrigemWaves } from "./InstitucionalOrigemWaves";
import styles from "./InstitucionalOrigem.module.css";

// Seção fundida: o Manifesto abre (frase-tese) e encadeia em "A origem" — os 5
// estratos viram a "escada do valor", destacados um a um conforme o scroll passa.
export function InstitucionalOrigem() {
  const tm = useTranslations("institucional.manifesto");
  const t = useTranslations("institucional.origem");
  const strata = institucional.origem.strata;

  const rowsRef = useRef<HTMLDivElement[]>([]);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const rows = rowsRef.current.filter(Boolean);
    if (rows.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(rows.length);
      setFill(1);
      return;
    }

    let pending = false;
    const update = () => {
      pending = false;
      const live = rowsRef.current.filter(Boolean);
      if (live.length === 0) return;
      // Linha de destaque um pouco abaixo do meio da tela.
      const threshold = window.innerHeight * 0.6;
      const centers = live.map((r) => {
        const b = r.getBoundingClientRect();
        return b.top + b.height / 2;
      });
      let last = -1;
      centers.forEach((c, i) => {
        if (c <= threshold) last = i;
      });
      setActive(last + 1);

      const first = centers[0];
      const lastC = centers[centers.length - 1];
      const f = lastC > first ? (threshold - first) / (lastC - first) : last >= 0 ? 1 : 0;
      setFill(Math.max(0, Math.min(1, f)));
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

  const green = (c: React.ReactNode) => <span className="text-green">{c}</span>;
  const keep = (c: React.ReactNode) => <span className="whitespace-nowrap">{c}</span>;

  return (
    <section id="institucional-origem" className="relative overflow-hidden bg-dark py-section text-white">
      <InstitucionalOrigemWaves />
      <div className="wrap relative z-[1]">
        {/* — Ato 1: tese + elaboração — */}
        <div className="reveal mb-[clamp(22px,2.6vw,36px)] flex items-center gap-[14px] text-[11px] uppercase tracking-[.24em] text-white/40">
          <span aria-hidden className="h-px w-[30px] bg-green" />
          {tm("eyebrow")}
        </div>
        <p className="reveal reveal-2 max-w-[31ch] font-news font-normal text-[clamp(1.5rem,3.2vw,2.8rem)] leading-[1.3] tracking-[-.01em]">
          {tm.rich("thesis", { em: green, keep })}
        </p>
        <p className="reveal reveal-2 mt-[clamp(22px,3vw,34px)] max-w-[60ch] text-[clamp(14px,1.1vw,16.5px)] leading-[1.66] text-white/[.6]">
          {tm("elaboration")}
        </p>

        {/* — Ato 2: ponte + escada do valor — */}
        <div
          aria-hidden
          className="reveal reveal-2 my-[clamp(34px,4.5vw,58px)] h-px max-w-[680px] bg-gradient-to-r from-[color:var(--line-dark)] to-transparent"
        />
        <div className="reveal reveal-3 mb-[14px] text-[10.5px] uppercase tracking-[.22em] text-green">
          {tm("bridgeLabel")}
        </div>
        <h2 className="reveal reveal-3 max-w-[22ch] font-news font-normal text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.16] tracking-[-.01em]">
          {tm.rich("bridge", { em: (c) => <span className="italic text-green">{c}</span> })}
        </h2>

        <div className={styles.ladder}>
          <div className={styles.rail}>
            <span className={styles.railFill} style={{ height: `${fill * 100}%` }} />
          </div>
          {strata.map((s, i) => (
            <div
              key={s.key}
              ref={(el) => {
                if (el) rowsRef.current[i] = el;
              }}
              className={cn(styles.row, s.bed && styles.bed, i < active && styles.active)}
            >
              <span aria-hidden className={styles.node} />
              <div>
                <span className={styles.nx}>{s.n}</span>
                <span className={styles.nm}>{t(`strata.${s.key}.name`)}</span>
              </div>
              <span className={styles.ds}>{t(`strata.${s.key}.desc`)}</span>
            </div>
          ))}
        </div>

        {/* — Ato 3: fecho — */}
        <div
          aria-hidden
          className="reveal my-[clamp(34px,4.5vw,58px)] h-px max-w-[680px] bg-gradient-to-r from-[color:var(--line-dark)] to-transparent"
        />
        <div className="grid grid-cols-1 gap-[clamp(24px,3.5vw,56px)] lg:grid-cols-2 lg:items-start">
          <p className="reveal font-news font-normal text-[clamp(1.25rem,2vw,1.7rem)] leading-[1.24] tracking-[-.01em] max-w-[26ch]">
            {tm.rich("positioning", { em: green })}
          </p>
          <p className="reveal reveal-2 max-w-[58ch] text-[clamp(14px,1.1vw,16.5px)] leading-[1.66] text-white/[.6]">
            {tm("institutional")}
          </p>
        </div>
        <p className="reveal mt-[clamp(28px,3.5vw,44px)] font-news italic text-green text-[clamp(1.2rem,2vw,1.7rem)] leading-[1.2]">
          {tm("closing")}
        </p>
      </div>
    </section>
  );
}
