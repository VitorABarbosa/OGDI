import { useCallback, useEffect, useRef, useState } from "react";

type Opts = { length: number; autoplayMs?: number };

export function useCarousel({ length, autoplayMs }: Opts) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ref para autoplay/drag lerem o índice atual sem recriar callbacks
  const indexRef = useRef(0);
  useEffect(() => { indexRef.current = index; }, [index]);

  const goTo = useCallback((n: number) => {
    if (length <= 0) return;
    setIndex(((n % length) + length) % length);
  }, [length]);
  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  useEffect(() => {
    if (!autoplayMs) return;
    timer.current = setTimeout(() => goTo(indexRef.current + 1), autoplayMs);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [index, autoplayMs, goTo]);

  const dragEnd = useCallback((dx: number, threshold: number) => {
    if (dx <= -threshold) next();
    else if (dx >= threshold) prev();
  }, [next, prev]);

  return { index, goTo, next, prev, dragEnd };
}
