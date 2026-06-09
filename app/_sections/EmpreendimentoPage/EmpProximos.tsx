import { Kicker } from "@/components/ui/Kicker";
import { TextLink } from "@/components/ui/TextLink";
import { CaseCard } from "@/app/_sections/ProjetosPage/CaseCard";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

export function EmpProximos({ others }: { others: Projeto[] }) {
  return (
    <section className="py-section">
      <div className="wrap">
        {/* Head */}
        <div
          className="flex items-end justify-between flex-wrap mb-[clamp(36px,4vw,56px)]"
          style={{ gap: "30px" }}
        >
          <div>
            <Kicker>Continue explorando</Kicker>
            <h2
              className="font-sans font-semibold mt-[14px]"
              style={{ fontSize: "clamp(24px, 2.6vw, 36px)", letterSpacing: "-.025em" }}
            >
              Outros empreendimentos.
            </h2>
          </div>
          <TextLink href="/projetos">Ver todos os projetos</TextLink>
        </div>

        {/* Grid — 3 columns, each CaseCard fills one cell (no span prop) */}
        <div
          className="grid grid-cols-3 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1"
          style={{ gap: "clamp(20px, 2vw, 32px)" }}
        >
          {others.map((p) => (
            <CaseCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
