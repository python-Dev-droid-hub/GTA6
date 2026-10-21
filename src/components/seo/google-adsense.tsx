import Script from "next/script";

const ADSENSE_CLIENT_ID = "ca-pub-1659905027547791";

/**
 * Google AdSense — loads in document head (beforeInteractive) for site verification / Auto ads.
 */
export function GoogleAdSense() {
  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="beforeInteractive"
    />
  );
}
