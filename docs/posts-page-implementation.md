# Posts 페이지 구현 문서

## 개요

Posts 페이지에 검색 및 카테고리 필터링 기능, 그리고 RSS 피드 생성 기능을 추가했습니다.

### 주요 기능

1. **심플한 Hero 섹션** - 검색 input과 카테고리 버튼 그룹
2. **URL 기반 서버사이드 필터링** - 검색어와 카테고리를 URL 쿼리 파라미터로 관리
3. **Velite 메타데이터 수집** - 빌드 시 카테고리 목록과 통계 자동 생성
4. **RSS 피드** - XML을 직접 생성하는 Route Handler

---

## 1. Velite 메타데이터 수집

### 파일: `velite.config.ts`

#### 구현 내용

`prepare` 함수를 추가하여 빌드 시점에 메타데이터를 수집합니다.

```typescript
prepare({ posts }) {
  // 발행된 포스트만 필터링
  const publishedPosts = posts.filter((post) => post.published);

  // 카테고리 수집 및 정렬
  const categorySet = new Set<string>();
  const categoryCount: Record<string, number> = {};

  publishedPosts.forEach((post) => {
    if (post.category) {
      categorySet.add(post.category);
      categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
    }
  });

  const categories = Array.from(categorySet).sort();

  // 메타데이터 생성
  const metadata = {
    totalPosts: posts.length,
    publishedPosts: publishedPosts.length,
    featuredPosts: publishedPosts.filter((post) => post.featured).length,
    categoryCount,
  };

  return {
    posts,
    categories,
    metadata,
  };
}
```

#### 동작 원리

1. **필터링**: `published: true`인 포스트만 선택
2. **카테고리 수집**: `Set`을 사용해 중복 제거
3. **카테고리 카운팅**: 각 카테고리별 포스트 개수 계산
4. **정렬**: 알파벳 순으로 카테고리 정렬
5. **Export**: `.velite/index.ts`에 `categories`, `metadata` 자동 export

#### 사용 방법

```typescript
import { posts, categories, metadata } from ".velite";

console.log(categories); // ["Framework", "React", "Tutorial"]
console.log(metadata.categoryCount); // { Framework: 1, React: 1, Tutorial: 1 }
```

---

## 2. PostsHero 컴포넌트

### 파일: `src/components/posts/posts-hero.tsx`

#### 구현 내용

클라이언트 컴포넌트로 구현된 검색 및 필터 UI입니다.

```typescript
"use client";

export function PostsHero({ categories }: PostsHeroProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const selectedCategory = searchParams.get("category") || "";

  // Debounce search query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL(searchQuery, selectedCategory);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const updateURL = (query: string, category: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);

    const newURL = params.toString() ? `/posts?${params}` : "/posts";
    router.push(newURL, { scroll: false });
  };

  // ... UI 렌더링
}
```

#### 주요 기능

1. **Debounced Search**
   - 사용자가 타이핑을 멈춘 후 300ms 후에 URL 업데이트
   - 불필요한 렌더링 방지

2. **URL 동기화**
   - 검색어: `?q=검색어`
   - 카테고리: `?category=Framework`
   - 둘 다: `?q=검색어&category=Framework`

3. **버튼 그룹**
   - "전체" 버튼: 카테고리 필터 해제
   - 선택된 카테고리는 `variant="default"` (파란색)
   - 나머지는 `variant="outline"` (회색 테두리)

4. **UX 최적화**
   - `scroll: false` - URL 변경 시 스크롤 위치 유지
   - 실시간 반응형 UI

---

## 3. Posts 페이지 수정

### 파일: `src/app/posts/page.tsx`

#### 구현 내용

```typescript
interface PostsPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const searchQuery = params.q?.toLowerCase() || "";
  const selectedCategory = params.category || "";

  // 기본 필터링 (발행됨 + 최신순)
  let publishedPosts = posts
    .filter((post: Post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

  // Featured/Regular 분리는 유지
  const featuredPosts = publishedPosts.filter((post) => post.featured);
  const regularPosts = publishedPosts.filter((post) => !post.featured);

  // ... UI 렌더링
}
```

#### 필터링 로직

1. **기본 필터링**
   - `published: true`만 표시
   - 날짜 내림차순 정렬 (최신 포스트가 위로)

