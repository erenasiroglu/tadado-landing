import Link from "next/link";

import type { BlogPost } from "@/lib/blog";
import { localeHref, type Locale } from "@/lib/i18n";

interface PostCardProps {
  locale: Locale;
  post: BlogPost;
  readMore: string;
}

export function PostCard({ locale, post, readMore }: PostCardProps) {
  return (
    <article className="glass rounded-2xl p-6">
      <time className="text-xs text-lavender" dateTime={post.date}>{post.date}</time>
      <h2 className="mt-2 text-xl font-bold text-cream">
        <Link href={localeHref(locale, `blog/${post.slug}`)} className="hover:text-amber">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 text-cream/70">{post.description}</p>
      <Link
        href={localeHref(locale, `blog/${post.slug}`)}
        className="mt-4 inline-block text-sm font-semibold text-amber hover:underline"
      >
        {readMore}
      </Link>
    </article>
  );
}
