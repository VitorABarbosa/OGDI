import type { ReactNode } from "react";

// Selo circular de play/tour, compartilhado pela mídia do tour (link externo) e
// do vídeo (embed). Anima no hover do contêiner pai `.group/media`.
export function PlayBadge({ icon }: { icon: ReactNode }) {
  return (
    <span className="absolute left-1/2 top-1/2 z-[3] flex h-[clamp(68px,6vw,90px)] w-[clamp(68px,6vw,90px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/55 bg-[rgba(12,18,19,.26)] text-white backdrop-blur-[6px] transition-[background-color,color,transform] duration-300 group-hover/media:scale-105 group-hover/media:border-white group-hover/media:bg-white group-hover/media:text-ink">
      {icon}
    </span>
  );
}

// Scrim em degradê para legibilidade do selo sobre o poster.
export function MediaScrim() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 z-[2] [background:linear-gradient(0deg,rgba(8,12,13,.72),rgba(8,12,13,.08)_52%,rgba(8,12,13,.32))]"
    />
  );
}
