import { posts, type Post } from ".velite";
import { PostCard } from "@/components/post/post-card";
import { PostsHero } from "@/components/posts/posts-hero";
import { getCategories } from "@/lib/posts";

export const metadata = {
  title: "블로그 포스트",
  description: "기술 블로그의 모든 포스트를 확인하세요",
};

interface PostsPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const searchQuery = params.q?.toLowerCase() || "";
  const selectedCategory = params.category || "";

  // 발행된 포스트만 필터링하고 최신순 정렬
  let publishedPosts = posts
    .filter((post: Post) => post.published)
    .sort(
      (a: Post, b: Post) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  // 검색어 및 카테고리 필터링
  if (searchQuery || selectedCategory) {
    publishedPosts = publishedPosts.filter((post: Post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery) ||
        post.description?.toLowerCase().includes(searchQuery);

      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  // 카테고리 목록 추출
  const categories = getCategories();

  return (
    <div className="container max-w-6xl py-12 mx-auto px-4">
      {/* Hero Section with Search & Filter */}
      <PostsHero categories={categories} />

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          {searchQuery || selectedCategory
            ? `${searchQuery || selectedCategory} (${publishedPosts.length})`
            : `모든 포스트 (${publishedPosts.length})`}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

        {publishedPosts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">검색 결과가 없습니다.</p>
            <p className="text-sm mt-2">
              다른 검색어나 카테고리를 시도해보세요.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
