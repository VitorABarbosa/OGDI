import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { CaseCard } from "@/app/_sections/ProjetosPage/CaseCard";
import { projetos } from "@/app/_sections/Projetos/projetos.data";

// Prova: as operações do portfólio em cards visuais — em todas, a Open
// Group é sócia da operação.
export function ClientesOperacoes() {
  return (
    <section id="clientes-operacoes" className="bg-bg-soft py-[clamp(88px,11vw,160px)]">
      <div className="wrap">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <Kicker>Relações em operação</Kicker>
            <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3.2vw,44px)] leading-[1.08] tracking-[-.025em] text-ink">
              A confiança, na prática.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[13.5px] leading-[1.6] text-ink-2 max-md:text-left md:text-right">
            Nas operações do portfólio atual, a Open Group é{" "}
            <span className="font-medium text-ink">sócia da operação</span> —
            potencial, capital e execução na mesma direção.
          </p>
        </div>

        <div className="mt-[clamp(40px,5vw,68px)] grid grid-cols-12 max-md:grid-cols-1 gap-x-[clamp(18px,2vw,32px)] gap-y-[clamp(40px,4.5vw,64px)]">
          {projetos.slice(0, 3).map((p, i) => (
            <CaseCard key={p.slug} p={p} index={i} span="4" />
          ))}
        </div>

        <div className="reveal mt-[clamp(40px,5vw,64px)] flex justify-center">
          <Button href="/projetos" arrow>
            Ver todas as operações
          </Button>
        </div>
      </div>
    </section>
  );
}
