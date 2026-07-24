import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/** Why server: pure presentational control; magnetic/GSAP wrappers stay separate. */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-display uppercase tracking-[0.14em]",
    "transition-cinema select-none",
    "disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-vice-pink text-primary-foreground hover:bg-vice-pink-hot shadow-glow-pink",
        secondary:
          "bg-neon-cyan text-secondary-foreground hover:brightness-110 shadow-glow-cyan",
        outline:
          "border border-border-strong bg-transparent text-paper hover:border-vice-pink hover:text-vice-pink",
        ghost: "bg-transparent text-paper-muted hover:bg-ink-700 hover:text-paper",
        gradient:
          "bg-gradient-vice text-paper shadow-glow-pink hover:brightness-110",
        danger: "bg-blood text-paper hover:brightness-110",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-md",
        md: "h-11 px-6 text-sm rounded-md",
        lg: "min-h-12 px-8 text-base rounded-lg",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
