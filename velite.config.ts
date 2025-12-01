import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineConfig, defineCollection, s } from "velite";

// 코드 하이라이팅 설정
const rehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onVisitLine(node: any) {
    // 빈 줄이 사라지지 않도록 처리
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onVisitHighlightedLine(node: any) {
    node.properties.className?.push("highlighted");
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onVisitHighlightedChars(node: any) {
    node.properties.className = ["word"];
  },
};

// Post 컬렉션 정의
const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s
    .object({
      // 필수 필드
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(false),

      // 메타 정보
      cover: s.string().optional(),

      // 분류
      tags: s.array(s.string()).optional(),
      category: s.string().optional(),

      // 기타 옵션
      toc: s.boolean().default(true),

      // MDX 콘텐츠
      body: s.mdx(),
    })
    .transform((data, ctx) => {
      // 파일 경로에서 slug 추출
      // Velite의 meta.path는 상대 경로 (예: posts/hello-world.mdx)를 반환해야 하지만
      // 절대 경로가 나온다면 파일명만 사용
      const pathParts = (ctx.meta.path as string).split("/");
      const filename = pathParts[pathParts.length - 1]; // hello-world.mdx
      const slug = filename.replace(/\.mdx$/, ""); // hello-world

      return {
        ...data,
        slug,
        permalink: `/posts/${slug}`,
      };
    }),
});

// Velite 설정
export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/content",
    base: "/content/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, rehypePrettyCodeOptions],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [remarkGfm],
  },
});
