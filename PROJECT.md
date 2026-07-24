# PROJECT.md — Vice City Cinematic Fan Experience

> **Session protocol:** Read this file before generating or modifying code.  
> **Machine mirrors:** `.cursor/rules/*.mdc`  
> **Implementation prompts:** `docs/CINEMATIC-ROADMAP.md`  
> Unofficial fan site — **not affiliated with Rockstar Games or Take-Two Interactive**.

---

## 0. Reality contract (non-negotiable)

### Inspiration vs imitation

We study the **interaction style** of Rockstar’s [Only in Leonida](https://www.rockstargames.com/VI/only-in-leonida) experience:

- Scroll-as-cinema pacing  
- Character-forward storytelling  
- Huge media, minimal chrome  
- Location tours that feel like chapters  

We do **not**:

- Copy Rockstar source, shaders, bundles, or proprietary assets  
- Rip trailers, audio, 3D models, or brand marks without legal clearance  
- Claim official status  

We recreate **rhythm, polish, and storytelling craft** with **original code, licensed/original media, and fan-safe copy**.

### Quality ceiling (honest)

| Layer | Achievable with this stack | Not achievable without Rockstar’s pipeline |
|--------|----------------------------|--------------------------------------------|
| Scroll storytelling / GSAP craft | Very high | — |
| UI typography & composition | Very high | — |
| WebGL accents (fog, particles, neon) | High | Full-scene cinematic engines |
| Hero video fidelity | As good as **our** encodes | Their 4K masters + CDN |
| “Feels like a game intro” | Yes, if disciplined | Pixel-identical clone — no |

**Target:** 95%+ of the *premium feel* (pacing, restraint, polish).  
**Not a target:** Bit-for-bit parity with Rockstar’s experience.

### Codebase status

Phases 1–6 of the **content / tools fan site** are already shipped.  
This bible governs **Cinematic Overhaul (Phases C0–C8)** — elevating the homepage into a scroll-cinema sequence without discarding the working content architecture.

Do **not** greenfield-restructure into a fantasy folder tree. Keep **Next.js App Router** under `src/`.

---

## 1. Product vision

A premium AAA-style **GTA VI / Vice City fan website**: cinematic homepage, media hubs, databases, and interactive tools.

**Tone:** Dark neon, condensed display type, huge media, sparse UI, restrained motion.  
**Not:** Blog template, SaaS marketing page, or purple-gradient AI landing.

**Homepage metaphor:** Game intro, not article list.

```
Boot / Loading
  → WebGL intro beat (optional, gated)
  → Pinned hero (media + brand)
  → Camera / depth push
  → Countdown reveal
  → Character cinematic
  → Location / world reveal
  → Interactive Vice City beat
  → Trailer
  → Gallery
  → News
  → Guides teaser
  → Tools CTA
  → Newsletter
  → Footer
```

Inner routes (news, tools, databases) stay **useful and fast**. Cinematic density lives primarily on `/` and selected storytelling routes (`/story`, `/world`, character dossiers).

---

## 2. Tech stack

| Layer | Choice | Role |
|--------|--------|------|
| Framework | Next.js 15 App Router | Routes, RSC, metadata |
| UI | React 19, TypeScript, Tailwind CSS v4 | Composition + tokens |
| Scroll | Lenis (one global instance) | Smooth scroll |
| Cinematic motion | GSAP + ScrollTrigger | Pins, timelines, scrub |
| Micro UI | Framer Motion | Page/UI enter-exit only |
| 3D | Three.js + R3F + drei + custom GLSL | Accents, never whole page |
| Content | MDX → Sanity later if needed | Articles, characters, guides |
| Primitives | CVA, clsx, tailwind-merge, Lucide | UI system |
| Deploy | Vercel | Edge + image optimization |

Release date single source: `src/constants/release.ts` (`RELEASE_DATE_ISO`).  
Site URL: `NEXT_PUBLIC_SITE_URL` + `src/constants/site.ts`.

---

## 3. Architecture

### Principles

1. **Server Components by default.** `"use client"` only for animation, Three, browser APIs, or stateful tools.  
2. **Thin pages.** `page.tsx` composes sections; no business logic blobs.  
3. **Animation islands.** Timelines live in `components/animations/*`. Sections import wrappers; they never own GSAP.  
4. **One scroll owner.** Lenis once. ScrollTrigger synced via `scrollerProxy` when Lenis is active.  
5. **Three enhances, never owns the site.** Fog, particles, neon, map accents — not the entire homepage as a canvas.  
6. **Explain why** before non-obvious implementations (1–3 sentences).  
7. **Legal copy always visible** — disclaimer in chrome + `/legal/*`.

### Real folder structure (source of truth)

```text
gta-vice-city-6/
├── .cursor/rules/          # Agent rules (*.mdc)
├── PROJECT.md              # This bible
├── docs/
│   └── CINEMATIC-ROADMAP.md
├── content/                # MDX source (not public)
├── public/                 # Binaries only
│   ├── images/
│   ├── videos/
│   ├── textures/
│   └── models/
├── shaders/                # Shared GLSL (imported by R3F)
└── src/
    ├── app/                # Routes only (App Router)
    ├── components/
    │   ├── ui/
    │   ├── layouts/
    │   ├── sections/{domain}/
    │   ├── animations/{hero,scroll,three,providers,ui-motion}/
    │   ├── tools/
    │   ├── mdx/
    │   └── seo/
    ├── providers/
    ├── hooks/
    ├── lib/
    ├── data/
    ├── constants/
    ├── types/
    ├── utils/
    └── styles/
```

**Rejected layout:** Flat `app/`, `components/`, `sections/` at repo root (breaks App Router conventions already in use).

### Route map

```text
/                     Cinematic home
/characters           Roster
/characters/[slug]    Dossier
/world                Vice City tour
/media                Trailers & galleries
/story                Narrative beats
/news                 Index
/news/[slug]          Article
/tools                Hub
/tools/*              Map, converters, FPS, PC check, …
/legal/*              Disclaimer, privacy, terms
/api/og|search|newsletter|revalidate
/feed.xml
```

---

## 4. Cinematic homepage contract

### Sequence ownership

| Beat | Primary tech | Notes |
|------|--------------|--------|
| Boot loader | Client island | Session-gated; skippable; reduced-motion = instant |
| WebGL intro | R3F | Optional; never blocks content; dispose after exit |
| Pinned hero | GSAP ScrollTrigger | Poster LCP; video secondary |
| Camera push | GSAP + optional shader uniforms | Transform/opacity + subtle Three uniforms |
| Countdown | GSAP | Reads `RELEASE_DATE_ISO` only |
| Characters | GSAP + media | Huge portraits; no card grids in first viewport |
| Locations | GSAP horizontal or pin | Chapter feel |
| Interactive map peek | Client island | Lazy; IO gated |
| Trailer | Facade → click-to-load | No YouTube on first paint |
| Gallery / News / Tools / Newsletter | Mostly static + light reveal | Utility after cinema |

### Design language

- Cinematic, minimal chrome  
- Large typography (Barlow Condensed display)  
- Huge media, premium spacing  
- Dark neon palette (tokens in `src/styles/tokens.css`)  
- Soft atmospheric gradients; glass only where it aids hierarchy  
- Sharp radii (2–12px), not SaaS pills  
- **First viewport budget:** brand, one headline, one line support, one CTA group, one dominant media plane — no stats strips, card grids, or promo chips on the hero  

### Motion philosophy

- Timeline-driven cinematic motion → **GSAP**  
- Simple hover / focus → **CSS** allowed  
- Page/UI chrome transitions → **Framer Motion**  
- **Never** drive the same property with GSAP + Framer + CSS at once  
- `prefers-reduced-motion`: skip Lenis smooth, skip pins/scrubs, show static final frames  

---

## 5. GSAP rules

### Owns

ScrollTrigger, pinning, camera-like pushes, text reveals / SplitText (if licensed), fades, image scale, horizontal chapters, timeline sync, video scrub (when used), counters, character transitions, nav cinematic beats.

### Must

- Live in animation islands only  
- `gsap.context()` + kill on unmount  
- Register plugins once  
- Sync with Lenis when both active  
- Prefer `transform` / `opacity`  
- One major pin sequence on home at a time (budget); nested pins need explicit justification  

### Must not

- Import GSAP into Server Components  
- Animate layout properties (`top`, `height`, `width`) for cinema  
- Leave ScrollTriggers alive after route change  
- Use GSAP for trivial button hover  

---

## 6. Three.js / R3F rules

### Owns (accents only)

| Surface | Allowed |
|---------|---------|
| Hero | Fog, neon particles, rain, dust, lens glow, light shafts |
| Characters | Soft particles / depth aids |
| World / skyline | Low-poly or stylized peek — not full city sim |
| Map | Interactive 3D or hybrid 2D/3D accents |
| Footer | Optional subtle skyline loop |

### Must

- `dynamic(..., { ssr: false })` **inside Client Components only**  
- Mount on Intersection Observer / in-view  
- Cap DPR (see `constants/performance.ts`)  
- Dispose geometries, materials, textures, renderer on unmount  
- Fail soft if WebGL unavailable  

### Must not

- Render the entire page as a canvas  
- Load all textures/models up front  
- Run continuous RAF when offscreen  
- Block LCP / main thread on first paint  

Shaders live in `/shaders` or colocated `*.glsl` / template strings — documented uniforms, no mystery magic numbers without comments.

---

## 7. Performance budget

| Metric | Target |
|--------|--------|
| Lighthouse Perf / A11y / BP / SEO | **> 90** |
| LCP | ≤ 2.5s — **poster**, never video/WebGL |
| CLS | ≤ 0.1 |
| Home initial JS | No Three, no YouTube iframe until needed |
| WebGL | In-view only; dispose offscreen |

### Media pipeline (mandatory)

```text
Intersection Observer
  → Lazy load
  → Preload next section (optional, budgeted)
  → Pause / dispose when leaving view
```

- Never auto-load all videos  
- Never preload every texture  
- Facades for trailers  
- `next/image` with correct `sizes`; AVIF/WebP  

---

## 8. Coding standards

- TypeScript strict; no `any`  
- Named exports for components; default only for `page` / `layout`  
- `cn()` for classes  
- **No inline `style={{}}`** unless a library forces runtime values (document why)  
- Semantic HTML; one `h1` per page  
- Mobile-first  
- One responsibility per component  
- Reuse over copy-paste  

### Naming

| Kind | Pattern | Example |
|------|---------|---------|
| Primitive | PascalCase noun | `Button`, `Glass` |
| Layout | `Site` + role | `SiteHeader` |
| Section | Domain + purpose | `HeroCinematic` |
| Animation island | Verb + concern | `HeroIntroTimeline` |
| Hook | `use` + concern | `useCountdown` |
| Data | kebab file, camel export | `home-hero.ts` → `homeHero` |

### Animation development workflow (strict)

1. Static UI  
2. Responsive  
3. Accessibility  
4. GSAP / Three  
5. Performance  
6. Cross-browser  

Do not polish motion to hide layout bugs.

---

## 9. UI / design system

- **Fonts:** Barlow Condensed (display), DM Sans (body), IBM Plex Mono (meta)  
- **Palette:** ink blacks, warm paper text, vice pink, neon cyan, sunset, gold  
- **Tokens:** `src/styles/tokens.css` → Tailwind `@theme`  
- **Dark-first** (`data-theme="dark"`)  
- Avoid: purple SaaS gradients, cream-serif terracotta clichés, emoji decoration, card soup in heroes  

Glassmorphism: rare, purposeful (nav, overlays) — not every surface.

---

## 10. Accessibility

- Skip link + `main` landmark  
- Keyboard for all interactive controls  
- Focus visible  
- Contrast AA minimum  
- `prefers-reduced-motion` honored globally (Lenis, GSAP, Three, boot)  
- Canvas/WebGL never the only carrier of critical text  
- Captions/transcripts for meaningful video when we control the file  

---

## 11. SEO

- Unique metadata via `buildMetadata`  
- Canonical + OG + Twitter  
- `sitemap.ts` / `robots.ts` / `/feed.xml`  
- JSON-LD (WebSite, Organization fan entity, Article, FAQ, Person, Breadcrumb, ItemList)  
- Crawlable HTML text for primary story beats  
- Visible unofficial disclaimer  

---

## 12. Assets policy

### Required quality bar (when assets exist)

- Video: short loops + hero plates; encode for web (not raw 4K dumps on critical path)  
- Images: Ultra HD sources → optimized WebP/AVIF delivery  
- Audio: optional ambient; **muted by default**; user toggle; respect reduced motion / autoplay policies  

### Legal

- Prefer original, licensed, or clearly fan-safe media  
- Do not scrape Rockstar CDN assets into the repo  
- Placeholder posters are OK until real media lands — label placeholders in data  

Asset folders: `public/images`, `public/videos`, `public/textures`, `public/models`.

---

## 13. Development phases (Cinematic Overhaul)

Prior content phases (1–6) remain complete. New work tracks **C-phases**:

| Phase | Focus |
|-------|--------|
| **C0** | Bible + rules + audit current home vs cinematic sequence |
| **C1** | Foundation hardening (tokens, nav/footer for cinema chrome) |
| **C2** | Motion core (Lenis sync, ScrollTrigger kit, boot, transitions) |
| **C3** | Hero cinema (pin, video facade, Three accents, countdown) |
| **C4** | Story chapters (characters, locations, world peek) |
| **C5** | Trailer / gallery / news rhythm after cinema |
| **C6** | Tools & content pages polish (keep fast; light motion) |
| **C7** | SEO / a11y / CWV pass on cinematic home |
| **C8** | Optimization — dispose, budgets, Lighthouse lock |

Detailed prompts: `docs/CINEMATIC-ROADMAP.md`.

---

## 14. Agent operating system

### Every coding session

1. Read **this** `PROJECT.md`  
2. Obey matching `.cursor/rules/*.mdc` for touched files  
3. Take **one** roadmap prompt (or explicitly scoped task)  
4. Prefer small PRs / commits over mega-diffs  
5. Do not invent Rockstar assets or claim affiliation  

### Prompt system (why not one giant prompt)

| Artifact | Job |
|----------|-----|
| `PROJECT.md` | Vision, architecture, budgets, contracts |
| `.cursor/rules/*.mdc` | Always-on / file-scoped enforcement |
| `docs/CINEMATIC-ROADMAP.md` | 80–100 atomic implementation prompts |

Cursor is more consistent with **stable bible + focused tasks** than a single 5k-word paste every time.

### When docs disagree

**`PROJECT.md` wins.** Update rules and roadmap in the same change.

---

## 15. Acceptance bar (cinematic home)

- [ ] Sequence reads as intro cinema, not card stack  
- [ ] LCP is poster/image; video/WebGL gated  
- [ ] Reduced-motion path is complete and tested  
- [ ] Lenis + ScrollTrigger do not fight  
- [ ] Three scenes dispose; no permanent GPU leak on navigate away  
- [ ] Lighthouse categories > 90 on production build  
- [ ] Disclaimer visible; no stolen Rockstar binaries in repo  
- [ ] Inner content routes remain fast and usable  

---

## 16. Cursor rules index

| File | Scope |
|------|--------|
| `architecture.mdc` | RSC, folders, islands |
| `animations.mdc` | Motion workflow + library roles |
| `gsap.mdc` | ScrollTrigger / timelines |
| `threejs.mdc` | R3F / WebGL / shaders |
| `ui.mdc` | Design language / tokens |
| `components.mdc` | Naming / composition |
| `performance.mdc` | Budgets / lazy / dispose |
| `coding.mdc` | TS / React / Tailwind |
| `seo.mdc` | Metadata / JSON-LD |
| `accessibility.mdc` | A11y + reduced motion |
| `project.mdc` | Always-apply pointer to this bible |