2. **검색 필터**
   - 제목과 설명에서 검색어 포함 여부 확인
   - 대소문자 무시 (`toLowerCase()`)

3. **카테고리 필터**
   - 정확히 일치하는 카테고리만 선택
   - "전체" 선택 시 모든 카테고리 표시

4. **AND 조건**
   - 검색어와 카테고리가 모두 있으면 둘 다 만족해야 함
   - 예: "React" 검색 + "Framework" 카테고리 → 둘 다 만족하는 포스트만

#### Next.js 15 특징

- `searchParams`가 **Promise**로 변경됨 (`await` 필요)
- Server Component로 동작 (초기 렌더링은 서버에서)
- URL 변경 시 자동으로 페이지 리렌더링

---

## 4. RSS 피드 생성

### 파일: `src/app/feed.xml/route.ts`

#### 구현 내용

```typescript
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>개발 블로그</title>
    <link>${siteUrl}</link>
    <description>기술 블로그의 모든 포스트</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <!-- ... items -->
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
```

#### RSS 2.0 스펙

1. **채널 정보**
   - `<title>`: 블로그 제목
   - `<link>`: 블로그 URL
   - `<description>`: 블로그 설명
   - `<language>`: 한국어 (ko)
   - `<lastBuildDate>`: 현재 시간 (UTC)

2. **아이템 정보**
   - `<title>`: 포스트 제목
   - `<link>`: 포스트 URL
   - `<guid>`: 고유 ID (URL과 동일)
   - `<description>`: 포스트 설명
   - `<pubDate>`: 발행 날짜 (UTC)
   - `<author>`: 작성자
   - `<category>`: 카테고리 + 태그들

3. **XML 이스케이프**
   ```typescript
   function escapeXml(str: string): string {
     return str
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&apos;");
   }
   ```

#### 캐싱 전략

- **브라우저 캐시**: 1시간 (`max-age=3600`)
- **CDN 캐시**: 1시간 (`s-maxage=3600`)
- 새 포스트 발행 시 자동 업데이트 (빌드 시점에 재생성)

#### 사용 방법

1. **URL 접근**: `https://yoursite.com/feed.xml`
2. **RSS 리더 등록**: Feedly, Inoreader 등에 URL 추가
3. **환경변수 설정** (`.env.local`):
   ```
   NEXT_PUBLIC_SITE_URL=https://yoursite.com
   ```

---

## 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                     사용자 요청                          │
│                  /posts?q=react&category=Framework       │
└─────────────────────────────┬───────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js Server Component                    │
│                 (posts/page.tsx)                         │
│                                                          │
│  1. searchParams 파싱                                   │
│  2. Velite 데이터 가져오기                              │
│     - posts (from .velite)                              │
│     - categories (from .velite)                         │
│  3. 서버사이드 필터링                                    │
│     - 검색어 매칭 (제목/설명)                           │
│     - 카테고리 매칭                                      │
│  4. HTML 생성 (SSR)                                     │
└─────────────────────────────┬───────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│             Client Component Hydration                  │
│                (PostsHero)                               │
│                                                          │
│  1. URL 쿼리 파라미터 읽기                              │
│  2. 검색 input 상태 관리                                │
│  3. 카테고리 버튼 클릭 핸들러                           │
│  4. Debounced URL 업데이트                              │
│     → router.push() → 페이지 리렌더링                   │
└─────────────────────────────────────────────────────────┘
```

---

## 빌드 프로세스

```
npm run dev/build
    │
    ▼
