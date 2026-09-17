export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

function resolveSiteUrl(): string {
  const normalize = (value: string) => value.replace(/\/$/, "");
  const isLocal = (value: string) =>
    /localhost|127\.0\.0\.1/i.test(value);

  const explicit = process.env.NEXT_PUBLIC_SITE_URL
    ? normalize(process.env.NEXT_PUBLIC_SITE_URL)
    : "";
  if (explicit && !isLocal(explicit)) return explicit;

  const prodHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? normalize(process.env.VERCEL_PROJECT_PRODUCTION_URL)
    : "";
  if (prodHost && !isLocal(prodHost)) {
    return prodHost.startsWith("http") ? prodHost : `https://${prodHost}`;
  }

  // Canonical production domain (never ship localhost in sitemap/robots/OG)
  if (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production") {
    return "https://www.grandtheftautocity.com";
  }

  const preview = process.env.VERCEL_URL
    ? normalize(process.env.VERCEL_URL)
    : "";
  if (preview && !isLocal(preview)) {
    return preview.startsWith("http") ? preview : `https://${preview}`;
  }

  return explicit && isLocal(explicit)
    ? explicit
    : "http://localhost:3000";
}

/**
 * Site chrome brand.
 */
export const siteConfig = {
  name: "Grand Theft Auto 6",
  shortName: "GTA 6",
  tagline: "Unofficial cinematic neon-coast fan archive",
  description:
    "Unofficial Grand Theft Auto 6 fan website — trailers, characters, world, and tools. Not affiliated with Rockstar Games or Take-Two Interactive.",
  url: resolveSiteUrl(),
  locale: "en_US",
  twitterHandle: "@grantheftcity" as string | undefined,
  ogImage: "/images/hero-poster.png",
} as const;

export type SocialLink = {
  id: "x" | "facebook" | "instagram" | "pinterest" | "tiktok";
  label: string;
  href: string;
  /** Official brand mark path (viewBox 0 0 24 24) */
  path: string;
};

/** Fan social profiles — official trademark glyphs (inline SVG). */
export const socialLinks: SocialLink[] = [
  {
    id: "x",
    label: "X",
    href: "https://x.com/grantheftcity",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.99 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/grandtheftautocity6/",
    path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/gtaviceautocity6/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    href: "https://www.pinterest.com/gtaviceautocity/",
    path: "M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.992 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@grandtheftautocity6",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.27 8.27 0 0 0 4.84 1.55V6.84a4.85 4.85 0 0 1-1.08-.15z",
  },
];

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Characters", href: "/characters" },
  { label: "Missions", href: "/missions" },
  { label: "FAQs", href: "/faq" },
  { label: "Blogs", href: "/news" },
];

export const footerNav: NavGroup[] = [
  {
    title: "Explore",
    items: [
      { label: "Characters", href: "/characters" },
      { label: "Missions", href: "/missions" },
      { label: "Media", href: "/media" },
      { label: "Blogs", href: "/news" },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "FAQs", href: "/faq" },
      { label: "Ultimate", href: "/ultimate" },
      { label: "Vintage", href: "/vintage" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Corporate", href: "/legal/corporate" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Cookie Settings", href: "/legal/cookie-settings" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Legal Advisory", href: "/legal/terms" },
    ],
  },
];
