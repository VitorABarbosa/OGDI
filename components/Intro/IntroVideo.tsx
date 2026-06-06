"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { signalIntroDone } from "./introSignal";

// Abertura: vídeo em tela cheia que "desenha" a página; ao terminar, fade pro site.
export function IntroVideo() {
  const [phase, setPhase] = useState<"playing" | "hiding" | "done">("playing");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("done");
      signalIntroDone();
      return;
    }
    document.body.classList.add("overflow-hidden");
    window.scrollTo(0, 0);
    // segurança: se o evento 'ended' não disparar, esconde assim mesmo
    const safety = setTimeout(() => setPhase((p) => (p === "playing" ? "hiding" : p)), 9000);
    return () => {
      clearTimeout(safety);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const startHide = () => setPhase((p) => (p === "playing" ? "hiding" : p));

  const onHideEnd = () => {
    setPhase("done");
    document.body.classList.remove("overflow-hidden");
    window.scrollTo(0, 0);
    signalIntroDone();
  };

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      onTransitionEnd={phase === "hiding" ? onHideEnd : undefined}
      className={cn(
        "fixed inset-0 z-[300] bg-white flex items-center justify-center",
        "transition-opacity duration-[800ms] ease-brand",
        phase === "hiding" ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      {/* encaixe igual à imagem do hero: mobile cropa (cover); md+ preenche (fill) */}
      <video
        ref={videoRef}
        src="/Abertura/Abertura.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={startHide}
        onError={startHide}
        className="w-full h-full object-cover md:object-fill"
      />
    </div>
  );
}
