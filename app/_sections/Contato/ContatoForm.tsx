"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";

const fieldCls = "bg-transparent border-0 border-b border-[color:var(--line-dark)] py-[10px] text-[16px] text-white outline-none transition-colors focus:border-green placeholder:text-[rgba(242,241,237,.36)]";
const labelCls = "text-[11px] tracking-[.14em] uppercase text-on-dark-2";

const tipoKeys = ["oportunidade", "projeto", "parceria", "investimento", "imprensa", "outro"] as const;

type Status = "idle" | "sending" | "error";

export function ContatoForm() {
  const t = useTranslations("contato.form");
  const [status, setStatus] = useState<Status>("idle");
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: se vier preenchido, é bot — aborta silenciosamente.
    if (data.get("botcheck")) return;

    data.append("access_key", site.web3formsKey);
    data.append("from_name", "Site OGDI");
    data.append("subject", `Site OGDI — ${data.get("tipo") ?? "Contato"}`);

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = (await res.json()) as { success?: boolean };
      if (json.success) {
        setSent(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (sent) {
    return (
      <div role="status" className="p-[34px] border border-[color:var(--line-dark)]">
        <Icon name="check" />
        <h3 className="font-sans font-semibold text-[23px] mt-[14px] mb-[8px] text-white tracking-[-.02em]">{t("sucesso.title")}</h3>
        <p className="text-[rgba(242,241,237,.7)] m-0">{t("sucesso.body")}</p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form aria-label={t("aria")} onSubmit={onSubmit} className="grid gap-[22px]">
      {/* Honeypot anti-spam — escondido de humanos */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden />

      <div className="flex flex-col gap-2"><label htmlFor="f-nome" className={labelCls}>{t("labels.nome")}</label><input id="f-nome" name="nome" type="text" placeholder={t("placeholders.nome")} required className={fieldCls} /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        <div className="flex flex-col gap-2"><label htmlFor="f-empresa" className={labelCls}>{t("labels.empresa")}</label><input id="f-empresa" name="empresa" type="text" placeholder={t("placeholders.empresa")} className={fieldCls} /></div>
        <div className="flex flex-col gap-2"><label htmlFor="f-email" className={labelCls}>{t("labels.email")}</label><input id="f-email" name="email" type="email" placeholder={t("placeholders.email")} required className={fieldCls} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        <div className="flex flex-col gap-2"><label htmlFor="f-wpp" className={labelCls}>{t("labels.whatsapp")}</label><input id="f-wpp" name="whatsapp" type="tel" placeholder={t("placeholders.whatsapp")} className={fieldCls} /></div>
        <div className="flex flex-col gap-2"><label htmlFor="f-tipo" className={labelCls}>{t("labels.tipo")}</label>
          <select id="f-tipo" name="tipo" className={`${fieldCls} appearance-none cursor-pointer pr-7`}
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239AA3A4' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
              backgroundSize: "14px",
            }}>
            {tipoKeys.map((k) => <option key={k} value={t(`tipos.${k}`)} className="text-[#15282c]">{t(`tipos.${k}`)}</option>)}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2"><label htmlFor="f-msg" className={labelCls}>{t("labels.mensagem")}</label><textarea id="f-msg" name="mensagem" rows={2} placeholder={t("placeholders.mensagem")} className={`${fieldCls} resize-y min-h-[70px]`} /></div>
      <div className="mt-2 flex items-center gap-5 flex-wrap">
        <Button type="submit" variant="light" arrow disabled={sending}>{sending ? t("sending") : t("submit")}</Button>
        <span className="text-[12px] text-on-dark-2 max-w-[220px] leading-[1.4]">{t("consent")}</span>
      </div>
      {status === "error" && (
        <p role="alert" className="text-[13px] leading-[1.5] text-[#e8896f]">{t("erro")}</p>
      )}
    </form>
  );
}
