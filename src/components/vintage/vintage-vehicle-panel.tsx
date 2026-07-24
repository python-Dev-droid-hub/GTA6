"use client";

import Image from "next/image";
import type { VintageVehiclePanel } from "@/data/vintage-city-park";
import { VintageExpandButton } from "./vintage-expand-button";

/**
 * Second chapter — 50/50: vehicle plate | white Vehicle & Garage copy.
 */
export function VintageVehiclePanelView({
  panel,
  onExpand,
}: {
  panel: VintageVehiclePanel;
  onExpand?: (src: string, alt: string) => void;
}) {
  return (
    <article
      className="vintage-panel relative flex h-dvh w-screen shrink-0 overflow-hidden bg-white"
      aria-labelledby={`${panel.id}-title`}
    >
      <div className="relative h-full w-1/2 min-w-0 overflow-hidden bg-ink-950">
        <Image
          src={panel.image.src}
          alt={panel.image.alt}
          fill
          quality={100}
          unoptimized
          className="object-cover object-center"
          sizes="50vw"
        />
        <VintageExpandButton
          tone="pink"
          label={`Expand ${panel.image.alt}`}
          onClick={() => onExpand?.(panel.image.src, panel.image.alt)}
        />
      </div>

      <div className="flex h-full w-1/2 flex-col items-center justify-center bg-white px-8 text-center md:px-12 lg:px-16">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[#ff4fa3] md:text-xs">
          {panel.label}
        </p>
        <h2
          id={`${panel.id}-title`}
          className="mt-3 max-w-md font-display text-[clamp(1.75rem,3.2vw,3.25rem)] uppercase leading-[0.95] tracking-[0.05em] text-[#1a1630]"
        >
          {panel.title}
        </h2>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#3a3558] md:max-w-md md:text-base">
          {panel.body}
        </p>
      </div>
    </article>
  );
}
