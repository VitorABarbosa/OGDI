import { Kicker } from "@/components/ui/Kicker";
import { atuacaoSteps } from "@/data/empreendimento";

// Seção de método OGDI — conteúdo igual para todos os empreendimentos (não recebe prop do projeto).
export function EmpAtuacao() {
  return (
    <section className="bg-bg-soft py-section">
      <div className="wrap">
        {/* Head */}
        <div className="max-w-[620px] mb-[clamp(40px,5vw,64px)]">
          <Kicker>A atuação da Open Group</Kicker>
          <h2 className="font-sans font-semibold text-[clamp(24px,2.6vw,36px)] tracking-[-.025em] leading-[1.1] mt-4">
            Como estruturamos esta operação.
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-4 gap-px bg-[color:var(--line)] border border-[color:var(--line)] max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {atuacaoSteps.map((step) => (
            <div
              key={step.n}
              className="bg-bg-soft p-[30px_26px] flex flex-col gap-3 transition-colors duration-[350ms] hover:bg-white"
            >
              <span className="font-sans text-[13px] font-semibold text-teal tracking-[.04em]">
                {step.n}
              </span>
              <h3 className="font-sans font-semibold text-[16.5px] tracking-[-.01em]">
                {step.title}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-ink-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
