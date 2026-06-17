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

// Seção unificada "O empreendimento" (Conceito A — "Coda editorial").
// A narrativa comanda: ficha da operação (sticky) + título serif + intro.
// O produto resolve embaixo, como um rodapé editorial — uma faixa horizontal
// de facetas (Tipologia / Endereço / Mobilidade / Experiência) separadas por
// filetes finos. Funde o que antes eram duas seções (EmpInfo + EmpProductStory),
// eliminando a duplicação (Localização↔Endereço, Tipologia·m²↔Tipologia) e a
// altura excessiva, sem interação — calmo, curto, resolvido no visual.
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
  const tp = useTranslations("proj");
  const statusText = status ?? p.status;
  const segmentoText = segmento ?? p.segmento;
  const intro = tp.raw(`${p.slug}.intro`) as string[];
  const productStory = tp.raw(`${p.slug}.productStory`) as {
    kicker: string;
    title: string;
    body: string[];
    cards: { label: string; value: string; text?: string }[];
  };

  return (
    <section id="sobre" className="scroll-mt-[120px] py-section">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[clamp(40px,6vw,100px)] items-start">
          <div className="flex flex-col border-t border-[color:var(--line)] lg:sticky lg:top-[110px]">
            <MetaRow label={t("labels.status")} value={statusText} />
            <MetaRow label={t("labels.segmento")} value={segmentoText} className="reveal-info-1" />
            {/* Localização e tipologia vivem na coda do produto (todos os projetos
                têm productStory hoje), por isso não se repetem aqui na ficha. */}
            {p.regiao && <MetaRow label={t("labels.regiao")} value={p.regiao} />}
            <MetaRow label={t("labels.atuacao")} value={t("venturePartner")} className="reveal-info-4" />

            <Button href="/contato" arrow className="reveal reveal-info-5 mt-[28px] self-start">
              {t("cta")}
            </Button>
          </div>

          <div>
            <Kicker className="reveal mb-5">{t("kicker")}</Kicker>

            <h2 className="reveal reveal-2 max-w-[15ch] font-news font-normal text-[clamp(30px,3.6vw,50px)] leading-[1.07] tracking-[-.015em]">
              {t("heading")}
            </h2>

            <div className="mt-[clamp(22px,2.4vw,30px)] max-w-[50ch] space-y-[14px]">
              {intro.map((paragraph, i) => (
                <p
                  key={`${p.slug}-intro-${i}`}
                  className={cn("reveal font-news text-[clamp(16px,1.2vw,18.5px)] leading-[1.72] text-ink-2", `reveal-info-${Math.min(i + 3, 5)}`)}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {productStory && (
              <div className="mt-[clamp(40px,5vw,64px)] border-t border-ink pt-[22px]">
                <span className="reveal text-[11px] font-semibold uppercase tracking-[.16em] text-ink">
                  {productStory.kicker}
                </span>

                {/* Coda: facetas em faixa horizontal com filetes finos; empilha
                    no mobile/tablet com filetes no topo. */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {productStory.cards.map((card, index) => (
                    <article
                      key={`${card.label}-${card.value}`}
                      className={cn(
                        "reveal reveal-step border-t border-[color:var(--line)] py-5 max-lg:first:border-t-0",
                        "lg:border-t-0 lg:border-l lg:py-0 lg:px-[clamp(16px,1.5vw,26px)] lg:first:border-l-0 lg:first:pl-0",
                        `reveal-step-${Math.min(index, 5)}`,
                      )}
                    >
                      <div className="text-[9.5px] font-medium uppercase tracking-[.14em] text-ink-3">{card.label}</div>
                      <h3 className="mt-[10px] font-news font-medium text-[clamp(19px,1.55vw,23px)] leading-[1.1] tracking-[-.01em] text-ink">
                        {card.value}
                      </h3>
                      {card.text && (
                        <p className="mt-[9px] text-[12.5px] leading-[1.5] text-ink-2 lg:max-w-[24ch]">{card.text}</p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
