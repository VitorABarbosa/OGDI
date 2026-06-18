import { useTranslations } from "next-intl";
import { Kicker } from "@/components/ui/Kicker";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";

type AmenItem = { icon: string; label: string };
type Lazer = { lead: string; feat: { kicker: string; title: string }; items: AmenItem[] };

// Ícones de amenidades (paths 1:1 com a referência `Empreendimento.html`).
const ICONS: Record<string, string> = {
  pool: "M2 16c2 0 2-1.4 4-1.4S10 16 12 16s2-1.4 4-1.4S20 16 22 16M2 20c2 0 2-1.4 4-1.4S10 20 12 20s2-1.4 4-1.4S20 20 22 20M7 14V6a2 2 0 0 1 4 0M14 14V6a2 2 0 0 1 4 0",
  gym: "M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10",
  cowork: "M4 5h16v11H4zM2 20h20",
  gourmet: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  bbq: "M12 3c2 3.5 4.5 4.5 4.5 8a4.5 4.5 0 0 1-9 0c0-1.8 1-2.8 2-3.6 0 1.6.8 2.6 1.7 2.6.4 0 .8-.4.8-1.3 0-1.8-1.6-2.7-.8-5.7z",
  pet: "M6.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M10 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M14 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M17.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M12 12c-2.8 0-4.5 1.8-4.5 4 0 1.5 1.8 2.4 4.5 2.4S16.5 17.5 16.5 16c0-2.2-1.7-4-4.5-4z",
  play: "M5 20l7-13 7 13M5 20h14",
  laundry: "M5 3h14v18H5zM12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8M8 6.5h.01M11 6.5h.01",
  bike: "M6 12.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8M18 12.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8M6 16l4-7h5l-3.2 7M9.5 9h4.5",
  market: "M6 8h12l-1.2 12H7.2zM9 8a3 3 0 0 1 6 0",
  lounge: "M5 12V9.5A2.5 2.5 0 0 1 7.5 7h9A2.5 2.5 0 0 1 19 9.5V12M3.5 12.5A2 2 0 0 1 5.5 14.5V17h13v-2.5a2 2 0 0 1 2-2M6 17v2.5M18 17v2.5",
  roof: "M4 9h7v11H4zM13 4h7v16h-7M6.5 12h2M6.5 15h2M15.5 7h2M15.5 11h2M15.5 15h2",
  sport: "M4 4l16 16M9 4l11 11M4 9l11 11M4 14l6 6M14 4l6 6M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4M17 5h3v3",
  beach: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 3c-3 4-3 11 0 18M12 3c3 4 3 11 0 18M3.5 9c5 2.5 12 2.5 17 0M3.5 15c5-2.5 12-2.5 17 0",
  basket: "M6 4h12v7H6zM8 11l1 4h6l1-4M9.5 15l.5 3M14.5 15l-.5 3M12 15v3.2",
  toys: "M4 14h6v6H4zM14 14h6v6h-6zM9 7h6v6H9z",
  game: "M8 9h8a4 4 0 0 1 4 4v.5a2.5 2.5 0 0 1-4.6 1.4L15 14H9l-.4.9A2.5 2.5 0 0 1 4 13.5V13a4 4 0 0 1 4-4M7.5 11.5v2.5M6.25 12.75h2.5M15.6 12h.01M17 13.2h.01",
  chess: "M9.5 20h5M10 20c.3-2 1.2-3 1.2-4.5M14 20c-.3-2-1.2-3-1.2-4.5M12 6.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4M10 11h4l-.5 2h-3z",
  fire: "M12 4c1.6 2.4 3 3.1 3 5.4a3 3 0 0 1-6 0c0-1.1.5-1.8 1.1-2.4 0 .9.5 1.5 1 1.5M6 19l12-3M6 16l12 3",
  gazebo: "M3.5 10 12 5l8.5 5M6 10v8M18 10v8M9 10v8M15 10v8M5 18h14",
  herb: "M9 20h6l-.7-4H9.7zM12 16c0-2.5 1.6-3.8 3.6-3.8C15.6 14.7 14 16 12 16M12 16c0-2.5-1.6-3.8-3.6-3.8C8.4 14.7 10 16 12 16M12 16V9",
  hall: "M4 20h16M5 20v-5h14v5M8 15v-1a4 4 0 0 1 8 0v1M12 9V7M10.5 7h3",
};

