"use client";

import { useEffect, useRef } from "react";

type Line = {
  pos: number; // posição horizontal base (fração da largura)
  amplitude: number; // oscilação horizontal em px
  frequency: number; // frequência ao longo do eixo Y
  color: string;
  opacity: number;
  speed: number;
};

// Versão VERTICAL das ondas do hero (InstitucionalHeroWaves): linhas que correm
// de cima a baixo, oscilando na horizontal, com glow verde/teal/branco. Fundo do
// Manifesto (InstitucionalOrigem) para o `bg-dark` não ficar chapado.
const PALETTE = [
  "rgba(95, 168, 60, .58)", // verde
  "rgba(57, 119, 129, .58)", // teal
  "rgba(95, 168, 60, .4)",
  "rgba(255, 255, 255, .26)", // branco (menos frequente)
  "rgba(57, 119, 129, .46)",
];

// Campo denso de linhas verticais próximas (cortina), em vez de poucas e soltas.
const LINE_COUNT = 18;
const LINES: Line[] = Array.from({ length: LINE_COUNT }, (_, i) => {
  const t = i / (LINE_COUNT - 1);
  return {
    pos: 0.03 + t * 0.94 + Math.sin(i * 1.7) * 0.01, // leve jitter p/ não virar grade perfeita
    amplitude: 16 + ((i * 37) % 30), // 16..45px (menor → mais denso)
    frequency: 0.0028 + ((i * 13) % 5) * 0.0006,
    color: PALETTE[i % PALETTE.length],
    opacity: 0.12 + ((i * 7) % 5) * 0.02, // 0.12..0.20
    speed: 0.0009 + ((i * 5) % 4) * 0.0003,
  };
});

export function InstitucionalOrigemWaves() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let running = false;
    let time = 0;
    let width = 0;
    let height = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseInfluence = reduced ? 6 : 52;
    const influenceRadius = reduced ? 160 : 300;
    const smoothing = reduced ? 0.04 : 0.09;

    const recenter = () => {
      const center = { x: width / 2, y: height / 2 };
      mouseRef.current = { ...center };
      targetRef.current = { ...center };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      recenter();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const handleMouseLeave = () => recenter();

    const drawLine = (line: Line) => {
      ctx.save();
      ctx.beginPath();
      const baseX = width * line.pos;

      for (let y = 0; y <= height; y += 5) {
        const dx = baseX - mouseRef.current.x;
        const dy = y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + y * 0.01);

        const x =
          baseX +
          Math.sin(y * line.frequency + time * line.speed) * line.amplitude +
          Math.sin(y * line.frequency * 0.45 + time * line.speed * 1.6) * (line.amplitude * 0.4) +
          mouseEffect;

        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 1.4;
      ctx.strokeStyle = line.color;
      ctx.globalAlpha = line.opacity;
      ctx.shadowBlur = 16;
      ctx.shadowColor = line.color;
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      if (!running) return;
      time += reduced ? 0.25 : 1;

      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * smoothing;

      ctx.clearRect(0, 0, width, height);
      LINES.forEach(drawLine);

      animationId = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      animationId = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(animationId);
    };

    // Só anima quando a seção está visível (seção é alta — evita rAF à toa).
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-0 h-full w-full" />;
}
