import Link from "next/link";
import type { Metadata } from "next";

import { LegalPageShell } from "@/app/legal-layout";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Use | Tadado",
  description: "Terms of Use for the Tadado mobile application and website.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPageShell>
    <main className="section-shell max-w-3xl py-16 prose-blog">
      <h1 className="mt-6 text-4xl font-extrabold text-cream">Terms of Use</h1>
      <p className="text-sm text-lavender">Last updated: May 24, 2026</p>

      <p>
        These Terms of Use (&quot;Terms&quot;) govern your access to and use of the Tadado mobile
        application and website operated by Tadado Game Team. By using Tadado, you agree to these
        Terms.
      </p>

      <h2>Eligibility</h2>
      <p>
        Tadado is rated 4+ on the App Store and Everyone on Google Play. By using the app, you
        confirm you meet the minimum age required in your region.
      </p>

      <h2>License</h2>
      <p>
        We grant you a limited, non-exclusive, non-transferable, revocable license to use Tadado for
        personal, non-commercial entertainment purposes, subject to these Terms.
      </p>

      <h2>User conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use Tadado for unlawful, harassing, or abusive purposes</li>
        <li>Generate or share content that is hateful, sexually explicit, or harmful to minors</li>
        <li>Attempt to reverse engineer, scrape, or disrupt the service</li>
        <li>Circumvent In-App Purchase or access controls</li>
      </ul>
      <p>
        AI-generated decks may produce unexpected results. You are responsible for content you create
        and share with others during gameplay.
      </p>

      <h2>In-App Purchases</h2>
      <p>Tadado offers optional In-App Purchases through Apple&apos;s App Store and Google Play:</p>
      <ul>
        <li><strong>Tadado Mix</strong>: free starter deck</li>
        <li><strong>Theme decks</strong>: $0.99 each (one-time, non-consumable)</li>
        <li><strong>AI deck creation</strong>: $2.99 (one-time)</li>
      </ul>
      <p>
        There is no subscription. Prices are shown in the store before purchase and may vary by
        region. Billing, refunds, and disputes are handled by Apple or Google according to their
        policies.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Tadado, including its name, logo, design, and software, is owned by Tadado Game Team and
        protected by applicable intellectual property laws.
      </p>

      <h2>Disclaimer</h2>
      <p>
        Tadado is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
        uninterrupted service or error-free AI-generated content.
      </p>

      <h2>Privacy</h2>
      <p>
        Your use of Tadado is also governed by our{" "}
        <Link href="/privacy-policy" className="text-amber">Privacy Policy</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href={`mailto:${BRAND.supportEmail}`} className="text-amber">{BRAND.supportEmail}</a>.
      </p>
    </main>
    </LegalPageShell>
  );
}
