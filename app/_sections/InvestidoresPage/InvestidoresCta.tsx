import Link from "next/link";
import { getTranslations } from "next-intl/server";

const caminhoKeys = ["capital", "terreno"] as const;

// CTA dividido em dois caminhos gigantes — cada metade é um statement
// clicável; o formulário de contato segmenta pelo tipo.
export async function InvestidoresCta() {
  const t = await getTranslations("investidores.cta");
  return (
    <section id="investidores-contato" className="bg-dark text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {caminhoKeys.map((key, i) => (
          <Link
            key={key}
            href="/contato"
            className={`group relative px-pad-x py-[clamp(72px,10vw,140px)] transition-colors duration-[400ms] ease-brand hover:bg-white/[.04] ${i === 1 ? "border-t border-[color:var(--line-dark)] md:border-l md:border-t-0" : ""}`}
          >
            <span className="block max-w-[16ch] font-news text-[clamp(1.9rem,3.4vw,3.2rem)] leading-[1.08] tracking-[-.02em]">
              {t(`items.${key}.title`)}
              <span aria-hidden className="ml-3 inline-block text-green transition-transform duration-300 ease-brand group-hover:translate-x-2">→</span>
            </span>
            <span className="mt-5 block max-w-[36ch] text-[14px] leading-[1.6] text-white/55">
              {t(`items.${key}.desc`)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
