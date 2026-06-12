import { Kicker } from "@/components/ui/Kicker";
import { atuacaoSteps } from "@/app/_sections/Atuacao/atuacao.data";

// Etapa em que o capital entra na operação.
const CAPITAL_IDX = "05";

// Faixa dark de alto contraste: as 7 etapas da atuação (mesma fonte de
// dados da home) em uma única linha, com o ponto de entrada do capital
// como o único acento da seção.
export function InvestidoresCiclo() {
  return (
    <section className="bg-dark py-[clamp(80px,10vw,148px)] text-white">
      <div className="wrap">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <Kicker tone="on-dark-green">O ciclo da operação</Kicker>
          <p className="max-w-[38ch] text-right text-[13px] leading-[1.6] text-white/55 max-md:text-left">
            O capital entra na estruturação — e participa da criação de valor,
            não apenas do resultado.
          </p>
        </div>

        <div className="reveal reveal-2 mt-[clamp(48px,6vw,84px)]">
          <ol className="grid grid-cols-1 xl:grid-cols-7">
            {atuacaoSteps.map((s) => {
              const capital = s.idx === CAPITAL_IDX;
              return (
                <li key={s.idx} className="relative border-[color:var(--line-dark)] py-6 max-xl:border-t max-xl:pl-9 xl:border-l xl:px-4 xl:py-0">
                  {/* marcador sobre a linha */}
                  <span
                    aria-hidden
                    className={`absolute block h-[9px] w-[9px] rounded-full max-xl:left-0 max-xl:top-[34px] xl:-left-[5px] xl:-top-[3px] ${capital ? "bg-green shadow-[0_0_0_5px_rgba(95,168,60,.18)]" : "bg-white/30"}`}
                  />
                  <div className="xl:mt-9">
                    <span className="block font-sans text-[12px] tracking-[.18em] uppercase text-white/40 tabular-nums">
                      {s.idx}
                    </span>
                    <span className={`mt-2 block font-sans font-semibold text-[clamp(15px,1.05vw,18px)] leading-[1.25] tracking-[-.015em] ${capital ? "text-green" : "text-white"}`}>
                      {s.title}
                    </span>
                    {capital && (
                      <span className="mt-2 block text-[11px] uppercase tracking-[.16em] text-green/80">
                        O capital entra aqui
                      </span>
                    )}
                    <p className="mt-3 max-w-[46ch] text-[12.5px] leading-[1.55] text-white/50">
                      {s.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
