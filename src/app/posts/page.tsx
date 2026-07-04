import { posts, type Post } from ".velite";
import { PostCard } from "@/components/post/post-card";

export const metadata = {
  title: "Blog",
  description: "Notes on engineering, AI, and building products.",
};

export default function PostsPage() {
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
          Blog
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Writing
        </h1>
        <p className="mt-4 text-muted-foreground">
          Notes on engineering, AI agents, and building products.
        </p>
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
            />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-muted-foreground">No posts yet.</p>
      )}
    </div>
  );
}
