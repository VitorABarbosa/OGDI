import { Kicker } from "@/components/ui/Kicker";

const pilares = [
  {
    idx: "01",
    title: "Marcos definidos",
    desc: "Cada operação avança por marcos claros, definidos na estruturação — do destravamento da viabilidade à preparação para lançamento.",
  },
  {
    idx: "02",
    title: "Reporte por etapa",
    desc: "O investidor recebe o estado da operação a cada etapa vencida: o que avançou, o que vem a seguir e o que mudou no caminho.",
  },
  {
    idx: "03",
    title: "Condução única",
    desc: "A condução é da Open Group — da articulação com parceiros e banco à estratégia comercial. Uma só responsável pela operação inteira.",
  },
];

// Governança: a autoridade da condução. Coluna esquerda fixa com o
// statement; à direita, os três pilares em réguas.
export function InvestidoresGovernanca() {
  return (
    <section id="investidores-governanca" className="bg-paper py-[clamp(88px,11vw,160px)]">
      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,96px)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal lg:sticky lg:top-[120px]">
            <Kicker>Governança e acompanhamento</Kicker>
            <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3.4vw,46px)] leading-[1.08] tracking-[-.025em] text-ink">
              A operação inteira,
              <br />
              sob condução única.
            </h2>
            <p className="mt-6 max-w-[44ch] text-[clamp(15px,1.12vw,18px)] leading-[1.65] text-ink-2">
              Investir antes da obra exige enxergar a operação. Por isso a
              Open Group conduz com ordem: marcos definidos, reporte por etapa
              e uma única responsável do início ao lançamento.
            </p>
          </div>

          <div className="reveal reveal-2 flex flex-col">
            {pilares.map((p, i) => (
              <div
                key={p.idx}
                className={`grid grid-cols-[52px_1fr] gap-[22px] border-t border-[color:var(--line)] py-[clamp(24px,3vw,34px)] ${i === pilares.length - 1 ? "border-b" : ""} transition-[padding-left] duration-[400ms] ease-brand hover:pl-3`}
              >
                <span className="font-sans text-[17px] font-semibold leading-none tracking-[.02em] text-green tabular-nums">{p.idx}</span>
                <div>
                  <h3 className="m-0 mb-2 font-sans font-semibold text-[clamp(18px,1.5vw,23px)] tracking-[-.015em] text-ink">{p.title}</h3>
                  <p className="m-0 max-w-[480px] text-[14.5px] leading-[1.6] text-ink-2">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
