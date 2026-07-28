import { getAllArticles } from "@/lib/mdx/articles";
import { leonidaCharacters } from "@/data/leonida-characters";

export type SearchDocType = "article" | "character";

export type SearchDoc = {
  id: string;
  type: SearchDocType;
  title: string;
  description: string;
  href: string;
  tags: string[];
};

/** Build a lightweight in-memory index at request time (fine at current scale). */
export function buildSearchIndex(): SearchDoc[] {
  const articles = getAllArticles().map((a) => ({
    id: `article:${a.slug}`,
    type: "article" as const,
    title: a.title,
    description: a.description,
    href: `/news/${a.slug}`,
    tags: [a.tag, "news"],
  }));

  const characters = leonidaCharacters.map((c) => ({
    id: `character:${c.slug}`,
    type: "character" as const,
    title: c.name,
    description: c.tagline,
    href: `/characters/${c.slug}`,
    tags: ["characters", "leonida"],
  }));

  return [...articles, ...characters];
}

export function searchDocs(
  query: string,
  typeFilter: SearchDocType | "all" = "all",
): SearchDoc[] {
  const q = query.trim().toLowerCase();
  const index = buildSearchIndex();

  return index
    .filter((doc) => (typeFilter === "all" ? true : doc.type === typeFilter))
    .filter((doc) => {
      if (!q) return true;
      const hay =
        `${doc.title} ${doc.description} ${doc.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    })
    .slice(0, 40);
}
