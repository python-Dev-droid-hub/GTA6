"use client";

import Image from "next/image";
import type { VintageWeaponsPanel } from "@/data/vintage-city-park";
import { VintageExpandButton } from "./vintage-expand-button";

/**
 * Fourth chapter — portrait | white Weapon Pattern copy | weapons plate.
 */
export function VintageWeaponsPanelView({
  panel,
  onExpand,
}: {
  panel: VintageWeaponsPanel;
  onExpand?: (src: string, alt: string) => void;
}) {
  return (
    <article
      className="vintage-panel relative flex h-dvh w-screen shrink-0 overflow-hidden bg-white"
      aria-labelledby={`${panel.id}-title`}
    >
      <div className="relative h-full w-[34%] min-w-0 overflow-hidden bg-ink-950">
        <Image
          src={panel.left.src}
          alt={panel.left.alt}
          fill
          quality={100}
          unoptimized
          className="object-cover object-center"
          sizes="35vw"
        />
        <VintageExpandButton
          tone="pink"
          label={`Expand ${panel.left.alt}`}
          onClick={() => onExpand?.(panel.left.src, panel.left.alt)}
        />
      </div>

      <div className="flex h-full w-[32%] min-w-[200px] flex-col items-center justify-center bg-white px-5 text-center md:px-8">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[#ff4fa3] md:text-xs">
          {panel.label}
        </p>
        <h2
          id={`${panel.id}-title`}
          className="mt-3 max-w-[16rem] font-display text-[clamp(1.5rem,2.6vw,2.65rem)] uppercase leading-[0.95] tracking-[0.05em] text-[#1a1630]"
        >
          {panel.title}
        </h2>
        <p className="mt-5 max-w-[17rem] text-sm leading-relaxed text-[#2a2548]/85 md:text-[0.95rem]">
          {panel.body}
        </p>
      </div>

      <div className="relative h-full w-[34%] min-w-0 overflow-hidden bg-ink-950">
        <Image
          src={panel.right.src}
          alt={panel.right.alt}
          fill
          quality={100}
          unoptimized
          className="object-cover object-center"
          sizes="35vw"
        />
        <VintageExpandButton
          label={`Expand ${panel.right.alt}`}
          onClick={() => onExpand?.(panel.right.src, panel.right.alt)}
        />
      </div>
    </article>
  );
}
