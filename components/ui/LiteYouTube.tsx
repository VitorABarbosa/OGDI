"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { PlayBadge, MediaScrim } from "@/components/ui/PlayBadge";

// Embed "lite" do YouTube: mostra um poster (render local) com botão de play e só
// carrega o iframe ao clicar — sem custo de rede até a interação, e sem depender de
// imagens remotas do YouTube. Usa youtube-nocookie para reduzir rastreamento.
export function LiteYouTube({
  id,
  title,
  poster,
  playIcon,
}: {
  id: string;
  title: string;
  poster?: string;
  playIcon: ReactNode;
}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full border-0"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={title}
      className="group/media absolute inset-0 block h-full w-full cursor-pointer"
    >
      {poster ? (
        <Image src={poster} alt="" fill sizes="(max-width: 860px) 100vw, 60vw" className="object-cover" />
      ) : (
        <span aria-hidden className="absolute inset-0 bg-dark" />
      )}
      <MediaScrim />
      <PlayBadge icon={playIcon} />
    </button>
  );
}
