import { isContentPublished } from "@/lib/content/publish";

export type BlogCategory =
  | "all"
  | "news"
  | "updates"
  | "events"
  | "development";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: Exclude<BlogCategory, "all">;
  coverSrc: string;
  coverAlt: string;
  featured?: boolean;
  draft?: boolean;
  /** Optional schedule override (ISO-8601). Falls back to `date`. */
  publishAt?: string;
};

export const blogCategories: { id: BlogCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "news", label: "News" },
  { id: "updates", label: "Updates" },
  { id: "events", label: "Events" },
  { id: "development", label: "Development" },
];

/** Source list — may include drafts / future scheduled posts. */
export const blogPosts: BlogPost[] = [
  {
    slug: "gta-6-money-guide",
    title: "GTA 6 Money Guide: How to Build Your In-Game Wealth?",
    excerpt:
      "Learn how to build in-game wealth in GTA 6 with this money guide covering missions, businesses, rewards, activities, and smart ways to grow your virtual cash.",
    date: "2026-09-17",
    publishAt: "2026-09-17T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-money-guide.jpg",
    coverAlt:
      "Jason and Lucia on a Vice City balcony with cash and wealth UI — GTA 6 money guide",
  },
  {
    slug: "gta-6-weapons-guide",
    title: "GTA 6 Weapons Guide: What New Players Need to Know",
    excerpt:
      "Explore the GTA 6 weapons guide and learn what new players should know about weapons, combat, weapon types, customization, and gameplay mechanics.",
    date: "2026-09-16",
    publishAt: "2026-09-16T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-weapons-guide.jpg",
    coverAlt:
      "Jason and Lucia with rifles and tactical gear in neon Vice City — GTA 6 weapons guide",
  },
  {
    slug: "gta-6-vehicles-guide",
    title: "GTA 6 Vehicles Guide: Cars, Bikes, Boats, and More",
    excerpt:
      "Explore the GTA 6 vehicles guide covering cars, bikes, boats, aircraft, and more. Discover what players should know about transportation in GTA 6.",
    date: "2026-09-15",
    publishAt: "2026-09-15T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-vehicles-guide.jpg",
    coverAlt:
      "Supercar, sportbike, and boats on a neon Vice City coastal road — GTA 6 vehicles guide",
  },
  {
    slug: "gta-6-characters-and-story",
    title: "GTA 6 Characters and Story: Everything New Players Should Know",
    excerpt:
      "Discover everything players should know about GTA 6 characters and story, including Lucia, Jason, the storyline, Vice City setting, gameplay, and new features.",
    date: "2026-09-14",
    publishAt: "2026-09-14T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-characters-and-story.jpg",
    coverAlt:
      "Lucia and Jason back-to-back in neon Vice City at sunset — GTA 6 characters and story",
  },
  {
    slug: "what-to-do-first-in-grand-theft-auto-6",
    title: "What to Do First in Grand Theft Auto 6?",
    excerpt:
      "Wondering what to do first in GTA 6? Discover beginner tips for exploring Leonida, choosing vehicles, finding safehouses, earning cash, and upgrading gear.",
    date: "2026-09-12",
    publishAt: "2026-09-12T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/what-to-do-first-in-grand-theft-auto-6.jpg",
    coverAlt:
      "Jason and Lucia overlooking neon Vice City at sunset from a Leonida overlook",
  },
  {
    slug: "7-gta-6-mistakes-new-players-should-avoid",
    title: "7 GTA 6 Mistakes New Players Should Avoid",
    excerpt:
      "Discover 7 common GTA 6 mistakes new players should avoid, from poor money management and vehicle upgrades to risky exploration and skipping side content.",
    date: "2026-09-11",
    publishAt: "2026-09-11T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/7-gta-6-mistakes-new-players-should-avoid.jpg",
    coverAlt:
      "Lucia beside a damaged sports car in neon Vice City after a police chase",
  },
  {
    slug: "gta-6-online-what-players-need-before-they-start",
    title: "GTA 6 Online: What Players Need Before They Start?",
    excerpt:
      "Get ready for GTA 6 Online with this beginner guide covering consoles, PC availability, storage, launch expectations, Rockstar accounts, and multiplayer preparation.",
    date: "2026-09-10",
    publishAt: "2026-09-10T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-online.jpg",
    coverAlt:
      "Crew planning heists over a neon Vice City skyline — GTA 6 Online preparation guide",
  },
  {
    slug: "grand-theft-auto-6-features-that-change-the-series",
    title: "Grand Theft Auto 6 Features That Change the Series",
    excerpt:
      "Discover the biggest GTA 6 features, including dynamic weather, advanced AI, dual protagonists, improved vehicle physics, seamless interiors, and robbery mechanics.",
    date: "2026-09-09",
    publishAt: "2026-09-09T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-features.jpg",
    coverAlt:
      "Jason and Lucia in Vice City — calm neon sunset beside a hurricane storm skyline",
  },
  {
    slug: "a-beginners-guide-to-the-gta-6-map-and-missions",
    title: "A Beginner’s Guide to the GTA 6 Map and Missions",
    excerpt:
      "Explore the GTA 6 map, Vice City, Leonida, missions, heists, transportation, and gameplay tips in this beginner-friendly guide to Grand Theft Auto VI.",
    date: "2026-09-08",
    publishAt: "2026-09-08T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-map-and-missions.jpg",
    coverAlt:
      "Jason and Lucia in Leonida — GTA 6 map, Vice City skyline, countryside, and travel modes",
    featured: true,
  },
  {
    slug: "gta-6-vs-gta-5-whats-changed-after-13-years",
    title: "GTA 6 vs GTA 5: What’s Changed After 13 Years?",
    excerpt:
      "GTA 6 vs GTA 5 explained: discover the biggest changes in Vice City, protagonists, graphics, AI, physics, world density, and gameplay.",
    date: "2026-09-07",
    publishAt: "2026-09-07T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-vs-gta-5.jpg",
    coverAlt:
      "GTA 6 vs GTA 5 comparison — Los Santos 2013 beside Vice City and Leonida 2026",
  },
  {
    slug: "how-to-start-playing-grand-theft-auto-6-on-ps5",
    title: "How to Start Playing Grand Theft Auto 6 on PS5?",
    excerpt:
      "Learn how to start playing GTA 6 on PS5, including console compatibility, pre-orders, storage, pre-loading, DualSense, and 3D audio.",
    date: "2026-09-04",
    category: "updates",
    coverSrc: "/images/blog/gta-6-ps5-setup-guide.jpg",
    coverAlt:
      "How to start playing Grand Theft Auto VI on PS5 — Vice City setup guide with DualSense and launch details",
  },
];

/** Live posts only (draft + schedule aware). Call at request/render time. */
export function getPublishedBlogPosts(now: Date = new Date()): BlogPost[] {
  return blogPosts
    .filter((post) =>
      isContentPublished(
        {
          draft: post.draft,
          date: post.date,
          publishAt: post.publishAt,
        },
        now,
      ),
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogFeatured(now: Date = new Date()) {
  const published = getPublishedBlogPosts(now);
  return published.find((p) => p.featured) ?? published[0] ?? null;
}

export function getBlogGridPosts(now: Date = new Date()) {
  const featured = getBlogFeatured(now);
  return getPublishedBlogPosts(now).filter((p) => p.slug !== featured?.slug);
}

export function filterBlogPosts(
  posts: BlogPost[],
  category: BlogCategory,
  query: string,
): BlogPost[] {
  const q = query.trim().toLowerCase();
  return posts.filter((post) => {
    if (category !== "all" && post.category !== category) return false;
    if (!q) return true;
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q)
    );
  });
}
