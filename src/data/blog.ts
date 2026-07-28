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
};

export const blogCategories: { id: BlogCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "news", label: "News" },
  { id: "updates", label: "Updates" },
  { id: "events", label: "Events" },
  { id: "development", label: "Development" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "new-screenshots-revealed",
    title: "New Screenshots Revealed",
    excerpt:
      "Fresh stills from the Leonida coast — beaches, skyline, and the heat of midday Vice.",
    date: "2024-05-12",
    category: "news",
    coverSrc: "/images/blog/screenshots.jpg",
    coverAlt: "Aerial view of a crowded Vice City beach",
    featured: true,
  },
];

export const blogFeatured =
  blogPosts.find((p) => p.featured) ?? blogPosts[0];

export const blogGridPosts = blogPosts.filter((p) => !p.featured);

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
