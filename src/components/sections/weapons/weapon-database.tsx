"use client";

import { useMemo, useState } from "react";
import type { WeaponRecord } from "@/types/content";
import { FilterChips } from "@/components/ui/filter-chips";

export type WeaponDatabaseProps = {
  weapons: WeaponRecord[];
  classes: string[];
};

export function WeaponDatabase({ weapons, classes }: WeaponDatabaseProps) {
  const [query, setQuery] = useState("");
  const [activeClass, setActiveClass] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return weapons.filter((w) => {
      const classOk = activeClass === "all" || w.class === activeClass;
      const textOk =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.summary.toLowerCase().includes(q);
      return classOk && textOk;
    });
  }, [weapons, query, activeClass]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <label className="sr-only" htmlFor="weapon-search">
          Search weapons
        </label>
        <input
          id="weapon-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search weapons…"
          className="h-11 w-full rounded-md border border-border-strong bg-ink-900 px-4 text-sm text-paper placeholder:text-paper-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:max-w-sm"
        />
        <FilterChips
          label="Filter by class"
          value={activeClass}
          onChange={setActiveClass}
          options={[
            { value: "all", label: "All" },
            ...classes.map((cls) => ({ value: cls, label: cls })),
          ]}
        />
      </div>

      <p className="text-xs text-paper-faint">
        Showing {filtered.length} of {weapons.length} · relative scores only
      </p>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-ink-900 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-paper-faint">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Class</th>
              <th className="px-4 py-3 font-medium">DMG</th>
              <th className="px-4 py-3 font-medium">Range</th>
              <th className="px-4 py-3 font-medium">Rate</th>
              <th className="px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((weapon) => (
              <tr key={weapon.id} className="border-t border-border align-top">
                <td className="px-4 py-3 font-display uppercase tracking-[0.06em] text-paper">
                  {weapon.name}
                </td>
                <td className="px-4 py-3 text-neon-cyan">{weapon.class}</td>
                <td className="px-4 py-3 tabular-nums text-paper">
                  {weapon.damage}
                </td>
                <td className="px-4 py-3 tabular-nums text-paper">
                  {weapon.range}
                </td>
                <td className="px-4 py-3 tabular-nums text-paper">
                  {weapon.fireRate}
                </td>
                <td className="px-4 py-3 text-paper-muted">{weapon.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-paper-muted">No weapons match that filter.</p>
      ) : null}
    </div>
  );
}
