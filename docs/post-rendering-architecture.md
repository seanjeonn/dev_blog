# 게시물 렌더링 아키텍처 상세 문서

> 본 문서는 Next.js 15 + Velite + MDX 기반 블로그의 게시물이 어떻게 작성되고, 컴파일되며, 렌더링되는지를 심층적으로 설명합니다.

---

## 목차

1. [개요](#개요)
2. [전체 렌더링 플로우](#전체-렌더링-플로우)
3. [1단계: 콘텐츠 작성 (MDX)](#1단계-콘텐츠-작성-mdx)
4. [2단계: 빌드 타임 처리 (Velite)](#2단계-빌드-타임-처리-velite)
5. [3단계: 정적 페이지 생성 (Next.js SSG)](#3단계-정적-페이지-생성-nextjs-ssg)
6. [4단계: 런타임 렌더링](#4단계-런타임-렌더링)
7. [5단계: 스타일링 및 인터랙션](#5단계-스타일링-및-인터랙션)
8. [핵심 컴포넌트 상세 분석](#핵심-컴포넌트-상세-분석)
9. [기술 스택 및 라이브러리](#기술-스택-및-라이브러리)

---

## 개요

이 블로그는 **빌드 타임 정적 생성(SSG)** 방식을 채택하여 최고의 성능과 SEO를 제공합니다. 게시물은 MDX 형식으로 작성되며, Velite가 이를 컴파일하고 Next.js가 정적 HTML로 생성합니다.

### 핵심 원칙

- **타입 안전성**: TypeScript + Velite의 스키마 검증
- **빌드 타임 최적화**: 모든 변환 작업을 빌드 시 수행
- **개발자 경험**: MDX로 컴포넌트 사용 가능
- **성능**: 정적 HTML 생성으로 빠른 초기 로딩
- **확장성**: 커스텀 컴포넌트 및 플러그인 지원

---

## 전체 렌더링 플로우

```
[MDX 작성]
    ↓
[Velite 빌드 타임 처리]
    ├── Frontmatter 파싱
    ├── MDX → JavaScript 컴파일
    ├── Rehype/Remark 플러그인 적용
    │   ├── rehype-slug (헤딩 ID 생성)
    │   ├── rehype-pretty-code (코드 하이라이팅)
    │   ├── rehype-autolink-headings (헤딩 링크)
    │   └── remark-gfm (GFM 지원)
    └── 타입 안전 데이터 생성 (.velite/)
    ↓
[Next.js SSG]
    ├── generateStaticParams로 경로 생성
    ├── generateMetadata로 SEO 메타데이터
    └── HTML 정적 생성
    ↓
[브라우저 렌더링]
    ├── PostHeader (메타 정보)
    ├── MDXContent (컴파일된 콘텐츠)
    │   └── mdxComponents (커스텀 컴포넌트)
    └── TableOfContents (클라이언트 인터랙션)
    ↓
[사용자가 보는 화면]
```

---

## 1단계: 콘텐츠 작성 (MDX)

### MDX 파일 구조

MDX는 **Markdown + JSX**입니다. 작성자는 `content/posts/` 디렉토리에 `.mdx` 파일을 생성합니다.

**파일 위치**: `content/posts/hello-world.mdx`

```mdx
---
title: "Velite와 MDX로 만드는 현대적인 블로그"
description: "Next.js 15, React 19, Velite를 활용한 타입 안전한 블로그 시스템 구축기"
date: 2025-01-17
published: true
author: "Admin"
tags: ["Next.js", "React", "MDX", "Velite"]
category: "Tutorial"
featured: true
toc: true
---

## 소개

안녕하세요! 이 블로그는 **Velite**와 **MDX**를 사용하여 구축되었습니다.

## 코드 예시

```typescript
import { posts } from ".velite";
```

<Callout type="info">
  이것은 커스텀 컴포넌트입니다!
</Callout>
```

### Frontmatter 스키마

Frontmatter는 Velite의 Zod 스키마로 검증됩니다:

```typescript
// velite.config.ts 발췌
schema: s.object({
  // 필수 필드
  title: s.string().max(99),
  description: s.string().max(999).optional(),
  date: s.isodate(),
  published: s.boolean().default(false),

  // 메타 정보
  author: s.string().default("Admin"),
  cover: s.string().optional(),

  // 분류
  tags: s.array(s.string()).optional(),
  category: s.string().optional(),

  // 옵션
  featured: s.boolean().default(false),
  toc: s.boolean().default(true),

  // MDX 콘텐츠
  body: s.mdx(),
})
```

### MDX의 장점

1. **컴포넌트 사용**: React 컴포넌트를 마크다운에서 직접 사용
2. **타입 안전성**: 컴포넌트 props 타입 체크
3. **인터랙티브**: 정적 마크다운에 동적 기능 추가
4. **재사용성**: 공통 컴포넌트 라이브러리 활용

---

## 2단계: 빌드 타임 처리 (Velite)

### Velite란?

Velite는 **Contentlayer의 현대적 대안**으로, Next.js 15를 완전히 지원하며 빌드 타임에 콘텐츠를 처리합니다.

**설정 파일**: `velite.config.ts:1`

### 처리 과정

#### 2.1 컬렉션 정의

```typescript
const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s.object({ /* ... */ })
    .transform((data, ctx) => {
      // 파일 경로에서 slug 추출
      const pathParts = (ctx.meta.path as string).split("/");
      const filename = pathParts[pathParts.length - 1];
      const slug = filename.replace(/\.mdx$/, "");

      return {
        ...data,
        slug,
        permalink: `/posts/${slug}`,
        readingTime: Math.ceil(data.body.split(/\s+/).length / 200),
      };
    }),
});
```

**역할**:
- `pattern`: 어떤 파일을 읽을지 glob 패턴
- `schema`: 데이터 검증 및 변환
- `transform`: slug, permalink, readingTime 등 계산된 필드 추가

#### 2.2 MDX 플러그인 적용

```typescript
// velite.config.ts:88
mdx: {
  rehypePlugins: [
    rehypeSlug,                           // 헤딩에 id 추가
    [rehypePrettyCode, {                  // 코드 하이라이팅
      theme: "github-dark",
      keepBackground: true,
      onVisitLine(node) {
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
      },
    }],
    [rehypeAutolinkHeadings, {            // 헤딩 자동 링크
      properties: {
        className: ["anchor"],
        ariaLabel: "Link to section",
      },
    }],
  ],
  remarkPlugins: [remarkGfm],             // GitHub Flavored Markdown
}
```

**각 플러그인의 역할**:

1. **rehype-slug** (`velite.config.ts:90`)
   - `## 소개` → `<h2 id="소개">소개</h2>`
   - 모든 헤딩에 고유 ID 부여 (TOC 및 앵커 링크용)

2. **rehype-pretty-code** (`velite.config.ts:91`)
   - Shiki 기반 구문 강조
   - `github-dark` 테마 적용
   - 코드 줄 번호, 하이라이팅 라인 지원
   - 빈 줄 보존 처리

3. **rehype-autolink-headings** (`velite.config.ts:92`)
   - 헤딩 옆에 자동으로 # 링크 생성
   - 헤딩 호버 시 링크 표시

4. **remark-gfm** (`velite.config.ts:102`)
   - GitHub Flavored Markdown 지원
   - 테이블, 취소선, 태스크 리스트 등

#### 2.3 출력 생성

```typescript
// velite.config.ts:80
output: {
  data: ".velite",              // 타입 및 데이터 출력 위치
  assets: "public/static",      // 정적 에셋 복사 위치
  base: "/static/",
  name: "[name]-[hash:6].[ext]",
  clean: true,
}
```

**생성되는 파일**:
- `.velite/index.d.ts`: TypeScript 타입 정의
- `.velite/index.js`: 컴파일된 게시물 데이터
- `public/static/`: 이미지 등 정적 파일

#### 2.4 MDX 컴파일 결과

MDX는 다음과 같이 JavaScript 함수로 변환됩니다:

```javascript
// .velite/index.js (간소화된 예시)
export const posts = [
  {
    slug: "hello-world",
    title: "Velite와 MDX로 만드는 현대적인 블로그",
    date: "2025-01-17",
    body: "return function MDXContent(props) { /* JSX */ }",
    readingTime: 3,
    // ...
  }
]
```

**body 필드**:
- MDX 콘텐츠가 JavaScript 함수 문자열로 저장됨
- 런타임에 `new Function()`으로 실행됨
- React 컴포넌트 반환

---

## 3단계: 정적 페이지 생성 (Next.js SSG)

### 동적 라우팅 파일

**파일**: `src/app/posts/[slug]/page.tsx:1`

Next.js App Router의 동적 경로를 사용합니다.

### 3.1 정적 경로 생성

```typescript
// src/app/posts/[slug]/page.tsx:13
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

**동작**:
- 빌드 시 모든 게시물의 slug 배열 생성
- `/posts/hello-world`, `/posts/nextjs-15-features` 등 경로 생성
- Next.js가 각 경로마다 HTML 파일 생성

### 3.2 메타데이터 생성 (SEO)

```typescript
// src/app/posts/[slug]/page.tsx:20
export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((post: Post) => post.slug === slug);

  if (!post) {
    return { title: "포스트를 찾을 수 없습니다" };
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}
```

**생성되는 메타 태그**:
```html
<title>Velite와 MDX로 만드는 현대적인 블로그</title>
<meta name="description" content="Next.js 15, React 19, Velite를 활용한..." />
<meta property="og:title" content="Velite와 MDX로 만드는 현대적인 블로그" />
<meta property="og:type" content="article" />
```

### 3.3 페이지 컴포넌트

```typescript
// src/app/posts/[slug]/page.tsx:45
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((post: Post) => post.slug === slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="container max-w-5xl py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* 메인 콘텐츠 */}
        <article className="prose prose-gray dark:prose-invert max-w-none">
          <PostHeader {...post} />
          <MDXContent code={post.body} components={mdxComponents} />
        </article>

        {/* 사이드바 - 목차 */}
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
```

**레이아웃**:
- 반응형 그리드: 모바일 1열, 데스크탑 2열
- 메인 콘텐츠 영역: `prose` 클래스로 타이포그래피 스타일링
- 사이드바: sticky TOC, 데스크탑에서만 표시

---

## 4단계: 런타임 렌더링

### 4.1 PostHeader 컴포넌트

**파일**: `src/components/post/post-header.tsx:1`

게시물의 메타 정보를 표시합니다.

```typescript
export function PostHeader({
  title,
  description,
  date,
  readingTime,
  author,
  tags,
  category,
}: PostHeaderProps) {
  return (
    <div className="space-y-4 pb-8">
      {/* 카테고리 뱃지 */}
      {category && (
        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">
          {category}
        </span>
      )}

      {/* 제목 */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        {title}
      </h1>

      {/* 설명 */}
      {description && (
        <p className="text-xl text-muted-foreground">{description}</p>
      )}

      {/* 메타 정보: 저자, 날짜, 읽기 시간 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
        <div className="flex items-center gap-1.5">
          <User className="h-4 w-4" />
          <span>{author}</span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <time dateTime={date}>
            {format(new Date(date), "PPP", { locale: ko })}
          </time>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{readingTime}분 읽기</span>
        </div>
      </div>

      {/* 태그 */}
      {tags && tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-sm rounded-full bg-muted">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <Separator className="mt-6" />
    </div>
  );
}
```

**렌더링 결과**:
```
┌─────────────────────────────────┐
│ [Tutorial]                       │
│                                  │
│ Velite와 MDX로 만드는...        │
│ (4xl, bold)                     │
│                                  │
│ Next.js 15, React 19...         │
│ (xl, muted)                     │
│                                  │
│ 👤 Admin | 📅 2025년 1월 17일  │
│ | ⏱️ 3분 읽기                    │
│                                  │
│ 🏷️ #Next.js #React #MDX        │
│                                  │
│ ────────────────────────────    │
└─────────────────────────────────┘
```

### 4.2 MDXContent 컴포넌트

**파일**: `src/components/mdx/mdx-content.tsx:1`

Velite가 컴파일한 MDX 코드를 실행합니다.

```typescript
export function MDXContent({ code, components = {} }: MDXContentProps) {
  const Component = React.useMemo(() => {
    try {
      // Velite의 컴파일된 코드를 함수로 실행
      const fn = new Function(code);
      return fn({ ...runtime }).default;
    } catch (error) {
      console.error("MDX 렌더링 에러:", error);
      return () => <div>콘텐츠를 로드할 수 없습니다.</div>;
    }
  }, [code]);

  return <Component components={components} />;
}
```

**동작 원리**:
1. `code`: Velite가 생성한 JavaScript 함수 문자열
2. `new Function(code)`: 문자열을 실제 함수로 변환
3. `fn({ ...runtime })`: React JSX 런타임 주입
4. `.default`: MDX 컴포넌트 반환
5. `<Component components={components} />`: 커스텀 컴포넌트 주입하여 렌더링

**보안 고려사항**:
- `new Function()`은 일반적으로 위험하지만, 여기서는 안전합니다
- 이유: 빌드 타임에 Velite가 검증된 MDX만 컴파일
- 사용자 입력이 런타임에 `code`로 들어오지 않음

### 4.3 mdxComponents - 커스텀 컴포넌트 매핑

**파일**: `src/components/mdx/mdx-components.tsx:1`

MDX에서 사용할 모든 HTML 요소와 커스텀 컴포넌트를 정의합니다.

```typescript
export const mdxComponents: MDXComponents = {
  // ========== 기본 HTML 요소 스타일링 ==========
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-12 mb-4 text-4xl font-bold tracking-tight scroll-m-20",
        className
      )}
      {...props}
    />
  ),

  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-10 mb-4 text-3xl font-semibold tracking-tight scroll-m-20 border-b pb-2",
        className
      )}
      {...props}
    />
  ),

  p: ({ className, ...props }) => (
    <p className={cn("mb-4 text-base leading-7", className)} {...props} />
  ),

  a: ({ className, ...props }) => (
    <Link
      href={props.href || "#"}
      className={cn(
        "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
        className
      )}
      {...props}
    />
  ),

  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",
        className
      )}
      {...props}
    />
  ),

  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm",
        className
      )}
      {...props}
    />
  ),

  // ========== 커스텀 MDX 컴포넌트 ==========
  Callout,           // 정보/경고 박스
  CodeBlock,         // 향상된 코드 블록
  ImageGallery,      // 이미지 갤러리
  Tabs,              // 탭 컴포넌트
  CodeTabs,          // 코드 탭

  // ========== shadcn/ui 컴포넌트 ==========
  Card,
  Button,
  Separator,
  // ...
};
```

**매핑 방식**:
- MDX에서 `## 제목` 작성 → `mdxComponents.h2` 사용
- MDX에서 `<Callout>` 작성 → `mdxComponents.Callout` 사용
- 모든 요소가 TailwindCSS로 일관된 스타일링

