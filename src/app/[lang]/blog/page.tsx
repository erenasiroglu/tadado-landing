import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/PostCard";
import { BackLink } from "@/components/landing/BackLink";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { getBlogPosts } from "@/lib/blog";
import { BLOG_LOCALES, hasLocale, LOCALES, localeHref, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n-server";
import { buildLanguageAlternates } from "@/lib/seo";
import type { Metadata } from "next";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang) || !BLOG_LOCALES.includes(lang as Locale)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${dict.blog.title} | Tadado`,
    description: dict.blog.subtitle,
    alternates: {
      canonical: `https://tadado.app/${lang}/blog`,
      languages: buildLanguageAlternates("blog"),
    },
  };
}

export default async function BlogIndexPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang) || !BLOG_LOCALES.includes(lang as Locale)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const posts = await getBlogPosts(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="section-shell flex-1 py-16">
        <BackLink href={localeHref(locale)}>Tadado</BackLink>
        <div className="mt-8">
          <SectionHeading title={dict.blog.title} subtitle={dict.blog.subtitle} align="left" />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} locale={locale} post={post} readMore={dict.blog.readMore} />
          ))}
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
