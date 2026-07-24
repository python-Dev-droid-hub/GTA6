"use client";

import { useMemo, useState } from "react";
import { RELEASE_DATE_ISO } from "@/constants/release";
import { cn } from "@/utils/cn";

const PRESETS = [
  { id: "local", label: "Your local time", timeZone: undefined },
  { id: "utc", label: "UTC", timeZone: "UTC" },
  { id: "ny", label: "New York", timeZone: "America/New_York" },
  { id: "la", label: "Los Angeles", timeZone: "America/Los_Angeles" },
  { id: "london", label: "London", timeZone: "Europe/London" },
  { id: "tokyo", label: "Tokyo", timeZone: "Asia/Tokyo" },
  { id: "karachi", label: "Karachi", timeZone: "Asia/Karachi" },
] as const;

function formatInZone(iso: string, timeZone?: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function ReleaseConverter() {
  const [zoneId, setZoneId] = useState<string>("local");
  const selected = PRESETS.find((p) => p.id === zoneId) ?? PRESETS[0];

  const formatted = useMemo(
    () => formatInZone(RELEASE_DATE_ISO, selected.timeZone),
    [selected.timeZone],
  );

  const offsetHint = useMemo(() => {
    const date = new Date(RELEASE_DATE_ISO);
    const local = date.toString();
    return local;
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-paper-faint">
          Source window (UTC)
        </p>
        <p className="font-display text-2xl uppercase tracking-[0.08em] text-paper">
          {RELEASE_DATE_ISO}
        </p>
        <p className="text-sm text-paper-muted">
          Change the global date in <code className="text-neon-cyan">src/constants/release.ts</code> —
          this tool follows automatically.
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-lg border border-border bg-surface p-6">
        <label
          htmlFor="tz-select"
          className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan"
        >
          Timezone
        </label>
        <select
          id="tz-select"
          value={zoneId}
          onChange={(e) => setZoneId(e.target.value)}
          className="h-11 rounded-md border border-border-strong bg-ink-900 px-3 text-sm text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.label}
            </option>
          ))}
        </select>

        <div
          className={cn(
            "rounded-lg border border-vice-pink/30 bg-ink-900/80 p-5",
            "shadow-glow-pink",
          )}
          role="status"
          aria-live="polite"
        >
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-paper-faint">
            Converts to
          </p>
          <p className="mt-2 font-display text-2xl uppercase tracking-[0.06em] text-paper md:text-3xl">
            {formatted}
          </p>
        </div>

        <p className="text-xs text-paper-faint">
          Browser local string check: {offsetHint}
        </p>
      </div>
    </div>
  );
}