**장점**:
- 전역 스타일 일관성
- 다크 모드 자동 지원
- 접근성 개선 (semantic HTML)
- 확장 가능 (새 컴포넌트 쉽게 추가)

### 4.4 TableOfContents 컴포넌트

**파일**: `src/components/post/table-of-contents.tsx:1`

클라이언트 사이드에서 동적으로 목차를 생성하고 현재 위치를 추적합니다.

```typescript
export function TableOfContents({ className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 1. 헤딩 요소 수집
    const headings = Array.from(
      document.querySelectorAll("article h2, article h3, article h4")
    );

    const tocItems: TOCItem[] = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName.charAt(1)),
    }));

    setToc(tocItems);

    // 2. Intersection Observer로 스크롤 추적
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 1,
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={cn("space-y-2", className)}>
      <p className="text-sm font-semibold text-foreground mb-3">목차</p>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            className={cn(
              item.level === 3 && "ml-4",
              item.level === 4 && "ml-8"
            )}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "block text-sm transition-colors hover:text-primary",
                "border-l-2 pl-3 py-1",
                activeId === item.id
                  ? "border-primary text-primary font-medium"
                  : "border-border text-muted-foreground"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

**동작 원리**:

1. **헤딩 수집** (`useEffect` 시작 시)
   - `document.querySelectorAll`로 h2, h3, h4 찾기
   - 각 헤딩의 id, text, level 추출
   - TOC 상태 업데이트

2. **스크롤 추적** (Intersection Observer)
   - 각 헤딩이 뷰포트에 들어오면 `activeId` 업데이트
   - `rootMargin: "-100px 0px -66%"`: 화면 상단 100px, 하단 66% 제외한 영역에서 활성화
   - 활성 항목 하이라이트

3. **부드러운 스크롤** (`handleClick`)
   - 링크 클릭 시 기본 동작 방지
   - `window.scrollTo`로 부드럽게 스크롤
   - 100px 오프셋 적용 (고정 헤더 고려)

**렌더링 결과**:
```
┌─────────────────┐
│ 목차             │
│                  │
│ ▎소개           │  ← h2
│ ▎코드 하이라이팅 │  ← h2 (active)
│   ▎TypeScript   │    ← h3
│   ▎Python       │    ← h3
│ ▎리스트와 포매팅 │  ← h2
└─────────────────┘
```

---

## 5단계: 스타일링 및 인터랙션

### 5.1 TailwindCSS v4 설정

**파일**: `src/app/globals.css:1`

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-primary: oklch(53.901% 0.19406 267.003);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  /* ... */
}
```

