import { Kicker } from "@/components/ui/Kicker";

const formas = [
  {
    idx: "01",
    title: "Consultoria contratada",
    desc: "Escopo definido: leitura da oportunidade, inteligência de mercado ou viabilidade — entregues como projeto.",
    quando: "Para validar uma oportunidade ou destravar uma decisão específica.",
    depth: "w-1/3",
  },
  {
    idx: "02",
    title: "Parceira estratégica",
    desc: "A Open Group permanece na condução: estruturação da operação, conexão com parceiros e preparação para lançamento.",
    quando: "Para levar a operação inteira adiante com uma condução única.",
    depth: "w-2/3",
  },
  {
    idx: "03",
    title: "Sócia da operação",
    desc: "Participação na própria operação — potencial, capital e execução na mesma direção, com resultado compartilhado.",
    quando: "Para dividir risco e resultado em operações de maior potencial.",
    depth: "w-full",
  },
];

// As três formas de relação (as mesmas tags da home), como uma régua de
// profundidade crescente — a relação pode começar pequena e crescer.
export function ClientesRelacao() {
  return (
    <section id="clientes-relacao" className="bg-dark py-[clamp(80px,10vw,148px)] text-white">
      <div className="wrap">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <Kicker tone="on-dark-green">Formas de relação</Kicker>
          <p className="max-w-[38ch] text-right text-[13px] leading-[1.6] text-white/55 max-md:text-left">
            Três profundidades de envolvimento — a relação pode começar em um
            escopo e crescer com a operação.
          </p>
        </div>

        <div className="reveal reveal-2 mt-[clamp(48px,6vw,84px)] grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-[clamp(28px,3.5vw,56px)]">
          {formas.map((f) => (
            <div key={f.idx}>
              <span className="font-sans text-[12px] tracking-[.18em] uppercase text-white/40 tabular-nums">{f.idx}</span>
              <h3 className="mt-2 font-sans font-semibold text-[clamp(18px,1.5vw,22px)] tracking-[-.015em] text-white">
                {f.title}
              </h3>
              {/* barra de profundidade do envolvimento */}
              <span aria-hidden className="mt-4 block h-[3px] w-full bg-white/10">
                <span className={`block h-full bg-green ${f.depth}`} />
              </span>
              <p className="mt-4 max-w-[40ch] text-[13.5px] leading-[1.6] text-white/55">{f.desc}</p>
              <p className="mt-3 max-w-[40ch] text-[12.5px] leading-[1.55] text-white/40">
                <span className="text-green/75">Quando faz sentido:</span> {f.quando}
              </p>
            </div>
          ))}
        </div>

        <p aria-hidden className="reveal mt-[clamp(36px,4.5vw,60px)] text-right text-[11px] uppercase tracking-[.22em] text-green/70">
          Envolvimento crescente →
        </p>
      </div>
    </section>
  );
}
