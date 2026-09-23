import { BRAND } from "@/lib/brand";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string; locale?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const locale = typeof body.locale === "string" ? body.locale : "en";

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("[waitlist] RESEND_API_KEY is not set — signup was not emailed");
    return Response.json({ error: "generic" }, { status: 503 });
  }

  const fromEmail = process.env.WAITLIST_FROM_EMAIL ?? "onboarding@resend.dev";
  const notifyEmail = process.env.WAITLIST_NOTIFY_EMAIL ?? BRAND.supportEmail;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Tadado <${fromEmail}>`,
      to: notifyEmail,
      subject: `Waitlist signup (${locale})`,
      text: `New waitlist signup\n\nEmail: ${email}\nLocale: ${locale}\nTime: ${new Date().toISOString()}`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("[waitlist] Resend rejected the send", {
      status: response.status,
      body: detail,
      from: fromEmail,
      to: notifyEmail,
    });
    return Response.json({ error: "generic" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
