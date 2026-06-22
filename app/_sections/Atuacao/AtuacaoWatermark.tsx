"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const logoSize = 2700;
const logoSrc = "/assets/logos/OGDI_COMPLETO_SEM_FUNDO.png";
const logoClassName =
  "sticky top-0 mx-auto w-[2200px] h-[2200px] max-w-none -translate-x-[100px] -translate-y-[480px] object-contain object-center";

export function AtuacaoWatermark() {
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
      if (colorRef.current) {
        colorRef.current.style.opacity = "0";
        colorRef.current.style.removeProperty("-webkit-mask-image");
        colorRef.current.style.removeProperty("mask-image");
      }
    };

    const organicMask = (radius: number) => {
      const perp = { x: -direction.y, y: direction.x };
      const drift = Math.sin(time * 0.9) * 14;
      const cx = current.x;
      const cy = current.y;
      const fmt = (n: number) => `${n.toFixed(1)}px`;
      const blob = (
        x: number,
        y: number,
        rx: number,
        ry: number,
        core = 38,
        fade = 100,
      ) =>
        `radial-gradient(ellipse ${fmt(rx)} ${fmt(ry)} at ${fmt(x)} ${fmt(y)}, #000 0%, #000 ${core}%, rgba(0,0,0,.72) ${Math.min(core + 18, fade - 18)}%, rgba(0,0,0,.2) ${Math.min(core + 38, fade - 8)}%, transparent ${fade}%)`;

      return [
        blob(cx, cy, radius * 1.04, radius * 0.9, 34),
        blob(
          cx - direction.x * radius * 0.34 + perp.x * drift,
          cy - direction.y * radius * 0.34 + perp.y * drift,
          radius * 0.78,
          radius * 0.62,
          28,
          96,
        ),
        blob(
          cx + direction.x * radius * 0.22 + perp.x * radius * 0.34,
          cy + direction.y * radius * 0.22 + perp.y * radius * 0.34,
          radius * 0.52,
          radius * 0.44,
          24,
          92,
        ),
        blob(
          cx + direction.x * radius * 0.2 - perp.x * radius * 0.3,
          cy + direction.y * radius * 0.2 - perp.y * radius * 0.3,
          radius * 0.5,
          radius * 0.42,
          24,
          92,
        ),
      ].join(",");
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

      const radius = Math.min(400, 245 + velocity * 0.15);
      const mask = organicMask(radius);
      color.style.setProperty("-webkit-mask-image", mask);
      color.style.setProperty("mask-image", mask);
      color.style.setProperty("-webkit-mask-repeat", "no-repeat");
      color.style.setProperty("mask-repeat", "no-repeat");
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
    <div ref={layerRef} aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-visible">
      <Image
        src={logoSrc}
        alt=""
        width={logoSize}
        height={logoSize}
        className={`${logoClassName} opacity-[0.5] [filter:brightness(0)_invert(1)] max-md:opacity-[0.4]`}
      />
      <div
        ref={colorRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-200 ease-brand will-change-[mask-image,opacity]"
      >
        <Image
          src={logoSrc}
          alt=""
          width={logoSize}
          height={logoSize}
          className={`${logoClassName} opacity-[0.82]`}
        />
      </div>
    </div>
  );
}
