import Link from "next/link";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { projetoHref, type Projeto } from "@/app/_sections/Projetos/projetos.data";
import { cn } from "@/lib/cn";

// Card da grade de Projetos — referência Vitacon: imagem em retrato, badge de
// status no topo e nome + segmento·local sobre um degradê na base da foto.
// Dedicado a esta página; o CaseCard editorial (texto abaixo) segue servindo
// Investidores / Clientes / Próximos.
const chipColor: Record<Projeto["cat"], string> = {
  obra: "text-[#8fd06a]",
  futuro: "text-[#79c7d4]",
  entregue: "text-[#e7e2d6]",
};

export function ProjetoTile({
  p,
  index = 0,
  status,
  segmento,
  local,
}: {
  p: Projeto;
  index?: number;
  status?: string;
  segmento?: string;
  local?: string;
}) {
  const revealDelay = `reveal-card-${Math.min(index, 5)}`;
  const statusText = status ?? p.status;
  const segmentoText = segmento ?? p.segmento;
  const localText = local ?? p.local;

  return (
    <Link
      href={projetoHref(p.slug)}
      className={cn(
        "reveal reveal-card group relative block overflow-hidden bg-dark aspect-[3/4]",
        revealDelay,
      )}
    >
      {/* ── Media ── */}
      <div className="absolute inset-0 transition-transform duration-[1100ms] ease-brand group-hover:scale-[1.05]">
        <MediaPlaceholder tone={p.tone} src={p.image} alt={p.image ? p.name : ""} />
      </div>

      {/* Degradê permanente na base — garante leitura do texto sobre a foto */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none [background:linear-gradient(0deg,rgba(8,12,13,.9)_0%,rgba(8,12,13,.45)_30%,transparent_62%)]"
      />

      {/* Status chip — topo-esquerda */}
      <span
        className={cn(
          "absolute top-3 left-3 z-[3]",
          "text-[9.5px] tracking-[.16em] uppercase font-medium",
          "px-[10px] py-[6px]",
          "[background:rgba(12,18,19,.5)] backdrop-blur-[6px]",
          "border border-white/[.18]",
          chipColor[p.cat],
        )}
      >
        {statusText}
      </span>

      {/* Seta — topo-direita, revelada no hover */}
      <span
        aria-hidden
        className={cn(
          "absolute right-3 top-3 z-[3]",
          "w-[38px] h-[38px] rounded-full bg-white text-ink",
          "flex items-center justify-center",
          "opacity-0 -translate-y-1",
          "group-hover:opacity-100 group-hover:translate-y-0",
          "transition-[opacity,transform] duration-[450ms]",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="w-[16px] h-[16px]"
        >
          <path d="M7 17L17 7M17 7H9M17 7V15" />
        </svg>
      </span>

      {/* ── Texto sobre a base ── */}
      <div className="absolute inset-x-0 bottom-0 z-[3] p-[clamp(14px,1vw,18px)]">
        <h3 className="font-serif font-normal text-white text-[clamp(17px,1.25vw,21px)] leading-[1.1] tracking-[-.005em]">
          {p.name}
        </h3>
        <div className="mt-[7px] flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] tracking-[.1em] uppercase text-white/65">
          <span>{segmentoText}</span>
          <span aria-hidden className="w-1 h-1 rounded-full bg-white/35 shrink-0" />
          {p.localTbd ? (
            <span className="italic normal-case tracking-[.02em] text-white/55">{localText}</span>
          ) : (
            <span>{localText}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