**특징**:
- TailwindCSS v4의 새로운 구문 사용
- CSS 변수 기반 테마 시스템
- OKLCH 색상 공간 (더 정확한 색상 보간)
- 다크 모드 자동 지원

### 5.2 Prose 스타일링

```tsx
<article className="prose prose-gray dark:prose-invert max-w-none">
```

**Tailwind Typography 플러그인**:
- `prose`: 기본 타이포그래피 스타일
- `prose-gray`: 회색 계열 색상
- `dark:prose-invert`: 다크 모드 반전
- `max-w-none`: 최대 너비 제한 없음

**적용되는 스타일**:
- 헤딩: 크기, 굵기, 간격 자동 설정
- 문단: leading, 여백 최적화
- 링크: 밑줄, 호버 효과
- 코드: 배경색, 패딩
- 리스트: 들여쓰기, 마커 스타일

### 5.3 커스텀 컴포넌트 예시

#### Callout 컴포넌트

**파일**: `src/components/mdx/callout.tsx:1`

```typescript
export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border-l-4 p-4",
        config.className,
        className
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 flex-shrink-0", config.iconClassName)} />
      <div className="flex-1 space-y-1">
        {title && (
          <div className="font-semibold text-sm uppercase tracking-wide">
            {title}
          </div>
        )}
        <div className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
```

