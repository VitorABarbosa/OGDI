import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

function MetaRow({ label, value, tbd }: { label: string; value: string; tbd?: boolean }) {
  return (
    <div className="flex justify-between gap-5 py-4 border-b border-[color:var(--line)]">
      <span className="text-[11px] tracking-[.14em] uppercase text-ink-3">
        {label}
      </span>
      <span
        className={
          tbd
            ? "text-[14px] text-ink-3 italic font-normal text-right"
            : "text-[14px] text-ink text-right font-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function EmpInfo({ p }: { p: Projeto }) {
  return (
    <section className="py-section">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[clamp(40px,6vw,100px)] items-start">
          {/* Left — sticky meta */}
          <div className="flex flex-col border-t border-[color:var(--line)] lg:sticky lg:top-[110px]">
            <MetaRow label="Status" value={p.status} />
            <MetaRow label="Segmento" value={p.segmento} />
            <MetaRow label="Localização" value={p.local} tbd={p.localTbd} />
            {p.regiao && <MetaRow label="Região" value={p.regiao} />}
            <MetaRow label="Atuação Open Group" value="Estruturação da operação" />
            <MetaRow label="Modelo" value={p.modelo} />
            <MetaRow label="Tipologia · metragem" value="A confirmar" tbd />

            <Button href="/#contato" arrow className="mt-[28px] self-start">
              Tenho interesse
            </Button>
          </div>

          {/* Right — description */}
          <div>
            <Kicker className="mb-5">O empreendimento</Kicker>

            {/* Cópia editorial provisória e compartilhada — o cliente substituirá por título próprio de cada empreendimento (ver intro [PROVISÓRIO]). */}
            <h2 className="font-sans font-semibold text-[clamp(26px,3vw,42px)] leading-[1.1] tracking-[-.025em] mb-[26px]">
              Da leitura da oportunidade à condução até o lançamento.
            </h2>

            {p.intro.map((paragraph, i) => (
              <p
                key={i}
                className="text-[clamp(15px,1.15vw,17.5px)] leading-[1.72] text-ink-2 mb-5 max-w-[620px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
