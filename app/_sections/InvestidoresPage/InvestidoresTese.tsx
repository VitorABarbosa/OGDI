import { GalleryFlowBackground } from "@/components/ui/gallery-flow-background";

const statements = [
  {
    idx: "01",
    title: (
      <>
        Entramos <em className="not-italic text-green">antes</em>.
      </>
    ),
    desc: "O valor de um empreendimento é criado na estruturação — leitura da oportunidade, produto e operação — antes de a obra começar.",
    align: "left" as const,
  },
  {
    idx: "02",
    title: <>Lemos o mercado.</>,
    desc: "Cada operação nasce de inteligência de mercado e estudo de viabilidade, não de aposta.",
    align: "right" as const,
  },
  {
    idx: "03",
    title: <>Conduzimos até o fim.</>,
    desc: "Da originação ao lançamento, a mesma condução — e o investidor acompanha cada marco da operação.",
    align: "left" as const,
  },
];

// A tese em statements oversized com numerais gigantes vazados ao fundo —
// espaço negativo extremo no lugar das réguas usadas no resto do site.
// A linha fluida costura os três statements em serpentina suave.
export function InvestidoresTese() {
  return (
    <section className="relative overflow-hidden bg-paper py-[clamp(96px,13vw,200px)]">
      <GalleryFlowBackground background="#FFFFFF" variant="investidores" />
      <div className="wrap relative z-[2] flex flex-col gap-[clamp(88px,12vw,176px)]">
        {statements.map((s) => (
          <div
            key={s.idx}
            className={`reveal relative max-w-[820px] ${s.align === "right" ? "self-end text-right" : ""}`}
          >
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-[.62em] select-none font-news text-[clamp(7rem,18vw,17rem)] leading-none tracking-[-.04em] text-transparent [-webkit-text-stroke:1px_rgba(23,26,27,.13)] ${s.align === "right" ? "-right-[.08em]" : "-left-[.08em]"}`}
            >
              {s.idx}
            </span>
            <h2 className="relative font-sans font-semibold text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.04] tracking-[-.03em] text-ink">
              {s.title}
            </h2>
            <p className={`relative mt-6 max-w-[46ch] text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-ink-2 ${s.align === "right" ? "ml-auto" : ""}`}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
