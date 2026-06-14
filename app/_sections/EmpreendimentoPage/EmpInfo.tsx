import { useTranslations } from "next-intl";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";
import { cn } from "@/lib/cn";

function MetaRow({ label, value, tbd, className }: { label: string; value: string; tbd?: boolean; className?: string }) {
  return (
    <div className={cn("reveal flex justify-between gap-5 py-4 border-b border-[color:var(--line)]", className)}>
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

export function EmpInfo({
  p,
  status,
  segmento,
  local,
}: {
  p: Projeto;
  // Listing strings translated upstream (projetos.cards). Fall back to PT data.
  status?: string;
  segmento?: string;
  local?: string;
}) {
  const t = useTranslations("empreendimento.info");
  const statusText = status ?? p.status;
  const segmentoText = segmento ?? p.segmento;
  const localText = local ?? p.local;
  return (
    <section className="py-section">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[clamp(40px,6vw,100px)] items-start">
          <div className="flex flex-col border-t border-[color:var(--line)] lg:sticky lg:top-[110px]">
            <MetaRow label={t("labels.status")} value={statusText} />
            <MetaRow label={t("labels.segmento")} value={segmentoText} className="reveal-info-1" />
            <MetaRow label={t("labels.localizacao")} value={localText} tbd={p.localTbd} />
            {p.regiao && <MetaRow label={t("labels.regiao")} value={p.regiao} />}
            <MetaRow label={t("labels.atuacao")} value={t("venturePartner")} />
            <MetaRow label={t("labels.modelo")} value={t("venturePartner")} className="reveal-info-4" />
            <MetaRow label={t("labels.tipologia")} value={t("tbc")} tbd />

            <Button href="/contato" arrow className="reveal reveal-info-5 mt-[28px] self-start">
              {t("cta")}
            </Button>
          </div>

          <div>
            <Kicker className="reveal mb-5">{t("kicker")}</Kicker>

            <h2 className="reveal reveal-2 font-sans font-semibold text-[clamp(26px,3vw,42px)] leading-[1.1] tracking-[-.025em] mb-[26px]">
              {t("heading")}
            </h2>

            {p.intro.map((paragraph, i) => (
              <p
                key={`${p.slug}-intro-${i}`}
                className={cn("reveal text-[clamp(15px,1.15vw,17.5px)] leading-[1.72] text-ink-2 mb-5 max-w-[620px]", `reveal-info-${Math.min(i + 3, 5)}`)}
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
