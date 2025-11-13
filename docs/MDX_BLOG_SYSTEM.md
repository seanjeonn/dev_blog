# MDX 블로그 시스템 문서

## 📋 목차

1. [개요](#개요)
2. [아키텍처](#아키텍처)
3. [기술 스택](#기술-스택)
4. [디렉토리 구조](#디렉토리-구조)
5. [MDX 작성 가이드](#mdx-작성-가이드)
6. [커스텀 컴포넌트](#커스텀-컴포넌트)
7. [개발 가이드](#개발-가이드)

---

## 개요

이 프로젝트는 **Velite + MDX + Next.js 15**를 활용한 타입 안전한 블로그 시스템입니다.

### 주요 특징

- ✅ **타입 안전성**: Velite로 MDX 파일을 타입 안전한 데이터로 변환
- ✅ **정적 생성**: 빌드 타임에 모든 포스트를 정적 페이지로 생성
- ✅ **풍부한 UI**: shadcn/ui 기반의 아름다운 컴포넌트들
- ✅ **커스텀 MDX 블록**: Callout, CodeBlock, ImageGallery, Tabs 등
- ✅ **코드 하이라이팅**: rehype-pretty-code로 GitHub Dark 테마 적용
- ✅ **TOC 자동 생성**: Intersection Observer 기반 스크롤 추적
- ✅ **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원

---

## 아키텍처

```
┌─────────────┐
│ MDX 파일    │ → content/posts/*.mdx
└──────┬──────┘
       │
       ↓ (빌드 타임)
┌─────────────┐
│   Velite    │ → velite.config.ts
└──────┬──────┘
       │
       ↓ (타입 생성)
┌─────────────┐
│  .velite/   │ → 타입 안전한 데이터
└──────┬──────┘
       │
       ↓ (import)
┌─────────────┐
│ Next.js 앱  │ → app/posts/[slug]/page.tsx
└─────────────┘
```

### 데이터 흐름

1. **작성**: `content/posts/*.mdx`에 마크다운 포스트 작성
2. **빌드**: Velite가 MDX를 파싱하고 타입 생성
3. **렌더링**: Next.js가 정적 페이지 생성 (SSG)
4. **배포**: 완전히 정적인 사이트 배포 가능

---

## 기술 스택

| 카테고리 | 기술 |
|---------|------|
| **프레임워크** | Next.js 15.5 (App Router) |
| **런타임** | React 19.1 |
| **언어** | TypeScript 5 |
| **스타일링** | TailwindCSS v4 |
| **UI 라이브러리** | shadcn/ui + Radix UI |
| **콘텐츠 관리** | Velite 0.3 |
| **MDX 처리** | rehype-pretty-code, rehype-slug, remark-gfm |
| **코드 하이라이팅** | Shiki 3.13 |
| **날짜 처리** | date-fns 4.1 |
| **빌드 도구** | Turbopack (stable) |

---

## 디렉토리 구조

```
dev_blog/
├── content/
│   └── posts/
│       ├── hello-world.mdx
│       ├── nextjs-15-features.mdx
│       └── react-server-components.mdx
│
├── src/
│   ├── app/
│   │   └── posts/
│   │       ├── page.tsx              # 포스트 리스트
│   │       └── [slug]/
│   │           └── page.tsx          # 포스트 상세
│   │
│   └── components/
│       ├── mdx/
│       │   ├── mdx-components.tsx    # MDX 컴포넌트 매핑
│       │   ├── mdx-content.tsx       # MDX 렌더러
│       │   ├── callout.tsx
│       │   ├── code-block.tsx
│       │   ├── image-gallery.tsx
│       │   └── tabs.tsx
│       │
│       └── post/
│           ├── post-card.tsx
│           ├── post-header.tsx
│           └── table-of-contents.tsx
│
├── velite.config.ts                  # Velite 설정
├── next.config.ts                    # Next.js 설정
└── .velite/                          # 자동 생성 (gitignore)
    └── index.d.ts                    # 타입 정의
```

---

## MDX 작성 가이드

### 기본 구조

```mdx
---
title: "포스트 제목"
description: "포스트 설명"
date: 2025-01-17
published: true
author: "작성자"
tags: ["React", "Next.js"]
category: "Tutorial"
featured: false
toc: true
---

# 제목

포스트 내용...
```

### Frontmatter 필드

| 필드 | 타입 | 필수 | 설명 |
|-----|------|-----|------|
| `title` | string | ✅ | 포스트 제목 (최대 99자) |
| `description` | string | ❌ | 포스트 설명 (최대 999자) |
| `date` | ISO date | ✅ | 발행 날짜 |
| `published` | boolean | ❌ | 발행 여부 (기본: false) |
| `author` | string | ❌ | 작성자 (기본: "Admin") |
| `tags` | string[] | ❌ | 태그 목록 |
| `category` | string | ❌ | 카테고리 |
| `series` | string | ❌ | 시리즈 이름 |
| `seriesOrder` | number | ❌ | 시리즈 순서 |
| `featured` | boolean | ❌ | 주요 포스트 여부 |
| `toc` | boolean | ❌ | TOC 표시 여부 (기본: true) |
| `cover` | string | ❌ | 커버 이미지 경로 |

### 자동 생성 필드

- **slug**: 파일 경로에서 자동 생성
- **permalink**: `/posts/{slug}` 형식
- **readingTime**: 단어 수 기반 계산 (200 단어/분)

---

## 커스텀 컴포넌트

### 1. Callout

정보, 경고, 성공, 에러, 팁을 강조 표시합니다.

```mdx
<Callout type="info" title="참고">
이것은 정보 Callout입니다.
</Callout>

<Callout type="warning" title="주의">
경고 메시지입니다.
</Callout>

<Callout type="success" title="성공">
성공 메시지입니다.
</Callout>

<Callout type="error" title="오류">
에러 메시지입니다.
</Callout>

<Callout type="tip" title="팁">
유용한 팁입니다.
</Callout>
```

**Props:**
- `type`: "info" | "warning" | "success" | "error" | "tip"
- `title`: 제목 (선택)
- `children`: 내용

### 2. CodeBlock

복사 기능이 있는 코드 블록입니다.

```mdx
<CodeBlock language="typescript" filename="example.ts">
{`
const hello = () => {
  console.log("Hello, World!");
};
`}
</CodeBlock>
```

**Props:**
- `children`: 코드 문자열
- `language`: 언어 타입
- `filename`: 파일 이름 (선택)

### 3. Tabs & CodeTabs

탭으로 콘텐츠를 전환합니다.

```mdx
<Tabs items={[
  { label: "Tab 1", content: <div>내용 1</div> },
  { label: "Tab 2", content: <div>내용 2</div> }
]} />
```

**코드 탭 전용:**

```mdx
<CodeTabs tabs={[
  {
    title: "npm",
    language: "bash",
    code: "npm install velite"
  },
  {
    title: "pnpm",
    language: "bash",
    code: "pnpm add velite"
  }
]} />
```

### 4. ImageGallery

라이트박스가 있는 이미지 갤러리입니다.

```mdx
<ImageGallery
  columns={3}
  images={[
    { src: "/img1.jpg", alt: "이미지 1", caption: "설명 1" },
    { src: "/img2.jpg", alt: "이미지 2", caption: "설명 2" }
  ]}
/>
```

**Props:**
- `images`: 이미지 배열
  - `src`: 이미지 경로
  - `alt`: 대체 텍스트
  - `caption`: 캡션 (선택)
- `columns`: 2 | 3 | 4 (기본: 3)

### 5. shadcn/ui 컴포넌트

MDX에서 직접 사용 가능합니다:

```mdx
<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>
    내용
  </CardContent>
  <CardFooter>
    <Button>클릭</Button>
  </CardFooter>
</Card>
```

---

## 개발 가이드

### 1. 새 포스트 작성

```bash
# content/posts/ 에 새 MDX 파일 생성
touch content/posts/my-new-post.mdx
```

```mdx
---
title: "내 새 포스트"
description: "설명"
date: 2025-01-17
published: true
author: "작성자"
tags: ["tag1", "tag2"]
---

# 내용 작성...
```

### 2. 개발 서버 실행

```bash
npm run dev
```

Velite가 자동으로 MDX 파일을 감지하고 재생성합니다.

### 3. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 로컬에서 프로덕션 미리보기
npm run start
```

### 4. 새 커스텀 컴포넌트 추가

1. `src/components/mdx/` 에 새 컴포넌트 생성
2. `src/components/mdx/mdx-components.tsx` 에 추가:

```tsx
import { MyComponent } from "./my-component";

export const mdxComponents = {
  // ... 기존 컴포넌트
  MyComponent,
};
```

3. MDX 파일에서 사용:

```mdx
<MyComponent prop="value" />
```

### 5. Velite 설정 수정

`velite.config.ts`에서 스키마, 플러그인, 변환 로직 수정:

```ts
const posts = defineCollection({
  schema: s.object({
    // 새 필드 추가
    customField: s.string().optional(),
  }),
});
```

---

## 트러블슈팅

### 문제: .velite 타입을 찾을 수 없음

**해결:**
```bash
npm run dev  # 한 번 실행하여 .velite 생성
```

### 문제: MDX 변경이 반영되지 않음

**해결:**
```bash
rm -rf .velite
npm run dev  # 재시작
```

### 문제: 코드 하이라이팅이 작동하지 않음

**해결:** `velite.config.ts`의 `rehypePrettyCode` 설정 확인

---

## 다음 단계

- [ ] 검색 기능 추가 (Algolia 또는 로컬 검색)
- [ ] 카테고리/태그 필터링 페이지
- [ ] 댓글 시스템 (Giscus)
- [ ] RSS 피드 생성
- [ ] SEO 최적화 (sitemap, robots.txt)
- [ ] 다크 모드 지원
- [ ] 조회수/좋아요 기능 (Prisma + DB 연동)

---

**생성일**: 2025-01-17
**버전**: 1.0.0
**작성자**: AI Assistant
