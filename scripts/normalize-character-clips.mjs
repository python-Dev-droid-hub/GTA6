/**
 * Normalize ALL Leonida character scrub clips:
 * - Crop remaining letterbox / blurred side-fill
 * - Scale to 1920x1080
 * - All-intra H.264 for smooth scroll scrub
 * - Refresh matching still posters from first frame
 *
 * Usage: node scripts/normalize-character-clips.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

/** Prefer original bak if present (pre prior crop pass). */
function sourcePath(rel) {
  const src = path.join(root, "public/videos/characters", rel);
  const bak = src.replace(/\.mp4$/i, ".pre-fix.bak.mp4");
  if (fs.existsSync(bak)) return bak;
  return src;
}

/**
 * @type {{ rel: string, crop?: string, still?: string }[]}
 * crop omitted = full frame
 */
const jobs = [
  { rel: "jason/clip-01.mp4" },
  { rel: "jason/clip-02.mp4", still: "jason/04-rifle.jpg" },
  { rel: "lucia/clip-01.mp4" },
  { rel: "lucia/clip-02.mp4", still: "lucia/07-trailer-still.jpg" },
  { rel: "cal/clip-banner.mp4" },
  { rel: "cal/clip-scrub-24.mp4", still: "cal/05-clip2-still.jpg" },
  { rel: "boobie/clip-banner.mp4" },
  // already upgraded; still re-run for consistency from bak if needed
  { rel: "boobie/clip-scrub-05.mp4", still: "boobie/08-clip2-still.jpg" },
  { rel: "drequan/clip-banner-hq.mp4" },
  // Blurred side mirrors — tight center crop
  {
    rel: "drequan/clip-scrub-hq.mp4",
    crop: "960:1080:480:0",
    still: "drequan/07-clip2-still.jpg",
  },
  { rel: "real-dimez/clip-banner.mp4" },
  { rel: "real-dimez/clip-scrub.mp4", still: "real-dimez/06-clip2-still.jpg" },
  { rel: "real-dimez/clip-collage.mp4" },
  { rel: "raul/clip-first-fill.mp4" },
  { rel: "raul/clip-second-fill.mp4", still: "raul/06-clip2-still.jpg" },
  { rel: "brian/clip-banner.mp4" },
  { rel: "brian/clip-scrub-fill.mp4", still: "brian/06-clip2-still.jpg" },
];

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: false });
  if (r.status !== 0) throw new Error(`${cmd} failed (${r.status})`);
}

for (const job of jobs) {
  const out = path.join(root, "public/videos/characters", job.rel);
  const input = sourcePath(job.rel);
  if (!fs.existsSync(input)) {
    console.warn("skip missing", job.rel);
    continue;
  }

  const tmp = out.replace(/\.mp4$/i, ".norm.tmp.mp4");
  const crop = job.crop ?? "iw:ih:0:0";
  const vf = [
    `crop=${crop}`,
    // Cover into 16:9 — never stretch pixels
    "scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos",
    "crop=1920:1080",
    "setsar=1",
    "unsharp=5:5:0.45:5:5:0.0",
    "format=yuv420p",
  ].join(",");

  console.log(`\n→ ${job.rel}  from ${path.basename(input)}  crop=${crop}`);
  run("ffmpeg", [
    "-y",
    "-i",
    input,
    "-an",
    "-vf",
    vf,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "16",
    "-g",
    "1",
    "-keyint_min",
    "1",
    "-sc_threshold",
    "0",
    "-bf",
    "0",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    tmp,
  ]);
  fs.renameSync(tmp, out);

  if (job.still) {
    const stillOut = path.join(root, "public/images/characters", job.still);
    run("ffmpeg", [
      "-y",
      "-ss",
      "0.04",
      "-i",
      out,
      "-frames:v",
      "1",
      "-update",
      "1",
      "-q:v",
      "2",
      stillOut,
    ]);
    console.log(`  still → ${job.still}`);
  }
}

console.log("\nAll character clips normalized to 1080p all-intra.");
