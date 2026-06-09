import Link from "next/link";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { projetoHref, type Projeto } from "@/app/_sections/Projetos/projetos.data";
import { cn } from "@/lib/cn";

const chipColor: Record<Projeto["cat"], string> = {
  obra: "text-[#8fd06a]",
  futuro: "text-[#79c7d4]",
  entregue: "text-[#e7e2d6]",
};

const spanClass: Record<"6" | "4" | "8", string> = {
  "6": "col-span-6",
  "4": "col-span-4",
  "8": "col-span-8",
};

const aspectClass: Record<"default" | "tall" | "wide", string> = {
  default: "aspect-[4/3]",
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
};

export function CaseCard({
  p,
  span = "6",
  shape,
}: {
  p: Projeto;
  span?: "6" | "4" | "8";
  shape?: "tall" | "wide";
}) {
  const aspectKey = shape ?? "default";

  return (
    <Link
      href={projetoHref(p.slug)}
      className={cn("group flex flex-col", spanClass[span])}
    >
      {/* ── Media ── */}
      <div
        className={cn(
          "relative overflow-hidden bg-dark",
          aspectClass[aspectKey],
        )}
      >
        {/* Image — wrapper carries the scale transition so MediaPlaceholder stays semantic */}
        <div className="absolute inset-0 transition-transform duration-[1100ms] ease-brand group-hover:scale-[1.045]">
          <MediaPlaceholder tone={p.tone} src={p.image} alt={p.image ? p.name : ""} />
        </div>

        {/* Scrim — fades in on hover */}
        <div
          aria-hidden
          className="absolute inset-0 z-[2] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-brand [background:linear-gradient(0deg,rgba(10,14,15,.5)_0%,rgba(10,14,15,0)_42%)]"
        />

        {/* Status chip */}
        <span
          className={cn(
            "absolute top-4 left-4 z-[3]",
            "text-[10.5px] tracking-[.16em] uppercase font-medium",
            "px-3 py-[7px]",
            "[background:rgba(12,18,19,.5)] backdrop-blur-[6px]",
            "border border-white/[.18]",
            chipColor[p.cat],
          )}
        >
          {p.status}
        </span>

        {/* Go button — arrow circle, revealed on hover */}
        <span
          aria-hidden
          className={cn(
            "absolute right-4 bottom-4 z-[3]",
            "w-[46px] h-[46px] rounded-full bg-white text-ink",
            "flex items-center justify-center",
            "opacity-0 translate-y-2",
            "group-hover:opacity-100 group-hover:translate-y-0",
            "transition-[opacity,transform] duration-[450ms]",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="w-[18px] h-[18px]"
            aria-hidden
          >
            <path d="M7 17L17 7M17 7H9M17 7V15" />
          </svg>
        </span>
      </div>

      {/* ── Body ── */}
      <div className="pt-5 pb-0 px-0 flex flex-col gap-[7px]">
        {/* Name */}
        <div className="font-serif font-normal text-[clamp(22px,2vw,30px)] leading-[1.05] tracking-[-0.005em] text-ink">
          {p.name}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] tracking-[.1em] uppercase text-ink-3">
          <span>{p.segmento}</span>
          {/* Separator dot */}
          <span
            aria-hidden
            className="w-1 h-1 rounded-full bg-[color:var(--line-2)] shrink-0"
          />
          {p.localTbd ? (
            <span className="italic normal-case tracking-[.01em]">{p.local}</span>
          ) : (
            <span>{p.local}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
