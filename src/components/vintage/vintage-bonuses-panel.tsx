"use client";

import Image from "next/image";
import type { VintageBonusesPanel } from "@/data/vintage-city-park";
import { VintageExpandButton } from "./vintage-expand-button";

/**
 * First chapter — 50/50: Ocean View plate | dark Pre-Order Bonuses lockup.
 */
export function VintageBonusesPanelView({
  panel,
  onExpand,
}: {
  panel: VintageBonusesPanel;
  onExpand?: (src: string, alt: string) => void;
}) {
  const titleParts = panel.titleLine.split(" ");
  const titleTop = titleParts[0] ?? "Welcome";
  const titleBottom = titleParts.slice(1).join(" ") || "Back To";

  return (
    <article
      className="vintage-panel relative flex h-dvh w-screen shrink-0 overflow-hidden bg-ink-950"
      aria-labelledby={`${panel.id}-title`}
    >
      <div className="relative h-full w-1/2 min-w-0 overflow-hidden">
        <Image
          src={panel.image.src}
          alt={panel.image.alt}
          fill
          priority
          quality={100}
          unoptimized
          className="object-cover object-[40%_center]"
          sizes="50vw"
        />
        <VintageExpandButton
          tone="pink"
          label={`Expand ${panel.image.alt}`}
          onClick={() => onExpand?.(panel.image.src, panel.image.alt)}
        />
      </div>

      <div className="vintage-bonuses-copy relative flex h-full w-1/2 flex-col items-center justify-center px-8 text-center md:px-12 lg:px-16">
        <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#00e5ef] md:text-xs">
          {panel.label}
        </p>

        <h2
          id={`${panel.id}-title`}
          className="vintage-bonuses-welcome mt-5 font-display text-[clamp(2rem,4vw,3.75rem)] font-bold uppercase leading-[0.9] tracking-[0.04em] text-white"
        >
          <span className="block">{titleTop}</span>
          <span className="block">{titleBottom}</span>
        </h2>

        <p className="vintage-neon-script vintage-neon-script--underline relative -mt-2 text-[clamp(2.75rem,5.5vw,4.75rem)] leading-none">
          {panel.scriptTitle}
        </p>

        <p className="mt-8 max-w-[22rem] text-[0.85rem] leading-relaxed text-white md:max-w-[26rem] md:text-[0.95rem]">
          {panel.body}
        </p>
      </div>
    </article>
  );
}
