import Image from "next/image";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { atuacaoSteps, atuacaoTags } from "./atuacao.data";
import { AtuacaoRow } from "./AtuacaoRow";

export function Atuacao() {
  return (
    <section id="atuacao" className="relative py-section bg-bg-soft">
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image src="/assets/logos/og-logo-light.png" alt="" width={660} height={660}
          className="sticky top-[calc(50vh-clamp(180px,21vw,330px))] w-[clamp(360px,42vw,660px)] h-auto max-w-[48vw] ml-[clamp(-40px,1vw,24px)] opacity-[.06] [filter:brightness(0)_invert(1)] max-md:opacity-[.04]" />
      </div>
      <div className="wrap relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[clamp(40px,6vw,96px)] items-start">
          <div className="lg:sticky lg:top-[120px] flex flex-col gap-[22px]">
            <Kicker>Nossa atuação</Kicker>
            <SectionHeading>Da origem<br />ao lançamento.</SectionHeading>
            <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-ink-2">A Open Group não apenas participa de projetos — estrutura a oportunidade imobiliária, organizando potencial, capital, parceiros e execução na mesma direção.</p>
            <div className="mt-[26px] flex flex-wrap gap-2 text-[13px] text-ink-3">
              {atuacaoTags.map((t) => <span key={t} className="px-[13px] py-[7px] border border-[color:var(--line-2)] text-[12px] tracking-[.02em]">{t}</span>)}
            </div>
          </div>
          <div className="flex flex-col">
            {atuacaoSteps.map((s, i) => <AtuacaoRow key={s.idx} step={s} last={i === atuacaoSteps.length - 1} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
