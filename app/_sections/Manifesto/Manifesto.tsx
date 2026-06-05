import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import styles from "./Manifesto.module.css";

export function Manifesto() {
  return (
    <section id="institucional" className="relative overflow-clip bg-manifesto text-white py-[clamp(74px,10vw,132px)]">
      <div className={styles.arcs} aria-hidden />
      <div className="wrap relative z-[2]">
        <div className="max-w-[1180px]">
          <Kicker tone="on-dark-green">Sobre a Open Group</Kicker>
          <p className="mt-[clamp(30px,4.2vw,58px)] font-news font-normal text-[clamp(1.65rem,2.78vw,3.15rem)] leading-[1.28] tracking-[-.01em] text-white max-w-none max-md:text-[clamp(1.7rem,8vw,2.35rem)]">
            <span className="block whitespace-nowrap max-md:whitespace-normal">
              Antes da obra, existe a <span className="text-manifesto-em italic">decisão</span>.
            </span>
            <span className="block whitespace-nowrap max-md:whitespace-normal">
              Antes do lançamento, existe a <span className="text-manifesto-em italic">estrutura</span>.
            </span>
            <span className="block whitespace-nowrap max-md:whitespace-normal">
              Antes do valor, existe <span className="text-manifesto-em italic">visão</span>.
            </span>
          </p>
          <div className="mt-[clamp(42px,5.2vw,68px)] pt-[clamp(30px,4.2vw,54px)] border-t border-white/14">
            <h2 className="font-news font-normal text-[clamp(1.65rem,2.05vw,2.25rem)] leading-[1.12] tracking-[-.01em]">
              O que fazemos
            </h2>
            <div className="mt-[clamp(30px,4vw,48px)] max-w-[900px] space-y-[clamp(16px,2vw,24px)] text-[clamp(.98rem,1.32vw,1.25rem)] leading-[1.62] text-white/78">
              <p>
                A Open Group Desenvolvimento Imobiliário atua na estruturação e desenvolvimento de empreendimentos imobiliários, conduzindo oportunidades da conceituação ao lançamento.
              </p>
              <p>
                Nosso trabalho começa antes da obra: na leitura da oportunidade, na análise de viabilidade, no desenho estratégico da operação e na articulação dos parceiros necessários para o projeto avançar com consistência.
              </p>
              <p>
                Atuamos junto a construtoras, incorporadoras, empresas com ativos imobiliários e investidores, combinando visão estratégica, estruturação financeira e institucional, conexão com parceiros e condução até as etapas críticas de mercado.
              </p>
            </div>
            <div className="mt-[clamp(28px,3.4vw,42px)]">
              <Button href="/institucional" variant="light" arrow>
                Conhecer a empresa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
