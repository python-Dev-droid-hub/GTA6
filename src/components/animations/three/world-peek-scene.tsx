"use client";

import dynamic from "next/dynamic";
import { cn } from "@/utils/cn";

const NeonOrbScene = dynamic(
  () =>
    import("@/components/animations/three/neon-orb-scene").then(
      (m) => m.NeonOrbScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-square w-full animate-pulse rounded-lg border border-border bg-ink-900" />
    ),
  },
);

export type WorldPeekSceneProps = {
  className?: string;
};

/** Dynamic R3F island for world / story surfaces. */
export function WorldPeekScene({ className }: WorldPeekSceneProps) {
  return (
    <div className={cn("relative", className)}>
      <NeonOrbScene />
    </div>
  );
}
