import { NextResponse } from "next/server";

export async function POST(_request: Request) {
  // TikTok Events API forwarding disabled — see commented implementation below.
  return NextResponse.json({ ok: false, error: "tiktok_events_disabled" }, { status: 503 });
}

/*
import { NextResponse } from "next/server";

const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const TIKTOK_EVENTS_ACCESS_TOKEN = process.env.TIKTOK_EVENTS_ACCESS_TOKEN;

function normalizeValue(value: unknown): string | number | boolean | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  return String(value);
}

function normalizeProperties(properties: Record<string, unknown>) {
  const out: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(properties)) {
    const normalized = normalizeValue(value);
    if (normalized === undefined) continue;
    out[key] = normalized;
  }

  return out;
}

export async function POST(request: Request) {
  if (!TIKTOK_PIXEL_ID || !TIKTOK_EVENTS_ACCESS_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "TikTok Events API is not configured" },
      { status: 500 },
    );
  }

  let payload: { event?: unknown; properties?: Record<string, unknown> };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const eventName = typeof payload.event === "string" && payload.event ? payload.event : "ViewContent";
  const eventProperties = payload.properties && typeof payload.properties === "object" ? payload.properties : {};

  const body = {
    pixel_code: TIKTOK_PIXEL_ID,
    event: eventName,
    event_id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    timestamp: new Date().toISOString(),
    properties: normalizeProperties(eventProperties),
  };

  const response = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TIKTOK_EVENTS_ACCESS_TOKEN}`,
      "Access-Token": TIKTOK_EVENTS_ACCESS_TOKEN,
    },
    body: JSON.stringify(body),
  });

  const data = await response.text();

  if (!response.ok) {
    console.error("[TikTok Events API] request failed", {
      status: response.status,
      body: data,
      event: eventName,
    });
    return NextResponse.json(
      { ok: false, status: response.status, error: "TikTok Events API rejected the event" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, response: data });
}
*/
