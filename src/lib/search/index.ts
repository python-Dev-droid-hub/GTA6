import { getAllArticles } from "@/lib/mdx/articles";
import { getAllCharacters } from "@/lib/mdx/characters";
import { getAllGuides } from "@/lib/mdx/guides";
import { toolsCatalog } from "@/constants/tools";
import { vehicles } from "@/data/vehicles";
import { weapons } from "@/data/weapons";

export type SearchDocType =
  | "article"
  | "character"
  | "guide"
  | "tool"
  | "vehicle"
  | "weapon";

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

  const characters = getAllCharacters().map((c) => ({
    id: `character:${c.slug}`,
    type: "character" as const,
    title: c.name,
    description: c.blurb,
    href: `/characters/${c.slug}`,
    tags: [c.role, "characters"],
  }));

  const guides = getAllGuides().map((g) => ({
    id: `guide:${g.slug}`,
    type: "guide" as const,
    title: g.title,
    description: g.description,
    href: `/guides/${g.slug}`,
    tags: [g.category, "guides"],
  }));

  const tools = toolsCatalog
    .filter((t) => t.status === "live")
    .map((t) => ({
      id: `tool:${t.id}`,
      type: "tool" as const,
      title: t.title,
      description: t.description,
      href: t.href,
      tags: [t.eyebrow, "tools"],
    }));

  const vehicleDocs = vehicles.map((v) => ({
    id: `vehicle:${v.id}`,
    type: "vehicle" as const,
    title: v.name,
    description: v.summary,
    href: `/vehicles`,
    tags: [v.class, "vehicles"],
  }));

  const weaponDocs = weapons.map((w) => ({
    id: `weapon:${w.id}`,
    type: "weapon" as const,
    title: w.name,
    description: w.summary,
    href: `/weapons`,
    tags: [w.class, "weapons"],
  }));

  return [
    ...articles,
    ...characters,
    ...guides,
    ...tools,
    ...vehicleDocs,
    ...weaponDocs,
  ];
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
      const hay = `${doc.title} ${doc.description} ${doc.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    })
    .slice(0, 40);
}
