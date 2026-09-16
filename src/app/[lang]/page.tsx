import { notFound } from "next/navigation";

import { AiDeckBuilderDemo } from "@/components/landing/AiDeckBuilderDemo";
import { BlogTeaser } from "@/components/landing/BlogTeaser";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { DeckCarousel } from "@/components/landing/DeckCarousel";
import { Faq } from "@/components/landing/Faq";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { GameModeShowcase } from "@/components/landing/GameModeShowcase";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { NewsletterSignup } from "@/components/landing/NewsletterSignup";
import { PersonalizationSection } from "@/components/landing/PersonalizationSection";
import { Pricing } from "@/components/landing/Pricing";
import { ProductBenefits } from "@/components/landing/ProductBenefits";
import { StickyBar } from "@/components/landing/StickyBar";
import { Testimonials } from "@/components/landing/Testimonials";
import { TrendingCards } from "@/components/landing/TrendingCards";
import { getBlogPosts } from "@/lib/blog";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { applyLandingVariant } from "@/lib/landing-variants";
import { buildLandingJsonLd } from "@/lib/seo";

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = applyLandingVariant(locale, await getDictionary(locale));
  const posts = await getBlogPosts(locale);
  const jsonLd = buildLandingJsonLd(locale, dict);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} dict={dict} />
      <main className="flex-1 pb-safe md:pb-0">
        <Hero locale={locale} dict={dict} />
        <GameModeShowcase locale={locale} dict={dict} />
        <AiDeckBuilderDemo locale={locale} dict={dict} />
        <PersonalizationSection dict={dict} />
        <DeckCarousel dict={dict} locale={locale} />
        <ProductBenefits dict={dict} />
        <CommunitySection dict={dict} locale={locale} />
        <TrendingCards locale={locale} dict={dict} />
        <HowItWorks dict={dict} />
        <Testimonials dict={dict} />
        <Pricing locale={locale} dict={dict} />
        <Faq dict={dict} />
        <BlogTeaser locale={locale} dict={dict} posts={posts.slice(0, 1)} compact />
        <NewsletterSignup dict={dict} locale={locale} compact />
        <FinalCTA locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <StickyBar locale={locale} />
    </>
  );
}
