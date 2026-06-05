"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const fieldCls =
  "bg-white/[.035] border border-white/12 px-[15px] py-[13px] text-[15px] text-white outline-none transition-[background-color,border-color] duration-300 focus:bg-white/[.06] focus:border-green placeholder:text-white/30";
const labelCls = "text-[10px] tracking-[.16em] uppercase text-white/42";

export function ContatoForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div role="status" className="border border-white/16 bg-white/[.035] p-[clamp(28px,4vw,44px)]">
        <Icon name="check" />
        <h3 className="font-sans font-semibold text-[23px] mt-[18px] mb-[8px] text-white tracking-[-.02em]">Mensagem recebida.</h3>
        <p className="text-white/68 m-0 leading-[1.6]">A equipe da Open Group faz a primeira leitura e retorna com os próximos passos.</p>
      </div>
    );
  }
  return (
    <form
      aria-label="Formulário de contato"
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="relative border border-white/16 bg-white/[.035] p-[clamp(24px,3.5vw,42px)] shadow-[0_28px_90px_-50px_rgba(0,0,0,.75)] backdrop-blur-[10px]"
    >
      <div className="mb-[30px] flex items-start justify-between gap-6 border-b border-white/12 pb-[24px]">
        <div>
          <div className="text-[10px] tracking-[.18em] uppercase text-green">Brief inicial</div>
          <h3 className="mt-3 mb-0 font-news text-[clamp(1.65rem,2.4vw,2.45rem)] font-normal leading-[1.08] text-white">
            O que você quer desenvolver?
          </h3>
        </div>
        <span className="hidden sm:inline-flex h-10 w-10 items-center justify-center border border-white/14 text-[11px] text-white/44">
          OG
        </span>
      </div>
      <div className="grid gap-[18px]">
        <div className="flex flex-col gap-2">
          <label htmlFor="f-nome" className={labelCls}>Nome</label>
          <input id="f-nome" type="text" placeholder="Seu nome completo" required className={fieldCls} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="f-empresa" className={labelCls}>Empresa</label>
            <input id="f-empresa" type="text" placeholder="Empresa, fundo ou origem" className={fieldCls} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="f-email" className={labelCls}>E-mail</label>
            <input id="f-email" type="email" placeholder="voce@empresa.com" required className={fieldCls} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="f-wpp" className={labelCls}>WhatsApp</label>
            <input id="f-wpp" type="tel" placeholder="+55 11 90000-0000" className={fieldCls} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="f-tipo" className={labelCls}>Tipo de oportunidade</label>
            <select
              id="f-tipo"
              className={`${fieldCls} appearance-none cursor-pointer pr-9`}
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239AA3A4' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                backgroundSize: "14px",
              }}
            >
              {["Terreno ou ativo", "Projeto em concepção", "Parceria", "Investimento", "Imprensa", "Outro"].map((option) => (
                <option key={option} className="text-[#15282c]">{option}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="f-msg" className={labelCls}>Contexto</label>
          <textarea
            id="f-msg"
            rows={5}
            placeholder="Localização, estágio, potencial, restrições, expectativa de parceria..."
            className={`${fieldCls} resize-y min-h-[132px] leading-[1.5]`}
          />
        </div>
        <div className="mt-[10px] flex items-center gap-5 flex-wrap">
          <Button type="submit" variant="light" arrow>Enviar brief</Button>
          <span className="text-[12px] text-white/42 max-w-[260px] leading-[1.45]">A primeira resposta prioriza aderência estratégica, não volume de informação.</span>
        </div>
      </div>
    </form>
  );
}
