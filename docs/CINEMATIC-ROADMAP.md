# Cinematic Overhaul — Prompt Roadmap

> Use **one prompt per session** (or a contiguous micro-batch if tightly coupled).  
> Always: *Read `PROJECT.md` before changing code.*  
> Do not invent Rockstar assets. Prefer placeholders labeled in data until licensed media lands.

**Status key:** `[ ]` todo · `[~]` in progress · `[x]` done

---

## Phase C0 — Bible & audit (no feature coding)

| ID | Prompt |
|----|--------|
| C0.01 | [x] Author `PROJECT.md` cinematic bible (architecture, budgets, GSAP/Three contracts). |
| C0.02 | [x] Create `.cursor/rules/*.mdc` specialized rules (architecture, gsap, threejs, ui, …). |
| C0.03 | [x] Create this roadmap with atomic prompts. |
| C0.04 | [ ] Audit `/` section order vs cinematic sequence in PROJECT.md; list gaps only (no code). |
| C0.05 | [ ] Inventory current GSAP/Lenis/Three usage; note conflicts (double scroll owners, SSR dynamic, undisposed scenes). |
| C0.06 | [ ] Inventory `/public` media; mark placeholders vs production-ready; note missing hero/character/location plates. |
| C0.07 | [ ] Define home beat map as data (`src/data/home-cinematic-beats.ts`) — ids, copy keys, media refs — static only. |
| C0.08 | [ ] Write reduced-motion acceptance checklist for home (manual QA doc in `docs/qa-reduced-motion.md`). |
| C0.09 | [ ] Legal pass: disclaimer visibility, asset policy notes, no Rockstar binaries in repo. |
| C0.10 | [ ] Freeze C0: update PROJECT.md acceptance checkboxes for audit findings. |

---

## Phase C1 — Foundation hardening

| ID | Prompt |
|----|--------|
| C1.01 | [ ] Audit design tokens vs cinematic UI rule; extend tokens only if gaps block cinema (no drive-by renames). |
| C1.02 | [ ] Ensure display/body/mono fonts load with swap; no FOIT on hero type. |
| C1.03 | [ ] Adapt `SiteHeader` for cinema chrome: minimal, does not fight pinned hero. |
| C1.04 | [ ] Adapt `SiteFooter` for post-cinema landing (skyline accent optional later). |
| C1.05 | [ ] Marketing shell: skip link, main landmark, disclaimer strip intact under cinema. |
| C1.06 | [ ] Spacing scale review for “premium” section rhythm (tokenized). |
| C1.07 | [ ] Button / CTA primitives: sharp AAA, no pill soup. |
| C1.08 | [ ] Section heading primitive: eyebrow + title + one support line pattern. |
| C1.09 | [ ] Container widths: wide cinema vs content reading measure. |
| C1.10 | [ ] Dark theme lock on marketing layout (`data-theme`). |
| C1.11 | [ ] Remove unused decorative card patterns from home first viewport if present. |
| C1.12 | [ ] C1 acceptance: static home chrome matches UI rules without new motion. |

---

## Phase C2 — Motion core

| ID | Prompt |
|----|--------|
| C2.01 | [ ] Verify single `LenisProvider`; fix duplicate Lenis if any. |
| C2.02 | [ ] Sync ScrollTrigger ↔ Lenis (`scrollerProxy` + update hooks); document in island comments. |
| C2.03 | [ ] Shared `usePrefersReducedMotion` gate for all cinema providers. |
| C2.04 | [ ] Boot loader: session-gated, skippable, reduced-motion = instant content. |
| C2.05 | [ ] Boot loader: no heavy assets; CSS/SVG only. |
| C2.06 | [ ] Page transition island: marketing template only; don’t block LCP. |
| C2.07 | [ ] `ScrollReveal` baseline: transform/opacity; kill on unmount. |
| C2.08 | [ ] Shared pin helper utilities (create/destroy) under `animations/scroll/`. |
| C2.09 | [ ] Custom cursor remains fine-pointer + reduced-motion gated (no cinema dependency). |
| C2.10 | [ ] Ambient CSS (grain/glow) budgeted; disable under reduced-motion. |
| C2.11 | [ ] Framer limited to chrome transitions — strip Framer from any cinematic property shared with GSAP. |
| C2.12 | [ ] C2 acceptance: scroll feels owned once; no console ScrollTrigger warnings on navigate. |

