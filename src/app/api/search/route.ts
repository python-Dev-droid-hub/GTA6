import { NextResponse } from "next/server";
import { searchDocs, type SearchDocType } from "@/lib/search";

const TYPES = new Set([
  "all",
  "article",
  "character",
  "guide",
  "tool",
  "vehicle",
  "weapon",
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const typeParam = searchParams.get("type") ?? "all";
  const type = (TYPES.has(typeParam) ? typeParam : "all") as
    | SearchDocType
    | "all";

  const results = searchDocs(q, type);
  return NextResponse.json({
    ok: true,
    query: q,
    type,
    count: results.length,
    results,
  });
}
