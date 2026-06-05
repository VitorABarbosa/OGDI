import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/data/site";

const steps = [
  {
    idx: "01",
    title: "Leitura da oportunidade",
    desc: "Entendemos ativo, contexto, restrições e potencial de mercado.",
  },
  {
    idx: "02",
    title: "Desenho do caminho",
    desc: "Organizamos produto, viabilidade, parceiros e próximo movimento.",
  },
  {
    idx: "03",
    title: "Conversa objetiva",
    desc: "Se houver aderência, avançamos com uma primeira mesa de decisão.",
  },
];

const contacts = [
  { k: "E-mail", v: site.email },
  { k: "Telefone", v: site.phone },
  { k: "Base", v: site.location },
];

export function ContatoInfo() {
  return (
    <div className="max-w-[720px]">
      <Kicker tone="on-dark-green">Vamos conversar</Kicker>
      <h2 className="mt-[clamp(30px,4.2vw,58px)] mb-0 font-news font-normal text-[clamp(2.6rem,5.9vw,6.8rem)] leading-[.95] tracking-[-.025em] text-white">
        Traga a oportunidade.
        <span className="block text-white/42">A gente desenha o próximo movimento.</span>
      </h2>
      <p className="mt-[clamp(26px,3.2vw,42px)] text-[clamp(1.02rem,1.35vw,1.28rem)] text-white/72 max-w-[570px] leading-[1.65]">
        Terreno, ativo, parceria, tese de investimento ou projeto em fase inicial. A primeira conversa não precisa estar pronta; precisa estar bem direcionada.
      </p>
      <div className="mt-[clamp(42px,5vw,66px)] border-t border-white/14">
        {steps.map((step) => (
          <div key={step.idx} className="grid grid-cols-[56px_1fr] gap-5 border-b border-white/14 py-[22px]">
            <span className="font-sans text-[12px] tracking-[.16em] text-green tabular-nums">{step.idx}</span>
            <div>
              <h3 className="m-0 font-sans text-[15px] font-semibold tracking-[.02em] text-white uppercase">
                {step.title}
              </h3>
              <p className="mt-2 mb-0 max-w-[470px] text-[14px] leading-[1.55] text-white/56">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[34px] grid grid-cols-1 sm:grid-cols-3 gap-5">
        {contacts.map((item) => (
          <div key={item.k}>
            <div className="text-[10px] tracking-[.16em] uppercase text-white/35">{item.k}</div>
            <div className="mt-2 font-sans text-[13.5px] font-medium text-white/82">{item.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
