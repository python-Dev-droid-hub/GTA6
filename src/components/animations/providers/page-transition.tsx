"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { motion as motionTokens } from "@/constants/design";

/**
 * Subtle route enter fade. Remount via marketing template.tsx.
 * Reduced motion → no animation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return children;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionTokens.duration.base,
        ease: motionTokens.ease.out,
      }}
    >
      {children}
    </motion.div>
  );
}
