"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

type FlowSegment = [Point, Point, Point, Point];
type FlowBounds = {
  top: number;
  height: number;
};

type FlowColors = {
  teal: string;
  green: string;
  manifesto: string;
};

const SHOW_SEGMENT_LABELS = false;

const pathControl = {
  // Entry point for the extra lead-in segment. Values are percentages of the full canvas.
  entryPoint: { x: 0.6, y: -0.001 },
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

function strokeFlowPath(
  ctx: CanvasRenderingContext2D,
  segments: FlowSegment[],
  mouse: Point,
  time: number,
  indexOffset = 0,
  totalSegments = segments.length,
  progress = 1,
  motionScale = 1,
) {
  const stepsPerSegment = 128;
  // Modo scroll-draw: o traçado para no ponto proporcional ao progresso.
  const maxSteps = Math.floor(progress * segments.length * stepsPerSegment);
  let drawnSteps = 0;

  ctx.beginPath();

  // Loop em escalares (sem objetos intermediários) — as fórmulas são as
  // mesmas de cubicPoint/cubicTangent/applyTravelingWaves/applyMouseRipple,
  // inlined para eliminar ~5k alocações por frame.
  for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex += 1) {
    const [p0, p1, p2, p3] = segments[segmentIndex];
    if (drawnSteps > maxSteps) break;

    for (let step = 0; step <= stepsPerSegment; step += 1) {
      if (segmentIndex > 0 && step === 0) continue;
      drawnSteps += 1;
      if (drawnSteps > maxSteps) break;

      const t = step / stepsPerSegment;
      const globalIndex = segmentIndex + indexOffset;
      const progress =
        globalIndex <= 1 ? 0 : (globalIndex - 2 + t) / (totalSegments - 2);

      // cubicPoint
      const inverse = 1 - t;
      const inverseSquared = inverse * inverse;
      const tSquared = t * t;
      const baseX =
        inverseSquared * inverse * p0.x +
        3 * inverseSquared * t * p1.x +
        3 * inverse * tSquared * p2.x +
        tSquared * t * p3.x;
      const baseY =
        inverseSquared * inverse * p0.y +
        3 * inverseSquared * t * p1.y +
        3 * inverse * tSquared * p2.y +
        tSquared * t * p3.y;

      // cubicTangent
      const tangentX =
        3 * inverse * inverse * (p1.x - p0.x) +
        6 * inverse * t * (p2.x - p1.x) +
        3 * t * t * (p3.x - p2.x);
      const tangentY =
        3 * inverse * inverse * (p1.y - p0.y) +
        6 * inverse * t * (p2.y - p1.y) +
        3 * t * t * (p3.y - p2.y);

      // applyTravelingWaves
      const length = Math.max(1, Math.sqrt(tangentX * tangentX + tangentY * tangentY));
      const normalX = -tangentY / length;
      const normalY = tangentX / length;
      const edgeFade = Math.sin(Math.PI * progress) ** 0.75;
      const wave =
        (Math.sin(progress * Math.PI * 18 - time * 0.035) * 8 +
          Math.sin(progress * Math.PI * 31 + time * 0.024) * 4.5 +
          Math.sin(progress * Math.PI * 9 - time * 0.018) * 6) *
        motionScale;
      const wavedX = baseX + normalX * wave * edgeFade;
      const wavedY = baseY + normalY * wave * edgeFade;

      // applyMouseRipple
      const dx = wavedX - mouse.x;
      const dy = wavedY - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - distance / 180);
      const mouseEffect = influence * 70 * motionScale * Math.sin(time * 0.001 + wavedX * 0.01);

      const x = wavedX;
      const y = wavedY + mouseEffect;

      if (segmentIndex === 0 && step === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
  }
}

function drawSegmentLabels(ctx: CanvasRenderingContext2D, segments: FlowSegment[]) {
  if (!SHOW_SEGMENT_LABELS) return;

  ctx.save();
  ctx.font = "600 12px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  segments.forEach((segment, index) => {
    const labelPoint = cubicPoint(segment[0], segment[1], segment[2], segment[3], 0.5);

    ctx.beginPath();
    ctx.arc(labelPoint.x, labelPoint.y, 12, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(247,246,244,0.86)";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(31,90,99,0.45)";
    ctx.stroke();

    ctx.fillStyle = "rgba(6,43,60,0.88)";
    ctx.fillText(String(index + 1), labelPoint.x, labelPoint.y + 0.5);
  });

  ctx.restore();
}

