"use client";

import { useMemo, useState } from "react";
import type { VehicleRecord } from "@/types/content";
import { FilterChips } from "@/components/ui/filter-chips";

export type VehicleDatabaseProps = {
  vehicles: VehicleRecord[];
  classes: string[];
};

export function VehicleDatabase({ vehicles, classes }: VehicleDatabaseProps) {
  const [query, setQuery] = useState("");
  const [activeClass, setActiveClass] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vehicles.filter((v) => {
      const classOk = activeClass === "all" || v.class === activeClass;
      const textOk =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.summary.toLowerCase().includes(q);
      return classOk && textOk;
    });
  }, [vehicles, query, activeClass]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <label className="sr-only" htmlFor="vehicle-search">
          Search vehicles
        </label>
        <input
          id="vehicle-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vehicles…"
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
        Showing {filtered.length} of {vehicles.length} · stats are fan placeholders
        (1–10), not official.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((vehicle) => (
          <li
            key={vehicle.id}
            className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg uppercase tracking-[0.08em] text-paper">
                {vehicle.name}
              </h3>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-neon-cyan">
                {vehicle.class}
              </span>
            </div>
            <p className="text-sm text-paper-muted">{vehicle.summary}</p>
            <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper-faint">
                  Speed
                </dt>
                <dd className="font-display text-xl text-paper">{vehicle.speed}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper-faint">
                  Handle
                </dt>
                <dd className="font-display text-xl text-paper">
                  {vehicle.handling}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper-faint">
                  Seats
                </dt>
                <dd className="font-display text-xl text-paper">{vehicle.seats}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="text-sm text-paper-muted">No vehicles match that filter.</p>
      ) : null}
    </div>
  );
}
