import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { HeroSlide as Slide } from "./hero.data";
import { cn } from "@/lib/cn";

export function HeroSlide({ slide, active }: { slide: Slide; active: boolean }) {
  return (
    <div className={cn("absolute inset-0 transition-opacity duration-[1200ms] ease-brand", active ? "opacity-100" : "opacity-0")}>
      {/* mobile: cropa (cover); md+: preenche o hero (fill, distorce um pouco).
          A camada de slides é fixada no tamanho do viewport (ver Hero) — então o
          frame ao encolher apenas RECORTA esta imagem, sem re-enquadrar. */}
      <MediaPlaceholder tone={slide.tone} src={slide.image} alt={slide.image ? slide.name : ""} className="md:object-fill" />
    </div>
  );
}
