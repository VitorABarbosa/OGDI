import Image from "next/image";
import { Kicker } from "@/components/ui/Kicker";
import styles from "./Manifesto.module.css";

export function Manifesto() {
  return (
    <section id="institucional" className="relative overflow-clip bg-manifesto text-white py-[clamp(96px,17vh,200px)]">
      <div className={styles.arcs} aria-hidden />
      <div className="wrap relative z-[2]">
        <div className="max-w-[720px]">
          <Kicker tone="on-dark-green">Manifesto</Kicker>
          <p className="mt-[clamp(24px,3vw,36px)] font-news font-normal text-[clamp(1.9rem,3.9vw,3.2rem)] leading-[1.28] tracking-[-.01em] text-white max-w-[20ch] max-md:text-[clamp(1.7rem,8vw,2.4rem)] max-md:max-w-[18ch]">
            Antes da obra, existe a <span className="text-manifesto-em italic">decisão</span>.<br />
            Antes do lançamento, existe a <span className="text-manifesto-em italic">estrutura</span>.<br />
            Antes do valor, existe <span className="text-manifesto-em italic">visão</span>.
          </p>
          <div className="mt-[clamp(52px,7vw,84px)] flex items-center gap-4 flex-wrap">
            <Image src="/assets/logos/og-logo.png" alt="Open Group" width={36} height={36} className="h-9 w-auto" />
            <span className="text-[15px] text-white/60"><b className="text-white font-semibold">Open Group.</b> Desenvolva com visão desde a origem.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
