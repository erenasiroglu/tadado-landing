import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tadado",
    short_name: "Tadado",
    description: "Taboo, Heads Up, and AI custom decks built for game nights.",
    start_url: "/en",
    display: "standalone",
    background_color: "#1A0F28",
    theme_color: "#1A0F28",
    icons: [
      {
        src: "/images/tadado_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/tadado_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