type FlowGeomInput = {
  width: number;
  height: number;
  flowTop: number;
  flowHeight: number;
  drift: number;
  influenceX: number;
  influenceY: number;
};

type FlowGeometry = {
  segments: FlowSegment[];
  gradientFrom: Point;
  gradientTo: Point;
  nodes: Point[];
  /** Escala do movimento (ondas + ripple do mouse). 1 = padrão. */
  motionScale?: number;
};

// Geometria padrão — usada pelo institucional e pelas páginas de projeto.
function buildDefaultGeometry({
  width,
  height,
  flowTop,
  flowHeight,
  drift,
  influenceX,
  influenceY,
}: FlowGeomInput): FlowGeometry {
  const startX = width * pathControl.entryPoint.x;
  const startY = flowTop + flowHeight * pathControl.entryPoint.y;
  const originalStartX = width * pathControl.originalPathStart.x;
  const originalStartY = flowTop + flowHeight * pathControl.originalPathStart.y;
  const preLeadStartX = width * 0.2;
  const preLeadStartY = height * -0.05;
  const leadStartX = width * 0.86;
  const leadStartY = height * 0.1;
  const endX = width * 1.05;
  const endY = flowTop + flowHeight * 0.94;
  const segments: FlowSegment[] = [
    // Trecho 1 - novo ponto inicial, subindo ate o final da secao O Empreendimento.
    [
      { x: preLeadStartX, y: preLeadStartY },
      { x: width * 0.34, y: height * 0.04 + drift * 0.08 },
      { x: width * 0.5, y: height * 0.05 + drift * 0.1 },
      { x: leadStartX, y: leadStartY },
    ],
    // Trecho 2 - trecho de conexao ja aprovado para subir ate o fluxo original.
    [
      { x: leadStartX, y: leadStartY },
      { x: width * 1.02, y: height * 0.125 + drift * 0.12 },
      { x: width * 0.84, y: flowTop - flowHeight * 0.055 + drift * 0.16 },
      { x: startX, y: startY },
    ],
    // Trecho 3 - inicio original aprovado.
    [
      { x: startX, y: startY },
      { x: width * 0.42, y: flowTop + flowHeight * 0.02 + drift * 0.25 },
      { x: width * 0.12, y: flowTop + flowHeight * 0.03 + drift * 0.2 },
      { x: originalStartX, y: originalStartY },
    ],
    // Trecho 4 - descida inicial original.
    [
      { x: originalStartX, y: originalStartY },
      { x: width * 0.05, y: flowTop + flowHeight * 0.28 + drift },
      { x: width * 0.27 + influenceX, y: flowTop + flowHeight * 0.22 + influenceY },
      { x: width * 0.52, y: flowTop + flowHeight * 0.3 },
    ],
    // Trecho 5 - passagem para a direita.
    [
      { x: width * 0.52, y: flowTop + flowHeight * 0.3 },
      { x: width * 0.78, y: flowTop + flowHeight * 0.38 - influenceY },
      { x: width * 1.06, y: flowTop + flowHeight * 0.3 + drift },
      { x: width * 1.01, y: flowTop + flowHeight * 0.48 },
    ],
    // Trecho 6 - retorno para o centro.
    [
      { x: width * 1.01, y: flowTop + flowHeight * 0.48 },
      { x: width * 0.96, y: flowTop + flowHeight * 0.68 },
      { x: width * 0.72 + influenceX, y: flowTop + flowHeight * 0.58 },
      { x: width * 0.51, y: flowTop + flowHeight * 0.64 },
    ],
    // Trecho 7 - curva para a esquerda.
    [
      { x: width * 0.51, y: flowTop + flowHeight * 0.64 },
      { x: width * 0.32, y: flowTop + flowHeight * 0.7 },
      { x: width * 0.14 - influenceX, y: flowTop + flowHeight * 0.72 },
      { x: width * 0.19, y: flowTop + flowHeight * 0.82 },
    ],
    // Trecho 8 - fechamento inferior.
    [
      { x: width * 0.19, y: flowTop + flowHeight * 0.82 },
      { x: width * 0.25, y: flowTop + flowHeight * 0.94 },
      { x: width * 0.66, y: flowTop + flowHeight * 0.84 - drift },
      { x: endX, y: endY },
    ],
  ];

  return {
    segments,
    gradientFrom: { x: preLeadStartX, y: preLeadStartY },
    gradientTo: { x: endX, y: endY },
    nodes: [
      { x: width * 0.03, y: height * 0.2 },
      { x: width * 0.28, y: height * 0.25 },
      { x: width * 0.59, y: height * 0.33 },
      { x: width * 0.83, y: height * 0.56 },
      { x: width * 0.43, y: height * 0.66 },
      { x: width * 0.2, y: height * 0.8 },
      { x: width * 0.67, y: height * 0.86 },
    ],
  };
}

