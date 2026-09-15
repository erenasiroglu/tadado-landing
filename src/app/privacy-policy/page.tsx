import Link from "next/link";
import type { Metadata } from "next";

import { LegalPageShell } from "@/app/legal-layout";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy | Tadado",
  description: "Privacy Policy for the Tadado mobile application and website.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell>
    <main className="section-shell max-w-3xl py-16 prose-blog">
      <h1 className="mt-6 text-4xl font-extrabold text-cream">Privacy Policy</h1>
      <p className="text-sm text-lavender">Last updated: May 24, 2026</p>

      <p>
        Tadado Game Team (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the Tadado
        mobile application and website at https://tadado.app. This Privacy Policy explains how we
        handle information when you use our services.
      </p>

      <h2>Information we collect</h2>
      <p>
        Core gameplay can be enjoyed without creating an account. If you sign in with Apple, Google,
        or email, we process account identifiers needed to save progress, AI decks, and purchases.
      </p>
      <p>
        If you contact us for support, we receive the information you provide (such as your email
        and message) solely to respond to your inquiry.
      </p>

      <h2>In-App Purchases</h2>
      <p>
        Purchases are processed entirely by Apple (StoreKit) or Google Play. We do not receive or
        store your payment card details. Purchase history is tied to your store account.
      </p>

      <h2>AI-generated content</h2>
      <p>
        When you create custom decks using AI features, prompts you enter are used to generate game
        content. Do not enter sensitive personal information into prompts.
      </p>

      <h2>Game services</h2>
      <p>
        On supported devices, Tadado integrates with Apple Game Center and Google Play Games for
        leaderboards and achievements. These services are governed by Apple and Google policies.
      </p>

      <h2>Push notifications</h2>
      <p>
        With your permission, we may send notifications when your AI deck is ready to play. You can
        disable notifications in device settings.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        Tadado is not directed at young children. We do not knowingly collect information from
        children under the minimum age required in their region.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post the revised policy on this
        page and update the &quot;Last updated&quot; date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this Privacy Policy? Email{" "}
        <a href={`mailto:${BRAND.supportEmail}`} className="text-amber">{BRAND.supportEmail}</a>.
      </p>
    </main>
    </LegalPageShell>
  );
}
