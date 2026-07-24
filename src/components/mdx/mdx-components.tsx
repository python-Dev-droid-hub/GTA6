import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";

function ProseImage({ src, alt = "" }: ComponentProps<"img">) {
  if (!src || typeof src !== "string") return null;
  return (
    <span className="relative my-8 block aspect-video overflow-hidden rounded-lg border border-border">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 720px"
      />
    </span>
  );
}

function Anchor({
  href = "#",
  children,
  className,
  ...props
}: ComponentProps<"a">) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        className={cn(
          "text-neon-cyan underline-offset-4 hover:underline",
          className,
        )}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        "text-neon-cyan underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Shared MDX element map for articles, characters, guides. */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 mb-4 font-display text-2xl uppercase tracking-[0.08em] text-paper"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 font-display text-xl uppercase tracking-[0.08em] text-paper"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mb-4 text-base leading-relaxed text-paper-muted" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-paper-muted" {...props} />
  ),
  ol: (props) => (
    <ol
      className="mb-4 list-decimal space-y-2 pl-5 text-paper-muted"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-vice-pink pl-4 text-paper-muted italic"
      {...props}
    />
  ),
  a: Anchor,
  img: ProseImage,
  hr: () => <hr className="my-10 border-border" />,
  strong: (props) => <strong className="font-semibold text-paper" {...props} />,
};
