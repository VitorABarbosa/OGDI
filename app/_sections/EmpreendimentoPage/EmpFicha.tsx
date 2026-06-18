import { useTranslations } from "next-intl";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";
import { cn } from "@/lib/cn";

type FichaCell = { value: string; label: string; tbd?: boolean };

// Ficha técnica — faixa escura full-bleed com grade de números (5→3→2 colunas),
// 1:1 com a referência `Empreendimento.html` (.em-ficha): valor em serif grande +
// rótulo em caixa-alta, filetes finos entre células; células `tbd` ficam itálicas
// esmaecidas. Sem cabeçalho (a referência é só a grade). Conteúdo por projeto em
// `proj.<slug>.ficha`.
export function EmpFicha({ p }: { p: Projeto }) {
  const tp = useTranslations("proj");
  const cells = tp.raw(`${p.slug}.ficha`) as FichaCell[];

  if (!cells?.length) return null;

  return (
    <section id="ficha" className="scroll-mt-[120px] bg-[#0B1413] text-white">
      <div className="reveal grid grid-cols-2 border-t border-white/10 sm:grid-cols-3 lg:grid-cols-5">
        {cells.map((cell, index) => (
          <div
            key={`${cell.label}-${index}`}
            className="flex flex-col gap-[9px] border-b border-r border-white/10 px-[clamp(18px,2vw,30px)] py-[clamp(28px,3.4vw,44px)]"
          >
            <span
              className={cn(
                "font-serif font-normal leading-none tracking-[.005em]",
                cell.tbd
                  ? "text-[clamp(18px,1.8vw,24px)] italic text-white/45"
                  : "text-[clamp(26px,2.6vw,38px)] text-white",
              )}
            >
              {cell.value}
            </span>
            <span className="text-[10.5px] uppercase tracking-[.16em] text-white/50">
              {cell.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
