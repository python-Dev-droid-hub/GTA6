import {
  PlaceholderPage,
  makePlaceholderMetadata,
} from "@/components/layouts/placeholder-page";

export const metadata = makePlaceholderMetadata(
  "Media",
  "Trailers, galleries, and downloads — wallpapers live at /wallpapers.",
  "/media",
);

export default function MediaPage() {
  return (
    <PlaceholderPage
      title="Media"
      description="Use the home trailer player for now. Full galleries expand next. Wallpapers are live."
      path="/media"
    />
  );
}
