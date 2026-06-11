import { Kicker } from "@/components/ui/Kicker";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { institucional } from "./institucional.data";
import { cn } from "@/lib/cn";

const tones = ["t1", "t2", "t3"] as const;

export function InstitucionalLideranca() {
  const { lideranca } = institucional;
  return (
    <section className="py-section text-ink">
      <div className="wrap">
        <div className="reveal mb-[clamp(40px,5vw,68px)] max-w-[660px]">
          <Kicker>{lideranca.kicker}</Kicker>
          <h2 className="my-4 font-sans font-semibold text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.1] tracking-[-.03em] text-ink">
            A liderança por trás de cada{" "}
            <span className="font-news font-normal italic text-teal">operação estruturada</span>.
          </h2>
          <p className="max-w-[54ch] text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-ink-2">
            A Open Group é conduzida por profissionais que unem visão estratégica, domínio da operação imobiliária e
            relacionamento institucional — para transformar oportunidades em empreendimentos prontos para avançar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(20px,2vw,32px)] sm:grid-cols-2 lg:grid-cols-3">
          {lideranca.leaders.map((leader, i) => (
            <article key={leader.role} className={cn("reveal", i === 1 && "reveal-2", i === 2 && "reveal-3")}>
              <div className="relative mb-[18px] aspect-[4/5] overflow-hidden bg-dark">
                <MediaPlaceholder tone={tones[i % tones.length]} />
              </div>
              <h3 className="mb-[6px] font-news font-normal text-[clamp(1.3rem,1.9vw,1.75rem)] tracking-[-.005em] text-ink">
                {leader.name}
              </h3>
              <span className="text-[11.5px] uppercase tracking-[.12em] text-green-deep">{leader.role}</span>
              <p className="mt-[13px] text-[13.5px] leading-[1.58] text-ink-2">{leader.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
