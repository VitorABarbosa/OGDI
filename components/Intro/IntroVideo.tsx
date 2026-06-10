"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { signalIntroDone } from "./introSignal";

const INTRO_SESSION_KEY = "ogdi:intro-played";

function hasIntroPlayedInTab() {
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroPlayedInTab() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    // Storage can be unavailable in private modes; the intro still completes.
  }
}

// Abertura: video em tela cheia que "desenha" a pagina; ao terminar, fade pro site.
export function IntroVideo() {
  const [phase, setPhase] = useState<"checking" | "playing" | "hiding" | "done">("checking");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (hasIntroPlayedInTab()) {
      setPhase("done");
      signalIntroDone();
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      markIntroPlayedInTab();
      setPhase("done");
      signalIntroDone();
      return;
    }

    setPhase("playing");
    document.body.classList.add("overflow-hidden");
    window.scrollTo(0, 0);
    // Seguranca: se o evento 'ended' nao disparar, esconde assim mesmo.
    const safety = setTimeout(() => setPhase((p) => (p === "playing" ? "hiding" : p)), 9000);
    return () => {
      clearTimeout(safety);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const startHide = () => setPhase((p) => (p === "playing" ? "hiding" : p));

  const onHideEnd = () => {
    markIntroPlayedInTab();
    setPhase("done");
    document.body.classList.remove("overflow-hidden");
    window.scrollTo(0, 0);
    signalIntroDone();
  };

  if (phase === "checking" || phase === "done") return null;

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
      {/* Encaixe igual a imagem do hero: mobile cropa (cover); md+ preenche (fill). */}
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
