import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useHeaderScroll() {
  const pathname = usePathname();
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
          setOnDark(p < 0.1);
        } else {
          // Páginas sem #top: heroes escuros se marcam com data-header-dark.
          // Sem o marcador (topo claro), o texto da header fica escuro.
          const dark = document.querySelector("[data-header-dark]");
          if (dark) {
            const rect = dark.getBoundingClientRect();
            setOnDark(rect.top <= 0 && rect.bottom > 120);
          } else {
            setOnDark(false);
          }
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    // recalcula no frame seguinte: ao trocar de rota o #top da nova
    // página pode ainda não estar com layout pronto no 1º tick
    const raf = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);
  return { scrolled, onDark };
}
