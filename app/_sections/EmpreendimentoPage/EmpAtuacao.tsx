import { useTranslations } from "next-intl";
import { Kicker } from "@/components/ui/Kicker";
import { atuacaoSteps } from "@/app/_sections/Atuacao/atuacao.data";
import { cn } from "@/lib/cn";
import type { Projeto, ProjetoCat } from "@/app/_sections/Projetos/projetos.data";

// Quantas etapas da jornada (fonte única: home.atuacao.steps) mostrar, conforme
// o estágio do empreendimento:
//   futuro   → estruturação inicial (até Viabilidade)
//   obra     → até o Início de obras
//   entregue → jornada completa, até o Pós-entrega
const stepCountByCat: Record<ProjetoCat, number> = {
  futuro: 3,
  obra: 7,
  entregue: 10,
};

// Seção de método OGDI — etapas vêm do namespace compartilhado home.atuacao.steps
// (mesmo conteúdo da home/Investidores), recortadas pelo estágio do projeto.
export function EmpAtuacao({ p }: { p?: Projeto }) {
  const t = useTranslations("empreendimento.atuacao");
  const ts = useTranslations("home.atuacao.steps");
  const visibleStrategyBody = p?.strategyStory?.body.slice(0, 1);
  const steps = atuacaoSteps.slice(0, p ? stepCountByCat[p.cat] : 7);

  return (
    <section className="py-section">
      <div className="wrap">
        {p?.strategyStory && (
          <div className="mb-[clamp(52px,7vw,96px)] grid grid-cols-1 gap-[clamp(28px,5vw,76px)] lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <Kicker className="reveal">{p.strategyStory.kicker}</Kicker>
              <h2 className="reveal reveal-2 mt-5 max-w-[680px] font-sans text-[clamp(28px,3.6vw,52px)] font-semibold leading-[1.06] tracking-[-.03em]">
                {p.strategyStory.title}
              </h2>
            </div>
            <div className="space-y-5 self-end text-[clamp(15px,1.12vw,18px)] leading-[1.72] text-ink-2">
              {visibleStrategyBody?.map((paragraph, index) => (
                <p key={`${p.slug}-strategy-${index}`} className={cn("reveal", `reveal-info-${Math.min(index + 1, 5)}`)}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Head */}
        <div className="reveal max-w-[620px] mb-[clamp(40px,5vw,64px)]">
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="reveal reveal-2 font-sans font-semibold text-[clamp(24px,2.6vw,36px)] tracking-[-.025em] leading-[1.1] mt-4">
            {t("heading")}
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-4 gap-px bg-[color:var(--line)] border border-[color:var(--line)] max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {steps.map((step, index) => (
            <div
              key={step.idx}
              className={cn("reveal reveal-step bg-bg-soft/92 p-[30px_26px] flex flex-col gap-3 transition-colors duration-[350ms] hover:bg-white", `reveal-step-${Math.min(index, 5)}`)}
            >
              <span className="font-sans text-[13px] font-semibold text-teal tracking-[.04em]">
                {step.idx}
              </span>
              <h3 className="font-sans font-semibold text-[16.5px] tracking-[-.01em]">
                {ts(`${step.idx}.title`)}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-ink-2">
                {ts(`${step.idx}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
