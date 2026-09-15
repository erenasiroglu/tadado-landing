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
  const fromEmail = process.env.WAITLIST_FROM_EMAIL ?? "onboarding@resend.dev";

  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Tadado <${fromEmail}>`,
        to: BRAND.supportEmail,
        subject: `Waitlist signup (${locale})`,
        text: `New waitlist signup\n\nEmail: ${email}\nLocale: ${locale}\nTime: ${new Date().toISOString()}`,
      }),
    });

    if (!response.ok) {
      return Response.json({ error: "generic" }, { status: 500 });
    }
  }

  return Response.json({ ok: true });
}
