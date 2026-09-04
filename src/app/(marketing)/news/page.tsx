import { NewsBlogExperience } from "@/components/sections/news/news-blog-experience";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedBlogPosts } from "@/data/blog";
import { CONTENT_REVALIDATE_SECONDS } from "@/lib/content/publish";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo/json-ld";

export const revalidate = CONTENT_REVALIDATE_SECONDS;

export const metadata = buildMetadata({
  title: "News & Blog",
  description:
    "Get the latest official news, updates, and insider stories straight from Vice City.",
  path: "/news",
  tags: ["news"],
  image: "/images/blog/banner.jpg",
  imageAlt: "Neon Vice City street at night",
});

export default function NewsIndexPage() {
  const posts = getPublishedBlogPosts();

  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-[#07060f]">
      <JsonLd
        data={itemListJsonLd(
          "Vice City news",
          posts.map((a) => ({
            name: a.title,
            path: `/news/${a.slug}`,
          })),
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
        ])}
      />
      <NewsBlogExperience />
    </main>
  );
}