**사용 예시**:
```mdx
<Callout type="warning" title="주의">
  이 기능은 실험적입니다.
</Callout>
```

**렌더링**:
```
┌───────────────────────────────┐
│ ⚠️  주의                      │
│                                │
│    이 기능은 실험적입니다.    │
└───────────────────────────────┘
(노란색 배경, 노란색 왼쪽 테두리)
```

**타입별 스타일**:
- `info`: 파란색, ℹ️ 아이콘
- `warning`: 노란색, ⚠️ 아이콘
- `success`: 녹색, ✓ 아이콘
- `error`: 빨간색, ⚠ 아이콘
- `tip`: 보라색, 💡 아이콘

#### CodeBlock 컴포넌트

**파일**: `src/components/mdx/code-block.tsx:1`

```typescript
export function CodeBlock({
  children,
  language,
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group relative my-6", className)}>
      {filename && (
        <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-border bg-muted px-4 py-2">
          <span className="text-xs font-mono text-muted-foreground">
            {filename}
          </span>
          {language && (
            <span className="text-xs font-medium text-muted-foreground uppercase">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 z-10 rounded-md p-2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          {copied ? <Check /> : <Copy />}
        </button>
        <pre className="overflow-x-auto rounded-lg p-4 bg-gray-950 text-gray-50">
          <code className={language ? `language-${language}` : ""}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}
```

