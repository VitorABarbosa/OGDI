import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { ContatoForm } from "@/app/_sections/Contato/ContatoForm";

const ids = ["01", "02", "03"] as const;

export async function ContatoConversa() {
  const t = await getTranslations("contato.conversa");
  return (
    <section className="relative py-[clamp(72px,9vw,128px)]">
      <div className="wrap">
        <div className="grid grid-cols-1 items-start gap-[clamp(48px,6vw,100px)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* O que acontece depois do envio */}
          <div className="reveal lg:sticky lg:top-[120px]">
            <Kicker tone="on-dark-green">{t("kicker")}</Kicker>
            <h2 className="mt-5 mb-2 font-sans font-semibold text-[clamp(26px,3vw,40px)] leading-[1.1] tracking-[-.025em] text-white">
              {t.rich("heading", { br: () => <br /> })}
            </h2>
            <div className="mt-[34px]">
              {ids.map((id, i) => (
                <div
                  key={id}
                  className={`grid grid-cols-[52px_1fr] gap-[22px] border-t border-[color:var(--line-dark)] py-[24px] ${i === ids.length - 1 ? "border-b" : ""}`}
                >
                  <span className="font-sans text-[17px] font-semibold leading-none tracking-[.02em] text-green tabular-nums">{id}</span>
                  <div>
                    <h3 className="m-0 mb-[6px] font-sans font-semibold text-[clamp(17px,1.4vw,21px)] tracking-[-.015em] text-white">{t(`etapas.${id}.title`)}</h3>
                    <p className="m-0 max-w-[440px] text-[14px] leading-[1.55] text-white/65">{t(`etapas.${id}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulário (mesmo componente da home) */}
          <div className="reveal reveal-2">
            <ContatoForm />
          </div>
        </div>
      </div>
    </section>
  );
}
