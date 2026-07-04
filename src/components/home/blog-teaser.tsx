import { posts, type Post } from ".velite";
import { PostCard } from "@/components/post/post-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BlogTeaser() {
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
            Writing
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            From the blog
          </h2>
        </div>
        <Link
          href="/posts"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Read the blog
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
          />
        ))}
      </div>
    </section>
  );
}
