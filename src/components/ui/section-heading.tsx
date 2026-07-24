import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  headingId?: string;
};

/** Why server: typography block; motion added by parent animation island. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  headingId,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-neon-cyan">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={headingId} className="text-balance">
        {title}
      </h2>
      {description ? (
        <div className="text-lead max-w-2xl">{description}</div>
      ) : null}
    </div>
  );
}