---

## Phase C3 — Hero cinema

| ID | Prompt |
|----|--------|
| C3.01 | [x] Static `HeroCinematic` layout: full-bleed media plane + brand + headline + support + CTA. |
| C3.02 | [x] Hero poster as LCP (`priority`, correct `sizes`). |
| C3.03 | [x] Video facade / scroll-scrub: hero.mp4 wired; poster remains LCP. |
| C3.04 | [x] GSAP pinned hero + scroll video scrub (reduced-motion → poster). |
| C3.05 | [ ] Camera-push beat (transform-based) after pin start. |
| C3.06 | [x] Countdown reveal beat wired to `RELEASE_DATE_ISO` only. |
| C3.07 | [x] Scroll cue (accessible, not hover-only). |
| C3.08 | [ ] R3F hero accents island: fog/particles; in-view; `ssr:false` in client module. |
| C3.09 | [ ] Cap DPR + dispose hero Three on unmount. |
| C3.10 | [ ] Hero CTA group: primary + secondary; keyboardable. |
| C3.11 | [ ] Mobile hero: one composition, no cropped critical type. |
| C3.12 | [ ] C3 acceptance: LCP poster; video/WebGL gated; pin works with Lenis. |

---

## Phase C4 — Story chapters

| ID | Prompt |
|----|--------|
| C4.01 | [ ] Static character chapter section (huge media, minimal UI). |
| C4.02 | [ ] Character GSAP transitions island (no card carousel clichés unless justified). |
| C4.03 | [ ] Character optional particle accent (separate Three island, IO gated). |
| C4.04 | [ ] Location / district chapter static layout. |
| C4.05 | [ ] Location pin or horizontal scrub chapter (one technique; document why). |
| C4.06 | [ ] World peek section: compose existing map/world without dumping tools UX mid-cinema. |
| C4.07 | [ ] Story beat strip: spoiler-safe; align with `/story` data. |
| C4.08 | [ ] Ensure chapter copy is crawlable HTML. |
| C4.09 | [ ] Deep links / ids for chapters without breaking pins. |
| C4.10 | [ ] Mobile chapter stacking: no horizontal trap without affordance. |
| C4.11 | [ ] Prefetch next chapter media only when prior nears viewport. |
| C4.12 | [ ] C4 acceptance: chapters feel like acts; tools not interrupting cinema. |

---

## Phase C5 — Trailer, gallery, news rhythm

| ID | Prompt |
|----|--------|
| C5.01 | [ ] Trailer section facade + click-to-load YouTube/video. |
| C5.02 | [ ] Trailer reveal timeline (light GSAP); reduced-motion static. |
| C5.03 | [ ] Gallery section static grid/filmstrip (post-cinema). |
| C5.04 | [ ] Gallery lazy images; no layout shift. |
| C5.05 | [ ] News teaser section: content-first, light reveal only. |
| C5.06 | [ ] Guides teaser strip (links into MDX guides). |
| C5.07 | [ ] Tools CTA section (exit cinema → utility). |
| C5.08 | [ ] Newsletter section a11y + spam-safe API unchanged. |
| C5.09 | [ ] Reorder `page.tsx` to match cinematic sequence. |
| C5.10 | [ ] Remove redundant pre-cinema news/tools if they break rhythm. |
| C5.11 | [ ] Footer transition from last beat (no hard visual cliff). |
| C5.12 | [ ] C5 acceptance: post-cinema utility readable and fast. |

---

## Phase C6 — Inner routes polish

