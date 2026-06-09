import { Kicker } from "@/components/ui/Kicker";
import { atuacaoSteps } from "@/data/empreendimento";

export function EmpAtuacao() {
  return (
    <section className="bg-bg-soft py-section">
      <div className="wrap">
        {/* Head */}
        <div className="max-w-[620px] mb-[clamp(40px,5vw,64px)]">
          <Kicker>A atuação da Open Group</Kicker>
          <h2
            className="font-sans font-semibold mt-4"
            style={{
              fontSize: "clamp(24px, 2.6vw, 36px)",
              letterSpacing: "-.025em",
              lineHeight: 1.1,
            }}
          >
            Como estruturamos esta operação.
          </h2>
        </div>

        {/* Steps grid */}
        <div
          className="grid grid-cols-4 gap-px border max-[900px]:grid-cols-2 max-[480px]:grid-cols-1"
          style={{ background: "var(--line)", borderColor: "var(--line)" }}
        >
          {atuacaoSteps.map((step) => (
            <div
              key={step.n}
              className="bg-bg-soft flex flex-col gap-3 transition-colors duration-[350ms] hover:bg-white"
              style={{ padding: "30px 26px" }}
            >
              <span
                className="font-sans font-semibold text-teal"
                style={{ fontSize: "13px", letterSpacing: ".04em" }}
              >
                {step.n}
              </span>
              <h4
                className="font-sans font-semibold"
                style={{ fontSize: "16.5px", letterSpacing: "-.01em" }}
              >
                {step.title}
              </h4>
              <p
                className="text-ink-2"
                style={{ fontSize: "13.5px", lineHeight: 1.55 }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
