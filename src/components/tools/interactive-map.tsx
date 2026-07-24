"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { mapDistricts, type MapDistrict } from "@/data/map-districts";
import { FilterChips } from "@/components/ui/filter-chips";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

const accentStroke = {
  pink: "stroke-vice-pink fill-vice-pink/20",
  cyan: "stroke-neon-cyan fill-neon-cyan/20",
  gold: "stroke-gold fill-gold/20",
} as const;

const accentActive = {
  pink: "stroke-vice-pink fill-vice-pink/45",
  cyan: "stroke-neon-cyan fill-neon-cyan/45",
  gold: "stroke-gold fill-gold/45",
} as const;

export function InteractiveMap() {
  const [activeId, setActiveId] = useState(mapDistricts[0]?.id ?? "");
  const [tag, setTag] = useState("all");

  const tags = useMemo(() => {
    const set = new Set<string>();
    mapDistricts.forEach((d) => d.tags.forEach((t) => set.add(t)));
    return ["all", ...Array.from(set).sort()];
  }, []);

  const visible = useMemo(() => {
    if (tag === "all") return mapDistricts;
    return mapDistricts.filter((d) => d.tags.includes(tag));
  }, [tag]);

  const active: MapDistrict | undefined =
    visible.find((d) => d.id === activeId) ?? visible[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="flex flex-col gap-4">
        <FilterChips
          label="Filter districts"
          value={tag}
          onChange={(v) => {
            setTag(v);
            setActiveId("");
          }}
          options={tags.map((t) => ({
            value: t,
            label: t === "all" ? "All" : t,
          }))}
        />

        <div className="overflow-hidden rounded-lg border border-border bg-ink-900 p-3 sm:p-4">
          <svg
            viewBox="0 0 1000 620"
            role="img"
            aria-label="Stylized fan map of Vice City districts"
            className="h-auto w-full"
          >
            <rect width="1000" height="620" className="fill-ink-950" />
            <text
              x="40"
              y="48"
              className="fill-paper-faint"
              style={{ fontSize: 18, letterSpacing: 4 }}
            >
              FAN MAP · NOT TO SCALE
            </text>

            {visible.map((district) => {
              const isActive = active?.id === district.id;
              return (
                <path
                  key={district.id}
                  d={district.path}
                  tabIndex={0}
                  role="button"
                  aria-label={district.name}
                  aria-pressed={isActive}
                  className={cn(
                    "cursor-pointer stroke-2 transition-cinema outline-none",
                    isActive
                      ? accentActive[district.accent]
                      : accentStroke[district.accent],
                    "hover:opacity-100 focus-visible:stroke-[3]",
                  )}
                  onClick={() => setActiveId(district.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(district.id);
                    }
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <aside className="rounded-lg border border-border bg-surface p-6">
        {active ? (
          <div className="flex flex-col gap-4">
            <Badge
              variant={
                active.accent === "pink"
                  ? "pink"
                  : active.accent === "cyan"
                    ? "cyan"
                    : "gold"
              }
            >
              District
            </Badge>
            <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-paper">
              {active.name}
            </h2>
            <p className="text-sm leading-relaxed text-paper-muted">
              {active.blurb}
            </p>
            <ul className="flex flex-wrap gap-2">
              {active.tags.map((t) => (
                <li key={t}>
                  <Badge variant="outline">{t}</Badge>
                </li>
              ))}
            </ul>
            <Link
              href={active.href}
              className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan hover:text-paper"
            >
              Open world page →
            </Link>
          </div>
        ) : (
          <p className="text-sm text-paper-muted">Select a district on the map.</p>
        )}
      </aside>
    </div>
  );
}