| ID | Prompt |
|----|--------|
| C6.01 | [ ] Characters index: cinematic roster without home-level pin theater. |
| C6.02 | [ ] Character dossier: media + MDX; light motion only. |
| C6.03 | [ ] World page: tour chapters; lazy media. |
| C6.04 | [ ] Story page: reuse beat data; no duplicated timelines. |
| C6.05 | [ ] Media page: trailers/galleries facades. |
| C6.06 | [ ] News index/article: keep CWV; no Three on articles. |
| C6.07 | [ ] Vehicles DB: filters snappy; no cinema pins. |
| C6.08 | [ ] Weapons DB: same as vehicles. |
| C6.09 | [ ] Tools hub cards → map, converter, FPS, PC check. |
| C6.10 | [ ] Interactive map tool: IO + dispose; mobile usable. |
| C6.11 | [ ] Release converter / FPS / PC checker a11y pass. |
| C6.12 | [ ] Search UX: keyboard, no layout jank. |
| C6.13 | [ ] Wallpapers / FAQ polish. |
| C6.14 | [ ] C6 acceptance: inner routes stay “fast utility,” not second home cinema. |

---

## Phase C7 — SEO & accessibility on cinema

| ID | Prompt |
|----|--------|
| C7.01 | [ ] Home metadata: cinematic title/description without keyword stuffing. |
| C7.02 | [ ] JSON-LD still valid with new home structure. |
| C7.03 | [ ] Ensure hero H1 unique and crawlable. |
| C7.04 | [ ] Sitemap includes storytelling routes. |
| C7.05 | [ ] OG image path still sensible for home/share. |
| C7.06 | [ ] Keyboard path through boot → hero CTAs → chapters. |
| C7.07 | [ ] Screen reader: decorative canvases hidden; text alternatives present. |
| C7.08 | [ ] Focus management after skipping boot loader. |
| C7.09 | [ ] Contrast pass on neon type over media (scrims as needed). |
| C7.10 | [ ] Reduced-motion full home walkthrough (doc results). |
| C7.11 | [ ] Disclaimer + legal links visible above the fold chrome. |
| C7.12 | [ ] C7 acceptance: SEO + a11y checklists green. |

---

## Phase C8 — Optimization lock

| ID | Prompt |
|----|--------|
| C8.01 | [ ] Bundle audit: ensure Three not on initial home graph. |
| C8.02 | [ ] Confirm YouTube not in initial HTML. |
| C8.03 | [ ] Image pipeline: AVIF/WebP, `sizes` audit on home. |
| C8.04 | [ ] Video encodes: provide poster + short loop strategy notes in docs. |
| C8.05 | [ ] GSAP: kill all triggers on route change test. |
| C8.06 | [ ] Three: navigate away dispose test (no GPU leak). |
| C8.07 | [ ] Lenis destroy/reinit safety on layout changes. |
| C8.08 | [ ] Prefetch budget: next section only. |
| C8.09 | [ ] Lighthouse production pass (user-requested build only). |
| C8.10 | [ ] Fix CWV regressions from cinema (CLS from pins/fonts/media). |
| C8.11 | [ ] Performance constants updated to match reality. |
| C8.12 | [ ] Final PROJECT.md acceptance checkboxes for cinematic home. |
| C8.13 | [ ] Tag release notes in PROJECT.md (“Cinematic Overhaul shipped”). |

---

## Asset track (parallel, non-blocking)

| ID | Prompt |
|----|--------|
| A.01 | [ ] Source or commission hero plate (legal). |
| A.02 | [ ] Character portraits (legal / original). |
| A.03 | [ ] District / location stills. |
| A.04 | [ ] Trailer poster set. |
| A.05 | [ ] Optional ambient audio bed (muted default). |
| A.06 | [ ] Texture pack for hero Three (small, atlased). |
| A.07 | [ ] Document asset naming in `docs/assets.md`. |

---

## How to run a session

```text
1. Read PROJECT.md
2. Pick the next unchecked ID (e.g. C3.04)
3. Implement ONLY that prompt
4. Mark [x] in this file
5. Stop — do not cascade into the next ID unless asked
```

**Anti-pattern:** “Implement all of Phase C3” in one shot without review.
