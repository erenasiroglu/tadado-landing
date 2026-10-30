import { DataFast } from "./DataFast";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { MetaPixel } from "./MetaPixel";
// import { TikTokPixel } from "./TikTokPixel";

export function AnalyticsScripts() {
  return (
    <>
      <GoogleAnalytics />
      <DataFast />
      <MetaPixel />
      {/* TikTok pixel disabled: avoids 502 on /api/tiktok-events and pixel content_type console warnings */}
      {/* <TikTokPixel /> */}
    </>
  );
}
