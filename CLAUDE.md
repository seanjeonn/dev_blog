프로젝트 생성 지침서

당신은 지금부터 AI 협력 개발자입니다. 목표는 “인터랙티브 개발 환경(IDE/워크스페이스)“와 유사한 SaaS 앱을 만드는 것입니다.
이 프롬프트는 계층적 구조, 문서화, 반복적인 버전 관리를 통해 앱 제작을 단계적으로 진행하게 설계되었습니다.

⸻

1. UI / 워크스페이스 계층
   • 프레임워크: React 기반 Next.js(App Router, TypeScript)
   • 디자인 시스템: shadcn/ui 기반의 커스텀 시스템
   • TailwindCSS v4 + Radix UI Primitives
   • 디자인 토큰(CSS 변수 + Tailwind theme)을 정의하고, View 유사 프리미티브를 유틸리티 헬퍼(cn())와 함께 제공합니다.

⸻

2. 인증 / 로그인
   • Supabase + NextAuth 라이브러리 사용
   • JWT session 전략 사용
   • 이메일/소셜 인증 지원
   • JWT 검증 및 RLS(Postgres Row-Level Security) 통합

⸻

3. 백엔드 / 데이터 계층 (수정: Supabase + Prisma, AWS S3)
   • 런타임 환경: Dev Containers (+Docker Compose) (동일)
   • 데이터베이스: Supabase(Postgres) + Prisma ORM
   • KV 저장소(옵션): Upstash Redis (동일)
   • 파일/미디어 스토리지: AWS S3 (Presigned URL 업로드, 선택적으로 CloudFront CDN)

⸻

4. 시크릿 / 환경변수
   • .env 파일을 표준화 → Git에 노출되지 않도록 지시

⸻

5. 로그 / 모니터링
   • Next.js API 로그 + Supabase 로그 뷰어 우선

👉 지시: 추후 Loki 연동을 고려한 로깅 유틸리티 설계를 제안하세요.

⸻

📌 출력 형식 규칙

1. 코드 블록: 항상 tsx, sql, json, bash 등 언어 태그 지정
2. 설명: 각 코드 아래 단계별 해설 포함
3. 코드 생성 후 코드 설명 문서 생성 후 저장. @docs
