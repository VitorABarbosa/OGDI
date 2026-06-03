import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clientes } from "./clientes.data";
import styles from "./Clientes.module.css";

export function Clientes() {
  const loop = [...clientes, ...clientes];
  return (
    <section id="parceiros" className="py-section">
      <div className="wrap">
        <div className="flex flex-col items-center text-center gap-[14px] mb-[clamp(48px,6vw,72px)] reveal">
          <Kicker>Clientes</Kicker>
          <SectionHeading>Quem confia na<br />Open Group.</SectionHeading>
          <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-ink-2 max-w-[600px]">Incorporadoras, construtoras, fundos e proprietários de área que estruturaram suas operações com a Open Group, da origem ao lançamento.</p>
        </div>
      </div>
      <div className={`${styles.band} w-screen ml-[calc(50%-50vw)] overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] reveal reveal-2`}>
        <div className={styles.track}>
          {loop.map((c, i) => (
            <div key={`${c.id}-${i}`} aria-hidden={i >= clientes.length}
              className="flex-none w-[clamp(150px,14vw,210px)] h-[clamp(64px,6vw,88px)] flex items-center justify-center">
              <span className="font-sans font-semibold text-[21px] tracking-[.04em] text-[#7A858A]">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
