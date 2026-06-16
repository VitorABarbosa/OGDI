"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import styles from "./ClientesPerguntas.module.css";

// 8 perguntas em duas colunas de accordion (4 + 4). Uma resposta aberta por vez;
// fechadas por padrão para manter a seção compacta.
const columns = [
  ["01", "02", "03", "04"],
  ["05", "06", "07", "08"],
] as const;

export function ClientesPerguntas() {
  const t = useTranslations("clientes.perguntas");
  const [open, setOpen] = useState<string | null>(null);

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

        <div className="reveal reveal-2 mt-[clamp(40px,5vw,64px)] grid grid-cols-1 items-start gap-x-[clamp(40px,5vw,80px)] md:grid-cols-2">
          {columns.map((col, ci) => (
            <div key={ci}>
              {col.map((id) => {
                const isOpen = open === id;
                return (
                  <div key={id} className={cn(styles.item, isOpen && styles.open)}>
                    <button
                      type="button"
                      className={styles.q}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${id}`}
                      onClick={() => setOpen(isOpen ? null : id)}
                    >
                      <span>{t(`items.${id}.q`)}</span>
                      <i aria-hidden className={styles.chev} />
                    </button>
                    <div id={`faq-${id}`} role="region" className={styles.panel}>
                      <div>
                        <p>{t(`items.${id}.a`)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
