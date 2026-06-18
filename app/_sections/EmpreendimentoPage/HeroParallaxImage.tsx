"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

// Imagem da Hero com um parallax leve: ao rolar, a imagem sobe um pouco mais
// devagar que o conteúdo. A camada interna é maior que o hero (-12% / +12%) para
// sobrar margem e nunca revelar as bordas durante o deslocamento.
export function HeroParallaxImage({
  tone,
  src,
  alt,
}: {
  tone: Projeto["tone"];
  src?: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "520px"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={reduce ? undefined : { y }}
        className="absolute inset-x-0 top-[-12%] h-[124%] will-change-transform"
      >
        <MediaPlaceholder tone={tone} src={src} alt={alt} />
      </motion.div>
    </div>
  );
}
