import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { resolveSmartAppLinkUrl } from "@/lib/smart-app-link";

export function GET(request: NextRequest) {
  const destination = resolveSmartAppLinkUrl(request);

  return NextResponse.redirect(destination, {
    status: 302,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
