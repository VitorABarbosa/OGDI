import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/data/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacidade.meta" });
  return { title: t("title"), description: t("description") };
}

// Página densa, em estilo de documento: sem efeitos visuais, sem
// animações — apenas tipografia e hierarquia.
const SECTION_KEYS = [
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "s10",
  "s11",
] as const;

export default async function PoliticaDePrivacidadePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacidade");

  return (
    <main className="bg-paper">
      <div className="wrap pt-[clamp(140px,18vh,200px)] pb-[clamp(80px,10vw,140px)]">
        <div className="mx-auto max-w-[760px]">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[.22em] text-ink-3">
            {t("kicker")}
          </p>
          <h1 className="mt-4 font-sans font-semibold text-[clamp(28px,3.6vw,44px)] leading-[1.1] tracking-[-.025em] text-ink">
            {t("title")}
          </h1>
          <p className="mt-3 text-[13px] text-ink-3">
            {t("updatedLabel")}: {t("updated")}
          </p>
          <p className="mt-7 text-[15.5px] leading-[1.75] text-ink-2">{t("intro")}</p>

          <ol className="mt-[clamp(40px,5vw,64px)] flex list-none flex-col gap-[clamp(36px,4vw,52px)] p-0">
            {SECTION_KEYS.map((key, i) => {
              const paras = t.has(`sections.${key}.paras`)
                ? (t.raw(`sections.${key}.paras`) as string[])
                : undefined;
              const list = t.has(`sections.${key}.list`)
                ? (t.raw(`sections.${key}.list`) as string[])
                : undefined;
              const parasAfter = t.has(`sections.${key}.parasAfter`)
                ? (t.raw(`sections.${key}.parasAfter`) as string[])
                : undefined;
              return (
                <li
                  key={key}
                  className="border-t border-[color:var(--line)] pt-[clamp(24px,3vw,36px)]"
                >
                  <h2 className="font-sans font-semibold text-[clamp(19px,1.7vw,24px)] leading-[1.25] tracking-[-.015em] text-ink">
                    <span className="mr-3 text-green tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t(`sections.${key}.heading`)}
                  </h2>
                  {paras?.map((_, pi) => (
                    <p
                      key={pi}
                      className="mt-4 text-[15px] leading-[1.75] text-ink-2"
                    >
                      {t(`sections.${key}.paras.${pi}`, { email: site.email })}
                    </p>
                  ))}
                  {list && (
                    <ul className="mt-4 flex list-none flex-col gap-3 p-0">
                      {list.map((_, li) => (
                        <li
                          key={li}
                          className="flex items-baseline gap-3 text-[15px] leading-[1.7] text-ink-2"
                        >
                          <span
                            aria-hidden
                            className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] rounded-full bg-green"
                          />
                          <span>{t(`sections.${key}.list.${li}`)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {parasAfter?.map((_, pi) => (
                    <p
                      key={pi}
                      className="mt-4 text-[15px] leading-[1.75] text-ink-2"
                    >
                      {t(`sections.${key}.parasAfter.${pi}`)}
                    </p>
                  ))}
                </li>
              );
            })}
          </ol>

          <p className="mt-[clamp(40px,5vw,64px)] border-t border-[color:var(--line)] pt-8 text-[14px] leading-[1.7] text-ink-3">
            {t.rich("contact.text", {
              email: () => (
                <a
                  href={`mailto:${site.email}`}
                  className="text-teal underline decoration-teal/30 underline-offset-4 hover:text-green"
                >
                  {site.email}
                </a>
              ),
              link: (chunks) => (
                <Link
                  href="/contato"
                  className="text-teal underline decoration-teal/30 underline-offset-4 hover:text-green"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </div>
    </main>
  );
}
