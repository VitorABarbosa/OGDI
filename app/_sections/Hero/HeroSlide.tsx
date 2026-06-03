import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { HeroSlide as Slide } from "./hero.data";
import { cn } from "@/lib/cn";

export function HeroSlide({ slide, active }: { slide: Slide; active: boolean }) {
  return (
    <div className={cn("absolute inset-0 transition-opacity duration-[1200ms] ease-brand", active ? "opacity-100" : "opacity-0")}>
      <MediaPlaceholder tone={slide.tone} />
    </div>
  );
}
