import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import { institucional } from "./institucional.data";
import styles from "./InstitucionalGrupo.module.css";

// Wordmarks tipográficos provisórios — substituir pelas logos reais
// quando os arquivos das empresas forem fornecidos (só temos a da OGDI).
function Wordmark({ id }: { id: string }) {
  switch (id) {
    case "ogdi":
      return (
        <span className={styles.wm}>
          <span className={styles.wmOgdi}>OGDI</span>
          <span className={styles.wmSub}>Open Group · Desenv. Imobiliário</span>
        </span>
      );
    case "nid":
      return (
        <span className={styles.wm}>
          <span className={styles.wmNid}>nid</span>
          <span className={styles.wmSub}>studio</span>
        </span>
      );
    case "flying":
      return (
        <span className={styles.wm}>
          <span className={styles.wmFlying}>FLYING</span>
          <span className={styles.wmSub}>studio</span>
        </span>
      );
    default:
      return (
        <span className={styles.wm}>
          <span className={styles.wmRinno}>RINNO</span>
          <span className={styles.wmSub}>films</span>
        </span>
      );
  }
}

// Assinaturas em line-art que se desenham quando o card expande.
// pathLength=1 normaliza o stroke-dasharray para o draw via CSS.
function Motif({ id }: { id: string }) {
  const stroke = { fill: "none", pathLength: 1 } as const;
  switch (id) {
    case "ogdi":
      return (
        <svg className={styles.motifSvg} viewBox="0 0 400 220" aria-hidden>
          <line {...stroke} x1="0" y1="190" x2="400" y2="190" stroke="rgba(242,241,237,.2)" strokeWidth="1" />
          <line {...stroke} x1="90" y1="20" x2="90" y2="200" stroke="rgba(242,241,237,.14)" strokeWidth="1" />
          <line {...stroke} x1="190" y1="20" x2="190" y2="200" stroke="rgba(242,241,237,.14)" strokeWidth="1" />
          <line {...stroke} x1="290" y1="20" x2="290" y2="200" stroke="rgba(242,241,237,.14)" strokeWidth="1" />
          <polyline {...stroke} points="14,180 90,148 190,118 290,62 386,24" stroke="rgba(95,168,60,.85)" strokeWidth="2" />
          <circle {...stroke} cx="386" cy="24" r="6" stroke="rgba(95,168,60,.85)" strokeWidth="1.5" />
        </svg>
      );
    case "nid":
      return (
        <svg className={styles.motifSvg} viewBox="0 0 400 220" aria-hidden>
          <path {...stroke} d="M 200 200 C 90 200 50 120 80 56" stroke="rgba(242,241,237,.3)" strokeWidth="1.4" />
          <path {...stroke} d="M 200 200 C 310 200 350 120 320 56" stroke="rgba(242,241,237,.3)" strokeWidth="1.4" />
          <path {...stroke} d="M 200 184 C 118 184 88 124 108 78" stroke="rgba(242,241,237,.2)" strokeWidth="1.2" />
          <path {...stroke} d="M 200 184 C 282 184 312 124 292 78" stroke="rgba(242,241,237,.2)" strokeWidth="1.2" />
          <path {...stroke} d="M 200 168 C 148 168 128 132 140 100" stroke="rgba(95,168,60,.8)" strokeWidth="1.6" />
          <path {...stroke} d="M 200 168 C 252 168 272 132 260 100" stroke="rgba(95,168,60,.8)" strokeWidth="1.6" />
          <circle {...stroke} cx="200" cy="144" r="10" stroke="rgba(95,168,60,.9)" strokeWidth="1.6" />
        </svg>
      );
    case "flying":
      return (
        <svg className={styles.motifSvg} viewBox="0 0 400 220" aria-hidden>
          <rect {...stroke} x="155" y="70" width="90" height="84" stroke="rgba(95,168,60,.85)" strokeWidth="1.6" />
          <line {...stroke} x1="155" y1="70" x2="6" y2="10" stroke="rgba(242,241,237,.3)" strokeWidth="1.2" />
          <line {...stroke} x1="245" y1="70" x2="394" y2="10" stroke="rgba(242,241,237,.3)" strokeWidth="1.2" />
          <line {...stroke} x1="155" y1="154" x2="6" y2="212" stroke="rgba(242,241,237,.3)" strokeWidth="1.2" />
          <line {...stroke} x1="245" y1="154" x2="394" y2="212" stroke="rgba(242,241,237,.3)" strokeWidth="1.2" />
          <rect {...stroke} x="110" y="30" width="180" height="164" stroke="rgba(242,241,237,.16)" strokeWidth="1" />
          <line {...stroke} x1="172" y1="100" x2="228" y2="100" stroke="rgba(95,168,60,.7)" strokeWidth="1.5" />
          <line {...stroke} x1="172" y1="118" x2="212" y2="118" stroke="rgba(95,168,60,.7)" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg className={styles.motifSvg} viewBox="0 0 400 220" aria-hidden>
          <rect {...stroke} x="14" y="62" width="104" height="96" stroke="rgba(242,241,237,.3)" strokeWidth="1.3" />
          <rect {...stroke} x="148" y="62" width="104" height="96" stroke="rgba(242,241,237,.3)" strokeWidth="1.3" />
          <rect {...stroke} x="282" y="62" width="104" height="96" stroke="rgba(95,168,60,.85)" strokeWidth="1.5" />
          <line {...stroke} x1="0" y1="36" x2="400" y2="36" stroke="rgba(242,241,237,.16)" strokeWidth="1" />
          <line {...stroke} x1="0" y1="184" x2="400" y2="184" stroke="rgba(242,241,237,.16)" strokeWidth="1" />
          <path {...stroke} d="M 320 88 L 320 132 L 358 110 Z" stroke="rgba(95,168,60,.9)" strokeWidth="1.6" />
        </svg>
      );
  }
}

