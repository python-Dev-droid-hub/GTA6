"use client";

import { BootLoader } from "@/components/animations/providers/boot-loader";
import { LenisProvider } from "@/providers/lenis-provider";
import { CustomCursor } from "@/components/animations/ui-motion/custom-cursor";
import { AmbientEffects } from "@/components/animations/ui-motion/ambient-effects";

/**
 * Marketing experience stack — boot, smooth scroll, cursor, ambience.
 * PageTransition lives in template.tsx so it remounts per navigation.
 */
export function ExperienceProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <BootLoader />
      <AmbientEffects />
      <CustomCursor />
      {children}
    </LenisProvider>
  );
}
