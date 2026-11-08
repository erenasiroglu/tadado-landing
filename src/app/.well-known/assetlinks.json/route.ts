import { NextResponse } from "next/server";

function parseSha256Fingerprints(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;\n]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function GET() {
  // Play App Signing: include App signing key + Upload key SHA-256 (comma-separated in env).
  const fingerprints = parseSha256Fingerprints(process.env.ANDROID_SHA256_FINGERPRINT);
  const sha256List =
    fingerprints.length > 0 ? fingerprints : ["SHA256_FINGERPRINT"];

  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.erenasiroglu.tadado",
        sha256_cert_fingerprints: sha256List,
      },
    },
  ];

  return NextResponse.json(body, {
    headers: { "Content-Type": "application/json" },
  });
}
