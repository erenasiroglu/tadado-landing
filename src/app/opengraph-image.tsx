import { OG_SIZE, renderOgImage } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Tadado: Taboo, Heads Up, and AI custom decks built for game nights.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    title: "One phone. Your friends. Let the chaos begin.",
    subtitle: "Taboo, Heads Up, and AI custom decks built for game nights.",
    cta: "GET TADADO · FREE",
    footnote: "No ads · No subscription",
  });
}
