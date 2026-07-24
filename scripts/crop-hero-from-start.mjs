/**
 * Crop hero clip by SKIPPING the start (keep the end), then extract frames.
 * Usage: node scripts/crop-hero-from-start.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const full = path.join(root, "public", "videos", "hero-source-full.mp4");
const download = path.join(
  process.env.USERPROFILE || "",
  "Downloads",
  "Lucia_Caminos_Video_Clip.mp4",
);
const input = fs.existsSync(full) ? full : download;
const outMp4 = path.join(root, "public", "videos", "hero.mp4");
const outDir = path.join(root, "public", "videos", "hero-frames");
const manifest = path.join(root, "src", "data", "hero-scrub-frames.ts");

/** Seconds to remove from the beginning */
const SKIP_START = 0.85;
/** Seconds to keep after the skip */
const KEEP = 0.65;
const FPS = 60;
const WIDTH = 1280;
const VER = "tail085";

if (!fs.existsSync(input)) {
  console.error("Missing source", input);
  process.exit(1);
}

console.log(`Source: ${input}`);
console.log(`Skip first ${SKIP_START}s → keep next ${KEEP}s`);

execFileSync(
  "ffmpeg",
  [
    "-y",
    "-ss",
    String(SKIP_START),
    "-i",
    input,
    "-t",
    String(KEEP),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-an",
    "-movflags",
    "+faststart",
    outMp4,
  ],
  { stdio: "inherit" },
);

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

execFileSync(
  "ffmpeg",
  [
    "-y",
    "-i",
    outMp4,
    "-vf",
    `fps=${FPS},scale=${WIDTH}:-1:flags=lanczos`,
    "-c:v",
    "libwebp",
    "-quality",
    "72",
    path.join(outDir, "frame_%04d.webp"),
  ],
  { stdio: "inherit" },
);

const files = fs
  .readdirSync(outDir)
  .filter((f) => f.endsWith(".webp"))
  .sort();

const urls = files.map((f) => `/videos/hero-frames/${f}?v=${VER}`);
const source = `/**
 * Crop FROM START: skipped first ${SKIP_START}s, kept ${KEEP}s (end of clip).
 * Frames: ${files.length}
 */
export const heroScrubFrames = ${JSON.stringify(urls, null, 2)} as const;

export const heroScrubMeta = {
  count: ${files.length},
  fps: ${FPS},
  width: ${WIDTH},
  skipStartSeconds: ${SKIP_START},
  keepSeconds: ${KEEP},
  version: "${VER}",
} as const;
`;

fs.writeFileSync(manifest, source, "utf8");
console.log(`Wrote ${files.length} frames, manifest updated.`);
