import { AD_NETWORK } from "@/constants/ads";

/**
 * Partner ad mount + scripts. Raw <script> tags so the network
 * sees a literal src (same pattern as AdSense in root layout).
 */
export function AdNetworkScripts() {
  return (
    <>
      <div
        id={AD_NETWORK.primaryContainerId}
        className="mx-auto w-full max-w-[1100px] px-4 py-4"
        aria-hidden
      />
      <script
        async
        data-cfasync="false"
        src={AD_NETWORK.primaryScriptSrc}
        // Partner snippet requests high fetch priority
        {...{ fetchpriority: "high" }}
      />
      <script
        async
        data-cfasync="false"
        src={AD_NETWORK.secondaryScriptSrc}
      />
    </>
  );
}
