import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/cn";

// Card de operação SCP — vitrine, sem página profunda. No hover (ou sempre, no
// mobile) revela a descrição + "Tenho interesse"; o card inteiro abre o site do
// empreendimento em nova aba.
const SCP = "#4FA3AD"; // azul-petróleo — categoria distinta

export function ProjetoTileScp({
  name,
  segmento,
  local,
  desc,
  chip,
  cta,
  image,
  tone,
  href,
  index = 0,
}: {
  name: string;
  segmento: string;
  local: string;
  desc: string;
  chip: string;
  cta: string;
  image?: string;
  tone?: "t1" | "t2" | "t3";
  href: string;
  index?: number;
}) {
  const revealDelay = `reveal-card-${Math.min(index, 5)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — ${cta} (abre em nova aba)`}
      className={cn(
        "reveal reveal-card group relative block overflow-hidden bg-dark aspect-[3/4]",
        revealDelay,
      )}
    >
      {/* Fachada */}
      <div className="absolute inset-0 transition-transform duration-[1100ms] ease-brand group-hover:scale-[1.05]">
        <MediaPlaceholder tone={tone} src={image} alt={image ? name : ""} />
      </div>

      {/* Degradê — aprofunda no hover para dar leitura à descrição */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] transition-[background] duration-500 ease-brand [background:linear-gradient(0deg,rgba(8,12,13,.92),rgba(8,12,13,.32)_42%,transparent_72%)] group-hover:[background:linear-gradient(0deg,rgba(8,12,13,.96),rgba(8,12,13,.6)_60%,rgba(8,12,13,.18))]"
      />

      {/* Chip azul-petróleo */}
      <span
        className="absolute top-3 left-3 z-[3] border border-white/25 px-[10px] py-[6px] text-[9.5px] font-medium uppercase tracking-[.16em] text-white"
        style={{ backgroundColor: "rgba(79,163,173,.85)" }}
      >
        {chip}
      </span>

      {/* Texto */}
      <div className="absolute inset-x-0 bottom-0 z-[3] p-[clamp(14px,1vw,18px)]">
        <h3 className="font-serif font-normal text-white text-[clamp(17px,1.25vw,21px)] leading-[1.1] tracking-[-.005em]">
          {name}
        </h3>
        <div className="mt-[7px] text-[10.5px] uppercase tracking-[.1em] text-white/65">
          {segmento} · {local}
        </div>

        {/* Reveal: descrição + CTA — hover no desktop, sempre visível no mobile */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-[450ms] ease-brand group-hover:grid-rows-[1fr] group-hover:opacity-100 max-md:grid-rows-[1fr] max-md:opacity-100">
          <div className="overflow-hidden">
            <p className="mt-[10px] text-[12.5px] leading-[1.5] text-white/80">{desc}</p>
            <span
              className="mt-3 flex w-full items-center justify-center gap-2 py-[11px] text-[12px] font-medium tracking-[.04em] text-white"
              style={{ backgroundColor: SCP }}
            >
              {cta}
              <span aria-hidden className="transition-transform duration-300 ease-brand group-hover:translate-x-1 group-hover:-translate-y-[2px]">↗</span>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
