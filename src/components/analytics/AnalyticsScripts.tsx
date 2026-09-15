import { GoogleAnalytics } from "./GoogleAnalytics";
import { MetaPixel } from "./MetaPixel";
import { TikTokPixel } from "./TikTokPixel";

export function AnalyticsScripts() {
  return (
    <>
      <GoogleAnalytics />
      <MetaPixel />
      <TikTokPixel />
    </>
  );
}
