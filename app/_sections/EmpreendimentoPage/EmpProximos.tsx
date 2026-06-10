import { Kicker } from "@/components/ui/Kicker";
import { TextLink } from "@/components/ui/TextLink";
import { CaseCard } from "@/app/_sections/ProjetosPage/CaseCard";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

export function EmpProximos({ others }: { others: Projeto[] }) {
  return (
    <section className="py-section">
      <div className="wrap">
        {/* Head */}
        <div className="flex items-end justify-between gap-[30px] flex-wrap mb-[clamp(36px,4vw,56px)]">
          <div>
            <Kicker>Continue explorando</Kicker>
            <h2 className="font-sans font-semibold text-[clamp(24px,2.6vw,36px)] tracking-[-.025em] mt-[14px]">
              Outros empreendimentos.
            </h2>
          </div>
          <TextLink href="/projetos">Ver todos os projetos</TextLink>
        </div>

        {/* Grid — 3 columns, each CaseCard fills one cell (no span prop) */}
        <div className="grid grid-cols-3 gap-[clamp(20px,2vw,32px)] max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
          {others.map((p) => (
            <CaseCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
