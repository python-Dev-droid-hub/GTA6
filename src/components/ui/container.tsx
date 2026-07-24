import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { spacing } from "@/constants/design";

const sizes = {
  narrow: "container-narrow",
  content: "container-content",
  wide: "container-wide",
  full: "container-full",
} as const;

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: keyof typeof sizes;
  /** Apply horizontal page gutters */
  gutters?: boolean;
};

/** Why server: layout-only wrapper; no browser APIs. */
export function Container({
  size = "wide",
  gutters = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        sizes[size],
        gutters && spacing.gutterX,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
