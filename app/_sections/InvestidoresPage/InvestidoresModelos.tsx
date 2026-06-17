import { InvestidoresModelosContent } from "./InvestidoresModelosContent";

// Modelos como tipografia grande em colunas desencontradas — sem cards,
// sem caixas: hierarquia por escala e espaço.
export function InvestidoresModelos() {
  return (
    <section id="investidores-modelos" className="bg-bg-soft py-[clamp(76px,9vw,132px)]">
      <div className="wrap-wide">
        <InvestidoresModelosContent />
      </div>
    </section>
  );
}
