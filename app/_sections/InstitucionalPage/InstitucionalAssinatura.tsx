import Image from "next/image";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { institucional } from "./institucional.data";

export function InstitucionalAssinatura() {
  const { assinatura } = institucional;
  return (
    <section className="relative overflow-hidden bg-dark py-[clamp(96px,13vw,184px)] text-white">
      <Image
        src="/assets/logos/og-logo-light.png"
        alt=""
        aria-hidden
        width={1480}
        height={1480}
        className="pointer-events-none absolute left-1/2 top-[47%] z-0 h-auto w-[min(128vw,1480px)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[.055]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] [background:radial-gradient(70%_60%_at_50%_50%,transparent_40%,rgba(18,22,23,.6)_100%)]"
      />
      <div className="wrap relative z-[2] text-center">
        <Kicker tone="on-dark-green" className="mb-[26px] justify-center">{assinatura.kicker}</Kicker>
        <h2 className="font-news font-normal text-[clamp(2.1rem,5.6vw,4.6rem)] leading-[1.05] tracking-[-.018em] text-white">
          Transformamos oportunidades em
          <br />
          <span className="italic text-green">empreendimentos prontos para avançar</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-[48ch] text-[15px] leading-[1.62] text-white/70">{assinatura.sub}</p>
        <div className="mt-[42px] flex flex-wrap justify-center gap-4">
          <Button href="/projetos" variant="light" arrow>
            Ver os projetos
          </Button>
          <Button href="/#contato" variant="on-dark" arrow>
            Fale com a Open Group
          </Button>
        </div>
      </div>
    </section>
  );
}
