"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Mesma revelação por blob orgânico da AtuacaoWatermark (home), com a
// logo centralizada da Mensagem central. Camadas idênticas em geometria:
// base branca (filtro) e cor original revelada sob o cursor.
const logoSrc = "/assets/logos/LOGO_SEM_FUNDO.png";
const logoSize = 1480;
const logoClassName =
  "absolute left-1/2 top-[47%] h-auto w-[min(128vw,1480px)] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain";

export function AssinaturaWatermark() {
  const layerRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let active = false;
    let initialized = false;
    let time = 0;
    const current = { x: 0, y: 0 };
    const direction = { x: 0, y: 1 };
    const target = { x: 0, y: 0 };

    const hideReveal = () => {
      active = false;
      initialized = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (colorRef.current) colorRef.current.style.opacity = "0";
    };

    const animateReveal = () => {
      const color = colorRef.current;
      if (!active || !color) {
        frame = 0;
        return;
      }

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const velocity = Math.hypot(dx, dy);

      if (velocity > 0.5) {
        direction.x += (dx / velocity - direction.x) * 0.1;
        direction.y += (dy / velocity - direction.y) * 0.1;
      }

      current.x += dx * 0.12;
      current.y += dy * 0.12;
      time += 0.07;

      const radius = Math.min(175, 96 + velocity * 0.08);
      const tail = Math.min(1.55, 0.75 + velocity * 0.0025);
      const perp = { x: -direction.y, y: direction.x };
      const points: string[] = [];

      for (let i = 0; i < 72; i += 1) {
        const angle = (Math.PI * 2 * i) / 72;
        const forward = Math.cos(angle);
        const side = Math.sin(angle);
        const backPull = forward < 0 ? 0.94 + Math.abs(forward) * tail : 0.82 + forward * 0.12;
        const shoulder =
          Math.exp(-Math.pow(angle - Math.PI * 0.72, 2) / 0.1) * 0.22 +
          Math.exp(-Math.pow(angle - Math.PI * 1.28, 2) / 0.1) * 0.22;
        const bite =
          Math.exp(-Math.pow(angle - Math.PI * 0.18, 2) / 0.05) * 0.1 +
          Math.exp(-Math.pow(angle - Math.PI * 1.82, 2) / 0.05) * 0.08;
        const wobble = 1 + Math.sin(angle * 3.1 + time) * 0.045 + Math.sin(angle * 5.7 - time * 0.7) * 0.03;
        const along = forward * radius * backPull * wobble;
        const lateral = side * radius * (1.06 + shoulder - bite) * wobble;
        const x = current.x + direction.x * along + perp.x * lateral;
        const y = current.y + direction.y * along + perp.y * lateral;

        points.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`);
      }

      color.style.clipPath = `polygon(${points.join(",")})`;
      frame = requestAnimationFrame(animateReveal);
    };

    const updateReveal = (event: PointerEvent) => {
      const layer = layerRef.current;
      const color = colorRef.current;
      if (!layer || !color) return;

      const rect = layer.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (!isInside) {
        hideReveal();
        return;
      }

      target.x = x;
      target.y = y;

      if (!initialized) {
        current.x = x;
        current.y = y;
        initialized = true;
      }

      active = true;
      color.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(animateReveal);
    };

    window.addEventListener("pointermove", updateReveal, { passive: true });
    window.addEventListener("blur", hideReveal);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updateReveal);
      window.removeEventListener("blur", hideReveal);
    };
  }, []);

  return (
    <div ref={layerRef} aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Base: o branco sutil original da marca d'água. */}
      <Image
        src={logoSrc}
        alt=""
        width={logoSize}
        height={logoSize}
        className={`${logoClassName} opacity-[.055] [filter:brightness(0)_invert(1)]`}
      />
      {/* Revelação: cores originais com brilho elevado — a logo petróleo é
          escura demais para aparecer crua sobre o bg-dark (na home o fundo
          é claro, por isso lá não precisa). */}
      <div
        ref={colorRef}
        className="absolute inset-0 opacity-0 blur-[1px] transition-opacity duration-150 ease-brand"
      >
        <Image
          src={logoSrc}
          alt=""
          width={logoSize}
          height={logoSize}
          className={`${logoClassName} opacity-[.95] [filter:brightness(2.1)_saturate(1.3)]`}
        />
      </div>
    </div>
  );
}
