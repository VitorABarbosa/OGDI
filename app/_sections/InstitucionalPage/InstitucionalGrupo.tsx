import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";
import { institucional } from "./institucional.data";
import styles from "./InstitucionalGrupo.module.css";

export function InstitucionalGrupo() {
  const { grupo } = institucional;

  return (
    <section className={cn(styles.section, "py-[clamp(84px,10vw,148px)] text-white")}>
      <div className="wrap relative z-[2]">
        <div className="grid grid-cols-1 gap-[clamp(42px,6vw,92px)] lg:grid-cols-[.78fr_1.22fr]">
          <div className="reveal lg:sticky lg:top-[112px] lg:self-start">
            <Kicker tone="on-dark-green">{grupo.kicker}</Kicker>
            <h2 className="mt-5 max-w-[10ch] font-news text-[clamp(2.7rem,6.2vw,6.8rem)] font-normal leading-[.92] tracking-[-.035em]">
              Nosso Grupo
            </h2>
            <p className="mt-7 max-w-[35ch] text-[clamp(15px,1.2vw,18px)] leading-[1.68] text-white/68">
              {grupo.intro}
            </p>
          </div>

          <div className={cn(styles.system, "grid grid-cols-1 gap-[18px] md:grid-cols-2")}>
            {grupo.companies.map((company, index) => (
              <article
                key={company.id}
                className={cn(
                  styles.card,
                  "reveal flex flex-col justify-between p-[clamp(24px,3vw,38px)]",
                  index === 1 && "reveal-2 md:translate-y-[54px]",
                  index === 2 && "reveal-3 md:-translate-y-[18px]",
                  index === 3 && "reveal-4 md:translate-y-[38px]",
                )}
              >
                <div>
                  <div className="mb-[clamp(24px,3vw,38px)] flex items-start justify-between gap-5">
                    <div className={styles.mark}>
                      <span className="font-news text-[clamp(1.15rem,2vw,1.9rem)] leading-none tracking-[-.04em] text-white">
                        {company.label}
                      </span>
                    </div>
                    <span className="pt-2 text-[11px] uppercase tracking-[.18em] text-white/38">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium uppercase tracking-[.16em] text-green">
                    {company.role}
                  </span>
                  <h3 className="mt-3 max-w-[14ch] font-sans text-[clamp(1.35rem,2.1vw,2.35rem)] font-semibold leading-[1.02] tracking-[-.04em]">
                    {company.name}
                  </h3>
                  <p className="mt-5 max-w-[42ch] text-[14px] leading-[1.66] text-white/66">
                    {company.text}
                  </p>
                </div>

                <ul className="mt-[clamp(24px,3vw,38px)] flex flex-wrap gap-2">
                  {company.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/14 bg-white/[.055] px-3 py-1.5 text-[10.5px] uppercase tracking-[.13em] text-white/62"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
