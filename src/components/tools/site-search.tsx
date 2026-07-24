"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FilterChips } from "@/components/ui/filter-chips";
import type { SearchDoc, SearchDocType } from "@/lib/search";
import { cn } from "@/utils/cn";

const TYPE_OPTIONS: { value: SearchDocType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "article", label: "News" },
  { value: "character", label: "Characters" },
  { value: "guide", label: "Guides" },
  { value: "tool", label: "Tools" },
  { value: "vehicle", label: "Vehicles" },
  { value: "weapon", label: "Weapons" },
];

export type SiteSearchProps = {
  initialQuery?: string;
};

export function SiteSearch({ initialQuery = "" }: SiteSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState<SearchDocType | "all">("all");
  const [results, setResults] = useState<SearchDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = useCallback(async (q: string, t: SearchDocType | "all") => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ q, type: t });
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = (await res.json()) as {
        ok?: boolean;
        results?: SearchDoc[];
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Search failed");
        setResults([]);
        return;
      }
      setResults(data.results ?? []);
    } catch {
      setError("Network error");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      void runSearch(query, type);
    }, 200);
    return () => window.clearTimeout(handle);
  }, [query, type, runSearch]);

  return (
    <div className="flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan">
          Search
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Trailers, Lucia, FPS, SMG…"
          className="h-12 rounded-md border border-border-strong bg-ink-900 px-4 text-sm text-paper placeholder:text-paper-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          autoFocus
        />
      </label>

      <FilterChips
        label="Result type"
        value={type}
        onChange={(v) => setType(v as SearchDocType | "all")}
        options={TYPE_OPTIONS}
      />

      <p className="text-xs text-paper-faint" role="status" aria-live="polite">
        {loading
          ? "Searching…"
          : error
            ? error
            : `${results.length} result${results.length === 1 ? "" : "s"}`}
      </p>

      <ul className="flex flex-col gap-3">
        {results.map((doc) => (
          <li key={doc.id}>
            <Link
              href={doc.href}
              className={cn(
                "block rounded-lg border border-border bg-surface p-4 transition-cinema",
                "hover:border-vice-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
              )}
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-neon-cyan">
                {doc.type}
              </p>
              <h2 className="mt-1 font-display text-xl uppercase tracking-[0.06em] text-paper">
                {doc.title}
              </h2>
              <p className="mt-1 text-sm text-paper-muted">{doc.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
