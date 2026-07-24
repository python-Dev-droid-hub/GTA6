"use client";

import { useMemo, useState } from "react";

const PRESETS = [30, 60, 90, 120, 144, 165, 240] as const;

export function FpsCalculator() {
  const [fps, setFps] = useState(60);

  const frameMs = useMemo(() => {
    if (fps <= 0) return 0;
    return 1000 / fps;
  }, [fps]);

  const budget = useMemo(() => {
    return {
      safe: frameMs * 0.7,
      tight: frameMs * 0.9,
    };
  }, [frameMs]);

  return (
    <div className="flex flex-col gap-8">
      <p className="max-w-2xl text-sm text-paper-muted">
        This is frame-time arithmetic, not a hardware benchmark. Use it to understand
        how much time each frame has at a target refresh rate.
      </p>

      <div className="flex flex-wrap gap-2" role="group" aria-label="FPS presets">
        {PRESETS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFps(value)}
            className={`rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] transition-cinema ${
              fps === value
                ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                : "border-border text-paper-muted hover:text-paper"
            }`}
            aria-pressed={fps === value}
          >
            {value} FPS
          </button>
        ))}
      </div>

      <label className="flex max-w-md flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan">
          Target FPS
        </span>
        <input
          type="number"
          min={1}
          max={480}
          value={fps}
          onChange={(e) => setFps(Number(e.target.value) || 0)}
          className="h-11 rounded-md border border-border-strong bg-ink-900 px-4 text-sm text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
      </label>

      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-5">
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-faint">
            Frame time
          </dt>
          <dd className="mt-2 font-display text-3xl text-paper">
            {frameMs.toFixed(2)}
            <span className="ml-1 text-base text-paper-muted">ms</span>
          </dd>
        </div>
        <div className="rounded-lg border border-border bg-surface p-5">
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-faint">
            Comfortable budget (~70%)
          </dt>
          <dd className="mt-2 font-display text-3xl text-neon-cyan">
            {budget.safe.toFixed(2)}
            <span className="ml-1 text-base text-paper-muted">ms</span>
          </dd>
        </div>
        <div className="rounded-lg border border-border bg-surface p-5">
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper-faint">
            Tight budget (~90%)
          </dt>
          <dd className="mt-2 font-display text-3xl text-vice-pink">
            {budget.tight.toFixed(2)}
            <span className="ml-1 text-base text-paper-muted">ms</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