// Geometria exclusiva da tese de Investidores — serpentina calma e contida
// (10%–88% da largura, sem encostar nas bordas) que passa pelos três
// statements: "Entramos antes" (~19% da altura), "Lemos o mercado" (~47%)
// e "Conduzimos até o fim" (~74%). Entra pelo topo e sai pelo fundo.
function buildInvestidoresGeometry({
  width,
  height,
  flowTop,
  flowHeight,
  drift,
  influenceX,
  influenceY,
}: FlowGeomInput): FlowGeometry {
  const y = (f: number) => flowTop + flowHeight * f;
  const segments: FlowSegment[] = [
    // Entrada pela borda esquerda, no alto da seção.
    [
      { x: width * -0.04, y: y(0.04) },
      { x: width * 0.08, y: y(0.07) + drift * 0.2 },
      { x: width * 0.16, y: y(0.095) },
      { x: width * 0.24, y: y(0.125) },
    ],
    // Cruza "Entramos antes" da esquerda para a direita.
    [
      { x: width * 0.24, y: y(0.125) },
      { x: width * 0.33, y: y(0.155) + drift * 0.3 },
      { x: width * 0.4 + influenceX * 0.4, y: y(0.18) },
      { x: width * 0.47, y: y(0.21) },
    ],
    // Segue serena em diagonal.
    [
      { x: width * 0.47, y: y(0.21) },
      { x: width * 0.56, y: y(0.25) + drift * 0.6 },
      { x: width * 0.62, y: y(0.295) },
      { x: width * 0.67, y: y(0.34) },
    ],
    // Aproxima e passa por "Lemos o mercado".
    [
      { x: width * 0.67, y: y(0.34) },
      { x: width * 0.74, y: y(0.385) + influenceY * 0.6 },
      { x: width * 0.78, y: y(0.43) },
      { x: width * 0.8, y: y(0.475) },
    ],
    // Retorno bem aberto abaixo do segundo título.
    [
      { x: width * 0.8, y: y(0.475) },
      { x: width * 0.81, y: y(0.515) + drift * 0.3 },
      { x: width * 0.78, y: y(0.55) },
      { x: width * 0.72, y: y(0.575) },
    ],
    // Volta serena para a esquerda.
    [
      { x: width * 0.72, y: y(0.575) },
      { x: width * 0.58 + influenceX * 0.5, y: y(0.61) },
      { x: width * 0.44, y: y(0.64) },
      { x: width * 0.32, y: y(0.675) },
    ],
    // Passa por "Conduzimos até o fim" com curva bem aberta.
    [
      { x: width * 0.32, y: y(0.675) },
      { x: width * 0.22, y: y(0.71) + drift * 0.3 },
      { x: width * 0.17, y: y(0.745) },
      { x: width * 0.22, y: y(0.785) },
    ],
    // Saída pelo fundo, ao centro.
    [
      { x: width * 0.22, y: y(0.785) },
      { x: width * 0.33, y: y(0.835) + influenceY * 0.6 },
      { x: width * 0.47, y: y(0.875) + drift * 0.6 },
      { x: width * 0.6, y: y(1.04) },
    ],
  ];

  return {
    segments,
    gradientFrom: { x: width * -0.04, y: y(0.04) },
    gradientTo: { x: width * 0.6, y: y(1.04) },
    // Movimento bem mais contido que o padrão — a seção é de leitura.
    motionScale: 0.45,
    nodes: [
      { x: width * 0.24, y: y(0.125) },
      { x: width * 0.47, y: y(0.21) },
      { x: width * 0.67, y: y(0.34) },
      { x: width * 0.8, y: y(0.475) },
      { x: width * 0.72, y: y(0.575) },
      { x: width * 0.32, y: y(0.675) },
      { x: width * 0.22, y: y(0.785) },
    ],
  };
}