**기능**:
- 파일명 표시 헤더
- 언어 뱃지
- 복사 버튼 (호버 시 표시)
- 복사 완료 피드백

**사용 예시**:
```mdx
<CodeBlock language="typescript" filename="example.ts">
const hello = "world";
</CodeBlock>
```

### 5.4 반응형 디자인

```tsx
<div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
  <article>...</article>
  <aside className="hidden lg:block">...</aside>
</div>
```

**브레이크포인트**:
- 모바일 (`< 1024px`): 1열 레이아웃, TOC 숨김
- 데스크탑 (`≥ 1024px`): 2열 레이아웃, TOC 표시

**sticky TOC**:
```tsx
<div className="sticky top-20">
  <TableOfContents />
</div>
```
- `sticky`: 스크롤 시 상단에 고정
- `top-20`: 80px 오프셋 (헤더 높이)

---

## 핵심 컴포넌트 상세 분석

### 컴포넌트 계층 구조

```
PostPage (Server Component)
├── PostHeader (Server Component)
│   ├── Category Badge
│   ├── Title & Description
│   ├── Meta Info (Author, Date, Reading Time)
│   └── Tags
├── MDXContent (Client Component)
│   ├── Compiled MDX Function
│   └── mdxComponents
│       ├── HTML Elements (h1, h2, p, a, code, pre, ...)
│       ├── Callout
│       ├── CodeBlock (Client Component)
│       ├── ImageGallery
│       ├── Tabs
│       └── shadcn/ui Components
└── TableOfContents (Client Component)
    ├── Heading Extraction
    ├── Intersection Observer
    └── Active Section Tracking
```

