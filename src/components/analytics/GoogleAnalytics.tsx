import Script from "next/script";

import { GA_MEASUREMENT_ID } from "@/lib/ga4";

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  const isDev = process.env.NODE_ENV === "development";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false,
            allow_google_signals: true,
            allow_ad_personalization_signals: false,
            ${isDev ? "debug_mode: true," : ""}
          });
        `}
      </Script>
    </>
  );
}
