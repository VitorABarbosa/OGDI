import { useTranslations } from "next-intl";
import { Kicker } from "@/components/ui/Kicker";
import { TextLink } from "@/components/ui/TextLink";
import { CaseCard } from "@/app/_sections/ProjetosPage/CaseCard";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

export function EmpProximos({ others }: { others: Projeto[] }) {
  const t = useTranslations("empreendimento.proximos");
  const tp = useTranslations("projetos.cards");
  return (
    <section className="py-section">
      <div className="wrap">
        {/* Head */}
        <div className="flex items-end justify-between gap-[30px] flex-wrap mb-[clamp(36px,4vw,56px)]">
          <div className="reveal">
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="reveal reveal-2 font-sans font-semibold text-[clamp(24px,2.6vw,36px)] tracking-[-.025em] mt-[14px]">
              {t("heading")}
            </h2>
          </div>
          <TextLink href="/projetos" className="reveal reveal-3">{t("link")}</TextLink>
        </div>

        {/* Grid — 3 columns, each CaseCard fills one cell (no span prop) */}
        <div className="grid grid-cols-3 gap-[clamp(20px,2vw,32px)] max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
          {others.map((p, index) => (
            <CaseCard
              key={p.slug}
              p={p}
              index={index}
              status={tp(`${p.slug}.status`)}
              segmento={tp(`${p.slug}.segmento`)}
              local={tp(`${p.slug}.local`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
