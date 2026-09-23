import { GoogleAnalytics } from "./GoogleAnalytics";
import { MetaPixel } from "./MetaPixel";
// import { TikTokPixel } from "./TikTokPixel";

export function AnalyticsScripts() {
  return (
    <>
      <GoogleAnalytics />
      <MetaPixel />
      {/* TikTok pixel disabled: avoids 502 on /api/tiktok-events and pixel content_type console warnings */}
      {/* <TikTokPixel /> */}
    </>
  );
}