export type FlowVariant = "default" | "investidores";

const flowGeometries: Record<FlowVariant, (g: FlowGeomInput) => FlowGeometry> = {
  default: buildDefaultGeometry,
  investidores: buildInvestidoresGeometry,
};

function drawPath(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  mouse: Point,
  bounds: FlowBounds,
  hiddenNodes: number[],
  skipSegments: number,
  colors: FlowColors,
  progress = 1,
  variant: FlowVariant = "default",
) {
  const { teal, green, manifesto } = colors;
  const influenceX = ((mouse.x / Math.max(width, 1)) - 0.5) * 24;
  const influenceY = ((mouse.y / Math.max(height, 1)) - 0.5) * 18;
  const drift = Math.sin(time * 0.0014) * 12;
  const pulse = (Math.sin(time * 0.002) + 1) / 2;

  const { segments, gradientFrom, gradientTo, nodes, motionScale = 1 } = flowGeometries[variant]({
    width,
    height,
    flowTop: bounds.top,
    flowHeight: bounds.height,
    drift,
    influenceX,
    influenceY,
  });

  const gradient = ctx.createLinearGradient(gradientFrom.x, gradientFrom.y, gradientTo.x, gradientTo.y);
  gradient.addColorStop(0, `rgba(31, 90, 99, ${0.1 + pulse * 0.08})`);
  gradient.addColorStop(0.42, `rgba(95, 168, 60, ${0.18 + pulse * 0.08})`);
  gradient.addColorStop(1, `rgba(6, 43, 60, ${0.12 + pulse * 0.08})`);

  // Permite pular os trechos iniciais (lead-in) que se cruzam no topo.
  const drawnSegments = segments.slice(skipSegments);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Caminho construído UMA vez e traçado em 3 passes — o halo usa traços
  // largos translúcidos no lugar de shadowBlur (caríssimo em canvas grande).
  strokeFlowPath(ctx, drawnSegments, mouse, time, skipSegments, segments.length, progress, motionScale);
  const baseWidth = Math.max(1.4, Math.min(width, height) * 0.003);

  ctx.strokeStyle = gradient;
  ctx.globalAlpha = 0.16;
  ctx.lineWidth = baseWidth * 7;
  ctx.stroke();

  ctx.globalAlpha = 0.3;
  ctx.lineWidth = baseWidth * 3.2;
  ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.lineWidth = baseWidth;
  ctx.stroke();

  ctx.strokeStyle = `rgba(255,255,255,${0.45 + pulse * 0.1})`;
  ctx.lineWidth = Math.max(0.7, Math.min(width, height) * 0.0012);
  ctx.stroke();

  nodes.forEach((node, index) => {
    if (hiddenNodes.includes(index)) return;
    // No modo scroll-draw o nó surge quando o traçado passa pela sua altura.
    const appear = Math.min(1, Math.max(0, (progress - node.y / height) / 0.06));
    if (appear <= 0) return;
    const nodePulse = (Math.sin(time * 0.0022 + index * 0.9) + 1) / 2;
    ctx.beginPath();
    ctx.arc(node.x + Math.sin(time * 0.001 + index) * 4, node.y, 2.5 + nodePulse * 2, 0, Math.PI * 2);
    ctx.fillStyle = index % 2 === 0 ? green : teal;
    ctx.globalAlpha = (0.2 + nodePulse * 0.18) * appear;
    ctx.fill();
  });

  drawSegmentLabels(ctx, segments);

  ctx.globalAlpha = 1;
  ctx.strokeStyle = manifesto;
  ctx.restore();
}

