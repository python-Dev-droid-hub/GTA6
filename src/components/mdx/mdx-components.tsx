import type { ComponentProps, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { flattenMdxText } from "@/utils/mdx-text";
import { slugify } from "@/utils/slugify";

function ProseImage({ src, alt = "" }: ComponentProps<"img">) {
  if (!src || typeof src !== "string") return null;
  return (
    <figure className="my-10 overflow-hidden rounded-md border border-border bg-ink-900">
      <span className="relative block aspect-video">
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </span>
      {alt ? (
        <figcaption className="border-t border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint">
          {alt}
        </figcaption>
      ) : null}
    </figure>
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
          "font-medium text-neon-cyan underline-offset-4 hover:underline",
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
        "font-medium text-neon-cyan underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function Heading({
  as: Tag,
  className,
  children,
  ...props
}: {
  as: "h2" | "h3";
  className?: string;
  children?: ReactNode;
} & Omit<ComponentProps<"h2">, "className" | "children">) {
  const text = flattenMdxText(children);
  const id = props.id ?? (text ? slugify(text) : undefined);

  return (
    <Tag id={id} className={className} {...props}>
      {children}
    </Tag>
  );
}

/** Shared MDX element map for articles, characters, guides. */
export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <Heading
      as="h2"
      className="mt-14 mb-5 scroll-mt-28 border-t border-border pt-10 font-display text-2xl uppercase tracking-[0.08em] text-paper first:mt-0 first:border-t-0 first:pt-0 sm:text-[1.75rem]"
      {...props}
    >
      {children}
    </Heading>
  ),
  h3: ({ children, ...props }) => (
    <Heading
      as="h3"
      className="mt-8 mb-3 scroll-mt-28 font-display text-lg uppercase tracking-[0.08em] text-paper sm:text-xl"
      {...props}
    >
      {children}
    </Heading>
  ),
  p: (props) => (
    <p
      className="mb-5 text-[15px] leading-[1.75] text-paper-muted sm:text-base sm:leading-[1.8]"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mb-6 list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed text-paper-muted marker:text-vice-pink sm:text-base"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-6 list-decimal space-y-2.5 pl-5 text-[15px] leading-relaxed text-paper-muted marker:font-mono marker:text-neon-cyan sm:text-base"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-[3px] border-vice-pink bg-ink-800/60 px-5 py-4 text-[15px] leading-relaxed text-paper-muted not-italic sm:px-6"
      {...props}
    />
  ),
  a: Anchor,
  img: ProseImage,
  hr: () => <hr className="my-12 border-border" />,
  strong: (props) => (
    <strong className="font-semibold text-paper" {...props} />
  ),
  table: (props) => (
    <div className="my-8 overflow-x-auto rounded-md border border-border">
      <table
        className="w-full min-w-[36rem] border-collapse text-left text-sm text-paper-muted"
        {...props}
      />
    </div>
  ),
  thead: (props) => <thead className="bg-ink-800 text-paper" {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => (
    <tr className="border-t border-border even:bg-ink-900/50" {...props} />
  ),
  th: (props) => (
    <th
      className="px-3 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-neon-cyan sm:px-4"
      {...props}
    />
  ),
  td: (props) => (
    <td className="px-3 py-3 align-top leading-relaxed sm:px-4" {...props} />
  ),
};
