import { cn } from "@/utils/cn";

/**
 * CSS-only atmosphere — no canvas, no Three.
 * WebGL accents land in a later pass as a sibling layer above the poster.
 */
export function HeroAtmosphere({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
      aria-hidden
    >
      <div className="hero-overlay absolute inset-0" />
      <div className="hero-atmosphere-bloom absolute inset-0" />
      <div className="hero-atmosphere-grain absolute inset-0 opacity-[0.35] mix-blend-overlay" />
      <div className="hero-atmosphere-vignette absolute inset-0" />
    </div>
  );
}
