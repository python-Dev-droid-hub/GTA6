import { BRAND_LOGO_SRC } from "@/constants/brand";
import { siteConfig, socialLinks } from "@/constants/site";
import { legal } from "@/constants/legal";
import { absoluteUrl } from "@/lib/seo/metadata";
import type { ArticleFrontmatter } from "@/types/content";
import type { FaqItem } from "@/types/content";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Grand Theft Auto City 6",
    url: "https://www.grandtheftautocity.com/",
    logo: absoluteUrl(BRAND_LOGO_SRC),
    sameAs: socialLinks.map((link) => link.href),
    description: legal.shortDisclaimer,
    disambiguatingDescription: "Unofficial fan website",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function personJsonLd(input: {
  name: string;
  description: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    description: input.description,
    image: absoluteUrl(input.image),
    url: absoluteUrl(input.url),
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(input: {
  slug: string;
  meta: ArticleFrontmatter;
}) {
  const keywords = [
    ...(input.meta.keywords ?? []),
    input.meta.tag,
    input.meta.category,
  ].filter((t): t is string => Boolean(t));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.meta.seoTitle ?? input.meta.title,
    alternativeHeadline: input.meta.seoTitle
      ? input.meta.title
      : undefined,
    description: input.meta.description,
    datePublished: input.meta.date,
    image: [absoluteUrl(input.meta.cover)],
    keywords: [...new Set(keywords)].join(", "),
    articleSection: input.meta.category ?? input.meta.tag,
    author: {
      "@type": "Organization",
      name: `${siteConfig.name} Fan Experience`,
    },
    publisher: {
      "@type": "Organization",
      name: `${siteConfig.name} Fan Experience`,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.ogImage),
      },
    },
    mainEntityOfPage: absoluteUrl(`/news/${input.slug}`),
    isAccessibleForFree: true,
  };
}
