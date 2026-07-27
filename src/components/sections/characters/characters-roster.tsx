"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  rosterCharacters,
  type RosterCharacter,
} from "@/data/roster-characters";
import { cn } from "@/utils/cn";

type CharactersRosterProps = {
  characters?: RosterCharacter[];
  className?: string;
};

/**
 * Rockstar-style People roster: name list + hover portrait on the rest of the page.
 */
export function CharactersRoster({
  characters = rosterCharacters,
  className,
}: CharactersRosterProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(
    characters[0]?.slug ?? null,
  );
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const active =
    characters.find((c) => c.slug === activeSlug) ?? characters[0] ?? null;

  const onFail = useCallback((slug: string) => {
    setFailed((prev) => (prev[slug] ? prev : { ...prev, [slug]: true }));
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex bg-[#0c0c16] text-white",
        className,
      )}
      role="region"
      aria-label="Characters"
    >
      {/* Portrait — only load the active character (lazy on switch) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {active && !failed[active.slug] ? (
          <Image
            key={active.slug}
            src={active.imageSrc}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-[center_20%]"
            onError={() => onFail(active.slug)}
          />
        ) : (
          <div className="absolute inset-0 bg-[#12121e]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c16] via-[#0c0c16]/85 to-transparent md:via-[#0c0c16]/55 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c16]/70 via-transparent to-[#0c0c16]/25" />
      </div>

      {/* Left chrome */}
      <div className="relative z-10 flex h-full w-full max-w-[min(100%,28rem)] flex-col px-5 pt-6 sm:px-8 sm:pt-8 md:px-10">
        <header className="mb-10 flex items-center gap-3 sm:mb-14">
          <Link
            href="/"
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
          </Link>
          <span className="h-4 w-px bg-white/35" aria-hidden />
          <span className="font-[family-name:var(--font-family-orbitron)] text-[13px] uppercase tracking-[0.14em] text-white">
            Characters
          </span>
        </header>

        <nav aria-label="Character list" className="min-h-0 flex-1 overflow-y-auto pb-16">
          <ul className="flex flex-col gap-1 sm:gap-1.5">
            {characters.map((c) => {
              const isActive = active?.slug === c.slug;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/characters/${c.slug}`}
                    className={cn(
                      "block w-full text-left font-[family-name:var(--font-family-bebas)]",
                      "text-[clamp(1.65rem,4.2vw,2.65rem)] uppercase leading-[1.05] tracking-[0.02em]",
                      "transition-colors duration-200",
                      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6fb3]",
                      isActive
                        ? "characters-roster__name--active"
                        : "text-[#b8b8d1] hover:text-[#ff6fb3]",
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
      </div>
    </div>
  );
}
