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

function cubicPoint(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const inverse = 1 - t;
  const inverseSquared = inverse * inverse;
  const tSquared = t * t;

  return {
    x:
      inverseSquared * inverse * p0.x +
      3 * inverseSquared * t * p1.x +
      3 * inverse * tSquared * p2.x +
      tSquared * t * p3.x,
    y:
      inverseSquared * inverse * p0.y +
      3 * inverseSquared * t * p1.y +
      3 * inverse * tSquared * p2.y +
      tSquared * t * p3.y,
  };
}

function applyMouseRipple(point: Point, mouse: Point, time: number): Point {
  const dx = point.x - mouse.x;
  const dy = point.y - mouse.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const influence = Math.max(0, 1 - distance / 120) ** 2.4;

  if (influence === 0) return point;

  const ripple = influence * 58 * Math.sin(time * 0.0018 + point.x * 0.018);
  const pull = influence * 20;

  return {
    x: point.x + (dx / Math.max(distance, 1)) * pull,
    y: point.y + ripple,
  };
}

function applyRopeSway(point: Point, progress: number, time: number): Point {
  const edgeFade = Math.sin(Math.PI * progress);
  const longWave = Math.sin(progress * Math.PI * 2.2 + time * 0.0012);
  const counterWave = Math.sin(progress * Math.PI * 4.4 - time * 0.00082);

  return {
    x: point.x + edgeFade * counterWave * 18,
    y: point.y + edgeFade * (longWave * 58 + counterWave * 14),
  };
}

function strokeFlowPath(
  ctx: CanvasRenderingContext2D,
  segments: [Point, Point, Point, Point][],
  mouse: Point,
  time: number,
) {
  const stepsPerSegment = 252;

  ctx.beginPath();

  segments.forEach((segment, segmentIndex) => {
    for (let step = 0; step <= stepsPerSegment; step += 1) {
      if (segmentIndex > 0 && step === 0) continue;

      const localProgress = step / stepsPerSegment;
      const pathProgress = (segmentIndex + localProgress) / segments.length;
      const basePoint = cubicPoint(segment[0], segment[1], segment[2], segment[3], localProgress);
      const point = applyMouseRipple(applyRopeSway(basePoint, pathProgress, time), mouse, time);

      if (segmentIndex === 0 && step === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
  });
}

function drawPath(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, mouse: Point) {
  const teal = resolveCssColor("--color-teal", "#1F5A63");
  const green = resolveCssColor("--color-green", "#5FA83C");
  const manifesto = resolveCssColor("--color-manifesto", "#062B3C");
  const influenceX = ((mouse.x / Math.max(width, 1)) - 0.5) * 24;
  const influenceY = ((mouse.y / Math.max(height, 1)) - 0.5) * 18;
  const drift = Math.sin(time * 0.0014) * 12;
  const pulse = (Math.sin(time * 0.002) + 1) / 2;

  const startX = width * pathControl.entryPoint.x;
  const startY = height * pathControl.entryPoint.y;
  const originalStartX = width * pathControl.originalPathStart.x;
  const originalStartY = height * pathControl.originalPathStart.y;
  const endX = width * 1.05;
  const endY = height * 0.94;
  const segments: [Point, Point, Point, Point][] = [
    [
      { x: startX, y: startY },
      { x: width * 0.42, y: height * 0.02 + drift * 0.25 },
      { x: width * 0.12, y: height * 0.03 + drift * 0.2 },
      { x: originalStartX, y: originalStartY },
    ],
    [
      { x: originalStartX, y: originalStartY },
      { x: width * 0.05, y: height * 0.28 + drift },
      { x: width * 0.27 + influenceX, y: height * 0.22 + influenceY },
      { x: width * 0.52, y: height * 0.3 },
    ],
    [
      { x: width * 0.52, y: height * 0.3 },
      { x: width * 0.78, y: height * 0.38 - influenceY },
      { x: width * 1.06, y: height * 0.3 + drift },
      { x: width * 1.01, y: height * 0.48 },
    ],
    [
      { x: width * 1.01, y: height * 0.48 },
      { x: width * 0.96, y: height * 0.68 },
      { x: width * 0.72 + influenceX, y: height * 0.58 },
      { x: width * 0.51, y: height * 0.64 },
    ],
    [
      { x: width * 0.51, y: height * 0.64 },
      { x: width * 0.32, y: height * 0.7 },
      { x: width * 0.14 - influenceX, y: height * 0.72 },
      { x: width * 0.19, y: height * 0.82 },
    ],
    [
      { x: width * 0.19, y: height * 0.82 },
      { x: width * 0.25, y: height * 0.94 },
      { x: width * 0.66, y: height * 0.84 - drift },
      { x: endX, y: endY },
    ],
  ];

  const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
  gradient.addColorStop(0, `rgba(31, 90, 99, ${0.1 + pulse * 0.08})`);
  gradient.addColorStop(0.42, `rgba(95, 168, 60, ${0.18 + pulse * 0.08})`);
  gradient.addColorStop(1, `rgba(6, 43, 60, ${0.12 + pulse * 0.08})`);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  strokeFlowPath(ctx, segments, mouse, time);
  ctx.shadowBlur = 32;
  ctx.shadowColor = green;
  ctx.strokeStyle = gradient;
  ctx.lineWidth = Math.max(1.4, Math.min(width, height) * 0.003);
  ctx.stroke();

  ctx.shadowBlur = 0;
  strokeFlowPath(ctx, segments, mouse, time);
  ctx.strokeStyle = `rgba(255,255,255,${0.45 + pulse * 0.1})`;
  ctx.lineWidth = Math.max(0.7, Math.min(width, height) * 0.0012);
  ctx.stroke();

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
