import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { NewsArticlePreview } from "@/data/news";
import { formatDate } from "@/utils/format-date";
import { cn } from "@/utils/cn";

export type ArticleCardProps = {
  article: NewsArticlePreview;
  className?: string;
};

/** Interactive news surface — Link wraps media card for a11y. */
export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <article className={cn("h-full", className)}>
      <Link
        href={`/news/${article.slug}`}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface",
          "transition-cinema hover:border-vice-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        )}
      >
        <span className="relative aspect-[16/10] overflow-hidden bg-ink-900">
          <Image
            src={article.coverSrc}
            alt={article.coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-cinema group-hover:scale-[1.04]"
          />
        </span>
        <span className="flex flex-1 flex-col gap-3 p-5">
          <span className="flex items-center gap-3">
            <Badge variant="cyan">{article.tag}</Badge>
            <time
              dateTime={article.date}
              className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-faint"
            >
              {formatDate(article.date)}
            </time>
          </span>
          <h3 className="font-display text-xl uppercase tracking-[0.08em] text-paper">
            {article.title}
          </h3>
          <p className="text-sm leading-relaxed text-paper-muted">
            {article.description}
          </p>
        </span>
      </Link>
    </article>
  );
}
