import { posts, type Post } from ".velite";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { MDXContent } from "@/components/mdx/mdx-content";
import { PostHeader } from "@/components/post/post-header";
import { TableOfContents } from "@/components/post/table-of-contents";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((post: Post) => post.slug === slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article" as const,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = posts.find((post: Post) => post.slug === slug);
  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_250px]">
        <article className="max-w-none lg:mx-8">
          <PostHeader
            title={post.title}
            description={post.description}
            date={post.date}
            tags={post.tags}
            category={post.category}
            locale={locale as Locale}
          />

          <MDXContent code={post.body} components={mdxComponents} />
        </article>

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
