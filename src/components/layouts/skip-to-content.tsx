import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type SkipToContentProps = HTMLAttributes<HTMLAnchorElement> & {
  targetId?: string;
  label?: string;
};

/** First focusable control for keyboard users — visually hidden until focused. */
export function SkipToContent({
  targetId = "after-hero",
  label = "Skip to content",
  className,
  ...props
}: SkipToContentProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]",
        "focus:rounded-md focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-sm focus:text-paper",
        "focus:outline-2 focus:outline-offset-2 focus:outline-ring",
        className,
      )}
      {...props}
    >
      {label}
    </a>
  );
}
