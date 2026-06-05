import { ContatoInfo } from "./ContatoInfo";
import { ContatoForm } from "./ContatoForm";

export function Contato() {
  return (
    <section id="contato" className="relative overflow-hidden bg-dark-2 text-on-dark py-[clamp(84px,11vw,150px)]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-80 [background:radial-gradient(circle_at_78%_18%,rgba(95,168,60,.18),transparent_24vw),linear-gradient(135deg,rgba(31,90,99,.28),transparent_42%),linear-gradient(180deg,#121617_0%,#071f28_100%)]"
      />
      <div
        aria-hidden
        className="absolute -right-[8vw] top-[8%] font-serif italic text-[clamp(110px,18vw,280px)] leading-none text-white/[.035] select-none"
      >
        open
      </div>
      <div aria-hidden className="absolute left-pad-x right-pad-x top-[clamp(42px,6vw,80px)] h-px bg-white/10" />
      <div className="wrap relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-[clamp(46px,6vw,96px)] items-start">
          <div className="reveal">
            <ContatoInfo />
          </div>
          <div className="reveal reveal-2 lg:pt-[clamp(72px,8vw,116px)]">
            <ContatoForm />
          </div>
        </div>
      </div>
    </section>
  );
}
