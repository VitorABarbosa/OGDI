import Link from "next/link";
import { Kicker } from "@/components/ui/Kicker";
import { institucional } from "./institucional.data";
import { InstitucionalHeroWaves } from "./InstitucionalHeroWaves";
import styles from "./InstitucionalHero.module.css";

export function InstitucionalHero() {
  const { hero } = institucional;
  return (
    <section data-header-dark className="relative flex min-h-svh items-center overflow-hidden bg-dark">
      <InstitucionalHeroWaves />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[.62] [background:radial-gradient(92%_72%_at_84%_-8%,rgba(31,90,99,.46),transparent_56%),radial-gradient(82%_70%_at_6%_110%,rgba(95,168,60,.17),transparent_60%)]"
      />
      <div className="wrap relative z-[2] w-full">
        <div className="pt-[clamp(130px,18vh,200px)] pb-[clamp(96px,14vh,160px)]">
          <nav
            aria-label="Breadcrumb"
            className="mb-[30px] flex items-center gap-[10px] text-[12px] uppercase tracking-[.08em] text-white/50"
          >
            <Link href="/" className="text-white/55 transition-colors duration-200 hover:text-white">
              Início
            </Link>
            <span aria-hidden className="inline-block h-px w-[14px] shrink-0 bg-white/30" />
            <span aria-current="page" className="text-white/85">
              Quem somos
            </span>
          </nav>

          <Kicker tone="on-dark-green">{hero.kicker}</Kicker>

          <h1 className="mt-[clamp(22px,3vw,34px)] max-w-[17ch] font-news font-normal text-white text-[clamp(2.1rem,6.4vw,5.6rem)] leading-[1.07] tracking-[-.018em]">
            <span className="reveal block" style={{ transitionDelay: "0s" }}>
              Revelamos o valor <span className="italic text-green">extraordinário</span>
            </span>
            <span className="reveal block" style={{ transitionDelay: ".2s" }}>
              de ativos imobiliários.
            </span>
          </h1>
        </div>
      </div>

      <div className="absolute bottom-8 left-pad-x z-[2] flex items-center gap-[14px] text-[10.5px] uppercase tracking-[.22em] text-white/50">
        <span aria-hidden className={`${styles.cueLine} h-[50px] w-px bg-white/50`} />
        {hero.cue}
      </div>
    </section>
  );
}