// Imagem do destaque (Cine Open) por projeto. Sem entrada → placeholder gradiente.
const FEAT_IMAGE: Record<string, string> = {
  "hits-cupece": "/assets/projetos/CUPECE/IMAGES/Cine_Open.png",
  "start-park-jabaquara": "/assets/projetos/HITS_START_PARK_JABAQUARA/IMAGES/TS_Engenharia_Hits_Park_CineOpen_HR.jpg",
  "oh-freguesia": "/assets/projetos/OH_FREGUESIA/IMAGES/TS_OH_Freguesia_Cine_Open_HR.jpg",
  "hits-santa-catarina": "/assets/projetos/HITS_SANTA_CATARINA/IMAGES/favorita.jpg",
};

// Lazer & diferenciais — 1:1 com a referência `.em-lazer`: cabeçalho (kicker +
// h2 à esquerda, lead à direita), grade de ícones de amenidades (6→4→2 colunas)
// e uma faixa de render destaque com legenda. Chrome em `empreendimento.lazer`;
// conteúdo por projeto em `proj.<slug>.lazer`.
export function EmpLazer({ p }: { p: Projeto }) {
  const t = useTranslations("empreendimento.lazer");
  const tp = useTranslations("proj");
  const lazer = tp.raw(`${p.slug}.lazer`) as Lazer | undefined;

  if (!lazer?.items?.length) return null;

  return (
    <section id="lazer" className="scroll-mt-[120px] pt-[var(--spacing-section)] pb-0">
      <div className="wrap">
        {/* Cabeçalho */}
        <div className="reveal mb-[clamp(36px,4.5vw,60px)] flex flex-wrap items-end justify-between gap-[30px]">
          <div>
            <Kicker>{t("kicker")}</Kicker>
            <h2 className="mt-[14px] font-sans font-semibold text-[clamp(26px,3vw,42px)] leading-[1.06] tracking-[-.03em]">
              {t("heading")}
            </h2>
          </div>
          <p className="max-w-[42ch] text-[15px] leading-[1.6] text-ink-2">{lazer.lead}</p>
        </div>
      </div>

      {/* Grade de amenidades — em .wrap-wide (1760) p/ ficar mais larga que o destaque */}
      <div className="wrap-wide">
        <div className="reveal reveal-2 grid grid-cols-2 gap-px border border-[color:var(--line)] bg-[color:var(--line)] min-[640px]:grid-cols-4 min-[1000px]:grid-cols-6 min-[1200px]:grid-cols-8">
          {lazer.items.map((item, index) => (
            <div
              key={`${item.icon}-${index}`}
              className="flex flex-col items-center gap-[15px] bg-white px-[18px] py-[clamp(22px,2.4vw,32px)] text-center transition-colors duration-[350ms] hover:bg-bg-soft"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[30px] w-[30px] text-teal"
                aria-hidden
              >
                <path d={ICONS[item.icon] ?? ""} />
              </svg>
              <span className="text-[12px] leading-[1.3] tracking-[.05em] text-ink">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap">
        {/* Faixa de render destaque */}
        <div className="reveal relative mt-[clamp(28px,3vw,44px)] aspect-[21/9] overflow-hidden bg-dark max-[700px]:aspect-[4/3]">
          <MediaPlaceholder tone={p.tone} src={FEAT_IMAGE[p.slug]} alt={FEAT_IMAGE[p.slug] ? lazer.feat.title : ""} />
          <div
            aria-hidden
            className="absolute inset-0 z-[2] [background:linear-gradient(0deg,rgba(8,12,13,.7),rgba(8,12,13,0)_55%)]"
          />
          <div className="absolute bottom-[clamp(20px,3vw,36px)] left-[clamp(20px,3vw,40px)] z-[3] text-white">
            <div className="text-[11px] uppercase tracking-[.2em] text-green">{lazer.feat.kicker}</div>
            <div className="mt-2 font-serif font-normal text-[clamp(24px,2.4vw,36px)]">{lazer.feat.title}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
