import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> &
  Pick<ButtonProps, "variant" | "size"> & {
    className?: string;
  };

/** Why: CTAs need navigation semantics (Link) with Button visual variants. */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
