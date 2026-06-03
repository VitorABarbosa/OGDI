import { useEffect, useState } from "react";

export function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sy = window.scrollY, vh = window.innerHeight;
        setScrolled(sy > 20);
        const stage = document.getElementById("top");
        if (stage) {
          const scrolledPast = Math.max(0, -stage.getBoundingClientRect().top);
          const p = Math.min(1, Math.max(0, scrolledPast / (vh * 0.65)));
          setOnDark(p < 0.10);
        } else {
          setOnDark(false);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { scrolled, onDark };
}
