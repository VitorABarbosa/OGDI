import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems, footerAtuacao } from "@/data/nav";
import { site } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

export async function Footer() {
  const tn = await getTranslations("nav");
  const tf = await getTranslations("footer");
  return (
    <footer className="bg-dark-2 text-on-dark px-pad-x pt-[clamp(64px,7vw,104px)] pb-9">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.1fr] gap-12 pb-16 border-b border-[color:var(--line-dark)]">
        <div>
          <Link href="/#top" className="flex items-center gap-[11px]">
            <Image src="/assets/logos/OGDI_COMPLETO_BRANCO.png" alt="OGDI" width={2400} height={1792} sizes="80px" className="h-[52px] w-auto object-contain" />
            <span className="font-sans font-medium text-[12.5px] leading-none text-white">
              {site.name}<small className="block text-[7.5px] tracking-[.24em] uppercase mt-1 text-on-dark-2 font-normal">{site.subtitle}</small>
            </span>
          </Link>
          <p className="font-serif italic font-light text-[22px] text-on-dark mt-6 max-w-[280px] leading-[1.35]">{tf("tagline")}</p>
        </div>
        <div>
          <h5 className="text-[11px] tracking-[.16em] uppercase text-on-dark-2 mb-5 font-medium">{tf("navTitle")}</h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {navItems.map((it) => (
              <li key={it.key}><Link href={it.href} className="text-[14px] uppercase text-on-dark/80 hover:text-green transition-colors">{tn(it.key)}</Link></li>
            ))}
          </ul>
        </div>
        <FooterCol title={tf("atuacaoTitle")} items={footerAtuacao} />
        <div>
          <h5 className="text-[11px] tracking-[.16em] uppercase text-on-dark-2 mb-5 font-medium">{tn("contato")}</h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-3 text-[14px]">
            <li><a href={`mailto:${site.email}`} className="text-on-dark/80 hover:text-green transition-colors">{site.email}</a></li>
            <li><Link href="/contato" className="text-on-dark/80 hover:text-green transition-colors">{site.phone}</Link></li>
            <li className="text-on-dark-2">{site.location}</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
        <div className="text-[12.5px] text-on-dark-2">{site.copyright} · <Link href="/politica-de-privacidade" className="text-on-dark/70 transition-colors hover:text-green">{tf("privacy")}</Link></div>
        <div className="flex gap-2">
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 border border-[color:var(--line-dark)] inline-flex items-center justify-center text-on-dark hover:bg-white hover:text-dark hover:border-white transition-colors"><Icon name="linkedin" /></a>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 border border-[color:var(--line-dark)] inline-flex items-center justify-center text-on-dark hover:bg-white hover:text-dark hover:border-white transition-colors"><Icon name="instagram" /></a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 className="text-[11px] tracking-[.16em] uppercase text-on-dark-2 mb-5 font-medium">{title}</h5>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {items.map((it) => (
          <li key={it.label}><Link href={it.href} className="text-[14px] text-on-dark/80 hover:text-green transition-colors">{it.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
