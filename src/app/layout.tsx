import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { AttributionProvider } from "@/components/analytics/AttributionProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tadado.app"),
  alternates: {
    types: {
      "text/plain": "https://tadado.app/llms.txt",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("h-full antialiased", poppins.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AnalyticsScripts />
        <AttributionProvider />
        <TooltipProvider>{children}</TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
