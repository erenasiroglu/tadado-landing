import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PostCta } from "@/components/blog/PostCta";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog";
import { BLOG_LOCALES, getDictionary, hasLocale, localeHref, type Locale } from "@/lib/i18n";
import { getKeywordsString } from "@/lib/seo-keywords";
import { buildBlogPostJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  return getAllBlogSlugs().map(({ locale, slug }) => ({ lang: locale, slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !BLOG_LOCALES.includes(lang as Locale)) return {};
  const post = await getBlogPost(lang as Locale, slug);
  if (!post) return {};

  const languages: Record<string, string> = {
    [lang]: `https://tadado.app/${lang}/blog/${slug}`,
  };
  if (post.alternateLocale && post.alternateSlug) {
    languages[post.alternateLocale] =
      `https://tadado.app/${post.alternateLocale}/blog/${post.alternateSlug}`;
  }

  return {
    title: `${post.title} | Tadado`,
    description: post.description,
    keywords: getKeywordsString(lang as Locale),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://tadado.app/${lang}/blog/${slug}`,
      languages,
      types: {
        "text/plain": "https://tadado.app/llms-full.txt",
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      locale: lang,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !BLOG_LOCALES.includes(lang as Locale)) notFound();

  const locale = lang as Locale;
  const post = await getBlogPost(locale, slug);
  if (!post) notFound();

  const dict = await getDictionary(locale);
  const jsonLd = buildBlogPostJsonLd(locale, post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale} dict={dict} />
      <main className="section-shell flex-1 py-16">
        <Link href={localeHref(locale, "blog")} className="text-sm text-amber hover:underline">
          ← {dict.blog.title}
        </Link>
        <article className="prose-blog mx-auto mt-8 max-w-3xl">
          <time className="text-sm text-lavender" dateTime={post.date}>{post.date}</time>
          <h1 className="mt-2 text-4xl font-extrabold text-cream">{post.title}</h1>
          <p className="mt-4 text-lg text-cream/75">{post.description}</p>
          <div className="mt-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          <PostCta locale={locale} />
        </article>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
