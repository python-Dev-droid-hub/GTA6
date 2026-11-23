/**
 * Adsterra placements for grandtheftautocity.com
 * @see Adsterra Native Ads Guide — place Native in content body; Social Bar before </body>
 */
export const ADSTERRA = {
  /**
   * Native Banner (`/21/`) — default 4×1 widget.
   * Place the container + script inside article/content body (top/middle/bottom),
   * not in <head>. Should sit with page content so it reads as native.
   */
  native: {
    scriptSrc: "https://bauval.org/21/d94f0590a71ce5f477fe7237918ad0ca",
    containerId: "container-d94f0590a71ce5f477fe7237918ad0ca",
  },
  /**
   * Social Bar (`/14/`) — floating companion unit.
   * Load once near the end of <body>.
   */
  socialBar: {
    scriptSrc: "https://bauval.org/14/9833fe0f395ca962762580334f60240b",
  },
  /**
   * Smartlink (`/4/`) — tracked redirect for booking / Pre-Order CTAs.
   */
  smartlinkHref: "https://araplhn.org/4/50676a7208d2608200cc013acff7eda2",
} as const;

/** @deprecated Use ADSTERRA — kept for any interim imports */
export const AD_NETWORK = {
  primaryScriptSrc: ADSTERRA.native.scriptSrc,
  primaryContainerId: ADSTERRA.native.containerId,
  secondaryScriptSrc: ADSTERRA.socialBar.scriptSrc,
  smartlinkHref: ADSTERRA.smartlinkHref,
} as const;
