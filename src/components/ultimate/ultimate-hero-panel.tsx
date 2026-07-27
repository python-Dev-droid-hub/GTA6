"use client";

import Image from "next/image";
import { cn } from "@/utils/cn";
import type { UltimateHeroPanel } from "@/data/ultimate-edition";

export type UltimateHeroPanelViewProps = {
  panel: UltimateHeroPanel;
  className?: string;
  onExpand?: () => void;
};

/**
 * Heroes: full-bleed panels (no side letterbox) so sections abut flush.
 * First section keeps split layout (image | plum copy).
 */
export function UltimateHeroPanelView({
  panel,
  className,
  onExpand,
}: UltimateHeroPanelViewProps) {
  if (panel.layout === "split") {
    return (
      <article
        className={cn(
          "ultimate-panel relative flex h-dvh w-screen shrink-0 snap-start overflow-hidden bg-[#1e1428]",
          className,
        )}
        aria-labelledby={`ultimate-${panel.id}-title`}
      >
        <div className="relative h-full w-[55%] min-w-[48%] shrink-0">
          <Image
            src={panel.imageSrc}
            alt={panel.imageAlt}
            fill
            loading="lazy"
            sizes="55vw"
            quality={100}
            unoptimized
            className="ultimate-hero-art object-cover object-center"
          />
          {onExpand ? (
            <button
              type="button"
              onClick={onExpand}
              className={cn(
                "absolute bottom-4 right-4 z-10 flex size-9 items-center justify-center rounded-full",
                "bg-[#3a2a55]/90 text-paper shadow-lg backdrop-blur-sm",
                "transition-cinema hover:bg-[#5a4080]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              )}
              aria-label={`Expand ${panel.imageAlt}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="M1 5V1h4M13 5V1H9M1 9v4h4M13 9v4H9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : null}
        </div>

        <div className="flex h-full w-[45%] min-w-[40%] flex-1 flex-col justify-center bg-[#1e1428] px-8 py-16 md:px-12 lg:px-16">
          <div className="max-w-md">
            <h2
              id={`ultimate-${panel.id}-title`}
              className="font-display text-2xl uppercase leading-[0.95] tracking-[0.05em] text-[#f3e8d0] sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {panel.title}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#f3e8d0]/90 md:text-base">
              {panel.body}
            </p>
            {panel.bodyExtra ? (
              <p className="mt-4 text-sm leading-relaxed text-[#f3e8d0]/90 md:text-base">
                {panel.bodyExtra}
              </p>
            ) : null}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "ultimate-panel relative h-dvh w-screen shrink-0 snap-start overflow-hidden bg-[#0a0612]",
        className,
      )}
      aria-labelledby={`ultimate-${panel.id}-title`}
    >
      {/* Full-bleed art — no centered stage / no black side gutters */}
      <Image
        src={panel.imageSrc}
        alt={panel.imageAlt}
        fill
        loading="lazy"
        sizes="100vw"
        quality={100}
        unoptimized
        className="ultimate-hero-art object-cover object-center"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(145deg, rgba(12,18,40,0.22) 0%, transparent 45%, rgba(42,18,48,0.2) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#12081c]/40 via-transparent to-[#0c1428]/18"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[48%] sm:w-[42%] md:w-[38%]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(18,12,36,0.25) 35%, rgba(28,14,42,0.62) 65%, rgba(16,8,32,0.88) 100%)",
        }}
        aria-hidden
      />

      <div
        className={cn(
          "absolute inset-y-0 right-0 z-[2] flex w-[min(48%,22rem)] flex-col justify-center",
          "sm:w-[min(42%,24rem)] md:w-[min(38%,26rem)]",
          "px-4 py-10 sm:px-6 md:px-8 lg:px-10",
        )}
      >
        <div className="ultimate-hero-copy relative">
          <p className="ultimate-hero-label font-mono text-[0.65rem] font-semibold uppercase tracking-[0.36em] sm:text-[0.7rem]">
            {panel.label}
          </p>
          <h2
            id={`ultimate-${panel.id}-title`}
            className="ultimate-hero-title mt-2 font-display text-2xl uppercase leading-[0.92] tracking-[0.04em] sm:mt-3 sm:text-3xl md:text-4xl lg:text-[2.65rem]"
          >
            {panel.title}
          </h2>
          <p className="ultimate-hero-body mt-3 max-w-[18rem] text-xs leading-relaxed sm:mt-4 sm:max-w-sm sm:text-sm md:text-[0.95rem]">
            {panel.body}
          </p>
        </div>
      </div>
    </article>
  );
}
