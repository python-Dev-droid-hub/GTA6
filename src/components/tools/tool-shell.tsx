import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { spacing } from "@/constants/design";
import { cn } from "@/utils/cn";

export type ToolShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function ToolShell({
  eyebrow,
  title,
  description,
  children,
  className,
}: ToolShellProps) {
  return (
    <main className={cn(spacing.sectionY, className)}>
      <Container size="wide" className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="w-fit font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan hover:text-paper"
          >
            ← Tools hub
          </Link>
          <Badge variant="cyan" className="w-fit">
            {eyebrow}
          </Badge>
          <h1 className="max-w-3xl font-display text-3xl uppercase tracking-[0.06em] text-paper sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="text-lead max-w-2xl">{description}</p>
        </div>
        {children}
      </Container>
    </main>
  );
}
