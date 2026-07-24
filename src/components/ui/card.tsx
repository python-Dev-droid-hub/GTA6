import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * Why cards exist: only as interactive / media containers (architecture rule).
 * Prefer open sections for marketing copy; use Card when the surface is clickable
 * or holds media chrome.
 */
const cardVariants = cva("transition-cinema", {
  variants: {
    variant: {
      solid:
        "rounded-lg border border-border bg-surface text-paper shadow-md",
      elevated:
        "rounded-lg border border-border-strong bg-surface-elevated text-paper shadow-lg",
      outline:
        "rounded-lg border border-border-strong bg-transparent text-paper",
      media:
        "group relative overflow-hidden rounded-lg border border-border bg-ink-900",
      neon: "rounded-lg border border-vice-pink/30 bg-surface shadow-glow-pink",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "solid",
    padding: "md",
  },
});

export type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export function Card({
  className,
  variant,
  padding,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-3 flex flex-col gap-2", className)} {...props} />
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg tracking-[0.08em] text-paper", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-paper-muted leading-relaxed", className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm text-paper-muted", className)} {...props} />;
}

export { cardVariants };
