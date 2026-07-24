import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center font-mono text-[0.65rem] uppercase tracking-[0.22em] transition-cinema",
  {
    variants: {
      variant: {
        default: "border border-border bg-ink-700 text-paper-muted",
        pink: "border border-vice-pink/40 bg-vice-pink/15 text-vice-pink",
        cyan: "border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan",
        gold: "border border-gold/40 bg-gold/10 text-gold",
        outline: "border border-border-strong bg-transparent text-paper",
      },
      size: {
        sm: "rounded-sm px-2 py-0.5",
        md: "rounded-md px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { badgeVariants };
