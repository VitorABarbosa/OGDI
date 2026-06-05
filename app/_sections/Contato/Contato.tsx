import Image from "next/image";
import { ContatoInfo } from "./ContatoInfo";
import { ContatoForm } from "./ContatoForm";

export function Contato() {
  return (
    <section id="contato" className="relative overflow-hidden py-section bg-dark text-on-dark">
      <Image
        src="/Fachada.png"
        alt=""
        width={1024}
        height={1536}
        aria-hidden
        className="pointer-events-none absolute right-[-1vw] top-[62%] z-0 h-[78%] w-auto max-w-none -translate-y-1/2 select-none object-contain opacity-[.5] [filter:grayscale(1)_invert(.72)_brightness(1.08)_contrast(.95)_drop-shadow(0_0_18px_rgba(255,255,255,.18))] max-lg:right-[-22vw] max-lg:opacity-[.22] max-md:hidden"
        sizes="(min-width: 1024px) 42vw, 0px"
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
