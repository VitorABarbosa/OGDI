"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Kicker } from "@/components/ui/Kicker";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import styles from "./FaqAccordion.module.css";

// FAQ em accordion. Uma resposta aberta por vez; fechadas por padrão.
// Compartilhado por Clientes e Investidores:
//  - sem `pageSize`: mostra todas as perguntas em duas colunas (metade + metade).
//  - com `pageSize`: pagina N por vez, com setas para avançar/voltar (listas longas).
// `compact` adensa o ritmo tipográfico.
type FaqAccordionProps = {
  namespace: string;
  sectionId: string;
  ids: readonly string[];
  compact?: boolean;
  pageSize?: number;
};

export function FaqAccordion({ namespace, sectionId, ids, compact = false, pageSize }: FaqAccordionProps) {
  const t = useTranslations(namespace);
  const [open, setOpen] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const paginated = !!pageSize && pageSize < ids.length;
  const pages: readonly string[][] = paginated
    ? Array.from({ length: Math.ceil(ids.length / pageSize!) }, (_, i) =>
        ids.slice(i * pageSize!, i * pageSize! + pageSize!),
      )
    : [ids.slice()];
  const current = pages[Math.min(page, pages.length - 1)];

  const goTo = (next: number) => {
    setPage(next);
    setOpen(null); // fecha qualquer resposta aberta ao trocar de página
  };

  // Divide a página atual em duas colunas (metade + metade).
  const half = Math.ceil(current.length / 2);
  const columns = [current.slice(0, half), current.slice(half)];

  return (
    <section
      id={sectionId}
      className={cn(
        "bg-bg-soft-2",
        compact ? "py-[clamp(56px,7vw,96px)]" : "py-[clamp(80px,10vw,148px)]",
      )}
    >
      <div className="wrap">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>{t("kicker")}</Kicker>
            <h2
              className={cn(
                "mt-5 font-sans font-semibold leading-[1.1] tracking-[-.025em] text-ink",
                compact ? "text-[clamp(24px,2.6vw,34px)]" : "text-[clamp(26px,3vw,40px)]",
              )}
            >
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

        {paginated && (
          <div className="reveal reveal-2 mt-[clamp(28px,3.4vw,44px)] flex items-center justify-between gap-4 border-t border-[color:var(--line)] pt-5">
            <span className="font-sans text-[12px] tracking-[.16em] text-ink-3 tabular-nums">
              {String(page + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label={t("prev")}
                disabled={page === 0}
                className="flex h-11 w-11 items-center justify-center border border-[color:var(--line)] text-ink transition-[background-color,color,border-color,opacity] duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
                onClick={() => goTo(page - 1)}
              >
                <Icon name="chevron-left" className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={t("next")}
                disabled={page >= pages.length - 1}
                className="flex h-11 w-11 items-center justify-center border border-[color:var(--line)] text-ink transition-[background-color,color,border-color,opacity] duration-300 ease-brand hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
                onClick={() => goTo(page + 1)}
              >
                <Icon name="chevron-right" className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        <div
          className={cn(
            "grid grid-cols-1 items-start gap-x-[clamp(40px,5vw,80px)] md:grid-cols-2",
            paginated ? "mt-2" : "reveal reveal-2",
            !paginated && (compact ? "mt-[clamp(32px,4vw,52px)]" : "mt-[clamp(40px,5vw,64px)]"),
          )}
        >
          {columns.map((col, ci) => (
            <div key={ci}>
              {col.map((id) => {
                const isOpen = open === id;
                return (
                  <div key={id} className={cn(styles.item, compact && styles.compact, isOpen && styles.open)}>
                    <button
                      type="button"
                      className={styles.q}
                      aria-expanded={isOpen}
                      aria-controls={`${sectionId}-${id}`}
                      onClick={() => setOpen(isOpen ? null : id)}
                    >
                      <span>{t(`items.${id}.q`)}</span>
                      <i aria-hidden className={styles.chev} />
                    </button>
                    <div id={`${sectionId}-${id}`} role="region" className={styles.panel}>
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
