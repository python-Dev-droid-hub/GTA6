export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

/**
 * Site chrome brand.
 */
export const siteConfig = {
  name: "Grand Theft Auto 6",
  shortName: "GTA 6",
  tagline: "Unofficial cinematic neon-coast fan archive",
  description:
    "Unofficial Grand Theft Auto 6 fan website — trailers, characters, world, and tools. Not affiliated with Rockstar Games or Take-Two Interactive.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  twitterHandle: undefined as string | undefined,
  ogImage: "/images/hero-poster.png",
} as const;

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
      { label: "World", href: "/world" },
      { label: "Wallpapers", href: "/wallpapers" },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Blogs", href: "/news" },
      { label: "FAQs", href: "/faq" },
      { label: "Guides", href: "/guides" },
      { label: "Tools", href: "/tools" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Disclaimer", href: "/legal/disclaimer" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];
