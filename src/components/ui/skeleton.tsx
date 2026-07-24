import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/** Loading placeholder — respects reduced motion via global CSS. */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-ink-700/80",
        className,
      )}
      {...props}
    />
  );
}
