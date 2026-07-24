import { NewsBlogExperience } from "@/components/sections/news/news-blog-experience";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo/json-ld";

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
  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-[#07060f]">
      <JsonLd
        data={itemListJsonLd(
          "Vice City news",
          blogPosts.map((a) => ({
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