### 서버/클라이언트 컴포넌트 분리

**서버 컴포넌트** (기본):
- `PostPage`: 정적 데이터 페칭 및 렌더링
- `PostHeader`: 메타 정보 표시

**클라이언트 컴포넌트** (`"use client"`):
- `MDXContent`: `useMemo`로 동적 컴포넌트 생성
- `CodeBlock`: `useState`로 복사 상태 관리
- `TableOfContents`: `useEffect`, `IntersectionObserver` 사용

**최적화**:
- 서버 컴포넌트는 JavaScript 번들에 포함되지 않음
- 클라이언트 컴포넌트만 hydration
- 초기 로딩 속도 향상

---

## 기술 스택 및 라이브러리

### 핵심 라이브러리

**콘텐츠 처리**:
- **Velite** (v0.3.0): 빌드 타임 콘텐츠 프로세서
- **MDX**: Markdown + JSX
- **rehype-pretty-code** (v0.14.1): 코드 하이라이팅
- **rehype-slug** (v6.0.0): 헤딩 ID 생성
- **rehype-autolink-headings** (v7.1.0): 헤딩 링크
- **remark-gfm** (v4.0.1): GitHub Flavored Markdown
- **Shiki** (v3.13.0): 구문 강조 엔진

**프레임워크**:
- **Next.js** (v15.5.5): React 프레임워크
- **React** (v19.1.0): UI 라이브러리
- **TypeScript** (v5): 타입 안전성

**스타일링**:
- **TailwindCSS** (v4): 유틸리티 CSS
- **tw-animate-css** (v1.4.0): 애니메이션
- **Radix UI**: 접근성 높은 UI 프리미티브
- **lucide-react** (v0.545.0): 아이콘

**유틸리티**:
- **date-fns** (v4.1.0): 날짜 포매팅
- **clsx** + **tailwind-merge**: 클래스 병합
- **zod** (v4.1.12): 스키마 검증

### 빌드 프로세스

```bash
# 1. 개발 모드
npm run dev
  ↓
  Next.js Dev Server (Turbopack)
  ├── Velite Watch Mode (콘텐츠 변경 감지)
  ├── Hot Module Replacement
  └── Fast Refresh

# 2. 프로덕션 빌드
npm run build
  ↓
  Next.js Build (Turbopack)
  ├── Velite Build (.velite/ 생성)
  ├── generateStaticParams (정적 경로 생성)
  ├── generateMetadata (SEO 메타데이터)
  ├── Static HTML 생성 (.next/server/app/posts/[slug].html)
  └── Client JavaScript 번들 (.next/static/)

# 3. 프로덕션 서버
npm run start
  ↓
  Next.js Production Server
  └── Static HTML 제공 (CDN 캐싱 가능)
```

### 파일 구조 요약

