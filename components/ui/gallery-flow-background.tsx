"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

const pathControl = {
  // Entry point for the extra lead-in segment. Values are percentages of the full canvas.
  entryPoint: { x: 0.6, y: 0.0001 },
  originalPathStart: { x: -0.08, y: 0.15 },
};

function resolveCssColor(variable: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
}

function buildFlowPath(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  drift: number,
  influenceX: number,
  influenceY: number,
) {
  const startX = width * pathControl.entryPoint.x;
  const startY = height * pathControl.entryPoint.y;
  const originalStartX = width * pathControl.originalPathStart.x;
  const originalStartY = height * pathControl.originalPathStart.y;
  const endX = width * 1.05;
  const endY = height * 0.94;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(
    width * 0.42,
    height * 0.02 + drift * 0.25,
    width * 0.12,
    height * 0.03 + drift * 0.2,
    originalStartX,
    originalStartY,
  );
  ctx.bezierCurveTo(
    width * 0.05,
    height * 0.28 + drift,
    width * 0.27 + influenceX,
    height * 0.22 + influenceY,
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

  return { startX, startY, endX, endY };
}

function rgbaFromHex(hex: string, alpha: number) {
  if (!hex.startsWith("#") || (hex.length !== 4 && hex.length !== 7)) return hex;

  const normalized =
    hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
  const value = Number.parseInt(normalized.slice(1), 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function drawPath(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, mouse: Point) {
  const teal = resolveCssColor("--color-teal", "#1F5A63");
  const green = resolveCssColor("--color-green", "#5FA83C");
  const manifesto = resolveCssColor("--color-manifesto", "#062B3C");
  const influenceX = ((mouse.x / Math.max(width, 1)) - 0.5) * 28;
  const influenceY = ((mouse.y / Math.max(height, 1)) - 0.5) * 22;
  const drift = Math.sin(time * 0.00115) * 14;
  const pulse = (Math.sin(time * 0.0018) + 1) / 2;
  const shimmer = (Math.sin(time * 0.0032) + 1) / 2;

  const { startX, startY, endX, endY } = buildFlowPath(ctx, width, height, drift, influenceX, influenceY);

  const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
  gradient.addColorStop(0, `rgba(31, 90, 99, ${0.12 + pulse * 0.08})`);
  gradient.addColorStop(0.36, `rgba(95, 168, 60, ${0.2 + shimmer * 0.1})`);
  gradient.addColorStop(0.7, `rgba(31, 90, 99, ${0.14 + pulse * 0.08})`);
  gradient.addColorStop(1, `rgba(6, 43, 60, ${0.14 + pulse * 0.08})`);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const minSide = Math.min(width, height);

  buildFlowPath(ctx, width, height, drift, influenceX, influenceY);
  ctx.shadowBlur = 72;
  ctx.shadowColor = green;
  ctx.strokeStyle = `rgba(95,168,60,${0.07 + pulse * 0.04})`;
  ctx.lineWidth = Math.max(10, minSide * 0.014);
  ctx.stroke();

  [-1, 1].forEach((direction) => {
    ctx.save();
    ctx.translate(0, direction * (8 + shimmer * 6));
    buildFlowPath(ctx, width, height, drift * 0.8, influenceX * 0.7, influenceY * 0.7);
    ctx.shadowBlur = 34;
    ctx.shadowColor = direction > 0 ? teal : green;
    ctx.strokeStyle = direction > 0 ? rgbaFromHex(teal, 0.1) : rgbaFromHex(green, 0.12);
    ctx.lineWidth = Math.max(1.2, minSide * 0.0022);
    ctx.stroke();
    ctx.restore();
  });

  buildFlowPath(ctx, width, height, drift, influenceX, influenceY);
  ctx.shadowBlur = 38;
  ctx.shadowColor = green;
  ctx.strokeStyle = gradient;
  ctx.lineWidth = Math.max(1.6, minSide * 0.0032);
  ctx.stroke();

  buildFlowPath(ctx, width, height, drift, influenceX, influenceY);
  ctx.shadowBlur = 0;
  ctx.strokeStyle = `rgba(255,255,255,${0.38 + shimmer * 0.16})`;
  ctx.lineWidth = Math.max(0.7, minSide * 0.0012);
  ctx.stroke();

  buildFlowPath(ctx, width, height, drift, influenceX, influenceY);
  ctx.setLineDash([Math.max(72, width * 0.075), Math.max(180, width * 0.16)]);
  ctx.lineDashOffset = -time * 0.85;
  ctx.shadowBlur = 24;
  ctx.shadowColor = "rgba(255,255,255,0.6)";
  ctx.strokeStyle = `rgba(255,255,255,${0.14 + shimmer * 0.16})`;
  ctx.lineWidth = Math.max(1, minSide * 0.0018);
  ctx.stroke();
  ctx.setLineDash([]);

  const nodes = [
    { x: width * 0.03, y: height * 0.2 },
    { x: width * 0.28, y: height * 0.25 },
    { x: width * 0.59, y: height * 0.33 },
    { x: width * 0.83, y: height * 0.56 },
    { x: width * 0.43, y: height * 0.66 },
    { x: width * 0.2, y: height * 0.8 },
    { x: width * 0.67, y: height * 0.86 },
  ];

  nodes.forEach((node, index) => {
    const nodePulse = (Math.sin(time * 0.0022 + index * 0.9) + 1) / 2;
    const x = node.x + Math.sin(time * 0.001 + index) * 4;

    ctx.beginPath();
    ctx.arc(x, node.y, 8 + nodePulse * 10, 0, Math.PI * 2);
    ctx.strokeStyle = index % 2 === 0 ? rgbaFromHex(green, 0.12) : rgbaFromHex(teal, 0.1);
    ctx.lineWidth = 1;
    ctx.shadowBlur = 18;
    ctx.shadowColor = index % 2 === 0 ? green : teal;
    ctx.globalAlpha = 0.55;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, node.y, 2.5 + nodePulse * 2, 0, Math.PI * 2);
    ctx.fillStyle = index % 2 === 0 ? green : teal;
    ctx.globalAlpha = 0.26 + nodePulse * 0.22;
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
