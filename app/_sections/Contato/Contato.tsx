import Image from "next/image";
import { ContatoInfo } from "./ContatoInfo";
import { ContatoForm } from "./ContatoForm";

export function Contato() {
  return (
    <section id="contato" className="relative overflow-hidden py-section bg-dark text-on-dark">
      <Image
        src="/Fachada.png"
        alt=""
        width={1120}
        height={3744}
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 z-0 h-1/2 w-auto max-w-none -translate-y-1/2 select-none object-contain opacity-[.12] grayscale contrast-125 max-lg:right-[-18vw] max-lg:opacity-[.08] max-md:hidden"
        sizes="(min-width: 1024px) 20vw, 0px"
      />
      <div className="wrap relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(48px,6vw,100px)] items-start">
          <div className="reveal"><ContatoInfo /></div>
          <div className="reveal reveal-2"><ContatoForm /></div>
        </div>
      </div>
    </section>
  );
}
