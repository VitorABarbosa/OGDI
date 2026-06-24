import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/data/site";
import { ContatoForm } from "@/app/_sections/Contato/ContatoForm";
import { InstitucionalOrigemWaves } from "@/app/_sections/InstitucionalPage/InstitucionalOrigemWaves";

type Canal = { key: string; value: string; href?: string };

const canais: Canal[] = [
  { key: "email", value: site.email, href: `mailto:${site.email}` },
  { key: "whatsapp", value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
  { key: "localizacao", value: site.location },
];

const etapas = ["01", "02", "03"] as const;

// Contato em seção única: cabeçalho centralizado (título + descrição), formulário
// logo abaixo e, ao final, canais diretos e "como conduzimos" em faixas.
export async function ContatoSection() {
  const t = await getTranslations("contato.hero");
  const tc = await getTranslations("contato.conversa");
  return (
    <section className="relative overflow-hidden pt-[clamp(96px,11vh,140px)] pb-[clamp(72px,9vw,128px)]">
      {/* Glow radial — mesma linguagem dos heroes de Projetos e Institucional */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-60 [background:radial-gradient(110%_85%_at_82%_-6%,rgba(31,90,99,.42),transparent_56%),radial-gradient(85%_75%_at_8%_112%,rgba(95,168,60,.15),transparent_60%)]"
      />
      {/* Linhas verticais ao fundo — as mesmas do Manifesto (InstitucionalOrigem) */}
      <InstitucionalOrigemWaves />
      <div className="wrap relative z-[1]">
        {/* — Cabeçalho centralizado — */}
        <div className="text-center">
          <nav aria-label="Breadcrumb" className="reveal mb-[26px] flex items-center justify-center gap-[10px] text-[12px] uppercase tracking-[.08em] text-white/50">
            <Link href="/" className="text-white/55 transition-colors duration-200 hover:text-white">
              {t("breadcrumbHome")}
            </Link>
            <span aria-hidden className="inline-block h-px w-[14px] shrink-0 bg-white/30" />
            <span aria-current="page" className="text-white/85">{t("breadcrumbCurrent")}</span>
          </nav>
          <Kicker tone="on-dark-green" className="reveal">{t("kicker")}</Kicker>
          <h1 className="reveal reveal-2 mt-6 font-news font-normal text-[clamp(1.9rem,4.2vw,3.3rem)] leading-[1.08] tracking-[-.018em] text-white">
            {t.rich("title", {
              em: (chunks) => <span className="italic text-green">{chunks}</span>,
            })}
          </h1>
          <p className="reveal reveal-3 mx-auto mt-5 max-w-[58ch] text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-white/70">
            {t("intro")}
          </p>
        </div>

        {/* — Corpo: como conduzimos (esquerda) + formulário (direita) — */}
        <div className="mt-[clamp(48px,6vw,88px)] grid grid-cols-1 items-start gap-[clamp(44px,5.5vw,88px)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Esquerda: como conduzimos */}
          <div className="reveal reveal-3 lg:-mt-[90px] lg:sticky lg:top-[120px]">
            <Kicker tone="on-dark-green">{tc("kicker")}</Kicker>
            <h2 className="mt-5 mb-2 font-sans font-semibold text-[clamp(24px,2.6vw,36px)] leading-[1.12] tracking-[-.025em] text-white">
              {tc.rich("heading", { br: () => <br /> })}
            </h2>
            <div className="mt-[34px]">
              {etapas.map((id, i) => (
                <div
                  key={id}
                  className={`grid grid-cols-[52px_1fr] gap-[22px] border-t border-[color:var(--line-dark)] py-[24px] ${i === etapas.length - 1 ? "border-b" : ""}`}
                >
                  <span className="font-sans text-[17px] font-semibold leading-none tracking-[.02em] text-green tabular-nums">{id}</span>
                  <div>
                    <h3 className="m-0 mb-[6px] font-sans font-semibold text-[clamp(17px,1.4vw,21px)] tracking-[-.015em] text-white">{tc(`etapas.${id}.title`)}</h3>
                    <p className="m-0 max-w-[440px] text-[14px] leading-[1.55] text-white/65">{tc(`etapas.${id}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direita: formulário (mesmo da home) */}
          <div className="reveal reveal-2">
            <ContatoForm />
          </div>
        </div>

        {/* — Canais diretos — */}
        <div className="mt-[clamp(56px,7vw,104px)] grid grid-cols-1 gap-[clamp(20px,3vw,44px)] border-t border-[color:var(--line-dark)] pt-[clamp(32px,3.5vw,48px)] sm:grid-cols-3">
          {canais.map((c) => {
            const inner = (
              <div className="text-center">
                <span className="block text-[11px] tracking-[.18em] uppercase text-on-dark-2">{t(`canais.${c.key}.label`)}</span>
                <span className="mt-[8px] block font-sans font-medium text-[clamp(17px,1.6vw,22px)] tracking-[-.015em] text-white">
                  {c.value}
                </span>
                <span className="mt-[5px] block text-[12.5px] leading-[1.5] text-white/45">{t(`canais.${c.key}.hint`)}</span>
              </div>
            );
            return c.href ? (
              <a key={c.key} href={c.href} className="group block transition-transform duration-300 ease-brand hover:-translate-y-0.5">
                {inner}
              </a>
            ) : (
              <div key={c.key}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
