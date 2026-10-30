import Script from "next/script";

/** Loads on every page via {@link AnalyticsScripts} in locale + legacy root layouts. */
export function DataFast() {
  return (
    <Script
      id="datafast"
      src="https://datafa.st/js/script.js"
      strategy="afterInteractive"
      data-website-id="dfid_saWrOzJaNWyUNckVybDHf"
      data-domain="tadado.app"
    />
  );
}
