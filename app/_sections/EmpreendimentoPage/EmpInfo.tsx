import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

function MetaRow({ label, value, tbd }: { label: string; value: string; tbd?: boolean }) {
  return (
    <div
      className="flex justify-between gap-5 py-4 border-b"
      style={{ borderColor: "var(--line)" }}
    >
      <span
        className="text-ink-3"
        style={{ fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase" }}
      >
        {label}
      </span>
      <span
        className={tbd ? "text-ink-3 italic font-normal text-right" : "text-ink text-right font-medium"}
        style={{ fontSize: "14px" }}
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
        <div
          className="grid items-start"
          style={{ gridTemplateColumns: "0.8fr 1.2fr", gap: "clamp(40px, 6vw, 100px)" }}
        >
          {/* Left — sticky meta */}
          <div
            className="flex flex-col border-t"
            style={{ position: "sticky", top: "110px", borderColor: "var(--line)" }}
          >
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

            <h2
              className="font-sans font-semibold"
              style={{
                fontSize: "clamp(26px, 3vw, 42px)",
                lineHeight: 1.1,
                letterSpacing: "-.025em",
                marginBottom: "26px",
              }}
            >
              Da leitura da oportunidade à condução até o lançamento.
            </h2>

            {p.intro.map((paragraph, i) => (
              <p
                key={i}
                className="text-ink-2 max-w-[620px]"
                style={{
                  fontSize: "clamp(15px, 1.15vw, 17.5px)",
                  lineHeight: 1.72,
                  marginBottom: "20px",
                }}
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
