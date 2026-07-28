import {
  PlaceholderPage,
  makePlaceholderMetadata,
} from "@/components/layouts/placeholder-page";

export const metadata = makePlaceholderMetadata(
  "Media",
  "Trailers and cinematic drops from the fan archive.",
  "/media",
);

export default function MediaPage() {
  return (
    <PlaceholderPage
      title="Media"
      description="Use the home trailer player for now. Full galleries expand next."
      path="/media"
    />
  );
}
