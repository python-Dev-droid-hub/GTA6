import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WallpaperGallery } from "@/components/sections/media/wallpaper-gallery";
import { wallpapers } from "@/data/wallpapers";
import { buildMetadata } from "@/lib/seo/metadata";
import { spacing } from "@/constants/design";

export const metadata = buildMetadata({
  title: "Wallpapers",
  description: "Fan key art wallpapers from the Vice City visual kit.",
  path: "/wallpapers",
});

export default function WallpapersPage() {
  return (
    <main>
      <Container size="wide" className={spacing.sectionY}>
        <SectionHeading
          headingId="wallpapers-heading"
          eyebrow="Media"
          title="Wallpapers"
          description="Download fan-made key art. Not official Rockstar assets."
        />
        <div className="mt-12">
          <WallpaperGallery items={wallpapers} />
        </div>
      </Container>
    </main>
  );
}
