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
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description,
    applicationName: siteConfig.name,
    icons: {
      icon: [
        { url: "/favicon.png", sizes: "64x64", type: "image/png" },
        { url: "/icon.png", sizes: "64x64", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.png",
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
    other: {
      "rss-feed": absoluteUrl("/feed.xml"),
    },
  };
}

export function getSiteOrigin(): string {
  return siteConfig.url.replace(/\/$/, "");
}