export function InstitucionalGrupo() {
  const { grupo } = institucional;

  return (
    <section className={cn(styles.section, "py-[clamp(72px,8vw,112px)] text-ink")}>
      <div className="wrap relative z-[2]">
        <div className="reveal mx-auto mb-[clamp(28px,3.8vw,54px)] max-w-[980px] text-center">
          <Kicker className="justify-center">{grupo.kicker}</Kicker>
          <h2 className="mt-5 font-news text-[clamp(3rem,8vw,8.4rem)] font-normal leading-[.9] tracking-[-.045em]">
            Nosso Grupo
          </h2>
          <p className="mx-auto mt-7 max-w-[760px] text-[clamp(16px,1.35vw,21px)] leading-[1.62] text-ink-2">
            {grupo.intro}
          </p>
        </div>
      </div>

      {/* Palco full-bleed: ocupa a largura inteira da tela */}
      <div className={cn(styles.stage, "reveal reveal-2 relative z-[2]")}>
          {grupo.companies.map((company, index) => (
            <article
              key={company.id}
              tabIndex={0}
              className={cn(styles.card, "outline-none focus-visible:ring-2 focus-visible:ring-green")}
            >
              <Motif id={company.id} />

              {/* Estado idle: wordmark centralizado */}
              <div className={styles.idle}>
                <Wordmark id={company.id} />
                <span className={styles.idleRole}>{company.role}</span>
              </div>

              {/* Estado régua: nome na vertical, como lombada de livro */}
              <div className={styles.mini} aria-hidden>
                <span className={styles.miniNum}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.miniLabel}>{company.label}</span>
              </div>

              {/* Estado expandido */}
              <div className={styles.detail}>
                <div className={styles.detailWm}>
                  <Wordmark id={company.id} />
                </div>
                <div className={styles.info}>
                  <span className={styles.infoRole}>
                    {String(index + 1).padStart(2, "0")} — {company.role}
                  </span>
                  <h3 className={styles.infoName}>{company.name}</h3>
                  <p className={styles.infoText}>{company.text}</p>
                  <ul className={styles.infoTags}>
                    {company.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
