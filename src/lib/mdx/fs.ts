import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export function getContentDir(...segments: string[]) {
  return path.join(contentRoot, ...segments);
}

export function listMdxSlugs(collection: string): string[] {
  const dir = getContentDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function mdxFileExists(collection: string, slug: string) {
  const filePath = path.join(getContentDir(collection), `${slug}.mdx`);
  return fs.existsSync(filePath);
}

export function readMdxFile(collection: string, slug: string) {
  const filePath = path.join(getContentDir(collection), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content, slug };
}
