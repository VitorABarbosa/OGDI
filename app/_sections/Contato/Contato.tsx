import { ContatoInfo } from "./ContatoInfo";
import { ContatoForm } from "./ContatoForm";

export function Contato() {
  return (
    <section id="contato" className="py-section bg-dark text-on-dark">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(48px,6vw,100px)] items-start">
          <ContatoInfo />
          <ContatoForm />
        </div>
      </div>
    </section>
  );
}
