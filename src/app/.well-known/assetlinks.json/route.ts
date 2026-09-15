import { NextResponse } from "next/server";

export function GET() {
  const sha256 = process.env.ANDROID_SHA256_FINGERPRINT ?? "SHA256_FINGERPRINT";

  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.erenasiroglu.tadado",
        sha256_cert_fingerprints: [sha256],
      },
    },
  ];

  return NextResponse.json(body, {
    headers: { "Content-Type": "application/json" },
  });
}
