import Link from "next/link";

const caminhos = [
  {
    title: "Tenho capital para investir",
    desc: "Converse com a equipe sobre as operações em estruturação.",
  },
  {
    title: "Tenho um terreno ou ativo",
    desc: "Apresente a área — fazemos a primeira leitura da oportunidade.",
  },
];

// CTA dividido em dois caminhos gigantes — cada metade é um statement
// clicável; o formulário de contato segmenta pelo tipo.
export function InvestidoresCta() {
  return (
    <section id="investidores-contato" className="bg-dark text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {caminhos.map((c, i) => (
          <Link
            key={c.title}
            href="/contato"
            className={`group relative px-pad-x py-[clamp(72px,10vw,140px)] transition-colors duration-[400ms] ease-brand hover:bg-white/[.04] ${i === 1 ? "border-t border-[color:var(--line-dark)] md:border-l md:border-t-0" : ""}`}
          >
            <span className="block max-w-[16ch] font-news text-[clamp(1.9rem,3.4vw,3.2rem)] leading-[1.08] tracking-[-.02em]">
              {c.title}
              <span aria-hidden className="ml-3 inline-block text-green transition-transform duration-300 ease-brand group-hover:translate-x-2">→</span>
            </span>
            <span className="mt-5 block max-w-[36ch] text-[14px] leading-[1.6] text-white/55">
              {c.desc}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
