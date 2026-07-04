import { posts, type Post } from ".velite";
import { PostCard } from "@/components/post/post-card";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/href";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogTeaserProps {
  locale: Locale;
  dict: Dictionary;
}

export function BlogTeaser({ locale, dict }: BlogTeaserProps) {
  const latest = posts
    .filter((post: Post) => post.published)
    .sort(
      (a: Post, b: Post) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {dict.home.writing}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {dict.home.fromBlog}
          </h2>
        </div>
        <Link
          href={localePath(locale, "/posts")}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {dict.home.readBlog}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((post: Post) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
            category={post.category}
            tags={post.tags}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
