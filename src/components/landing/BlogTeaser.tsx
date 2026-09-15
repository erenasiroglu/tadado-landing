import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import type { BlogPost } from "@/lib/blog";
import { localeHref, type Dictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface BlogTeaserProps {
  locale: Locale;
  dict: Dictionary;
  posts: BlogPost[];
}

export function BlogTeaser({ locale, dict, posts }: BlogTeaserProps) {
  if (posts.length === 0) return null;

  const latest = posts.slice(0, 3);

  return (
    <LandingSection id="blog">
      <SectionHeading title={dict.blog.title} subtitle={dict.blog.subtitle} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {latest.map((post) => (
          <div key={post.slug} className="surface-card p-6">
            <time className="text-xs text-lavender" dateTime={post.date}>
              {post.date}
            </time>
            <h3 className="mt-2 text-lg font-bold text-cream">{post.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-cream/70">{post.description}</p>
            <Link
              href={localeHref(locale, `blog/${post.slug}`)}
              className={cn(buttonVariants({ variant: "link" }), "mt-4 px-0 text-amber")}
            >
              {dict.blog.readMore}
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href={localeHref(locale, "blog")} className={buttonVariants({ variant: "link", className: "text-amber" })}>
          {dict.blog.viewAll}
        </Link>
      </div>
    </LandingSection>
  );
}
