import { useTranslations } from "next-intl";
import { Kicker } from "@/components/ui/Kicker";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";
import { cn } from "@/lib/cn";

// "Sobre o projeto" — 1:1 com a referência `Empreendimento.html` (.em-sobre):
// grade de 2 colunas (texto à esquerda, imagem 4:5 à direita com etiqueta de
// render). O título usa o enunciado de produto do projeto; o corpo, os parágrafos
// de introdução. Tudo via i18n por projeto (`proj.<slug>.*`); chrome em
// `empreendimento.sobre`. A ficha de números mudou-se para a faixa Ficha (EmpFicha).
export function EmpInfo({ p }: { p: Projeto }) {
  const t = useTranslations("empreendimento.sobre");
  const tp = useTranslations("proj");
  const title = tp(`${p.slug}.productStory.title`);
  const intro = tp.raw(`${p.slug}.intro`) as string[];

  return (
    <section id="sobre" className="scroll-mt-[120px] pt-[clamp(72px,9vw,140px)] pb-[clamp(56px,7vw,100px)]">
      <div className="wrap">
        <div className="grid grid-cols-1 items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Kicker className="reveal mb-5">{t("kicker")}</Kicker>

            <h2 className="reveal reveal-2 font-sans font-semibold text-[clamp(28px,3.4vw,50px)] leading-[1.08] tracking-[-.03em]">
              {title}
            </h2>

            <div className="mt-6 space-y-[18px]">
              {intro.map((paragraph, i) => (
                <p
                  key={`${p.slug}-sobre-${i}`}
                  className={cn(
                    "reveal max-w-[56ch] text-[clamp(15px,1.2vw,18px)] leading-[1.74] text-ink-2",
                    `reveal-info-${Math.min(i + 3, 5)}`,
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="reveal reveal-2 relative aspect-[4/5] overflow-hidden bg-dark max-lg:aspect-[16/10]">
            <MediaPlaceholder tone={p.tone} src={p.image} alt={p.image ? p.name : ""} />
          </div>
        </div>
      </div>
    </section>
  );
}