export function GalleryFlowBackground({
  hiddenNodes = [],
  skipSegments = 0,
  scrollDraw = false,
  background = "#F7F6F4",
  variant = "default",
}: {
  hiddenNodes?: number[];
  skipSegments?: number;
  /** Desenha o traçado progressivamente conforme a seção é rolada. */
  scrollDraw?: boolean;
  /** Cor opaca do fundo do canvas — deve casar com o bg do container. */
  background?: string;
  /** Geometria do traçado — variantes não interferem umas nas outras. */
  variant?: FlowVariant;
} = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Refs para a animação ler o valor atual das props (o efeito só roda na montagem).
  const hiddenNodesRef = useRef(hiddenNodes);
  hiddenNodesRef.current = hiddenNodes;
  const skipSegmentsRef = useRef(skipSegments);
  skipSegmentsRef.current = skipSegments;
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (process.env.NODE_ENV === "test") return;

    const canvas = canvasRef.current;
    const wrapper = canvas?.parentElement;
    // O container das seções (onde a cena virtual é calculada).
    const host = wrapper?.parentElement;
    if (!canvas || !wrapper || !host) return;

    // alpha:false — o veu rgba(247,246,244,.92) sobre o bg-soft do container
    // resulta exatamente em #F7F6F4, então o fill opaco é pixel-idêntico e o
    // navegador pula a composição com transparência (e o clearRect).
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationId = 0;
    let time = 0;
    let isVisible = true;
    let dpr = 1;
    // Dimensões da cena virtual (container inteiro) — o canvas sticky é só a
    // janela do viewport sobre ela.
    let sceneWidth = 1;
    let sceneHeight = 1;
    let windowHeight = 1;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Tokens estáticos do design system — resolvidos uma vez fora do loop
    // (getComputedStyle por frame força recálculo de estilo).
    const colors: FlowColors = {
      teal: resolveCssColor("--color-teal", "#1F5A63"),
      green: resolveCssColor("--color-green", "#5FA83C"),
      manifesto: resolveCssColor("--color-manifesto", "#062B3C"),
    };

    // bounds do [data-flow-base] são estáticos em relação ao host —
    // recalculados só no resize, nunca por frame.
    const bounds: FlowBounds = { top: 0, height: 1 };
    const lastPointer = { x: Number.NaN, y: Number.NaN };
    // Progresso suavizado do scroll-draw (0 = nada desenhado, 1 = completo).
    let drawnProgress = scrollDraw ? 0 : 1;

    const measureBounds = () => {
      const base = host.querySelector<HTMLElement>("[data-flow-base]");
      const hostRect = host.getBoundingClientRect();
      const baseRect = base?.getBoundingClientRect();
      if (baseRect) {
        bounds.top = Math.max(0, baseRect.top - hostRect.top);
        bounds.height = Math.max(1, baseRect.height);
      } else {
        bounds.top = 0;
        bounds.height = sceneHeight;
      }
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      sceneWidth = Math.max(1, Math.floor(rect.width));
      sceneHeight = Math.max(1, Math.floor(rect.height));
      // O buffer cobre apenas a janela visível (viewport), não o container
      // inteiro — rasterizar o container todo por frame era o custo dominante.
      windowHeight = Math.min(sceneHeight, Math.ceil(window.innerHeight));
      // Cap em 1.5: a linha é suave/difusa, não precisa de retina cheio.
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(sceneWidth * dpr);
      canvas.height = Math.floor(windowHeight * dpr);
      canvas.style.width = `${sceneWidth}px`;
      canvas.style.height = `${windowHeight}px`;
      mouseRef.current = { x: sceneWidth / 2, y: sceneHeight / 2 };
      targetMouseRef.current = { x: sceneWidth / 2, y: sceneHeight / 2 };
      measureBounds();
    };

    const onPointerMove = (event: PointerEvent) => {
      // Só guarda a posição bruta — a conversão para coordenadas da cena
      // acontece uma vez por frame (getBoundingClientRect por evento força layout).
      lastPointer.x = event.clientX;
      lastPointer.y = event.clientY;
    };

    const animate = () => {
      if (!isVisible) {
        animationId = 0;
        return;
      }
      const hostRect = host.getBoundingClientRect();
      // Posição da janela dentro da cena (deriva do scroll). O canvas é
      // movido por transform — sticky não funciona sob overflow:hidden.
      const offsetY = Math.min(Math.max(0, -hostRect.top), sceneHeight - windowHeight);
      canvas.style.transform = `translate3d(0, ${offsetY}px, 0)`;
      if (!Number.isNaN(lastPointer.x)) {
        targetMouseRef.current.x = lastPointer.x - hostRect.left;
        targetMouseRef.current.y = lastPointer.y - hostRect.top;
      }
      time += reduceMotion ? 0.25 : 1;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08;

      if (scrollDraw) {
        // Completa quando a base da seção alcança a base do viewport.
        const target = Math.min(1, Math.max(0, (window.innerHeight - hostRect.top) / sceneHeight));
        drawnProgress = reduceMotion ? target : drawnProgress + (target - drawnProgress) * 0.09;
      }

      // Desenha a cena em coordenadas virtuais, transladada para a janela.
      ctx.setTransform(dpr, 0, 0, dpr, 0, -offsetY * dpr);
      ctx.fillStyle = background;
      ctx.fillRect(0, offsetY, sceneWidth, windowHeight);
      drawPath(
        ctx,
        sceneWidth,
        sceneHeight,
        time,
        mouseRef.current,
        bounds,
        hiddenNodesRef.current,
        skipSegmentsRef.current,
        colors,
        drawnProgress,
        variant,
      );

      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    observer?.observe(host);
    const baseEl = host.querySelector<HTMLElement>("[data-flow-base]");
    if (baseEl) observer?.observe(baseEl);

    // Só anima com o canvas perto do viewport — fora dele o RAF para por
    // completo (a margem pré-aquece a textura antes da seção entrar).
    const intersection =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              const nowVisible = entry.isIntersecting;
              if (nowVisible && !isVisible) {
                isVisible = true;
                if (!animationId) animationId = window.requestAnimationFrame(animate);
              } else if (!nowVisible) {
                isVisible = false;
              }
            },
            { rootMargin: "600px 0px" },
          )
        : null;
    intersection?.observe(host);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", resize);
    animationId = window.requestAnimationFrame(animate);

    return () => {
      observer?.disconnect();
      intersection?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Janela do tamanho do viewport movida via transform no RAF: o buffer
          rasterizado por frame é constante, em vez de crescer com a altura
          do container. */}
      <canvas ref={canvasRef} className="absolute left-0 top-0 w-full will-change-transform" />
    </div>
  );
}
