import { isContentPublished } from "@/lib/content/publish";

export type BlogCategory =
  | "all"
  | "news"
  | "updates"
  | "events"
  | "missions";

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
  { id: "missions", label: "Missions" },
];

/** Source list — may include drafts / future scheduled posts. */
export const blogPosts: BlogPost[] = [
  {
    slug: "gta-vice-city-guardian-angels",
    title: "GTA Vice City “Guardian Angels” Mission: How to Protect Diaz?",
    excerpt:
      "Learn how to complete Guardian Angels in GTA Vice City, including collecting weapons, protecting Ricardo Diaz, surviving the attack, and recovering the stolen money.",
    date: "2026-09-29",
    publishAt: "2026-09-29T09:00:00+05:00",
    category: "missions",
    coverSrc: "/images/blog/gta-vice-city-guardian-angels.jpg",
    coverAlt:
      "Ricardo Diaz behind a teal car during a Washington Beach shootout — Guardian Angels mission",
  },
  {
    slug: "gta-vice-city-jury-fury",
    title: "GTA Vice City “Jury Fury” Mission Guide: How to Complete the Mission?",
    excerpt:
      "Learn how to complete the Jury Fury mission in GTA Vice City by finding both jurors, damaging their vehicles, avoiding common mistakes, and completing the objectives.",
    date: "2026-09-28",
    publishAt: "2026-09-28T09:00:00+05:00",
    category: "missions",
    coverSrc: "/images/blog/gta-vice-city-jury-fury.jpg",
    coverAlt:
      "Tommy Vercetti with a baseball bat intimidating a juror on a neon Vice City street — Jury Fury mission",
  },
  {
    slug: "gta-vice-city-back-alley-brawl",
    title: "GTA Vice City “Back Alley Brawl” Mission: How to Pass It?",
    excerpt:
      "Learn how to pass the Back Alley Brawl mission in GTA Vice City, including finding the chef, winning the fight, collecting the phone, and following Lance Vance.",
    date: "2026-09-25",
    publishAt: "2026-09-25T09:00:00+05:00",
    category: "missions",
    coverSrc: "/images/blog/gta-vice-city-back-alley-brawl.jpg",
    coverAlt:
      "Tommy Vercetti facing the chef and associates in a neon Vice City alley — Back Alley Brawl mission",
  },
  {
    slug: "gta-vice-city-the-party",
    title: "GTA Vice City “The Party” Mission: How to Complete It?",
    excerpt:
      "Learn how to complete The Party mission in GTA Vice City, including changing clothes, taking Mercedes to the club, returning to Cortez's yacht, and escaping attackers.",
    date: "2026-09-24",
    publishAt: "2026-09-24T09:00:00+05:00",
    category: "missions",
    coverSrc: "/images/blog/gta-vice-city-the-party.jpg",
    coverAlt:
      "Tommy Vercetti in a white suit at Cortez's yacht during a neon Vice City shootout — The Party mission",
  },
  {
    slug: "gta-6-tips-and-tricks",
    title: "GTA 6 Tips and Tricks: 15 Things Every New Player Should Know",
    excerpt:
      "New to GTA 6? Discover 15 essential GTA 6 tips and tricks covering missions, money, vehicles, combat, exploration, settings, and gameplay for beginners.",
    date: "2026-09-23",
    publishAt: "2026-09-23T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-tips-and-tricks.jpg",
    coverAlt:
      "Jason, Lucia, and crew in neon Vice City with chase action — GTA 6 tips and tricks",
  },
  {
    slug: "gta-6-multiplayer-guide",
    title: "GTA 6 Multiplayer Guide: What to Expect from GTA 6 Online?",
    excerpt:
      "Discover what players can expect from GTA 6 Online, including multiplayer features, activities, missions, customization, progression, and the future of online gameplay.",
    date: "2026-09-22",
    publishAt: "2026-09-22T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-multiplayer-guide.jpg",
    coverAlt:
      "Heist chaos in neon Vice City with cash bags, police, and sports cars — GTA 6 multiplayer guide",
  },
  {
    slug: "gta-6-ps5-settings-guide",
    title: "GTA 6 Settings Guide: Best PS5 Settings for a Better Experience",
    excerpt:
      "Find the best GTA 6 PS5 settings for graphics, performance, controls, audio, and display. Optimize your settings for a smoother and better GTA 6 experience.",
    date: "2026-09-21",
    publishAt: "2026-09-21T09:00:00+05:00",
    category: "updates",
    coverSrc: "/images/blog/gta-6-ps5-settings-guide.jpg",
    coverAlt:
      "PlayStation 5 and DualSense with GTA 6 performance settings on TV — best PS5 settings guide",
  },
  {
    slug: "gta-6-missions-guide",
    title: "GTA 6 Missions Guide: Tips for Completing Missions Successfully",
    excerpt:
      "Master GTA 6 missions with useful tips and strategies for completing objectives, handling challenges, earning rewards, and progressing through the game successfully.",
    date: "2026-09-18",
    publishAt: "2026-09-18T09:00:00+05:00",
    category: "missions",
    coverSrc: "/images/blog/gta-6-missions-guide.jpg",
    coverAlt:
      "Jason and Lucia planning a mission beside a sports car in neon Vice City — GTA 6 missions guide",
  },
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
    category: "missions",
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
