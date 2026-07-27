"use client";

import Image from "next/image";
import type { VintagePackPanel } from "@/data/vintage-city-park";

/**
 * Last chapter — diagonal title | full-bleed landscape pack plate.
 * Landscape key art uses object-cover so it fills the right frame.
 */
export function VintagePackPanelView({ panel }: { panel: VintagePackPanel }) {
  return (
    <article
      className="vintage-panel relative flex h-dvh w-screen shrink-0 overflow-hidden bg-ink-950"
      aria-labelledby={`${panel.id}-title`}
    >
      <div className="vintage-pack-title relative z-10 flex h-full w-[min(42vw,28rem)] shrink-0 flex-col items-center justify-center px-6 text-center sm:w-[38%] md:w-[34%]">
        <h2
          id={`${panel.id}-title`}
          className="flex flex-col items-center font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold uppercase leading-[0.88] tracking-[0.06em] text-white"
        >
          <span className="vintage-bonuses-welcome">{panel.lineTop}</span>
          <span className="vintage-neon-script vintage-neon-script--underline relative my-1 text-[clamp(2.5rem,6.5vw,5rem)] normal-case tracking-normal">
            {panel.scriptTitle}
          </span>
          <span className="vintage-bonuses-welcome">{panel.lineBottom}</span>
        </h2>
      </div>

      <div className="relative z-0 min-w-0 flex-1 self-stretch overflow-hidden bg-ink-950">
        <Image
          src={panel.image.src}
          alt={panel.image.alt}
          fill
          loading="lazy"
          quality={100}
          unoptimized
          className="vintage-pack-art h-full w-full object-contain object-center"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
      </div>
    </article>
  );
}
