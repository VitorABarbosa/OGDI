import Link from "next/link";
import { Kicker } from "@/components/ui/Kicker";

const perguntas = [
  {
    q: "Como começa uma relação com a Open Group?",
    a: "Com a apresentação da oportunidade — o ativo, o terreno ou o projeto. A equipe faz a primeira leitura e retorna com os próximos passos possíveis.",
  },
  {
    q: "A Open Group executa a obra?",
    a: "Não. A execução é dos parceiros construtores — a Open Group estrutura e conduz a operação, conectando os papéis certos em cada etapa.",
  },
  {
    q: "Em que momento o capital entra na operação?",
    a: "Na estruturação, antes do lançamento — a fase em que o valor é criado. Os modelos de participação estão detalhados na página de investidores.",
  },
  {
    q: "O escopo pode crescer ao longo da operação?",
    a: "Sim. A relação pode começar como consultoria contratada e evoluir para parceria estratégica ou sociedade na operação, conforme fizer sentido para os dois lados.",
  },
];

// Perguntas de quem chega — respostas curtas e diretas, sem acordeão:
// tudo visível, no espírito editorial do site.
export function ClientesPerguntas() {
  return (
    <section id="clientes-perguntas" className="bg-bg-soft-2 py-[clamp(80px,10vw,148px)]">
      <div className="wrap">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>Perguntas frequentes</Kicker>
            <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3vw,40px)] leading-[1.1] tracking-[-.025em] text-ink">
              O que quem chega
              <br />
              costuma perguntar.
            </h2>
          </div>
          <p className="max-w-[36ch] text-[13.5px] leading-[1.6] text-ink-3 max-md:text-left md:text-right">
            Não achou a sua pergunta?{" "}
            <Link href="/contato" className="text-teal underline decoration-teal/30 underline-offset-4 transition-colors hover:text-green">
              Fale com a equipe
            </Link>
            .
          </p>
        </div>

        <div className="reveal reveal-2 mt-[clamp(40px,5vw,64px)] grid grid-cols-1 gap-x-[clamp(40px,5vw,88px)] gap-y-[clamp(28px,3.4vw,44px)] md:grid-cols-2">
          {perguntas.map((p) => (
            <div key={p.q} className="border-t border-[color:var(--line)] pt-[clamp(20px,2.4vw,28px)]">
              <h3 className="font-sans font-semibold text-[clamp(16.5px,1.3vw,20px)] leading-[1.3] tracking-[-.015em] text-ink">
                {p.q}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.62] text-ink-2">{p.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
