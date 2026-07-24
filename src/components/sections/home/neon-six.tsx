import { cn } from "@/utils/cn";

export type NeonSixProps = {
  className?: string;
};

/**
 * Illuminated acrylic “6” — typography chrome only (does not replace key art).
 */
export function NeonSix({ className }: NeonSixProps) {
  return (
    <div
      className={cn("hero-neon-six pointer-events-none select-none", className)}
      aria-hidden
    >
      <span className="hero-neon-six__bloom" />
      <span className="hero-neon-six__digit hero-neon-six__digit--fill">6</span>
      <span className="hero-neon-six__digit hero-neon-six__digit--rim">6</span>
      <span className="hero-neon-six__glass" />
      <span className="hero-neon-six__shimmer" />
    </div>
  );
}
