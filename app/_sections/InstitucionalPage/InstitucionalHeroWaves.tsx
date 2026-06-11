"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

type WaveConfig = {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
};

const waves: WaveConfig[] = [
  { offset: 0, amplitude: 72, frequency: 0.003, color: "rgba(95, 168, 60, .72)", opacity: 0.42 },
  { offset: Math.PI / 2, amplitude: 94, frequency: 0.0025, color: "rgba(57, 119, 129, .7)", opacity: 0.34 },
  { offset: Math.PI, amplitude: 62, frequency: 0.0034, color: "rgba(255, 255, 255, .34)", opacity: 0.24 },
  { offset: Math.PI * 1.5, amplitude: 82, frequency: 0.0022, color: "rgba(95, 168, 60, .42)", opacity: 0.22 },
  { offset: Math.PI * 2, amplitude: 54, frequency: 0.004, color: "rgba(255, 255, 255, .2)", opacity: 0.18 },
];

export function InstitucionalHeroWaves() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let time = 0;
    let width = 0;
    let height = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseInfluence = prefersReducedMotion ? 8 : 70;
    const influenceRadius = prefersReducedMotion ? 140 : 320;
    const smoothing = prefersReducedMotion ? 0.04 : 0.1;

    const recenterMouse = () => {
      const center = { x: width / 2, y: height / 2 };
      mouseRef.current = center;
      targetMouseRef.current = center;
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      recenterMouse();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => recenterMouse();

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      const centerY = height * 0.53;

      for (let x = 0; x <= width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = centerY - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          centerY +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 2.4;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 34;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      time += prefersReducedMotion ? 0.2 : 1;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "rgba(10, 14, 15, .92)");
      gradient.addColorStop(0.54, "rgba(10, 14, 15, .74)");
      gradient.addColorStop(1, "rgba(10, 14, 15, .96)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      waves.forEach(drawWave);

      animationId = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    animationId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 z-0 h-full w-full" />;
}
