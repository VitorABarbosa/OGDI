import { useTranslations } from "next-intl";
import { Kicker } from "@/components/ui/Kicker";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { PlayBadge, MediaScrim } from "@/components/ui/PlayBadge";
import { LiteYouTube } from "@/components/ui/LiteYouTube";
import type { Projeto } from "@/app/_sections/Projetos/projetos.data";
import { cn } from "@/lib/cn";

type Xp = { kind: string; title: string; text: string; meta: string[]; cue: string };

// Extrai o ID de 11 caracteres de uma URL do YouTube (watch?v= / youtu.be / embed).
function youTubeId(url: string): string | undefined {
  return url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1];
}

const TOUR_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
    <path d="M12 3a9 9 0 1 0 9 9" />
    <path d="M12 3v4" />
    <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    <path d="M3.5 12h4M16.5 12h4" />
  </svg>
);

const VIDEO_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-[3px] h-7 w-7">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px] text-green transition-transform duration-300 group-hover:translate-x-1">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// Tour / Vídeo — 1:1 com a referência `.em-tour`: cabeçalho central + duas linhas
// de experiência (mídia 16/9 com botão de play + painel de texto), a segunda
// invertida. Conteúdo placeholder compartilhado (`empreendimento.tour`) até haver
// tour 360° e vídeo reais por projeto.
export function EmpTour({ p }: { p: Projeto }) {
  const t = useTranslations("empreendimento.tour");
  const exp = p.experience;
  const videoId = exp?.videoUrl ? youTubeId(exp.videoUrl) : undefined;

  // Sem tour 360° nem vídeo → seção desativada (não renderiza), e o link "Tour"
  // some do EmpNav automaticamente (ele só mostra âncoras presentes no DOM).
  if (!exp?.tourUrl && !videoId) return null;

  const virtual = t.raw("virtual") as Xp;
  const video = { ...(t.raw("video") as Xp), text: t("video.text", { name: p.name }) };

  return (
    <section id="tour" className="scroll-mt-[120px] py-section">
      <div className="wrap-wide">
        <div className="reveal mx-auto mb-[clamp(36px,4.5vw,60px)] max-w-[640px] text-center">
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-4 font-sans font-semibold uppercase text-[clamp(26px,3.2vw,46px)] leading-[1.06] tracking-[-.03em]">
            {t("heading")}
          </h2>
        </div>

        <div className="flex flex-col gap-[clamp(40px,5.5vw,84px)]">
          {exp?.tourUrl && (
            <XpRow xp={virtual} tone={p.tone} playIcon={TOUR_ICON} href={exp.tourUrl} poster={exp.tourPoster} />
          )}
          {videoId && (
            <XpRow xp={video} tone={p.tone} playIcon={VIDEO_ICON} reversed videoId={videoId} poster={exp?.videoPoster} />
          )}
        </div>
      </div>
    </section>
  );
}

// Mídia da linha: vídeo → embed lite do YouTube; tour → link externo sobre o
// poster; sem dados → placeholder tonal (demais projetos).
function XpMedia({
  xp,
  tone,
  playIcon,
  href,
  videoId,
  poster,
}: {
  xp: Xp;
  tone: Projeto["tone"];
  playIcon: React.ReactNode;
  href?: string;
  videoId?: string;
  poster?: string;
}) {
  const frame = "relative aspect-video overflow-hidden bg-dark max-[860px]:order-first";

  if (videoId) {
    return (
      <div className={frame}>
        <LiteYouTube id={videoId} title={`${xp.kind} — ${xp.title}`} poster={poster} playIcon={playIcon} />
      </div>
    );
  }

  const inner = (
    <>
      <MediaPlaceholder tone={tone} src={poster} />
      <MediaScrim />
      <PlayBadge icon={playIcon} />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={xp.cue}
        className={cn("group/media block cursor-pointer", frame)}
      >
        {inner}
      </a>
    );
  }

  return <div className={cn("group/media cursor-pointer", frame)}>{inner}</div>;
}

function XpRow({
  xp,
  tone,
  playIcon,
  reversed = false,
  href,
  videoId,
  poster,
}: {
  xp: Xp;
  tone: Projeto["tone"];
  playIcon: React.ReactNode;
  reversed?: boolean;
  href?: string;
  videoId?: string;
  poster?: string;
}) {
  const media = <XpMedia xp={xp} tone={tone} playIcon={playIcon} href={href} videoId={videoId} poster={poster} />;

  const cue = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-flex items-center gap-2 text-[13px] tracking-[.04em] text-ink transition-colors hover:text-green"
    >
      {xp.cue}
      {ARROW}
    </a>
  ) : (
    <span className="mt-5 inline-flex items-center gap-2 text-[13px] tracking-[.04em] text-ink">
      {xp.cue}
      {ARROW}
    </span>
  );

  const info = (
    <div>
      <span className="text-[11px] uppercase tracking-[.2em] text-green">{xp.kind}</span>
      <h3 className="mt-3 mb-[14px] font-serif font-normal text-[clamp(26px,2.7vw,40px)] leading-[1.05] tracking-[.005em]">
        {xp.title}
      </h3>
      <p className="mb-[22px] max-w-[42ch] text-[15px] leading-[1.66] text-ink-2">{xp.text}</p>
      <div className="flex flex-wrap border-t border-[color:var(--line)]">
        {xp.meta.map((m, i) => (
          <span
            key={`${m}-${i}`}
            className="mr-[18px] border-r border-[color:var(--line)] pr-[18px] pt-3 text-[12px] tracking-[.04em] text-ink-3 last:mr-0 last:border-r-0 last:pr-0"
          >
            {m}
          </span>
        ))}
      </div>
      {cue}
    </div>
  );

  return (
    <div
      className={cn(
        "group grid items-center gap-[clamp(28px,4vw,64px)] max-[860px]:grid-cols-1",
        reversed ? "lg:grid-cols-[1fr_1.5fr]" : "lg:grid-cols-[1.5fr_1fr]",
      )}
    >
      {reversed ? (
        <>
          {info}
          {media}
        </>
      ) : (
        <>
          {media}
          {info}
        </>
      )}
    </div>
  );
}
