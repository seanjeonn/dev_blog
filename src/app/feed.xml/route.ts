import { posts } from ".velite";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const siteTitle = "개발 블로그";
  const siteDescription = "기술 블로그의 모든 포스트";

  // 발행된 포스트만 가져오기
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // RSS 2.0 XML 생성
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${publishedPosts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}${post.permalink}</link>
      <guid>${siteUrl}${post.permalink}</guid>
      <description>${escapeXml(post.description || "")}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>${
        post.category
          ? `
      <category>${escapeXml(post.category)}</category>`
          : ""
      }${
        post.tags && post.tags.length > 0
          ? post.tags.map((tag) => `
      <category>${escapeXml(tag)}</category>`).join("")
          : ""
      }
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

// XML 특수 문자 이스케이프
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
