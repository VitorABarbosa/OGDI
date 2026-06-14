import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";

// depth = barra visual de profundidade (classe utilitária, não é prosa).
// accent: "green" = as formas de relação (profundidade crescente);
// "blue" = Investimento SCP, uma categoria distinta (via de investimento).
const formas = [
  { idx: "01", depth: "w-1/3", accent: "green" },
  { idx: "02", depth: "w-2/3", accent: "green" },
  { idx: "03", depth: "w-full", accent: "green" },
  { idx: "04", depth: "w-full", accent: "blue" },
] as const;

// Azul-petróleo da família de marca — distingue a categoria de investimento
// das três formas de relação (verde).
const BLUE = "#4FA3AD";

export async function ClientesRelacao() {
  const t = await getTranslations("clientes.relacao");

  return (
    <section id="clientes-relacao" className="bg-dark py-[clamp(80px,10vw,148px)] text-white">
      <div className="wrap">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <Kicker tone="on-dark-green">{t("kicker")}</Kicker>
          <p className="max-w-[38ch] text-right text-[13px] leading-[1.6] text-white/55 max-md:text-left">
            {t("intro")}
          </p>
        </div>

        <div className="reveal reveal-2 mt-[clamp(48px,6vw,84px)] grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-[clamp(28px,3.5vw,56px)] lg:grid-cols-4">
          {formas.map((f) => {
            const blue = f.accent === "blue";
            return (
              <div key={f.idx}>
                <span className="font-sans text-[12px] tracking-[.18em] uppercase text-white/40 tabular-nums">{f.idx}</span>
                <h3 className="mt-2 font-sans font-semibold text-[clamp(18px,1.5vw,22px)] tracking-[-.015em] text-white">
                  {t(`items.${f.idx}.title`)}
                </h3>
                {/* barra: verde = profundidade crescente; azul = categoria de investimento */}
                <span aria-hidden className="mt-4 block h-[3px] w-full bg-white/10">
                  <span
                    className={`block h-full ${f.depth} ${blue ? "" : "bg-green"}`}
                    style={blue ? { backgroundColor: BLUE } : undefined}
                  />
                </span>
                <p className="mt-4 max-w-[40ch] text-[13.5px] leading-[1.6] text-white/55">{t(`items.${f.idx}.desc`)}</p>
                <p className="mt-3 max-w-[40ch] text-[12.5px] leading-[1.55] text-white/40">
                  <span className={blue ? "" : "text-green/75"} style={blue ? { color: BLUE } : undefined}>
                    {t("quandoLabel")}
                  </span>{" "}
                  {t(`items.${f.idx}.quando`)}
                </p>
              </div>
            );
          })}
        </div>

        <p aria-hidden className="reveal mt-[clamp(36px,4.5vw,60px)] text-right text-[11px] uppercase tracking-[.22em] text-green/70">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
