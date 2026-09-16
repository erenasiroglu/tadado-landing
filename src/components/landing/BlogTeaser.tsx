"use client";

import Link from "next/link";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import type { BlogPost } from "@/lib/blog";
import type { Dictionary } from "@/lib/i18n";
import { localeHref, type Locale } from "@/lib/i18n-config";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

import { LandingSection } from "./LandingSection";
import { SectionHeading } from "./SectionHeading";

interface BlogTeaserProps {
  locale: Locale;
  dict: Dictionary;
  posts: BlogPost[];
  compact?: boolean;
}

export function BlogTeaser({ locale, dict, posts, compact = false }: BlogTeaserProps) {
  if (posts.length === 0) return null;

  const latest = compact ? posts.slice(0, 1) : posts.slice(0, 3);

  return (
    <LandingSection id="blog" className={compact ? "py-12" : undefined}>
      <SectionViewTracker sectionId="blog">
        {!compact ? (
          <SectionHeading title={dict.blog.title} subtitle={dict.blog.subtitle} />
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading title={dict.blog.title} align="left" />
            <Link
              href={localeHref(locale, "blog")}
              className={buttonVariants({ variant: "link", className: "px-0 text-amber" })}
              onClick={() => {
                trackEvent({
                  event: ANALYTICS_EVENTS.BLOG_VIEW_ALL_CLICK,
                  properties: { locale },
                });
              }}
            >
              {dict.blog.viewAll}
            </Link>
          </div>
        )}
        <div className={cn("grid gap-6", compact ? "mt-6 md:grid-cols-1" : "mt-12 md:grid-cols-3")}>
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
                onClick={() => {
                  trackEvent({
                    event: ANALYTICS_EVENTS.BLOG_POST_CLICK,
                    properties: { slug: post.slug, locale, title: post.title },
                  });
                }}
              >
                {dict.blog.readMore}
              </Link>
            </div>
          ))}
        </div>
        {!compact ? (
          <div className="mt-8 text-center">
            <Link
              href={localeHref(locale, "blog")}
              className={buttonVariants({ variant: "link", className: "text-amber" })}
              onClick={() => {
                trackEvent({
                  event: ANALYTICS_EVENTS.BLOG_VIEW_ALL_CLICK,
                  properties: { locale },
                });
              }}
            >
              {dict.blog.viewAll}
            </Link>
          </div>
        ) : null}
      </SectionViewTracker>
    </LandingSection>
  );
}
