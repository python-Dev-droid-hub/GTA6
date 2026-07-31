/**
 * Crop letterbox / blurred side-fill off Leonida character scrub clips,
 * then re-encode all-intra H.264 for smooth scroll scrubbing.
 *
 * Usage: node scripts/fix-character-scrub-clips.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

/** @type {{ rel: string, crop: string, outW: number, outH: number, crf?: number }[]} */
const jobs = [
  // Cal — cinematic bars; upscale to 1080 for sharper banners
  {
    rel: "cal/clip-banner.mp4",
    crop: "1280:576:0:72",
    outW: 1920,
    outH: 1080,
    crf: 17,
  },
  {
    rel: "cal/clip-scrub-24.mp4",
    crop: "1280:576:0:72",
    outW: 1920,
    outH: 1080,
    crf: 17,
  },
  // DreQuan — letterbox banner; scrub has blurred side mirrors
  {
    rel: "drequan/clip-banner-hq.mp4",
    crop: "1920:864:0:108",
    outW: 1920,
    outH: 1080,
    crf: 17,
  },
  {
    rel: "drequan/clip-scrub-hq.mp4",
    crop: "1550:1080:185:0",
    outW: 1920,
    outH: 1080,
    crf: 17,
  },
  // Real Dimez — letterbox + uneven framing
  {
    rel: "real-dimez/clip-banner.mp4",
    crop: "1920:864:0:108",
    outW: 1920,
    outH: 1080,
    crf: 17,
  },
  {
    rel: "real-dimez/clip-scrub.mp4",
    crop: "1920:980:0:50",
    outW: 1920,
    outH: 1080,
    crf: 17,
  },
  {
    rel: "real-dimez/clip-collage.mp4",
    crop: "1920:864:0:108",
    outW: 1920,
    outH: 1080,
    crf: 18,
  },
  // Brian — scrub still has top bar despite -fill name
  {
    rel: "brian/clip-scrub-fill.mp4",
    crop: "1920:868:0:212",
    outW: 1920,
    outH: 1080,
    crf: 17,
  },
  // Brian banner — already full frame but 46Mbps; re-pack for smoother decode
  {
    rel: "brian/clip-banner.mp4",
    crop: "1920:1080:0:0",
    outW: 1920,
    outH: 1080,
    crf: 18,
  },
  // Mild polish for Jason / Lucia / Boobie / Raul (full frame → cleaner all-intra)
  {
    rel: "jason/clip-01.mp4",
    crop: "1280:720:0:0",
    outW: 1280,
    outH: 720,
    crf: 18,
  },
  {
    rel: "jason/clip-02.mp4",
    crop: "1280:720:0:0",
    outW: 1280,
    outH: 720,
    crf: 18,
  },
  {
    rel: "lucia/clip-01.mp4",
    crop: "1280:720:0:0",
    outW: 1280,
    outH: 720,
    crf: 18,
  },
  {
    rel: "lucia/clip-02.mp4",
    crop: "1280:720:0:0",
    outW: 1280,
    outH: 720,
    crf: 18,
  },
  {
    rel: "boobie/clip-banner.mp4",
    crop: "1280:720:0:0",
    outW: 1280,
    outH: 720,
    crf: 17,
  },
  {
    rel: "boobie/clip-scrub-05.mp4",
    crop: "1280:720:0:0",
    outW: 1280,
    outH: 720,
    crf: 17,
  },
  {
    rel: "raul/clip-first-fill.mp4",
    crop: "1920:1080:0:0",
    outW: 1920,
    outH: 1080,
    crf: 17,
  },
  {
    rel: "raul/clip-second-fill.mp4",
    crop: "1920:1080:0:0",
    outW: 1920,
    outH: 1080,
    crf: 17,
  },
];

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: false });
  if (r.status !== 0) {
    throw new Error(`${cmd} failed (${r.status})`);
  }
}

function encodeJob(job) {
  const src = path.join(root, "public/videos/characters", job.rel);
  if (!fs.existsSync(src)) {
    console.warn("skip missing", job.rel);
    return;
  }
  const dir = path.dirname(src);
  const base = path.basename(src, ".mp4");
  const tmp = path.join(dir, `${base}.fixed.tmp.mp4`);
  const bak = path.join(dir, `${base}.pre-fix.bak.mp4`);
  const crf = job.crf ?? 18;

  const vf = [
    `crop=${job.crop}`,
    `scale=${job.outW}:${job.outH}:flags=lanczos`,
    "setsar=1",
    "format=yuv420p",
  ].join(",");

  console.log(`\n→ ${job.rel}  crop=${job.crop} → ${job.outW}x${job.outH}`);

  run("ffmpeg", [
    "-y",
    "-i",
    src,
    "-an",
    "-vf",
    vf,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    String(crf),
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

  if (!fs.existsSync(bak)) {
    fs.copyFileSync(src, bak);
  }
  fs.renameSync(tmp, src);
  console.log(`  wrote ${job.rel}`);
}

for (const job of jobs) {
  encodeJob(job);
}

console.log("\nDone. Backups: *.pre-fix.bak.mp4");
