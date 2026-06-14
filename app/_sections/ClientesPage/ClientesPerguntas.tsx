import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Kicker } from "@/components/ui/Kicker";

const ids = ["01", "02", "03", "04"] as const;

// Perguntas de quem chega — respostas curtas e diretas, sem acordeão:
// tudo visível, no espírito editorial do site.
export async function ClientesPerguntas() {
  const t = await getTranslations("clientes.perguntas");
  return (
    <section id="clientes-perguntas" className="bg-bg-soft-2 py-[clamp(80px,10vw,148px)]">
      <div className="wrap">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3vw,40px)] leading-[1.1] tracking-[-.025em] text-ink">
              {t.rich("heading", { br: () => <br /> })}
            </h2>
          </div>
          <p className="max-w-[36ch] text-[13.5px] leading-[1.6] text-ink-3 max-md:text-left md:text-right">
            {t.rich("asideText", {
              link: (c) => (
                <Link href="/contato" className="text-teal underline decoration-teal/30 underline-offset-4 transition-colors hover:text-green">
                  {c}
                </Link>
              ),
            })}
          </p>
        </div>

        <div className="reveal reveal-2 mt-[clamp(40px,5vw,64px)] grid grid-cols-1 gap-x-[clamp(40px,5vw,88px)] gap-y-[clamp(28px,3.4vw,44px)] md:grid-cols-2">
          {ids.map((id) => (
            <div key={id} className="border-t border-[color:var(--line)] pt-[clamp(20px,2.4vw,28px)]">
              <h3 className="font-sans font-semibold text-[clamp(16.5px,1.3vw,20px)] leading-[1.3] tracking-[-.015em] text-ink">
                {t(`items.${id}.q`)}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.62] text-ink-2">{t(`items.${id}.a`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
