"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Escala uma composição de largura fixa (px) para caber na largura disponível.
// Usado em layouts montados com posições absolutas em px (ex.: "Quem conduz"),
// que não são responsivos por natureza. No desktop (largura suficiente) fica 1:1;
// em telas menores reduz proporcionalmente, sem quebrar.
export function FitScale({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => setScale(Math.min(1, el.clientWidth / width));
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    apply();
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="w-full" style={{ height: height * scale }}>
      <div className="relative" style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
