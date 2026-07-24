import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type GlassProps = HTMLAttributes<HTMLDivElement> & {
  strength?: "default" | "strong";
  radius?: "md" | "lg" | "xl";
};

/**
 * Why utility component: glass is a repeated AAA chrome pattern (nav, overlays).
 * Encodes blur + film border so call sites stay class-light.
 */
export function Glass({
  strength = "default",
  radius = "lg",
  className,
  ...props
}: GlassProps) {
  return (
    <div
      className={cn(
        strength === "strong" ? "glass-strong" : "glass",
        radius === "md" && "rounded-md",
        radius === "lg" && "rounded-lg",
        radius === "xl" && "rounded-xl",
        className,
      )}
      {...props}
    />
  );
}
