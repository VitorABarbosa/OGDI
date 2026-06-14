import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Kicker } from "@/components/ui/Kicker";
import { GalleryFlowBackground } from "@/components/ui/gallery-flow-background";

const indiceIds = ["01", "02", "03", "04"] as const;

// O único hero claro do site: statement em tinta sobre papel e os quatro
// perfis como índice tipográfico clicável — o visitante se reconhece no
// primeiro segundo e desce direto para a sua seção.
export async function ClientesHero() {
  const t = await getTranslations("clientes.hero");

  return (
    <section
      id="clientes-inicio"
      className="relative overflow-hidden bg-paper pt-[clamp(140px,19vh,220px)] pb-[clamp(56px,7vw,100px)]"
    >
      {/* Linha fluida em variante serena: três trechos visíveis, bem suaves */}
      <GalleryFlowBackground background="#FFFFFF" variant="clientes" />
      <div className="wrap relative z-[2]">
        <nav aria-label="Breadcrumb" className="reveal mb-[26px] flex items-center gap-[10px] text-[12px] uppercase tracking-[.08em] text-ink-3">
          <Link href="/" className="text-ink-2 transition-colors duration-200 hover:text-ink">
            {t("breadcrumbHome")}
          </Link>
          <span aria-hidden className="inline-block h-px w-[14px] shrink-0 bg-ink/20" />
          <span aria-current="page" className="text-ink">{t("breadcrumbCurrent")}</span>
        </nav>
        <Kicker className="reveal">{t("kicker")}</Kicker>
        <h1 className="reveal reveal-2 mt-6 max-w-[24ch] font-news font-normal text-[clamp(2.1rem,5vw,4.2rem)] leading-[1.06] tracking-[-.018em] text-ink">
          {t.rich("title", {
            br: () => <br />,
            em: (chunks) => <span className="italic text-green">{chunks}</span>,
          })}
        </h1>

        {/* Índice de perfis — âncoras para os blocos da seção seguinte */}
        <div className="reveal reveal-3 mt-[clamp(44px,5.5vw,76px)]">
          {indiceIds.map((idx, i) => (
            <a
              key={idx}
              href={`#clientes-perfil-${idx}`}
              className={`group grid grid-cols-[52px_1fr] items-baseline gap-3 border-t border-[color:var(--line)] py-[clamp(16px,2.1vw,26px)] transition-[padding-left] duration-[400ms] ease-brand hover:pl-3 md:grid-cols-[64px_1fr_auto] md:gap-[clamp(18px,2.6vw,40px)] ${i === indiceIds.length - 1 ? "border-b" : ""}`}
            >
              <span className="font-sans text-[12px] font-semibold tracking-[.2em] text-green tabular-nums">{idx}</span>
              <span className="font-news text-[clamp(1.45rem,2.9vw,2.6rem)] leading-[1.08] tracking-[-.015em] text-ink transition-colors duration-300 group-hover:text-teal">
                {t(`indice.${idx}.title`)}
              </span>
              <span className="hidden items-baseline gap-4 text-[12.5px] text-ink-3 md:flex">
                {t(`indice.${idx}.hint`)}
                <span aria-hidden className="text-[16px] text-green opacity-0 transition-[opacity,transform] duration-300 ease-brand group-hover:translate-y-[2px] group-hover:opacity-100">
                  ↓
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
