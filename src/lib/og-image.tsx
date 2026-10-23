import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Poppins only covers Latin script; other locales fall back to English copy. */
const LATIN_LOCALES = new Set(["en", "tr", "es", "pt-BR", "fr", "de", "id", "it", "pl"]);

export function canRenderOgCopy(locale: string): boolean {
  return LATIN_LOCALES.has(locale);
}

interface OgCopy {
  title: string;
  subtitle: string;
  cta: string;
  footnote: string;
}

export async function renderOgImage(copy: OgCopy) {
  const [icon, poppins500, poppins800] = await Promise.all([
    readFile(join(process.cwd(), "public/images/tadado-og-icon.png")),
    readFile(join(process.cwd(), "src/assets/fonts/Poppins-500.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/Poppins-800.ttf")),
  ]);
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(165deg, #1a0f28 0%, #2a0a3b 45%, #3d1f58 100%)",
          color: "#fff0cf",
          fontFamily: "Poppins",
          fontWeight: 500,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={80} height={80} style={{ borderRadius: 20 }} alt="" />
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>Tadado</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 1000 }}>
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            {copy.title}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,240,207,0.8)" }}>{copy.subtitle}</div>
        </div>

        <div style={{ display: "flex", gap: 12, fontSize: 24, fontWeight: 700, color: "#fbaa12" }}>
          <span>{copy.cta}</span>
          <span style={{ color: "rgba(196,181,253,0.8)" }}>·</span>
          <span style={{ color: "rgba(255,240,207,0.72)" }}>{copy.footnote}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Poppins", data: poppins500, weight: 500, style: "normal" },
        { name: "Poppins", data: poppins800, weight: 800, style: "normal" },
      ],
    },
  );
}
