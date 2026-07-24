"use client";

import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterChipsProps = {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/** Reusable filter chip row for tools + databases. */
export function FilterChips({
  label,
  options,
  value,
  onChange,
  className,
}: FilterChipsProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      role="group"
      aria-label={label}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={cn(
              "rounded-md border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-cinema",
              active
                ? "border-vice-pink bg-vice-pink/15 text-vice-pink"
                : "border-border text-paper-muted hover:border-border-strong hover:text-paper",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function useFilterValue(initial = "all") {
  const [value, setValue] = useState(initial);
  return useMemo(() => ({ value, setValue }), [value]);
}
