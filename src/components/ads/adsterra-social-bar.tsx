import { ADSTERRA } from "@/constants/ads";

/**
 * Adsterra Social Bar — load once near the end of <body>.
 * Renders as a floating companion bar (separate from Native Banner).
 */
export function AdsterraSocialBar() {
  return (
    <script
      async
      data-cfasync="false"
      src={ADSTERRA.socialBar.scriptSrc}
      data-ad-network="adsterra"
      data-ad-format="social-bar"
    />
  );
}
