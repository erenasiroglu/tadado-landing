import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Tadado: Taboo, Heads Up, and AI custom decks built for game nights.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#fbaa12",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "#2a0a3b",
            }}
          >
            T
          </div>
          <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1 }}>Tadado</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
          <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            One phone. Your friends. Let the chaos begin.
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,240,207,0.78)" }}>
            Taboo, Heads Up, and AI custom decks built for game nights.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 22,
            fontWeight: 700,
            color: "#fbaa12",
          }}
        >
          <span>GET TADADO · FREE</span>
          <span style={{ color: "rgba(196,181,253,0.8)" }}>·</span>
          <span style={{ color: "rgba(255,240,207,0.72)" }}>No ads · Offline</span>
        </div>
      </div>
    ),
    size,
  );
}
