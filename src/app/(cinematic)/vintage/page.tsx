import type { Metadata } from "next";
import { VintageHorizontalExperience } from "@/components/vintage";
import { vintageCityPark } from "@/data/vintage-city-park";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: vintageCityPark.title,
  description: vintageCityPark.subtitle,
  path: "/vintage",
  image: "/images/ultimate/ultimate-main.png",
  imageAlt: "Grand Theft Auto 6 Vintage City Park",
});

/**
 * Horizontal L→R Vintage City Park experience.
 */
export default function VintageCityParkPage() {
  return (
    <main id="cinematic-root">
      <VintageHorizontalExperience />
    </main>
  );
}
