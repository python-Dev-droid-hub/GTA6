"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { motion as motionTokens } from "@/constants/design";
import { cn } from "@/utils/cn";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

/**
 * Why isolated client island: Framer only — sections stay server components
 * and wrap content with this leaf when enter motion is needed.
 */
export function FadeIn({
  className,
  delay = 0,
  children,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: motionTokens.duration.base,
        delay,
        ease: motionTokens.ease.out,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
