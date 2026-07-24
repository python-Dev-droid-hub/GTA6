"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

type Tier = "entry" | "mid" | "high" | "ultra";

const GPU_SCORE: Record<Tier, number> = {
  entry: 1,
  mid: 2,
  high: 3,
  ultra: 4,
};

const CPU_SCORE: Record<string, number> = {
  "4c": 1,
  "6c": 2,
  "8c": 3,
  "12c+": 4,
};

const RAM_SCORE: Record<string, number> = {
  "8": 1,
  "16": 2,
  "32": 3,
  "64": 4,
};

function verdict(score: number) {
  if (score >= 10)
    return {
      label: "Very ready (heuristic)",
      tone: "cyan" as const,
      detail: "Strong modern stack for demanding open-world titles — still not a guarantee.",
    };
  if (score >= 7)
    return {
      label: "Likely comfortable",
      tone: "gold" as const,
      detail: "Should handle high settings with tweaks once official specs land.",
    };
  if (score >= 5)
    return {
      label: "Playable with compromise",
      tone: "pink" as const,
      detail: "Expect medium settings / resolution trades. Wait for Rockstar targets.",
    };
  return {
    label: "Upgrade recommended",
    tone: "pink" as const,
    detail: "This setup may struggle. Use official specs when published before buying.",
  };
}

export function PcCompatibilityChecker() {
  const [gpu, setGpu] = useState<Tier>("mid");
  const [cpu, setCpu] = useState("6c");
  const [ram, setRam] = useState("16");
  const [ssd, setSsd] = useState(true);

  const score = useMemo(() => {
    return (
      GPU_SCORE[gpu] +
      CPU_SCORE[cpu] +
      RAM_SCORE[ram] +
      (ssd ? 1 : 0)
    );
  }, [gpu, cpu, ram, ssd]);

  const result = verdict(score);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-6">
        <fieldset className="flex flex-col gap-3">
          <legend className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan">
            GPU tier (approximate)
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(Object.keys(GPU_SCORE) as Tier[]).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setGpu(tier)}
                className={cn(
                  "rounded-md border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em]",
                  gpu === tier
                    ? "border-vice-pink text-vice-pink"
                    : "border-border text-paper-muted",
                )}
                aria-pressed={gpu === tier}
              >
                {tier}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan">
            CPU cores (approx)
          </span>
          <select
            value={cpu}
            onChange={(e) => setCpu(e.target.value)}
            className="h-11 rounded-md border border-border-strong bg-ink-900 px-3 text-sm text-paper"
          >
            <option value="4c">4 cores</option>
            <option value="6c">6 cores</option>
            <option value="8c">8 cores</option>
            <option value="12c+">12+ cores</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan">
            System RAM
          </span>
          <select
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className="h-11 rounded-md border border-border-strong bg-ink-900 px-3 text-sm text-paper"
          >
            <option value="8">8 GB</option>
            <option value="16">16 GB</option>
            <option value="32">32 GB</option>
            <option value="64">64 GB+</option>
          </select>
        </label>

        <label className="flex items-center gap-3 text-sm text-paper-muted">
          <input
            type="checkbox"
            checked={ssd}
            onChange={(e) => setSsd(e.target.checked)}
            className="size-4 accent-[var(--vice-pink)]"
          />
          SSD / NVMe install drive
        </label>
      </form>

      <div className="flex flex-col gap-4 rounded-lg border border-border bg-ink-900 p-6">
        <Badge variant={result.tone}>{result.label}</Badge>
        <p className="font-display text-4xl text-paper">{score}/13</p>
        <p className="text-sm leading-relaxed text-paper-muted">{result.detail}</p>
        <p className="text-xs text-paper-faint">
          Heuristic only. No official GTA VI PC requirements are published here.
        </p>
      </div>
    </div>
  );
}
