"use client";

import { ReactLenis } from "lenis/react";

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
      {children}
    </ReactLenis>
  );
}
