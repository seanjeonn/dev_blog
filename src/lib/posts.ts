import { posts, type Post } from ".velite";

/**
 * 발행된 포스트에서 고유 카테고리 목록을 추출합니다.
 */
export function getCategories(): string[] {
  const categorySet = new Set<string>();

  posts.forEach((post: Post) => {
    if (post.published && post.category) {
      categorySet.add(post.category);
    }
  });

  return Array.from(categorySet).sort();
}

/**
 * 카테고리별 포스트 개수를 계산합니다.
 */
export function getCategoryCount(): Record<string, number> {
  const categoryCount: Record<string, number> = {};

  posts.forEach((post: Post) => {
    if (post.published && post.category) {
      categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
    }
  });

  return categoryCount;
}

/**
 * 포스트 통계를 반환합니다.
 */
export function getPostsMetadata() {
  const publishedPosts = posts.filter((post: Post) => post.published);

  return {
    totalPosts: posts.length,
    publishedPosts: publishedPosts.length,
    categoryCount: getCategoryCount(),
  };
}

/**
 * 태그 목록을 추출합니다.
 */
export function getTags(): string[] {
  const tagSet = new Set<string>();

  posts.forEach((post: Post) => {
    if (post.published && post.tags) {
      post.tags.forEach((tag) => tagSet.add(tag));
    }
  });

  return Array.from(tagSet).sort();
}
