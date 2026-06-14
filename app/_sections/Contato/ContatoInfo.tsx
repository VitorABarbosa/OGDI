import { getTranslations } from "next-intl/server";
import { Kicker } from "@/components/ui/Kicker";
import { site } from "@/data/site";

export async function ContatoInfo() {
  const t = await getTranslations("contato.info");
  const items = [
    { k: t("itens.email"), v: site.email },
    { k: t("itens.whatsapp"), v: site.phone },
    { k: t("itens.localizacao"), v: site.location },
  ];
  return (
    <div>
      <Kicker tone="on-dark">{t("kicker")}</Kicker>
      <h2 className="font-sans font-semibold text-[clamp(28px,3.2vw,46px)] leading-[1.1] my-[22px] text-white tracking-[-.025em]">{t("heading")}</h2>
      <p className="text-[16px] text-[rgba(242,241,237,.72)] max-w-[440px] leading-[1.65]">{t("body")}</p>
      <div className="mt-[52px] flex flex-col gap-[22px]">
        {items.map((it) => (
          <div key={it.k}>
            <div className="text-[11px] tracking-[.14em] uppercase text-on-dark-2 mb-[5px]">{it.k}</div>
            <div className="font-sans font-medium text-[18px] text-white tracking-[-.01em]">{it.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
