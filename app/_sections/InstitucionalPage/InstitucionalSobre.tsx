import { Kicker } from "@/components/ui/Kicker";
import { institucional } from "./institucional.data";

export function InstitucionalSobre() {
  const { about } = institucional;
  return (
    <section id="institucional-sobre" className="bg-white py-section text-ink">
      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,100px)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="reveal">
            <Kicker>{about.kicker}</Kicker>
            <h2 className="mt-[18px] font-sans font-semibold text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.07] tracking-[-.03em] text-ink">
              Nosso trabalho começa{" "}
              <span className="font-news font-normal italic text-teal tracking-[-.005em]">antes da obra</span>.
            </h2>
            <div className="mt-[28px] flex flex-wrap gap-[10px]">
              {about.models.map((m) => (
                <span
                  key={m.strong}
                  className="rounded-full border border-[color:var(--line)] px-4 py-[9px] text-[12.5px] tracking-[.03em] text-ink-2"
                >
                  <b className="font-semibold text-ink">{m.strong}</b> {m.rest}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal reveal-2 [&_p]:mb-5 [&_p]:max-w-[62ch] [&_p]:text-[clamp(15px,1.25vw,18px)] [&_p]:leading-[1.72] [&_p]:text-ink-2 [&_p:last-child]:mb-0 [&_.em]:font-medium [&_.em]:text-ink">
            <p>
              A Open Group Desenvolvimento Imobiliário atua na{" "}
              <span className="em">estruturação e desenvolvimento de empreendimentos imobiliários</span>, conduzindo
              oportunidades da conceituação ao lançamento.
            </p>
            <p>
              Nosso trabalho começa antes da obra: na leitura da oportunidade, na análise de viabilidade, no desenho
              estratégico da operação e na articulação dos parceiros necessários para o projeto avançar com consistência.
            </p>
            <p>
              Atuamos junto a construtoras, incorporadoras, empresas com ativos imobiliários e investidores — combinando
              visão estratégica, estruturação financeira e institucional, conexão com parceiros e condução até as etapas
              críticas de mercado.
            </p>
            <p>
              Mais do que desenvolver empreendimentos,{" "}
              <span className="em">
                estruturamos operações imobiliárias para que potencial, capital e execução avancem na mesma direção.
              </span>
            </p>
          </div>
        </div>

        {about.facts.length > 0 ? (
          <div className="reveal mt-[clamp(40px,5vw,64px)] grid grid-cols-1 gap-px border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-3">
            {about.facts.map((f) => (
              <div key={f.v} className="bg-white px-[26px] py-7">
                <div className="font-news font-normal text-[clamp(1.5rem,2.2vw,2.1rem)] leading-none text-ink">
                  {f.v}
                </div>
                <div className="mt-[9px] text-[12px] leading-[1.45] tracking-[.03em] text-ink-3">{f.k}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
