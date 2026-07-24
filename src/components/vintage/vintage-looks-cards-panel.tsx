"use client";

import Image from "next/image";
import type { VintageLooksCardsPanel } from "@/data/vintage-city-park";
import { VintageExpandButton } from "./vintage-expand-button";

/**
 * Looks gallery — tall face crop | two rounded cards on white.
 */
export function VintageLooksCardsPanelView({
  panel,
  onExpand,
}: {
  panel: VintageLooksCardsPanel;
  onExpand?: (src: string, alt: string) => void;
}) {
  const [cardA, cardB] = panel.cards;

  return (
    <article
      className="vintage-panel flex h-dvh w-screen shrink-0 overflow-hidden bg-white"
      aria-label="Looks gallery"
    >
      <div className="relative h-full w-[42%] min-w-0 overflow-hidden bg-ink-950">
        <Image
          src={panel.hero.src}
          alt={panel.hero.alt}
          fill
          quality={100}
          unoptimized
          className="object-cover object-center"
          sizes="45vw"
        />
      </div>

      <div className="flex h-full w-[58%] items-center justify-center gap-4 bg-white px-6 md:gap-5 md:px-10">
        <figure className="relative aspect-square w-[44%] max-h-[58%] overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
          <Image
            src={cardB.src}
            alt={cardB.alt}
            fill
            quality={100}
            unoptimized
            className="object-cover"
            sizes="28vw"
          />
          <VintageExpandButton
            label={`Expand ${cardB.alt}`}
            onClick={() => onExpand?.(cardB.src, cardB.alt)}
          />
        </figure>
        <figure className="relative aspect-square w-[44%] max-h-[58%] overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
          <Image
            src={cardA.src}
            alt={cardA.alt}
            fill
            quality={100}
            unoptimized
            className="object-cover"
            sizes="28vw"
          />
          <VintageExpandButton
            label={`Expand ${cardA.alt}`}
            onClick={() => onExpand?.(cardA.src, cardA.alt)}
          />
        </figure>
      </div>
    </article>
  );
}
