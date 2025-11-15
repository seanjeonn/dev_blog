import { posts, type Post } from ".velite";
import { MonitoredComments } from "@/components/comments/monitored-comments";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { MDXContent } from "@/components/mdx/mdx-content";
import { PostHeader } from "@/components/post/post-header";
import { TableOfContents } from "@/components/post/table-of-contents";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// generateStaticParams로 모든 포스트 경로 미리 생성 (SSG)
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((post: Post) => post.slug === slug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  // 해당 슬러그의 포스트 찾기
  const post = posts.find((post: Post) => post.slug === slug);

  // 포스트가 없거나 발행되지 않은 경우 404
  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="container max-w-5xl py-12 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content */}
        <article className="prose prose-gray dark:prose-invert max-w-none mx-8">
          <PostHeader
            title={post.title}
            description={post.description}
            date={post.date}
            tags={post.tags}
            category={post.category}
          />

          {/* MDX Content */}
          <MDXContent code={post.body} components={mdxComponents} />

          {/* Comments Section with Lazy Loading */}
          <MonitoredComments slug={slug} title={post.title} />
        </article>

        {/* Sidebar - TOC */}
        {post.toc && (
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <TableOfContents />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
