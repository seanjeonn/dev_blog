import { posts, type Post } from ".velite";
import { PostCard } from "@/components/post/post-card";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PostsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PostsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.blogTitle,
    description: dict.meta.blogDescription,
  };
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const publishedPosts = posts
    .filter((post: Post) => post.published)
    .sort(
      (a: Post, b: Post) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {dict.blog.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.blog.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{dict.blog.intro}</p>
      </header>

      {publishedPosts.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publishedPosts.map((post: Post) => (
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
      ) : (
        <p className="mt-12 text-muted-foreground">{dict.blog.noPosts}</p>
      )}
    </div>
  );
}
