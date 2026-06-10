"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

function resolveCssColor(variable: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
}

function drawPath(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, mouse: Point) {
  const teal = resolveCssColor("--color-teal", "#1F5A63");
  const green = resolveCssColor("--color-green", "#5FA83C");
  const manifesto = resolveCssColor("--color-manifesto", "#062B3C");
  const influenceX = ((mouse.x / Math.max(width, 1)) - 0.5) * 24;
  const influenceY = ((mouse.y / Math.max(height, 1)) - 0.5) * 18;
  const drift = Math.sin(time * 0.0014) * 12;
  const pulse = (Math.sin(time * 0.002) + 1) / 2;

  const startX = width * -0.04;
  const startY = height * 0.28;
  const endX = width * 1.05;
  const endY = height * 0.94;

  const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
  gradient.addColorStop(0, `rgba(31, 90, 99, ${0.1 + pulse * 0.08})`);
  gradient.addColorStop(0.42, `rgba(95, 168, 60, ${0.18 + pulse * 0.08})`);
  gradient.addColorStop(1, `rgba(6, 43, 60, ${0.12 + pulse * 0.08})`);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(
    width * 0.02,
    height * 0.18 + drift,
    width * 0.22 + influenceX,
    height * 0.22 + influenceY,
    width * 0.31,
    height * 0.05,
  );
  ctx.bezierCurveTo(
    width * 0.37,
    height * -0.06,
    width * 0.27,
    height * 0.24,
    width * 0.52,
    height * 0.3,
  );
  ctx.bezierCurveTo(
    width * 0.78,
    height * 0.38 - influenceY,
    width * 1.06,
    height * 0.3 + drift,
    width * 1.01,
    height * 0.48,
  );
  ctx.bezierCurveTo(
    width * 0.96,
    height * 0.68,
    width * 0.72 + influenceX,
    height * 0.58,
    width * 0.51,
    height * 0.64,
  );
  ctx.bezierCurveTo(
    width * 0.32,
    height * 0.7,
    width * 0.14 - influenceX,
    height * 0.72,
    width * 0.19,
    height * 0.82,
  );
  ctx.bezierCurveTo(
    width * 0.25,
    height * 0.94,
    width * 0.66,
    height * 0.84 - drift,
    endX,
    endY,
  );

  ctx.shadowBlur = 32;
  ctx.shadowColor = green;
  ctx.strokeStyle = gradient;
  ctx.lineWidth = Math.max(1.4, Math.min(width, height) * 0.003);
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = `rgba(255,255,255,${0.45 + pulse * 0.1})`;
  ctx.lineWidth = Math.max(0.7, Math.min(width, height) * 0.0012);
  ctx.stroke();

  const nodes = [
    { x: width * 0.21, y: height * 0.2 },
    { x: width * 0.32, y: height * 0.08 },
    { x: width * 0.59, y: height * 0.33 },
    { x: width * 0.83, y: height * 0.56 },
    { x: width * 0.43, y: height * 0.66 },
    { x: width * 0.2, y: height * 0.8 },
    { x: width * 0.67, y: height * 0.86 },
  ];

  nodes.forEach((node, index) => {
    const nodePulse = (Math.sin(time * 0.0022 + index * 0.9) + 1) / 2;
    ctx.beginPath();
    ctx.arc(node.x + Math.sin(time * 0.001 + index) * 4, node.y, 2.5 + nodePulse * 2, 0, Math.PI * 2);
    ctx.fillStyle = index % 2 === 0 ? green : teal;
    ctx.globalAlpha = 0.2 + nodePulse * 0.18;
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  ctx.strokeStyle = manifesto;
  ctx.restore();
}

export function GalleryFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (process.env.NODE_ENV === "test") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let time = 0;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      const height = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouseRef.current = { x: width / 2, y: height / 2 };
      targetMouseRef.current = { x: width / 2, y: height / 2 };
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const animate = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      time += reduceMotion ? 0.25 : 1;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(247,246,244,0.92)";
      ctx.fillRect(0, 0, width, height);
      drawPath(ctx, width, height, time, mouseRef.current);

      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (canvas.parentElement) observer?.observe(canvas.parentElement);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", resize);
    animationId = window.requestAnimationFrame(animate);

    return () => {
      observer?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
