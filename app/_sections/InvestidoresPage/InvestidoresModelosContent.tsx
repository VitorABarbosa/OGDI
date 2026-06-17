"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Kicker } from "@/components/ui/Kicker";
import { cn } from "@/lib/cn";

const groupKeys = ["capital", "desenvolvimento"] as const;
const itemKeys = {
  capital: ["scp", "permuta", "coinvest"],
  desenvolvimento: ["incorporadoras", "construtoras", "proprietarios"],
} as const;

type GroupKey = (typeof groupKeys)[number];

export function InvestidoresModelosContent() {
  const t = useTranslations("investidores.modelos");
  const [activeGroup, setActiveGroup] = useState<GroupKey>("capital");
  const activeItems = itemKeys[activeGroup];

  return (
    <>
      <div className="reveal flex flex-col gap-[clamp(28px,4vw,56px)] lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[820px]">
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-5 font-sans font-semibold text-[clamp(26px,3.2vw,44px)] leading-[1.08] tracking-[-.025em]">
            {t.rich("heading", { br: () => <br /> })}
          </h2>
        </div>

        <div
          className="reveal reveal-2 inline-grid w-full max-w-[680px] grid-cols-1 border border-[color:var(--line)] bg-white/55 p-1 sm:grid-cols-2"
          role="tablist"
          aria-label={t("groupSelectorLabel")}
        >
          {groupKeys.map((group) => {
            const isActive = group === activeGroup;
            return (
              <button
                key={group}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={cn(
                  "min-h-11 px-4 text-center font-sans text-[11px] font-medium uppercase tracking-[.13em] transition-[background-color,color] duration-300 ease-brand",
                  isActive ? "bg-ink text-white" : "text-ink-2 hover:bg-white hover:text-ink",
                )}
                onClick={() => setActiveGroup(group)}
              >
                {t(`groups.${group}.label`)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[clamp(38px,5vw,72px)] grid grid-cols-1 gap-x-[clamp(48px,6vw,132px)] gap-y-[clamp(38px,5vw,64px)] md:grid-cols-3">
        {activeItems.map((key, i) => (
          <div
            key={`${activeGroup}-${key}`}
            className={`reveal reveal-${Math.min(i + 1, 5)} ${i === 1 ? "md:translate-y-[clamp(18px,2.4vw,38px)]" : ""} ${i === 2 ? "md:translate-y-[clamp(36px,4.8vw,76px)]" : ""}`}
          >
            <span className="block font-news text-[clamp(2.6rem,4.8vw,4.4rem)] leading-none tracking-[-.03em] text-teal">
              {t(`groups.${activeGroup}.items.${key}.sigla`)}
            </span>
            <span className="mt-4 block h-px w-12 bg-green" />
            <h3 className="mt-5 font-sans font-semibold text-[clamp(17px,1.4vw,21px)] tracking-[-.015em] text-ink">
              {t(`groups.${activeGroup}.items.${key}.nome`)}
            </h3>
            <p className="mt-3 max-w-[40ch] text-[14.5px] leading-[1.62] text-ink-2">
              {t(`groups.${activeGroup}.items.${key}.desc`)}
            </p>
          </div>
        ))}
      </div>

      <p className="reveal mt-[clamp(46px,6vw,88px)] text-[12.5px] tracking-[.04em] text-ink-3">
        {t(`groups.${activeGroup}.footer`)}
      </p>
    </>
  );
}
