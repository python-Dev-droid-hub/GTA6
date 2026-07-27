"use client";

import Image from "next/image";
import { cn } from "@/utils/cn";
import type { UltimateGalleryItem } from "@/data/ultimate-edition";

export type UltimateMediaCardProps = {
  item: UltimateGalleryItem;
  className?: string;
  stagger?: "a" | "b" | "c" | "d";
  index?: number;
  onExpand?: (id: string) => void;
};

/**
 * Gaming HUD tile — neon frame, corner brackets, mild stagger.
 */
export function UltimateMediaCard({
  item,
  className,
  stagger = "b",
  index = 0,
  onExpand,
}: UltimateMediaCardProps) {
  const tag = String(index + 1).padStart(2, "0");

  return (
    <figure
      className={cn(
        "ultimate-hud-card group relative min-w-0 bg-[#0c0814]",
        `ultimate-hud-card--${stagger}`,
        className,
      )}
    >
      {/* Neon frame */}
      <span className="ultimate-hud-card__frame" aria-hidden />
      <span className="ultimate-hud-card__corner ultimate-hud-card__corner--tl" aria-hidden />
      <span className="ultimate-hud-card__corner ultimate-hud-card__corner--tr" aria-hidden />
      <span className="ultimate-hud-card__corner ultimate-hud-card__corner--bl" aria-hidden />
      <span className="ultimate-hud-card__corner ultimate-hud-card__corner--br" aria-hidden />

      <div className="ultimate-hud-card__media relative size-full overflow-hidden">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 80vw, 40vw"
          quality={100}
          unoptimized
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        <div className="ultimate-hud-card__scan" aria-hidden />
        <div className="ultimate-hud-card__vignette" aria-hidden />
      </div>

      <p className="ultimate-hud-card__tag pointer-events-none absolute left-2.5 top-2.5 z-10 font-mono text-[0.6rem] tracking-[0.28em] text-[#7ef9ff]/90">
        {tag}
      </p>

      <button
        type="button"
        onClick={() => onExpand?.(item.id)}
        className={cn(
          "ultimate-hud-card__expand absolute bottom-2.5 right-2.5 z-10 flex size-8 items-center justify-center",
          "transition-cinema",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
        aria-label={`Expand ${item.alt}`}
      >
        <span className="sr-only">Expand</span>
        <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden>
          <path
            d="M1 5V1h4M13 5V1H9M1 9v4h4M13 9v4H9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </figure>
  );
}
