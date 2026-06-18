"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash) return;

    window.history.scrollRestoration = "manual";
    const raf = window.requestAnimationFrame(() => {
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(raf);
  }, [lenis, pathname]);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.085,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.15,
        anchors: {
          offset: 0,
          duration: 1.15,
        },
      }}
    >
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}
