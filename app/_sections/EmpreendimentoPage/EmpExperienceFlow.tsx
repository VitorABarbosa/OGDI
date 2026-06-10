import type { ReactNode } from "react";
import { GalleryFlowBackground } from "@/components/ui/gallery-flow-background";

export function EmpExperienceFlow({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-bg-soft">
      <GalleryFlowBackground />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
