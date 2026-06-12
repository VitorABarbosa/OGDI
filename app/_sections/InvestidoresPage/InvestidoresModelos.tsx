import { Kicker } from "@/components/ui/Kicker";

const modelos = [
  {
    sigla: "SCP",
    nome: "Sociedade em Conta de Participação",
    desc: "O capital participa de uma operação específica, com escopo, papéis e marcos definidos em contrato.",
  },
  {
    sigla: "Permuta",
    nome: "Terreno como capital",
    desc: "A área entra como capital na operação — o proprietário participa do resultado do empreendimento.",
  },
  {
    sigla: "Coinvest.",
    nome: "Capital ao lado da operação",
    desc: "Investimento junto à Open Group e a parceiros estratégicos na estruturação da operação.",
  },
];

// Modelos como tipografia grande em colunas desencontradas — sem cards,
// sem caixas: hierarquia por escala e espaço.
export function InvestidoresModelos() {
  return (
    <section className="bg-bg-soft py-[clamp(96px,12vw,180px)]">
      <div className="wrap">
        <div className="reveal max-w-[640px]">
          <Kicker>Modelos de participação</Kicker>
          <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3.2vw,44px)] leading-[1.08] tracking-[-.025em]">
            Estruturas definidas
            <br />
            pela operação — não o contrário.
          </h2>
        </div>

        <div className="mt-[clamp(56px,7vw,104px)] grid grid-cols-1 gap-x-[clamp(40px,5vw,80px)] gap-y-[clamp(56px,7vw,96px)] md:grid-cols-3">
          {modelos.map((m, i) => (
            <div key={m.sigla} className={`reveal reveal-${Math.min(i + 1, 5)} ${i === 1 ? "md:translate-y-[clamp(28px,4vw,64px)]" : ""} ${i === 2 ? "md:translate-y-[clamp(56px,8vw,128px)]" : ""}`}>
              <span className="block font-news text-[clamp(2.6rem,4.8vw,4.4rem)] leading-none tracking-[-.03em] text-teal">
                {m.sigla}
              </span>
              <span className="mt-4 block h-px w-12 bg-green" />
              <h3 className="mt-5 font-sans font-semibold text-[clamp(17px,1.4vw,21px)] tracking-[-.015em] text-ink">
                {m.nome}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[14.5px] leading-[1.62] text-ink-2">{m.desc}</p>
            </div>
          ))}
        </div>

        <p className="reveal mt-[clamp(64px,9vw,140px)] text-[12.5px] tracking-[.04em] text-ink-3">
          Cada estrutura é definida caso a caso, conforme a operação — sem promessa de resultado.
        </p>
      </div>
    </section>
  );
}
