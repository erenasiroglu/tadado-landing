import { notFound } from "next/navigation";

import { AffiliateProgram } from "@/components/landing/AffiliateProgram";
import { AiDeckBuilderDemo } from "@/components/landing/AiDeckBuilderDemo";
import { BlogTeaser } from "@/components/landing/BlogTeaser";
import { Catalog } from "@/components/landing/Catalog";
import { Community } from "@/components/landing/Community";
import { Cta } from "@/components/landing/Cta";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { HowToPlay } from "@/components/landing/HowToPlay";
import { Modes } from "@/components/landing/Modes";
import { Partnerships } from "@/components/landing/Partnerships";
import { PlayerReviews } from "@/components/landing/PlayerReviews";
import { Pricing } from "@/components/landing/Pricing";
import { ProofStrip } from "@/components/landing/ProofStrip";
import { SeoGuides } from "@/components/landing/SeoGuides";
import { WhatMakesSpecial } from "@/components/landing/WhatMakesSpecial";
import { StickyBar } from "@/components/landing/StickyBar";
import { TrendingCards } from "@/components/landing/TrendingCards";
import { Reveal } from "@/components/motion/Reveal";
import { CompareTable } from "@/components/landing/CompareTable";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { getBlogPosts } from "@/lib/blog";
import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { applyLandingVariant, getDefaultHeroTab } from "@/lib/landing-variants";
import { buildLandingJsonLd } from "@/lib/seo";

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = applyLandingVariant(locale, await getDictionary(locale));
  const posts = await getBlogPosts(locale);
  const jsonLd = buildLandingJsonLd(locale, dict);
  const defaultHeroTab = getDefaultHeroTab(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} dict={dict} />
      <main className="flex-1 pb-20 md:pb-0">
        <Hero locale={locale} dict={dict} defaultTab={defaultHeroTab} />
        <ProofStrip dict={dict} />
        <Modes locale={locale} dict={dict} />
        <HowToPlay dict={dict} />
        <TrendingCards locale={locale} dict={dict} />
        <Catalog dict={dict} />
        <AiDeckBuilderDemo locale={locale} dict={dict} />
        <Pricing locale={locale} dict={dict} />
        <PlayerReviews dict={dict} />
        <WhatMakesSpecial dict={dict} />
        <HowItWorks dict={dict} />
        <Community dict={dict} />
        <SeoGuides locale={locale} dict={dict} />
        <section className="relative isolate bg-[#2a0a3b] py-20">
          <Reveal className="section-shell">
            <CompareTable dict={dict} locale={locale} showFullPageLink />
          </Reveal>
        </section>
        <BlogTeaser locale={locale} dict={dict} posts={posts} />
        <Faq dict={dict} />
        <NewsletterSignup dict={dict} locale={locale} />
        <AffiliateProgram dict={dict} locale={locale} />
        <Partnerships dict={dict} locale={locale} />
        <Cta locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <StickyBar locale={locale} dict={dict} />
    </>
  );
}
