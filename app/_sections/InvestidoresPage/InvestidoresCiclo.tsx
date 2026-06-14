import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { atuacaoSteps } from "@/app/_sections/Atuacao/atuacao.data";

// Etapa em que o capital entra na operação.
const CAPITAL_IDX = "05";

// Faixa dark de alto contraste: as 10 etapas do ciclo completo (da
// oportunidade ao pós-entrega) em uma única linha, com o ponto de entrada
// do capital como o único acento da seção. A Curva (hero) segue
// representando só a fase pré-obra.
export async function InvestidoresCiclo() {
  const t = await getTranslations("investidores.ciclo");
  const ts = await getTranslations("home.atuacao.steps");
  return (
    <section id="investidores-ciclo" className="bg-dark py-[clamp(60px,7vw,108px)] text-white">
      <div className="wrap">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <Kicker tone="on-dark-green">{t("kicker")}</Kicker>
          <p className="max-w-[38ch] text-right text-[13px] leading-[1.6] text-white/55 max-md:text-left">
            {t("intro")}
          </p>
        </div>

        <div className="reveal reveal-2 mt-[clamp(40px,5vw,68px)]">
          <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-10">
            {atuacaoSteps.map((s) => {
              const capital = s.idx === CAPITAL_IDX;
              return (
                <li key={s.idx} className="relative border-[color:var(--line-dark)] py-6 max-xl:border-t max-xl:pl-9 xl:border-l xl:px-[14px] xl:py-0">
                  {/* marcador sobre a linha */}
                  <span
                    aria-hidden
                    className={`absolute block h-[9px] w-[9px] rounded-full max-xl:left-0 max-xl:top-[34px] xl:-left-[5px] xl:-top-[3px] ${capital ? "bg-green shadow-[0_0_0_5px_rgba(95,168,60,.18)]" : "bg-white/30"}`}
                  />
                  <div className="xl:mt-8">
                    <span className="block font-sans text-[12px] tracking-[.18em] uppercase text-white/40 tabular-nums">
                      {s.idx}
                    </span>
                    <span className={`mt-2 block font-sans font-semibold text-[clamp(14px,0.95vw,16.5px)] leading-[1.22] tracking-[-.015em] ${capital ? "text-green" : "text-white"}`}>
                      {ts(`${s.idx}.title`)}
                    </span>
                    {capital && (
                      <span className="mt-2 block text-[10.5px] uppercase tracking-[.14em] text-green/80">
                        {t("capitalLabel")}
                      </span>
                    )}
                    <p className="mt-[10px] text-[11.5px] leading-[1.5] text-white/50">
                      {ts(`${s.idx}.desc`)}
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
