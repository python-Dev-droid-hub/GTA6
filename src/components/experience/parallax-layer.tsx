"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/utils/cn";

export type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  /** Scroll progress for the parent section (0–1). */
  progress: MotionValue<number>;
  /** Map progress → translateY in % of viewport (e.g. [0,1] → [0,-12]). */
  yRange?: [number, number];
  /** Map progress → scale. */
  scaleRange?: [number, number];
};

/**
 * GPU parallax via transform only (will-change). Driven by Framer useScroll progress.
 */
export function ParallaxLayer({
  children,
  className,
  progress,
  yRange = [0, -12],
  scaleRange = [1, 1.06],
}: ParallaxLayerProps) {
  const y = useTransform(progress, [0, 1], yRange);
  const scale = useTransform(progress, [0, 1], scaleRange);

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      style={{ y, scale }}
    >
      {children}
    </motion.div>
  );
}

export type UseSectionProgressOptions = {
  /** Start/end offsets relative to viewport (Framer offset format). */
  offset?: NonNullable<
    Parameters<typeof useScroll>[0]
  >["offset"];
};

/** Bind scroll progress to a section element ref. */
export function useSectionProgress(
  target: React.RefObject<HTMLElement | null>,
  options?: UseSectionProgressOptions,
) {
  return useScroll({
    target,
    offset: options?.offset ?? ["start end", "end start"],
  });
}

export function useParallaxSectionRef<T extends HTMLElement>() {
  return useRef<T>(null);
}
