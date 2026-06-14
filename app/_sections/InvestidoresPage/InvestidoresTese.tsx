import { getTranslations } from "next-intl/server";
import { GalleryFlowBackground } from "@/components/ui/gallery-flow-background";

const statements = [
  { idx: "01", align: "left" as const },
  { idx: "02", align: "right" as const },
  { idx: "03", align: "left" as const },
];

// A tese em statements oversized com numerais gigantes vazados ao fundo —
// espaço negativo extremo no lugar das réguas usadas no resto do site.
// A linha fluida costura os três statements em serpentina suave.
export async function InvestidoresTese() {
  const t = await getTranslations("investidores.tese");
  return (
    <section id="investidores-tese" className="relative overflow-hidden bg-paper py-[clamp(96px,13vw,200px)]">
      <GalleryFlowBackground background="#FFFFFF" variant="investidores" />
      <div className="wrap relative z-[2] flex flex-col gap-[clamp(88px,12vw,176px)]">
        {statements.map((s) => (
          <div
            key={s.idx}
            className={`reveal relative max-w-[820px] ${s.align === "right" ? "self-end text-right" : ""}`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-[.62em] select-none font-news text-[clamp(7rem,18vw,17rem)] leading-none tracking-[-.04em] text-transparent [-webkit-text-stroke:1px_rgba(23,26,27,.13)] ${s.align === "right" ? "-right-[.08em]" : "-left-[.08em]"}`}
            >
              {s.idx}
            </span>
            <h2 className="relative font-sans font-semibold text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.04] tracking-[-.03em] text-ink">
              {t.rich(`items.${s.idx}.title`, {
                em: (chunks) => <em className="not-italic text-green">{chunks}</em>,
              })}
            </h2>
            <p className={`relative mt-6 max-w-[46ch] text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-ink-2 ${s.align === "right" ? "ml-auto" : ""}`}>
              {t(`items.${s.idx}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
