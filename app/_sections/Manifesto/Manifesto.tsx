import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import styles from "./Manifesto.module.css";

export function Manifesto() {
  return (
    <section id="institucional" className="relative overflow-clip bg-manifesto text-white py-[clamp(82px,12vw,150px)]">
      <div className={styles.arcs} aria-hidden />
      <div className="wrap relative z-[2]">
        <div className="max-w-[1080px]">
          <Kicker tone="on-dark-green">Sobre a Open Group</Kicker>
          <p className="mt-[clamp(28px,4.5vw,62px)] font-news font-normal text-[clamp(2.1rem,4.2vw,4.35rem)] leading-[1.18] tracking-[-.01em] text-white max-w-[24ch] max-md:text-[clamp(2rem,10vw,3.05rem)]">
            Antes da obra, existe a <span className="text-manifesto-em italic">decisão</span>. Antes do lançamento, existe a <span className="text-manifesto-em italic">estrutura</span>. Antes do valor, existe <span className="text-manifesto-em italic">visão</span>.
          </p>
          <div className="mt-[clamp(58px,7vw,92px)] pt-[clamp(34px,5vw,70px)] border-t border-white/14 grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-[clamp(30px,5vw,72px)]">
            <h2 className="font-news font-normal text-[clamp(1.8rem,2.4vw,2.65rem)] leading-[1.12] tracking-[-.01em]">
              O que fazemos
            </h2>
            <div className="max-w-[920px]">
              <div className="space-y-[clamp(18px,2.2vw,28px)] text-[clamp(1.02rem,1.55vw,1.45rem)] leading-[1.65] text-white/78">
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
              <div className="mt-[clamp(30px,4vw,50px)]">
                <Button href="/institucional" variant="light" arrow>
                  Conhecer a empresa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
