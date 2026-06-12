import { Kicker } from "@/components/ui/Kicker";

const compromissos = [
  {
    idx: "01",
    title: "Inteligência própria",
    desc: "Mercado, praça e leitura concorrencial feitos pela equipe — cada recomendação nasce de dado, não de tese genérica.",
  },
  {
    idx: "02",
    title: "Papéis e marcos definidos",
    desc: "Escopo, responsabilidades e marcos estabelecidos em contrato, definidos na estruturação da operação.",
  },
  {
    idx: "03",
    title: "Condução única",
    desc: "Uma só responsável da originação ao lançamento — incluindo a articulação com parceiros e o relacionamento com banco, com a CEF quando aplicável.",
  },
  {
    idx: "04",
    title: "Transparência por etapa",
    desc: "O cliente acompanha o estado da operação a cada etapa vencida: o que avançou, o que vem a seguir e o que mudou no caminho.",
  },
];

// O que sustenta a relação — a autoridade da condução em réguas, no mesmo
// desenho das réguas de Atuação da home.
export function ClientesCompromissos() {
  return (
    <section id="clientes-compromissos" className="bg-paper py-[clamp(88px,11vw,160px)]">
      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-[clamp(40px,6vw,96px)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal lg:sticky lg:top-[120px]">
            <Kicker>O que sustenta a relação</Kicker>
            <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3.4vw,46px)] leading-[1.08] tracking-[-.025em] text-ink">
              Confiança se constrói
              <br />
              com método.
            </h2>
            <p className="mt-6 max-w-[44ch] text-[clamp(15px,1.12vw,18px)] leading-[1.65] text-ink-2">
              Quatro compromissos valem para qualquer perfil de cliente e
              qualquer forma de relação — do primeiro escopo à sociedade na
              operação.
            </p>
          </div>

          <div className="reveal reveal-2 flex flex-col">
            {compromissos.map((c, i) => (
              <div
                key={c.idx}
                className={`grid grid-cols-[52px_1fr] gap-[22px] border-t border-[color:var(--line)] py-[clamp(22px,2.8vw,32px)] ${i === compromissos.length - 1 ? "border-b" : ""} transition-[padding-left] duration-[400ms] ease-brand hover:pl-3`}
              >
                <span className="font-sans text-[17px] font-semibold leading-none tracking-[.02em] text-green tabular-nums">{c.idx}</span>
                <div>
                  <h3 className="m-0 mb-2 font-sans font-semibold text-[clamp(17px,1.45vw,22px)] tracking-[-.015em] text-ink">{c.title}</h3>
                  <p className="m-0 max-w-[500px] text-[14px] leading-[1.6] text-ink-2">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