```
dev_blog/
├── content/
│   └── posts/
│       ├── hello-world.mdx              # MDX 게시물
│       ├── nextjs-15-features.mdx
│       └── react-server-components.mdx
├── src/
│   ├── app/
│   │   ├── posts/
│   │   │   └── [slug]/
│   │   │       └── page.tsx             # 동적 라우트
│   │   ├── globals.css                  # 전역 스타일
│   │   └── layout.tsx
│   ├── components/
│   │   ├── mdx/
│   │   │   ├── mdx-content.tsx          # MDX 실행기
│   │   │   ├── mdx-components.tsx       # 컴포넌트 매핑
│   │   │   ├── callout.tsx              # Callout 컴포넌트
│   │   │   ├── code-block.tsx           # CodeBlock 컴포넌트
│   │   │   └── ...
│   │   ├── post/
│   │   │   ├── post-header.tsx          # 게시물 헤더
│   │   │   └── table-of-contents.tsx    # 목차
│   │   └── ui/                          # shadcn/ui 컴포넌트
│   └── lib/
│       └── utils.ts                     # cn() 등 유틸리티
├── .velite/
│   ├── index.d.ts                       # 타입 정의
│   └── index.js                         # 컴파일된 데이터
├── public/
│   └── static/                          # Velite 생성 정적 파일
├── velite.config.ts                     # Velite 설정
├── next.config.ts                       # Next.js 설정
└── package.json
```

---

## 성능 최적화

### 빌드 타임 최적화

1. **정적 사이트 생성 (SSG)**
   - 모든 게시물을 빌드 시 HTML로 생성
   - 런타임 데이터베이스 쿼리 없음
   - CDN 캐싱 가능

2. **코드 하이라이팅 사전 처리**
   - Shiki가 빌드 시 구문 강조
   - 브라우저에서 JavaScript 하이라이터 불필요
   - 초기 번들 크기 감소

3. **이미지 최적화**
   - Next.js Image 컴포넌트 사용
   - 자동 WebP/AVIF 변환
   - 반응형 이미지

### 런타임 최적화

1. **서버 컴포넌트 우선**
   - 대부분 서버에서 렌더링
   - 클라이언트 JavaScript 최소화

2. **코드 스플리팅**
   - 동적 import로 필요한 컴포넌트만 로드
   - 라우트별 자동 분할

3. **Intersection Observer**
   - TOC 활성 섹션 추적
   - 스크롤 이벤트보다 성능 우수

4. **useMemo 활용**
   - MDX 컴파일 결과 캐싱
   - 불필요한 재컴파일 방지

---

## 확장 가능성

### 새로운 MDX 컴포넌트 추가

1. 컴포넌트 생성:
```tsx
// src/components/mdx/my-component.tsx
export function MyComponent({ children }: { children: React.ReactNode }) {
  return <div className="my-custom-style">{children}</div>;
}
```

2. mdx-components.tsx에 등록:
```tsx
import { MyComponent } from "./my-component";

export const mdxComponents = {
  // ...
  MyComponent,
};
```

3. MDX에서 사용:
```mdx
<MyComponent>
  Hello, World!
</MyComponent>
```

### 새로운 rehype/remark 플러그인 추가

```typescript
// velite.config.ts
import myRehypePlugin from "rehype-my-plugin";

export default defineConfig({
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypePrettyCode,
      myRehypePlugin,  // 여기에 추가
    ],
  },
});
```

### 새로운 컬렉션 추가 (예: 프로젝트)

```typescript
// velite.config.ts
const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    // ...
  }),
});

export default defineConfig({
  collections: { posts, projects },  // 추가
});
```

---

## 요약

이 블로그의 게시물 렌더링은 **빌드 타임 최적화**와 **런타임 성능**을 모두 고려한 현대적 아키텍처입니다.

**주요 특징**:

1. ✅ **타입 안전성**: Velite + TypeScript + Zod
2. ✅ **성능**: SSG + 서버 컴포넌트 우선
3. ✅ **개발자 경험**: MDX + 커스텀 컴포넌트
4. ✅ **SEO**: 정적 HTML + 메타데이터
5. ✅ **접근성**: Semantic HTML + Radix UI
6. ✅ **확장성**: 플러그인 시스템
7. ✅ **사용자 경험**: 부드러운 스크롤, TOC, 코드 복사

**렌더링 플로우 요약**:

```
MDX 작성
  → Velite 컴파일 (rehype/remark)
  → 타입 안전 데이터 생성
  → Next.js SSG
  → 정적 HTML
  → 브라우저 렌더링
    ├── PostHeader (메타 정보)
    ├── MDXContent (컴파일된 콘텐츠)
    └── TableOfContents (인터랙티브 목차)
```

이 아키텍처는 **Contentlayer의 한계를 극복**하고 **Next.js 15의 최신 기능**을 활용하여 최고의 블로깅 경험을 제공합니다.
