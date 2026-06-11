"use client";
import { useEffect, useRef } from "react";

/**
 * Vídeo de fundo do card: toca apenas enquanto o card está
 * expandido (hover/focus) no desktop; no mobile, enquanto visível.
 * preload="metadata" evita baixar o arquivo inteiro no load.
 */
export function CardVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest("[data-card]");
    if (!video || !card) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const play = () => video.play().catch(() => {});
    const pause = () => video.pause();

    if (window.matchMedia("(max-width: 900px)").matches) {
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? play() : pause()),
        { threshold: 0.35 },
      );
      io.observe(card);
      return () => io.disconnect();
    }

    card.addEventListener("mouseenter", play);
    card.addEventListener("mouseleave", pause);
    card.addEventListener("focusin", play);
    card.addEventListener("focusout", pause);
    return () => {
      card.removeEventListener("mouseenter", play);
      card.removeEventListener("mouseleave", pause);
      card.removeEventListener("focusin", play);
      card.removeEventListener("focusout", pause);
    };
  }, []);

  return <video ref={ref} src={src} muted loop playsInline preload="metadata" className={className} />;
}
