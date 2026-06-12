import { Kicker } from "@/components/ui/Kicker";

export function ClientesHero() {
  return (
    <section
      id="clientes-inicio"
      data-header-dark
      className="relative overflow-hidden bg-dark pt-[clamp(150px,20vh,230px)] pb-[clamp(72px,9vw,128px)] text-white"
    >
      {/* Glow radial — mesma família dos heroes de Projetos e Contato */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-60 [background:radial-gradient(105%_85%_at_15%_-8%,rgba(31,90,99,.42),transparent_56%),radial-gradient(85%_75%_at_92%_112%,rgba(95,168,60,.15),transparent_60%)]"
      />
      <div className="wrap relative z-[1]">
        <Kicker tone="on-dark-green" className="reveal">Clientes</Kicker>
        <h1 className="reveal reveal-2 mt-6 max-w-[20ch] font-news font-normal text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[1.06] tracking-[-.018em]">
          Cada operação nasce de
          <br />
          <span className="italic text-green">uma relação de confiança</span>.
        </h1>
        <p className="reveal reveal-3 mt-7 max-w-[54ch] text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-white/70">
          Incorporadoras, construtoras, fundos e proprietários de área que
          estruturam suas operações com a Open Group — da origem ao lançamento.
        </p>
      </div>
    </section>
  );
}
