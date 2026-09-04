"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  blogCategories,
  filterBlogPosts,
  getBlogFeatured,
  getBlogGridPosts,
  getPublishedBlogPosts,
  type BlogCategory,
  type BlogPost,
} from "@/data/blog";
import { formatDate } from "@/utils/format-date";
import { cn } from "@/utils/cn";

function categoryLabel(category: BlogPost["category"]) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[#ff4fc3]/40 bg-[#0a0812]/90 shadow-[0_0_16px_rgba(255,45,111,0.12)] transition-[border-color,box-shadow] duration-200 hover:border-[#ff7ad9] hover:shadow-[0_0_22px_rgba(255,79,195,0.28)]">
      <Link href={`/news/${post.slug}`} className="flex h-full flex-col">
        <span className="relative aspect-[16/10] overflow-hidden bg-ink-900">
          <Image
            src={post.coverSrc}
            alt={post.coverAlt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            unoptimized
          />
        </span>
        <span className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
          <span className="flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                "font-[family-name:var(--font-family-orbitron)] text-[9px] uppercase tracking-[0.18em]",
                post.category === "news" || post.category === "events"
                  ? "text-[#5ad7ff]"
                  : "text-[#ff7ad9]",
              )}
            >
              {categoryLabel(post.category)}
            </span>
            <time
              dateTime={post.date}
              className="font-[family-name:var(--font-family-orbitron)] text-[9px] uppercase tracking-[0.16em] text-white/45"
            >
              {formatDate(post.date, "en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </span>
          <h3 className="font-[family-name:var(--font-family-bebas)] text-[1.35rem] uppercase leading-[0.95] tracking-[0.03em] text-white sm:text-[1.5rem]">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-[13px] leading-relaxed text-white/65">
            {post.excerpt}
          </p>
        </span>
      </Link>
    </article>
  );
}

export function NewsBlogExperience() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategory>("all");

  // Why: evaluate schedule on each render so posts unlock without redeploy.
  const published = getPublishedBlogPosts();
  const featured = getBlogFeatured();
  const gridPosts = getBlogGridPosts();

  const showFeatured =
    Boolean(featured) && category === "all" && !query.trim();

  // Why: when the featured card is hidden (filter/search), include that post in the grid.
  const filtered = useMemo(() => {
    const source = showFeatured ? gridPosts : published;
    return filterBlogPosts(source, category, query);
  }, [category, query, showFeatured, gridPosts, published]);

  return (
    <div className="relative z-10 flex flex-col gap-10 pb-16 sm:gap-12 sm:pb-20">
      <section className="relative isolate min-h-[min(68vh,32rem)] overflow-hidden sm:min-h-[min(72vh,36rem)]">
        <Image
          src="/images/blog/banner.jpg"
          alt="Neon Vice City street at night"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_55%]"
          unoptimized
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#07060f] via-transparent to-black/35"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-6 top-24 hidden sm:block md:right-12 md:top-28"
          aria-hidden
        >
          <p className="font-[family-name:var(--font-family-bebas)] text-[clamp(1.75rem,8vw,4.5rem)] uppercase leading-none tracking-[0.08em] text-[#ff4fc3] opacity-90 [text-shadow:0_0_28px_rgba(255,79,195,0.65)]">
            Vice City
          </p>
        </div>

        <div className="relative z-10 flex min-h-[min(68vh,32rem)] max-w-2xl flex-col justify-end px-5 pb-12 pt-28 sm:min-h-[min(72vh,36rem)] sm:px-8 sm:pb-16 md:px-12 lg:px-16">
          <p className="font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.28em] text-[#ff7ad9] sm:tracking-[0.4em] sm:text-[11px]">
            News & Blog
          </p>
          <h1
            id="news-index-heading"
            className="mt-3 font-[family-name:var(--font-family-bebas)] text-[clamp(2rem,9vw,5.75rem)] uppercase leading-[0.9] tracking-[0.02em] text-white break-words"
          >
            The Official{" "}
            <span className="text-[#ff4fc3] [text-shadow:0_0_24px_rgba(255,79,195,0.55)]">
              GTA 6
            </span>{" "}
            Blog
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/75 sm:text-base">
            Get the latest official news, updates, and insider stories straight
            from Vice City.
          </p>
        </div>
      </section>

      <div className="px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full max-w-md">
            <span className="sr-only">Search articles</span>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#ff7ad9]"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className={cn(
                "h-11 w-full border border-[#ff4fc3]/45 bg-[#0a0812] pl-10 pr-4 text-sm text-white placeholder:text-white/40",
                "shadow-[0_0_14px_rgba(90,215,255,0.12)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4fc3]",
              )}
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-[family-name:var(--font-family-orbitron)] text-[9px] uppercase tracking-[0.2em] text-white/50">
              Filter by:
            </span>
            {blogCategories.map((tab) => {
              const selected = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.14em]",
                    "transition-[background-color,border-color,color] duration-200",
                    selected
                      ? "border-[#ff2d6f] bg-[#ff2d6f] text-white shadow-[0_0_14px_rgba(255,45,111,0.45)]"
                      : "border-white/25 bg-transparent text-white/70 hover:border-[#ff4fc3]/70 hover:text-white",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {showFeatured && featured ? (
          <article className="mt-8 overflow-hidden border border-[#ff4fc3]/50 bg-[#0a0812]/90 shadow-[0_0_20px_rgba(255,45,111,0.16)] lg:mt-10">
            <Link
              href={`/news/${featured.slug}`}
              className="grid lg:grid-cols-2"
            >
              <span className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
                <Image
                  src={featured.coverSrc}
                  alt={featured.coverAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                />
              </span>
              <span className="relative flex flex-col justify-center overflow-hidden p-6 sm:p-8 lg:p-10">
                <span
                  className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-[family-name:var(--font-family-bebas)] text-[clamp(8rem,22vw,14rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,79,195,0.22)]"
                  aria-hidden
                >
                  VI
                </span>
                <span className="relative z-10 flex flex-wrap items-center gap-3">
                  <span className="bg-[#ff2d6f] px-2.5 py-1 font-[family-name:var(--font-family-orbitron)] text-[9px] uppercase tracking-[0.18em] text-white">
                    Featured
                  </span>
                  <time
                    dateTime={featured.date}
                    className="font-[family-name:var(--font-family-orbitron)] text-[10px] uppercase tracking-[0.16em] text-white/50"
                  >
                    {formatDate(featured.date, "en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }).toUpperCase()}
                  </time>
                </span>
                <h2 className="relative z-10 mt-4 font-[family-name:var(--font-family-bebas)] text-[clamp(1.65rem,5vw,3.25rem)] uppercase leading-[0.92] tracking-[0.03em] text-white break-words">
                  {featured.title}
                </h2>
                <p className="relative z-10 mt-3 max-w-md text-[14px] leading-relaxed text-white/70 sm:text-[15px]">
                  {featured.excerpt}
                </p>
              </span>
            </Link>
          </article>
        ) : null}

        <div id="blog-grid" className="mt-8 scroll-mt-24 sm:mt-10">
          {filtered.length ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {filtered.map((post) => (
                <li key={post.slug}>
                  <BlogPostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="border border-[#ff4fc3]/30 bg-[#0a0812] px-5 py-10 text-sm text-white/60">
              No articles match that search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
