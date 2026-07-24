import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/utils/cn";

export type IconProps = LucideProps & {
  icon: LucideIcon;
  label?: string;
};

/**
 * Why wrapper: consistent stroke + size for Lucide across AAA UI.
 * Decorative icons get aria-hidden; pass label for meaningful icons.
 */
export function Icon({
  icon: IconComponent,
  className,
  size = 20,
  strokeWidth = 1.75,
  label,
  ...props
}: IconProps) {
  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cn("shrink-0 text-current", className)}
      {...props}
    />
  );
}
