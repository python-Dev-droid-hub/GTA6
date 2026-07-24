import type { Metadata } from "next";
import { UltimateHorizontalExperience } from "@/components/ultimate";
import { ultimateEdition } from "@/data/ultimate-edition";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: ultimateEdition.title,
  description: ultimateEdition.subtitle,
  path: "/ultimate",
  image: "/images/ultimate/ultimate-main.png",
  imageAlt: "Grand Theft Auto 6 Ultimate Edition",
});

/**
 * Horizontal L→R Ultimate Edition experience.
 * Placeholder art until high-res assets arrive.
 */
export default function UltimateEditionPage() {
  return (
    <main id="cinematic-root">
      <UltimateHorizontalExperience />
    </main>
  );
}
