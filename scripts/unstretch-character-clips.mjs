/**
 * Re-encode Leonida character clips WITHOUT stretch.
 * Pipeline: optional letterbox/side-fill crop → cover into 1920x1080
 * (force_original_aspect_ratio=increase + center crop).
 *
 * Usage: node scripts/unstretch-character-clips.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const OUT_W = 1920;
const OUT_H = 1080;

function sourcePath(rel) {
  const src = path.join(root, "public/videos/characters", rel);
  const bak = src.replace(/\.mp4$/i, ".pre-fix.bak.mp4");
  // Prefer earliest good source: bak if present, else current
  if (fs.existsSync(bak)) return bak;
  return src;
}

/**
 * Pre-crop only to remove black bars / blurred side mirrors.
 * Must NOT be followed by naive scale-to-fill — we cover instead.
 * @type {{ rel: string, crop?: string, still?: string }[]}
 */
const jobs = [
  { rel: "jason/clip-01.mp4" },
  { rel: "jason/clip-02.mp4", still: "jason/04-rifle.jpg" },
  { rel: "lucia/clip-01.mp4" },
  { rel: "lucia/clip-02.mp4", still: "lucia/07-trailer-still.jpg" },
  // Cal — cinematic letterbox on source
  { rel: "cal/clip-banner.mp4", crop: "1280:576:0:72" },
  { rel: "cal/clip-scrub-24.mp4", crop: "1280:576:0:72", still: "cal/05-clip2-still.jpg" },
  { rel: "boobie/clip-banner.mp4" },
  { rel: "boobie/clip-scrub-05.mp4", still: "boobie/08-clip2-still.jpg" },
  // DreQuan — top/bottom letterbox on banner; side blur mirrors on scrub
  { rel: "drequan/clip-banner-hq.mp4", crop: "1920:864:0:108" },
  {
    rel: "drequan/clip-scrub-hq.mp4",
    // Portrait plate with blurred side mirrors on source — crop to true content
    crop: "960:1080:480:0",
    still: "drequan/07-clip2-still.jpg",
  },
  { rel: "real-dimez/clip-banner.mp4", crop: "1920:864:0:108" },
  { rel: "real-dimez/clip-scrub.mp4", crop: "1920:980:0:50", still: "real-dimez/06-clip2-still.jpg" },
  { rel: "real-dimez/clip-collage.mp4", crop: "1920:864:0:108" },
  { rel: "raul/clip-first-fill.mp4" },
  { rel: "raul/clip-second-fill.mp4", still: "raul/06-clip2-still.jpg" },
  { rel: "brian/clip-banner.mp4" },
  {
    rel: "brian/clip-scrub-fill.mp4",
    crop: "1920:868:0:212",
    still: "brian/06-clip2-still.jpg",
  },
];

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: false });
  if (r.status !== 0) throw new Error(`${cmd} failed (${r.status})`);
}

function buildVf(crop) {
  const parts = [];
  if (crop) parts.push(`crop=${crop}`);
  // Cover: never stretch — scale up until both axes covered, then center-crop
  parts.push(
    `scale=${OUT_W}:${OUT_H}:force_original_aspect_ratio=increase:flags=lanczos`,
  );
  parts.push(`crop=${OUT_W}:${OUT_H}`);
  parts.push("setsar=1");
  parts.push("format=yuv420p");
  return parts.join(",");
}

for (const job of jobs) {
  const out = path.join(root, "public/videos/characters", job.rel);
  const input = sourcePath(job.rel);
  if (!fs.existsSync(input)) {
    console.warn("skip missing", job.rel);
    continue;
  }

  const tmp = out.replace(/\.mp4$/i, ".unstretch.tmp.mp4");
  const vf = buildVf(job.crop);
  console.log(`\n→ ${job.rel}`);
  console.log(`  in=${path.basename(input)}  vf=${vf}`);

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

console.log("\nDone — all clips cover-fit to 1920x1080 with no stretch.");
