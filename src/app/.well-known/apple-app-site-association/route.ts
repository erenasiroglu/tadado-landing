import { NextResponse } from "next/server";

export function GET() {
  const teamId = process.env.APPLE_TEAM_ID ?? "TEAM_ID";
  const bundleId = "com.erenasiroglu.tadado";

  const body = {
    applinks: {
      apps: [],
      details: [
        {
          appID: `${teamId}.${bundleId}`,
          paths: ["/", "/en/*", "/tr/*", "/download"],
        },
      ],
    },
  };

  return NextResponse.json(body, {
    headers: { "Content-Type": "application/json" },
  });
}
