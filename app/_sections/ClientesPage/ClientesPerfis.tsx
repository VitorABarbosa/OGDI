import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";

// Hrefs stay in code (not user-facing prose); prose comes from i18n.
const perfis = [
  { idx: "01", href: "/projetos" },
  { idx: "02", href: "/institucional" },
  { idx: "03", href: "/investidores" },
  { idx: "04", href: "/contato" },
] as const;

// Quatro perfis em grade editorial: cada visitante se reconhece e segue
// para o caminho certo do site.
export async function ClientesPerfis() {
  const t = await getTranslations("clientes.perfis");

  return (
    <section id="clientes-perfis" className="bg-bg-soft py-[clamp(88px,11vw,160px)]">
      <div className="wrap">
        <div className="reveal max-w-[640px]">
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3.2vw,44px)] leading-[1.08] tracking-[-.025em] text-ink">
            {t.rich("heading", { br: () => <br /> })}
          </h2>
        </div>

        <div className="mt-[clamp(48px,6vw,84px)] grid grid-cols-1 gap-x-[clamp(40px,5vw,88px)] md:grid-cols-2">
          {perfis.map((p, i) => {
            const entregas = t.raw(`items.${p.idx}.entregas`) as string[];
            return (
              <div
                key={p.idx}
                id={`clientes-perfil-${p.idx}`}
                className={`reveal reveal-${Math.min(i + 1, 4)} group scroll-mt-[110px] border-t border-[color:var(--line)] py-[clamp(28px,3.4vw,44px)]`}
              >
                <span className="font-sans text-[12px] font-semibold tracking-[.2em] text-green tabular-nums">{p.idx}</span>
                <h3 className="mt-3 font-sans font-semibold text-[clamp(20px,1.9vw,28px)] tracking-[-.02em] text-ink">
                  {t(`items.${p.idx}.title`)}
                </h3>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.62] text-ink-2">{t(`items.${p.idx}.desc`)}</p>
                <ul className="mt-5 flex flex-col gap-[9px]">
                  {entregas.map((e) => (
                    <li key={e} className="flex items-baseline gap-3 text-[13.5px] leading-[1.5] text-ink-2">
                      <span aria-hidden className="h-[5px] w-[5px] shrink-0 translate-y-[-1px] rounded-full bg-green" />
                      {e}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className="mt-5 inline-flex items-center gap-2 font-sans text-[12px] font-medium uppercase tracking-[.16em] text-teal transition-colors duration-200 hover:text-green"
                >
                  {t(`items.${p.idx}.cta`)}
                  <span aria-hidden className="text-[15px] transition-transform duration-300 ease-brand group-hover:translate-x-1">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
