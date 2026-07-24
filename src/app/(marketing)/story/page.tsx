import Image from "next/image";
import { CharacterSection } from "@/components/experience/character-section";
import { cinematicCharacters } from "@/data/cinematic-characters";
import { buildMetadata } from "@/lib/seo/metadata";
import { legal } from "@/constants/legal";

export const metadata = buildMetadata({
  title: "Story — Character Cinema",
  description:
    "Scroll-driven character showcase — parallax chapters, quotes, and click-to-play clips. Unofficial fan archive.",
  path: "/story",
});

/**
 * Leonida-style character cinema (Palmneon).
 * Lenis comes from marketing experience providers — do not nest another instance.
 */
export default function StoryPage() {
  return (
    <main className="bg-ink-950">
      {/* Prefetch upcoming chapter plates (skip first — already priority) */}
      <div className="pointer-events-none absolute size-0 overflow-hidden opacity-0" aria-hidden>
        {cinematicCharacters.slice(1).map((c) => (
          <Image key={c.id} src={c.bgImage} alt="" width={16} height={16} />
        ))}
      </div>

      <header className="relative z-10 mx-auto max-w-3xl px-6 pb-10 pt-28 text-center md:pt-32">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-neon-cyan">
          Only on the coast
        </p>
        <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.08em] text-paper sm:text-4xl md:text-5xl lg:text-6xl">
          Character cinema
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-paper-muted md:text-base">
          Full-viewport chapters with parallax depth, dialogue crossfades, and
          click-to-play clips. Fan archive — not affiliated with Rockstar.
        </p>
      </header>

      {cinematicCharacters.map((character) => (
        <CharacterSection key={character.id} {...character} />
      ))}

      <p className="mx-auto max-w-2xl px-6 py-16 text-center font-mono text-[0.65rem] leading-relaxed tracking-wide text-paper-faint">
        {legal.shortDisclaimer}
      </p>
    </main>
  );
}
