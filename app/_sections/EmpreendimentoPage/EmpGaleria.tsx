import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/cn";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

const cellLayout: { span: string; aspect: string }[] = [
  { span: "col-span-8",  aspect: "aspect-[16/10]" },
  { span: "col-span-4",  aspect: "aspect-[4/5]"   },
  { span: "col-span-4",  aspect: "aspect-[4/5]"   },
  { span: "col-span-4",  aspect: "aspect-[4/5]"   },
  { span: "col-span-4",  aspect: "aspect-[4/5]"   },
  { span: "col-span-12", aspect: "aspect-[21/9]"   },
];

export function EmpGaleria({ p }: { p: Projeto }) {
  return (
    <section className="pb-section" aria-label="Galeria de imagens">
      <div className="wrap">
        <div className="grid grid-cols-12 gap-[clamp(14px,1.6vw,24px)]">
          {p.gallery.map((slot, i) => {
            const cell = cellLayout[i];
            if (!cell) return null;
            return (
              <div
                key={slot.id}
                className={cn(
                  "relative overflow-hidden bg-dark",
                  "reveal reveal-gallery",
                  `reveal-gallery-${Math.min(i, 5)}`,
                  cell.span,
                  cell.aspect,
                  "max-md:col-span-12 max-md:aspect-[4/3]",
                )}
              >
                <MediaPlaceholder tone={p.tone} alt={slot.alt} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
