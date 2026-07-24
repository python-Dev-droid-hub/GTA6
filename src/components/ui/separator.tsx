import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  tone?: "default" | "neon" | "strong";
};

export function Separator({
  orientation = "horizontal",
  tone = "default",
  className,
  ...props
}: SeparatorProps) {
  const toneClass =
    tone === "neon"
      ? "bg-gradient-neon-edge opacity-80"
      : tone === "strong"
        ? "bg-border-strong"
        : "bg-border";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        toneClass,
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
