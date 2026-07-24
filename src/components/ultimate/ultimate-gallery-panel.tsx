"use client";

import { cn } from "@/utils/cn";
import { UltimateMediaCard } from "@/components/ultimate/ultimate-media-card";
import type { UltimateGalleryPanel } from "@/data/ultimate-edition";

export type UltimateGalleryPanelViewProps = {
  panel: UltimateGalleryPanel;
  className?: string;
  onExpand?: (id: string) => void;
  centerCopy?: {
    label: string;
    title: string;
    body: string;
  };
};

const STAGGER_4 = ["a", "b", "c", "d"] as const;
const STAGGER_3 = ["a", "b", "d"] as const;
const STAGGER_2 = ["b", "d"] as const;

function staggerFor(count: number, index: number) {
  const map = count >= 4 ? STAGGER_4 : count === 3 ? STAGGER_3 : STAGGER_2;
  return map[index % map.length] ?? "b";
}

/**
 * Gaming HUD gallery — neon frames, light stagger, hover glow.
 */
export function UltimateGalleryPanelView({
  panel,
  className,
  onExpand,
  centerCopy,
}: UltimateGalleryPanelViewProps) {
  const mid = Math.floor((panel.items.length - 1) / 2);
  const count = panel.items.length;

  return (
    <article
      className={cn(
        "ultimate-panel relative flex h-dvh w-screen shrink-0 snap-start items-center justify-center overflow-hidden",
        "bg-[#0a0612]",
        className,
      )}
      aria-label="Media gallery"
    >
      {/* Subtle HUD grid */}
      <div className="ultimate-hud-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="ultimate-hud-row relative z-[1] flex h-[min(78dvh,660px)] w-full max-w-6xl items-start gap-3 px-6 md:gap-3.5 md:px-10 lg:px-14">
        {panel.items.map((item, i) => (
          <div key={item.id} className="contents">
            {centerCopy && i === mid ? (
              <div className="flex w-[min(22vw,14rem)] shrink-0 flex-col justify-center self-center border-l border-[#7ef9ff]/25 px-3 md:w-[min(24vw,16rem)]">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[#f2a0b8]">
                  {centerCopy.label}
                </p>
                <h3 className="mt-2 font-display text-xl uppercase leading-tight tracking-[0.04em] text-[#f3e8d0] md:text-2xl lg:text-3xl">
                  {centerCopy.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  {centerCopy.body}
                </p>
              </div>
            ) : null}
            <UltimateMediaCard
              item={item}
              index={i}
              stagger={staggerFor(count, i)}
              onExpand={onExpand}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
