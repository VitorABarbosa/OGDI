import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

type ClosingStatement = { title: string; text: string; ctaLabel: string };

export function EmpClosing({ p }: { p: Projeto }) {
  const tp = useTranslations("proj");
  const closing = tp.raw(`${p.slug}.closingStatement`) as ClosingStatement;

  return (
    <section className="bg-dark py-[clamp(72px,9vw,128px)] text-white">
      <div className="wrap">
        <div className="grid grid-cols-1 items-end gap-[clamp(30px,5vw,80px)] lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="reveal max-w-[860px] font-news text-[clamp(36px,5.4vw,78px)] font-normal leading-[1.04] tracking-[-.01em]">
              {closing.title}
            </h2>
            <p className="reveal reveal-2 mt-6 max-w-[680px] text-[clamp(16px,1.35vw,21px)] leading-[1.62] text-white/72">
              {closing.text}
            </p>
          </div>
          <div className="reveal reveal-3 flex lg:justify-end">
            <Button href={p.closingStatement?.ctaHref ?? "/contato"} variant="light" arrow>
              {closing.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
