"use client";
import { useEffect, useState } from "react";
import styles from "./Intro.module.css";

const PHRASE = "O valor nasce antes da obra.";

export function IntroOverlay() {
  const [phase, setPhase] = useState<"playing" | "hiding" | "done">("playing");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.body.classList.remove("overflow-hidden");
      setPhase("done");
      return;
    }
    document.body.classList.add("overflow-hidden");
    const raf = requestAnimationFrame(() => setReady(true));
    const nonSpace = PHRASE.replace(/ /g, "").length;
    const lastDelay = (nonSpace - 1) * 34;
    const slideAt = lastDelay + 700 + 480;
    const slideDur = 1100;
    const t1 = setTimeout(() => setPhase("hiding"), slideAt);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.classList.remove("overflow-hidden");
      window.scrollTo(0, 0);
    }, slideAt + slideDur + 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if (phase === "done") return null;

  let count = -1;
  return (
    <div className={`${styles.intro} ${phase === "hiding" ? styles.hide : ""}`} aria-hidden>
      <div className={`${styles.introText} ${ready ? styles.ready : ""}`}>
        {Array.from(PHRASE).map((ch, i) => {
          if (ch === " ") return <span key={i} className={styles.charSpace} />;
          count += 1;
          const isDot = ch === ".";
          return (
            <span key={i} className={styles.char}>
              <span
                className={`${styles.charInner} ${isDot ? styles.dot : ""}`}
                style={{ animationDelay: `${count * 0.034}s` }}
              >
                {ch}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
