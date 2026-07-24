"use client";

import { useId, useMemo, useState } from "react";
import {
  BookOpen,
  Crosshair,
  Gamepad2,
  Globe2,
  Joystick,
  Monitor,
  Newspaper,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import {
  faqCategories,
  getFaqItemsByCategory,
  type FaqCategoryId,
} from "@/data/faq";
import { cn } from "@/utils/cn";

const TAB_ICONS: Record<FaqCategoryId, LucideIcon> = {
  all: Crosshair,
  gameplay: Gamepad2,
  story: BookOpen,
  online: Globe2,
  pc: Monitor,
  console: Joystick,
  account: UserRound,
  news: Newspaper,
};

export function FaqTabs() {
  const baseId = useId();
  const [active, setActive] = useState<FaqCategoryId>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo(() => getFaqItemsByCategory(active), [active]);

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div
        role="tablist"
        aria-label="FAQ categories"
        className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
      >
        {faqCategories.map((tab) => {
          const Icon = TAB_ICONS[tab.id];
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`${baseId}-tab-${tab.id}`}
              onClick={() => {
                setActive(tab.id);
                setOpenId(null);
              }}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-md border px-3.5 py-2.5",
                "font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.18em] sm:text-[11px]",
                "transition-[border-color,box-shadow,color,background-color] duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fc3]",
                selected
                  ? "border-[#ff4fc3] bg-[#ff4fc3]/10 text-white shadow-[0_0_18px_rgba(255,79,195,0.45),inset_0_0_12px_rgba(255,79,195,0.12)]"
                  : "border-white/15 bg-transparent text-white/70 hover:border-[#5ad7ff]/55 hover:text-white",
              )}
            >
              <Icon
                className={cn(
                  "size-3.5 shrink-0",
                  selected ? "text-[#ff7ad9]" : "text-[#5ad7ff]/80",
                )}
                aria-hidden
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="flex flex-col gap-3.5"
      >
        {items.map((item) => {
          const panelId = `${baseId}-panel-${item.id}`;
          const buttonId = `${baseId}-button-${item.id}`;
          const open = openId === item.id;

          return (
            <div
              key={item.id}
              className={cn(
                "rounded-lg border border-[#ff4fc3]/75 bg-[#0a0814]/80",
                "shadow-[0_0_16px_rgba(255,45,111,0.22)]",
                "transition-[box-shadow,border-color] duration-200",
                open && "border-[#ff7ad9] shadow-[0_0_22px_rgba(255,79,195,0.38)]",
              )}
            >
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5 sm:py-[1.05rem]",
                    "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#ff4fc3]",
                  )}
                >
                  <span
                    className="mt-0.5 size-2.5 shrink-0 rotate-45 bg-[#ff4fc3] shadow-[0_0_10px_rgba(255,79,195,0.8)]"
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 break-words font-[family-name:var(--font-family-bebas)] text-[0.95rem] uppercase leading-tight tracking-[0.04em] text-white sm:text-[1.05rem] md:text-[1.2rem]">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 font-[family-name:var(--font-family-orbitron)] text-xl leading-none text-[#ff7ad9]",
                      "transition-transform duration-200",
                      open && "rotate-45",
                    )}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
                className="border-t border-[#ff4fc3]/25 px-4 pb-4 pt-0 sm:px-5 sm:pb-5"
              >
                {open ? (
                  <p className="pl-5 pt-3 text-[14px] leading-relaxed text-white/75 sm:pl-6 sm:text-[15px]">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
