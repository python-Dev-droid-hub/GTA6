"use client";

import Image from "next/image";
import type { VintageGalleryPanel } from "@/data/vintage-city-park";
import { VintageExpandButton } from "./vintage-expand-button";

/**
 * Staggered 3-tile gallery — square top-left, wide bottom-left, tall right.
 */
export function VintageGalleryPanelView({
  panel,
  onExpand,
}: {
  panel: VintageGalleryPanel;
  onExpand?: (src: string, alt: string) => void;
}) {
  const [topLeft, bottomLeft, tallRight] = panel.items;

  return (
    <article
      className="vintage-panel flex h-dvh w-screen shrink-0 items-center justify-center overflow-hidden bg-white px-6 py-8 md:px-12 md:py-10"
      aria-label={panel.label}
    >
      <div className="grid h-full max-h-[90dvh] w-full max-w-[1100px] grid-cols-[1.05fr_0.95fr] grid-rows-[0.95fr_1.05fr] gap-3 md:gap-4">
        <figure className="relative col-start-1 row-start-1 overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem]">
          <Image
            src={topLeft.src}
            alt={topLeft.alt}
            fill
            loading="lazy"
            quality={100}
            unoptimized
            className="object-cover"
            sizes="40vw"
          />
          <VintageExpandButton
            label={`Expand ${topLeft.alt}`}
            onClick={() => onExpand?.(topLeft.src, topLeft.alt)}
          />
        </figure>

        <figure className="relative col-start-1 row-start-2 -mr-2 overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem]">
          <Image
            src={bottomLeft.src}
            alt={bottomLeft.alt}
            fill
            loading="lazy"
            quality={100}
            unoptimized
            className="object-cover object-center"
            sizes="45vw"
          />
          <VintageExpandButton
            label={`Expand ${bottomLeft.alt}`}
            onClick={() => onExpand?.(bottomLeft.src, bottomLeft.alt)}
          />
        </figure>

        <figure className="relative col-start-2 row-span-2 row-start-1 ml-1 overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem]">
          <Image
            src={tallRight.src}
            alt={tallRight.alt}
            fill
            loading="lazy"
            quality={100}
            unoptimized
            className="object-cover object-center"
            sizes="40vw"
          />
          <VintageExpandButton
            label={`Expand ${tallRight.alt}`}
            onClick={() => onExpand?.(tallRight.src, tallRight.alt)}
          />
        </figure>
      </div>
    </article>
  );
}
