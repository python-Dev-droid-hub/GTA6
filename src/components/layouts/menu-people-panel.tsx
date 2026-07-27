"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  rosterCharacters,
  type RosterCharacter,
} from "@/data/roster-characters";
import { cn } from "@/utils/cn";

type MenuPeoplePanelProps = {
  characters?: RosterCharacter[];
  onBack: () => void;
  closeButton: ReactNode;
  footer?: ReactNode;
};

/**
 * Characters submenu — hover preview, click name → detail page.
 */
export function MenuPeoplePanel({
  characters = rosterCharacters,
  onBack,
  closeButton,
  footer,
}: MenuPeoplePanelProps) {
  const [activeSlug, setActiveSlug] = useState(
    characters[0]?.slug ?? "",
  );
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const active =
    characters.find((c) => c.slug === activeSlug) ?? characters[0] ?? null;

  const onFail = useCallback((slug: string) => {
    setFailed((prev) => (prev[slug] ? prev : { ...prev, [slug]: true }));
  }, []);

  const assetKey = characters.map((c) => c.imageSrc).join("|");
  useEffect(() => {
    setFailed({});
  }, [assetKey]);

  return (
    <div className="absolute inset-0 grid h-dvh max-h-dvh grid-rows-[minmax(36dvh,42dvh)_minmax(0,1fr)] overflow-hidden lg:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.95fr)] lg:grid-rows-none">
      <aside className="relative min-h-0 overflow-hidden bg-[#12121e] lg:h-full">
        {active && !failed[active.slug] ? (
          <Image
            key={`${active.slug}:${active.imageSrc}`}
            src={active.imageSrc}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 1023px) 100vw, 60vw"
            className="object-cover object-center lg:object-[center_22%]"
            onError={() => onFail(active.slug)}
          />
        ) : (
          <div className="absolute inset-0 bg-[#12121e]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a14] via-transparent to-transparent lg:hidden" />
      </aside>

      <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden bg-[#080a14] lg:border-l lg:border-white/5">
        <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className={cn(
                "inline-flex items-center gap-2 font-[family-name:var(--font-family-orbitron)]",
                "text-[13px] uppercase tracking-[0.14em] text-white/90",
                "transition-colors hover:text-white",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
              )}
            >
              <span aria-hidden className="text-base leading-none">
                ←
              </span>
              Back
            </button>
            <span className="h-4 w-px bg-white/35" aria-hidden />
            <span className="font-[family-name:var(--font-family-orbitron)] text-[13px] uppercase tracking-[0.14em] text-white">
              Characters
            </span>
          </div>
          {closeButton}
        </div>

        <nav
          aria-label="Characters"
          data-lenis-prevent
          data-lenis-prevent-wheel
          className={cn(
            "menu-people-scroll min-h-0 flex-1",
            "overflow-x-hidden overflow-y-auto overscroll-contain",
            "px-5 py-2 sm:px-8 sm:py-3",
          )}
        >
          <ul className="flex flex-col gap-1 py-4 sm:gap-1.5 sm:py-6">
            {characters.map((c) => {
              const isActive = active?.slug === c.slug;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/characters/${c.slug}`}
                    className={cn(
                      "site-menu-link block w-full text-left",
                      "py-1.5 sm:py-2",
                      "font-[family-name:var(--font-family-display)] font-bold uppercase",
                      "text-[clamp(1.75rem,4vw,3.1rem)] leading-[0.95] tracking-[0.02em]",
                      "transition-cinema focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                      isActive
                        ? "site-menu-link--active"
                        : "site-menu-link--idle",
                    )}
                    onMouseEnter={() => setActiveSlug(c.slug)}
                    onFocus={() => setActiveSlug(c.slug)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {c.listName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {footer ? <div className="shrink-0">{footer}</div> : null}
      </div>
    </div>
  );
}
