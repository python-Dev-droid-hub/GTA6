import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/format-date";
import { spacing } from "@/constants/design";
import { cn } from "@/utils/cn";

export type ContentHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  coverSrc?: string;
  coverAlt?: string;
  className?: string;
};

export function ContentHero({
  eyebrow,
  title,
  description,
  meta,
  coverSrc,
  coverAlt = "",
  className,
}: ContentHeroProps) {
  return (
    <header className={cn("relative overflow-hidden bg-ink-950", className)}>
      {coverSrc ? (
        <div className="absolute inset-0">
          <Image
            src={coverSrc}
            alt={coverAlt}
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-ink" />
        </div>
      ) : null}
      <Container size="wide" className={cn("relative", spacing.sectionYTight)}>
        {eyebrow ? <Badge variant="cyan" className="mb-4">{eyebrow}</Badge> : null}
        <h1 className="max-w-4xl font-display text-3xl uppercase tracking-[0.06em] text-paper sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="text-lead mt-4 max-w-2xl">{description}</p>
        ) : null}
        {meta ? <div className="mt-6 flex flex-wrap gap-3">{meta}</div> : null}
      </Container>
    </header>
  );
}

export function ArticleMeta({
  date,
  tag,
  readingMinutes,
}: {
  date: string;
  tag: string;
  readingMinutes?: number;
}) {
  return (
    <>
      <Badge variant="pink">{tag}</Badge>
      <time
        dateTime={date}
        className="font-mono text-xs uppercase tracking-[0.2em] text-paper-faint"
      >
        {formatDate(date)}
      </time>
      {readingMinutes ? (
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">
          {readingMinutes} min read
        </span>
      ) : null}
    </>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan transition-cinema hover:text-paper"
    >
      ← {label}
    </Link>
  );
}
