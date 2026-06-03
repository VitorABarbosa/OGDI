import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { modelos } from "./modelos.data";
import { ModeloCard } from "./ModeloCard";

export function Modelos() {
  return (
    <section id="modelos" className="py-section">
      <div className="wrap">
        <div className="max-w-[760px]">
          <Kicker>Modelos de atuação</Kicker>
          <SectionHeading className="mt-[14px] mb-[18px]">Atuação flexível conforme<br />o perfil da oportunidade.</SectionHeading>
          <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-ink-2">Cada oportunidade exige uma lógica própria. A Open Group avalia o estágio, o potencial e a complexidade da operação para definir o modelo de atuação mais adequado.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mt-[clamp(48px,6vw,72px)]">
          {modelos.map((m) => <ModeloCard key={m.idx} m={m} />)}
        </div>
      </div>
    </section>
  );
}
