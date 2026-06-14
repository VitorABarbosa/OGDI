"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const fieldCls = "bg-transparent border-0 border-b border-[color:var(--line-dark)] py-[10px] text-[16px] text-white outline-none transition-colors focus:border-green placeholder:text-[rgba(242,241,237,.36)]";
const labelCls = "text-[11px] tracking-[.14em] uppercase text-on-dark-2";

const tipoKeys = ["oportunidade", "projeto", "parceria", "investimento", "imprensa", "outro"] as const;

export function ContatoForm() {
  const t = useTranslations("contato.form");
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div role="status" className="p-[34px] border border-[color:var(--line-dark)]">
        <Icon name="check" />
        <h3 className="font-sans font-semibold text-[23px] mt-[14px] mb-[8px] text-white tracking-[-.02em]">{t("sucesso.title")}</h3>
        <p className="text-[rgba(242,241,237,.7)] m-0">{t("sucesso.body")}</p>
      </div>
    );
  }
  return (
    <form aria-label={t("aria")} onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-[22px]">
      <div className="flex flex-col gap-2"><label htmlFor="f-nome" className={labelCls}>{t("labels.nome")}</label><input id="f-nome" type="text" placeholder={t("placeholders.nome")} required className={fieldCls} /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        <div className="flex flex-col gap-2"><label htmlFor="f-empresa" className={labelCls}>{t("labels.empresa")}</label><input id="f-empresa" type="text" placeholder={t("placeholders.empresa")} className={fieldCls} /></div>
        <div className="flex flex-col gap-2"><label htmlFor="f-email" className={labelCls}>{t("labels.email")}</label><input id="f-email" type="email" placeholder={t("placeholders.email")} required className={fieldCls} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        <div className="flex flex-col gap-2"><label htmlFor="f-wpp" className={labelCls}>{t("labels.whatsapp")}</label><input id="f-wpp" type="tel" placeholder={t("placeholders.whatsapp")} className={fieldCls} /></div>
        <div className="flex flex-col gap-2"><label htmlFor="f-tipo" className={labelCls}>{t("labels.tipo")}</label>
          <select id="f-tipo" className={`${fieldCls} appearance-none cursor-pointer pr-7`}
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239AA3A4' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
              backgroundSize: "14px",
            }}>
            {tipoKeys.map((k) => <option key={k} className="text-[#15282c]">{t(`tipos.${k}`)}</option>)}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2"><label htmlFor="f-msg" className={labelCls}>{t("labels.mensagem")}</label><textarea id="f-msg" rows={2} placeholder={t("placeholders.mensagem")} className={`${fieldCls} resize-y min-h-[70px]`} /></div>
      <div className="mt-2 flex items-center gap-5 flex-wrap">
        <Button type="submit" variant="light" arrow>{t("submit")}</Button>
        <span className="text-[12px] text-on-dark-2 max-w-[220px] leading-[1.4]">{t("consent")}</span>
      </div>
    </form>
  );
}
