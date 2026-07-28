import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";

export type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return base;
  return `${base}${normalized}`;
}

/**
 * Why central helper: consistent title, canonical, OG, Twitter, RSS alternate.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  imageAlt = siteConfig.name,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: BuildMetadataInput = {}): Metadata {
  const pageTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — Fan Experience`;
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const ogImageApi = absoluteUrl(
    `/api/og?title=${encodeURIComponent(title ?? siteConfig.name)}&subtitle=${encodeURIComponent(description.slice(0, 120))}`,
  );

  return {
    metadataBase: new URL(getSiteOrigin()),
    title: pageTitle,
    description,
    applicationName: siteConfig.name,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
    authors: [{ name: `${siteConfig.name} Fan Experience` }],
    creator: `${siteConfig.name} Fan Experience`,
    publisher: `${siteConfig.name} Fan Experience`,
    category: "Entertainment",
    keywords: [
      "Grand Theft Auto 6",
      "GTA 6",
      "GTA VI",
      "fan site",
      "unofficial",
      "trailers",
      ...(tags ?? []),
    ],
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      images: [
        { url: imageUrl, alt: imageAlt },
        { url: ogImageApi, alt: pageTitle, width: 1200, height: 630 },
      ],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
      ...(siteConfig.twitterHandle
        ? { creator: siteConfig.twitterHandle }
        : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    verification: {
      google: "7CBKGjtW0MvRk3o66iJ6bYfJtlp-RaFMwsHOH3HffLk",
    },
    other: {
      "rss-feed": absoluteUrl("/feed.xml"),
    },
  };
}

export function getSiteOrigin(): string {
  const url = siteConfig.url.replace(/\/$/, "");
  // Hard guard — sitemap must never advertise localhost to crawlers
  if (
    (process.env.VERCEL_ENV === "production" ||
      process.env.NODE_ENV === "production") &&
    /localhost|127\.0\.0\.1/i.test(url)
  ) {
    return "https://www.grandtheftautocity.com";
  }
  return url;
}