┌─────────────────────────────────────────────────────────┐
│                  Velite Build                            │
│                                                          │
│  1. content/posts/*.mdx 파일 읽기                       │
│  2. Frontmatter 파싱 (title, category, tags, etc.)     │
│  3. MDX 컴파일                                          │
│  4. prepare() 함수 실행                                 │
│     - 카테고리 수집 → categories[]                      │
│     - 통계 계산 → metadata{}                            │
│  5. .velite/index.ts 생성                               │
│     export { posts, categories, metadata }              │
└─────────────────────────────┬───────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js App Build                           │
│                                                          │
│  1. posts/page.tsx 빌드                                 │
│  2. .velite에서 데이터 import                           │
│  3. 정적 HTML 생성 (기본 상태)                          │
│  4. feed.xml/route.ts 빌드                              │
│     → RSS XML 생성 준비                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 향후 확장 방안

### 1. 태그 필터링 추가

현재는 카테고리만 필터링하지만, 태그 필터링을 추가할 수 있습니다:

```typescript
// velite.config.ts prepare() 함수에 추가
const tagSet = new Set<string>();
publishedPosts.forEach((post) => {
  post.tags?.forEach((tag) => tagSet.add(tag));
});
const tags = Array.from(tagSet).sort();

return { posts, categories, tags, metadata };
```

```typescript
// PostsHero 컴포넌트에 태그 선택 UI 추가
<div className="flex flex-wrap gap-2">
  {tags.map((tag) => (
    <Button
      key={tag}
      variant={selectedTags.includes(tag) ? "default" : "outline"}
      size="sm"
      onClick={() => handleTagClick(tag)}
    >
      #{tag}
    </Button>
  ))}
</div>
```

### 2. 정렬 옵션

사용자가 정렬 방식을 선택할 수 있도록 개선:

- 최신순 (기본)
- 오래된순
- 제목순 (알파벳)
- 인기순 (조회수, 좋아요 - 추후 구현)

### 3. 페이지네이션

포스트가 많아지면 페이지네이션 추가:

```typescript
const POSTS_PER_PAGE = 12;
const page = Number(searchParams.page) || 1;
const paginatedPosts = filteredPosts.slice(
  (page - 1) * POSTS_PER_PAGE,
  page * POSTS_PER_PAGE
);
```

### 4. 검색 개선

- Fuzzy search (유사 검색)
- 태그 내용도 검색 대상에 포함
- 본문(body) 검색 (성능 고려 필요)

### 5. RSS 기능 확장

- Atom 피드 추가 (`/atom.xml`)
- JSON Feed 추가 (`/feed.json`)
- 카테고리별 RSS 피드 (`/feed/framework.xml`)

---

## 트러블슈팅

### 문제 1: Velite가 categories를 export하지 않음

**증상**: `import { categories } from ".velite"` 에러 발생

**해결**:
1. `velite.config.ts`에 `prepare()` 함수가 올바르게 추가되었는지 확인
2. `npm run dev` 재시작하여 Velite 재빌드
3. `.velite/index.ts` 파일을 확인하여 `export const categories` 존재 여부 확인

### 문제 2: searchParams가 Promise 에러

**증상**: `searchParams.q` 접근 시 타입 에러

**해결**:
Next.js 15부터 `searchParams`는 Promise입니다:
```typescript
// ❌ 잘못된 방법
export default function Page({ searchParams }: Props) {
  const q = searchParams.q; // Error!
}

// ✅ 올바른 방법
export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q;
}
```

### 문제 3: RSS 피드가 표시되지 않음

**증상**: `/feed.xml` 접근 시 404 에러

**해결**:
1. 파일 경로 확인: `src/app/feed.xml/route.ts` (폴더 이름이 `feed.xml`)
2. 개발 서버 재시작
3. 빌드 후 테스트: `npm run build && npm run start`

### 문제 4: 한글 검색이 작동하지 않음

**증상**: 한글로 검색해도 결과가 없음

**해결**:
`toLowerCase()`는 한글에도 작동하지만, 자음/모음 분리 검색이 필요하면 별도 라이브러리 사용:
```bash
npm install hangul-js
```

---

## 성능 최적화

### 1. 서버사이드 필터링

- 클라이언트로 전송되는 데이터 최소화
- 초기 로딩 속도 빠름

### 2. Debounced Search

- 타이핑할 때마다 렌더링하지 않음
- 300ms 딜레이로 최적화

### 3. RSS 피드 캐싱

- 1시간 동안 캐시 유지
- 서버 부하 감소

### 4. Static Generation

- Posts 페이지는 빌드 타임에 정적 생성 가능
- ISR (Incremental Static Regeneration) 적용 고려

---

## 참고 자료

- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [Velite Documentation](https://velite.js.org/)
- [RSS 2.0 Specification](https://www.rssboard.org/rss-specification)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## 변경 이력

### 2025-01-XX - 초기 구현

- ✅ Velite 메타데이터 수집 기능 추가
- ✅ PostsHero 컴포넌트 생성
- ✅ Posts 페이지에 검색 및 카테고리 필터 구현
- ✅ RSS 피드 생성 (순수 XML)
- ✅ 문서 작성

---

**문서 작성**: Claude Code
**마지막 업데이트**: 2025-01-XX
