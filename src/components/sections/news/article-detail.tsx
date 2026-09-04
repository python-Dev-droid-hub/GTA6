import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Clock, CalendarDays, List, Newspaper } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getPublishedBlogPosts, type BlogPost } from "@/data/blog";
import type { ArticleFrontmatter, ArticleHeading } from "@/types/content";
import { formatDate } from "@/utils/format-date";
import { cn } from "@/utils/cn";

export type ArticleDetailProps = {
  slug: string;
  meta: ArticleFrontmatter;
  body: ReactNode;
  headings: ArticleHeading[];
  readingMinutes: number;
};

function ArticleToc({ headings }: { headings: ArticleHeading[] }) {
  const sections = headings.filter((h) => h.level === 2);
  if (!sections.length) return null;

  return (
    <nav
      aria-label="On this page"
      className="rounded-md border border-border bg-ink-900/80 p-5"
    >
      <p className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">
        <List className="size-3.5" aria-hidden />
        On this page
      </p>
      <ol className="space-y-2.5">
        {sections.map((heading, index) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="group flex gap-3 text-[13px] leading-snug text-paper-muted transition-colors hover:text-paper"
            >
              <span className="font-mono text-[10px] tabular-nums text-paper-faint group-hover:text-vice-pink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">{heading.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function LatestBlogs({
  posts,
}: {
  posts: BlogPost[];
}) {
  if (!posts.length) return null;

  return (
    <section
      aria-labelledby="latest-blogs-heading"
      className="rounded-md border border-border bg-ink-900/80 p-5"
    >
      <p
        id="latest-blogs-heading"
        className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-vice-pink"
      >
        <Newspaper className="size-3.5" aria-hidden />
        Latest Blogs
      </p>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/news/${post.slug}`}
              className="group flex gap-3 transition-colors"
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-sm border border-border bg-ink-800">
                <Image
                  src={post.coverSrc}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="56px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 text-[13px] leading-snug text-paper-muted transition-colors group-hover:text-paper">
                  {post.title}
                </span>
                <time
                  dateTime={post.date}
                  className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-paper-faint"
                >
                  {formatDate(post.date, "en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/news"
        className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-neon-cyan transition-colors hover:text-paper"
      >
        View all →
      </Link>
    </section>
  );
}

function GuideChecklist({ headings }: { headings: ArticleHeading[] }) {
  const sections = headings.filter((h) => h.level === 2);
  if (sections.length < 3) return null;

  return (
    <aside
      aria-label="Guide checklist"
      className="mb-10 rounded-md border border-vice-pink/35 bg-gradient-to-br from-ink-800/90 to-ink-900/90 p-5 sm:p-6"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-vice-pink">
        Quick checklist
      </p>
      <p className="mt-1 text-sm text-paper-muted">
        Work through these steps before launch day.
      </p>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2">
        {sections.map((heading, index) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="flex items-start gap-3 rounded-sm border border-border/80 bg-ink-950/50 px-3 py-2.5 text-[13px] text-paper transition-colors hover:border-neon-cyan/40 hover:bg-ink-800"
            >
              <span className="mt-0.5 font-mono text-[10px] text-neon-cyan">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug">{heading.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

/**
 * Editorial article shell: breadcrumb, hero cover, checklist, sticky TOC, prose.
 * Why a dedicated layout: thin page.tsx stays composition-only; reading UX is shared.
 */
export function ArticleDetail({
  slug,
  meta,
  body,
  headings,
  readingMinutes,
}: ArticleDetailProps) {
  const sectionCount = headings.filter((h) => h.level === 2).length;
  const hasToc = sectionCount > 0;
  const latestPosts = getPublishedBlogPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, 4);
  const showSidebar = hasToc || latestPosts.length > 0;

  return (
    <div className="relative isolate bg-ink-950">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(255,45,111,0.12),transparent_55%)]"
        aria-hidden
      />

      <Container size="content" className="relative pt-6 sm:pt-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-faint">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-neon-cyan"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/news"
                className="transition-colors hover:text-neon-cyan"
              >
                News
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="max-w-[16rem] truncate text-paper-muted sm:max-w-md">
              {meta.title}
            </li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            {meta.category ? (
              <Badge variant="cyan">{meta.category}</Badge>
            ) : null}
            <Badge variant="pink">{meta.tag}</Badge>
          </div>

          <h1 className="mt-5 font-display text-[clamp(1.85rem,5vw,3.35rem)] uppercase leading-[0.95] tracking-[0.04em] text-paper">
            {meta.title}
          </h1>

          {meta.description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper-muted sm:text-lg">
              {meta.description}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-faint">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-3.5 text-vice-pink" aria-hidden />
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-3.5 text-neon-cyan" aria-hidden />
              {readingMinutes} min read
            </span>
            {sectionCount > 0 ? (
              <span>{sectionCount} sections</span>
            ) : null}
          </div>
        </header>
      </Container>

      <Container size="content" className="relative mt-8 sm:mt-10">
        <figure className="overflow-hidden rounded-md border border-border bg-ink-900 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-[16/9] sm:aspect-[2/1]">
            <Image
              src={meta.cover}
              alt={meta.coverAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
          {meta.coverAlt ? (
            <figcaption className="border-t border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint sm:px-5">
              {meta.coverAlt}
            </figcaption>
          ) : null}
        </figure>
      </Container>

      <Container size="content" className="relative pb-16 pt-10 sm:pb-24 sm:pt-12">
        <div
          className={cn(
            "gap-10 lg:gap-14",
            showSidebar
              ? "lg:grid lg:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)]"
              : "",
          )}
        >
          {showSidebar ? (
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-5">
                <ArticleToc headings={headings} />
                <LatestBlogs posts={latestPosts} />
              </div>
            </aside>
          ) : null}

          <div className="min-w-0 max-w-3xl">
            <GuideChecklist headings={headings} />

            {/* Mobile: latest blogs above body when sidebar is hidden */}
            <div className="mb-10 lg:hidden">
              <LatestBlogs posts={latestPosts} />
            </div>

            <article className="article-body">{body}</article>

            {meta.keywords?.length ? (
              <footer className="mt-14 border-t border-border pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-faint">
                  Topics
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {meta.keywords.map((keyword) => (
                    <li key={keyword}>
                      <span className="inline-flex rounded-sm border border-border bg-ink-900 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-muted">
                        {keyword}
                      </span>
                    </li>
                  ))}
                </ul>
              </footer>
            ) : null}

            <div className="mt-12 border-t border-border pt-8">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan transition-colors hover:text-paper"
              >
                <ArrowLeft className="size-3.5" aria-hidden />
                All news
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
