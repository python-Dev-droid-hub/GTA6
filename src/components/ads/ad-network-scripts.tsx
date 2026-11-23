import { AdsterraSocialBar } from "@/components/ads/adsterra-social-bar";

/**
 * Sitewide Adsterra scripts that belong at the end of <body>.
 * Native Banner is mounted inside content (articles / news) per the placement guide.
 */
export function AdNetworkScripts() {
  return <AdsterraSocialBar />;
}
