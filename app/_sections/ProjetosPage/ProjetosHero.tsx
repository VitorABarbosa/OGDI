import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";

export async function ProjetosHero() {
  const t = await getTranslations("projetos.hero");

  return (
    <section
      data-header-dark
      className="relative bg-dark text-white overflow-hidden pt-[clamp(150px,20vh,230px)] pb-[clamp(56px,7vw,96px)]"
    >
      {/* Imagem de fundo (canteiro) — evita o sólido puro */}
      <Image
        src="/assets/CONSTRUCAO.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover"
      />
      {/* Camada preta leve (~25%) para legibilidade sobre a imagem */}
      <div aria-hidden className="absolute inset-0 z-[1] pointer-events-none bg-black/80" />

      {/* Decorative radial-gradient glow — aria-hidden */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none opacity-50 [background:radial-gradient(120%_90%_at_80%_0%,rgba(31,90,99,.45),transparent_55%),radial-gradient(90%_80%_at_12%_110%,rgba(95,168,60,.16),transparent_60%)]"
      />

      {/* Logo como máscara: através do recorte da logo (canto inferior direito)
          aparece a imagem completa, sem o escurecimento da camada preta. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          WebkitMaskImage: "url(/assets/logos/LOGO_SEM_FUNDO.png)",
          maskImage: "url(/assets/logos/LOGO_SEM_FUNDO.png)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "right 4vw bottom 3vw",
          maskPosition: "right 4vw bottom 3vw",
          WebkitMaskSize: "clamp(160px,22vw,340px)",
          maskSize: "clamp(160px,22vw,340px)",
        }}
      >
        <Image src="/assets/CONSTRUCAO.png" alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <div className="wrap-wide relative z-[2]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="reveal flex items-center gap-[10px] mb-[26px] text-[12px] tracking-[.08em] uppercase text-white/50"
        >
          <Link
            href="/"
            className="transition-colors duration-200 text-white/55 hover:text-white"
          >
            {t("breadcrumbHome")}
          </Link>
          {/* Separator bar */}
          <span
            aria-hidden
            className="inline-block w-[14px] h-px bg-white/30 shrink-0"
          />
          <span aria-current="page">{t("breadcrumbCurrent")}</span>
        </nav>

        {/* Heading */}
        <div className="reveal reveal-2">
          <Kicker tone="on-dark-green">{t("kicker")}</Kicker>
          <h1
            className="font-sans font-semibold text-white text-[clamp(34px,5.4vw,76px)] tracking-[-.03em] leading-[1.04] max-w-[14ch] mt-[20px]"
          >
            {t.rich("title", { br: () => <br /> })}
          </h1>
        </div>

        {/* Sub-line */}
        <p
          className="reveal reveal-4 leading-[1.6] text-[clamp(15px,1.2vw,18px)] text-[rgba(242,241,237,.72)] max-w-[440px] mt-[28px]"
        >
          {t("sub")}
        </p>
      </div>
    </section>
  );
}
