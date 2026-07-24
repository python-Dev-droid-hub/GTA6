import {
  PlaceholderPage,
  makePlaceholderMetadata,
} from "@/components/layouts/placeholder-page";

export const metadata = makePlaceholderMetadata(
  "Terms",
  "Terms of use placeholder — expand in Phase 3 legal pass.",
  "/legal/terms",
);

export default function TermsPage() {
  return (
    <PlaceholderPage
      title="Terms"
      description="Terms of use placeholder — expand in Phase 3 legal pass."
      path="/legal/terms"
    />
  );
}
