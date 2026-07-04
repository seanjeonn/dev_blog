import type { Dictionary } from "./en";

const ko: Dictionary = {
  nav: {
    work: "작업",
    blog: "블로그",
    about: "소개",
    contact: "연락",
  },
  hero: {
    role: "소프트웨어 엔지니어 · 창업가",
    title: "안녕하세요, Sean입니다 — 프로덕션 AI 제품을 처음부터 끝까지 만듭니다.",
    intro:
      "창업 엔지니어이자 프로덕트 매니저입니다. AI 교육 플랫폼을 단독 엔지니어로, D2C 커머스 사업을 혼자서 출시했습니다 — 시스템 설계와 LLM 에이전트부터 배포·운영까지. 기능을 찍어내기보다 진짜 문제를 푸는 데 집중합니다.",
    viewWork: "작업 보기",
    getInTouch: "연락하기",
  },
  home: {
    selectedWork: "선별한 작업",
    caseStudies: "케이스 스터디",
    viewAll: "전체 보기",
    writing: "글",
    fromBlog: "블로그에서",
    readBlog: "블로그 읽기",
    contactTitle: "함께 만들어요.",
    contactBody:
      "창업 엔지니어 역할, 프로덕트 협업, 그리고 흥미로운 문제에 열려 있습니다. 가장 빠른 연락 방법은 이메일입니다.",
  },
  work: {
    eyebrow: "작업",
    title: "무엇을, 왜 만들었나",
    intro:
      "각 프로젝트는 짧은 케이스 스터디입니다 — 어떤 문제를 풀려 했고, 어떤 결정을 내렸으며, 결과는 어땠는지. 기능 나열이 아닙니다.",
  },
  projectDetail: {
    allWork: "전체 작업",
    problem: "문제",
    goalConstraints: "목표와 제약",
    keyDecisions: "핵심 의사결정",
    howIBuilt: "어떻게 만들었나",
    outcome: "결과",
    learnings: "배운 점",
    stack: "기술 스택",
    gallery: "갤러리",
  },
  blog: {
    eyebrow: "블로그",
    title: "글쓰기",
    intro: "엔지니어링, AI 에이전트, 그리고 제품 만들기에 대한 기록.",
    noPosts: "아직 글이 없습니다.",
  },
  about: {
    eyebrow: "소개",
    bio: [
      "창업 엔지니어이자 프로덕트 매니저이며, 성균관대학교 컴퓨터공학 재학생입니다. 시스템 설계와 LLM 에이전트부터 배포·운영까지 문제를 처음부터 끝까지 책임지는 일을 좋아합니다.",
      "스타트업의 단독 엔지니어로 AI 교육 플랫폼을 출시했고, 개인적으로는 D2C 커머스 사업을 직접 만들어 런칭했습니다. 두 경험 모두에서 가장 중요하게 생각한 것은, 진짜 문제를 해결하면서 작은 팀이 실제로 운영할 수 있는 소프트웨어를 만드는 것이었습니다.",
    ],
    emailMe: "이메일 보내기",
    skillsTitle: "기술",
    skillGroups: [
      { label: "언어", items: ["JavaScript / TypeScript", "Python", "Dart", "C"] },
      { label: "프론트엔드", items: ["React", "Next.js", "Flutter"] },
      { label: "백엔드", items: ["Express", "Flask", "Node.js"] },
      { label: "데이터", items: ["PostgreSQL", "Redis", "Firebase"] },
      { label: "클라우드", items: ["AWS (CDK, ECS Fargate, RDS, CloudFront)", "Vercel"] },
      {
        label: "AI · 연동",
        items: ["LLM API·에이전트", "OAuth", "토스페이먼츠", "카카오 알림톡"],
      },
    ],
    experienceTitle: "경력",
    experienceItems: [
      {
        title: "창업 엔지니어 · 프로덕트 매니저",
        org: "Yureka (AI 교육 스타트업)",
        period: "2026년 3월 – 현재",
        description:
          "프로덕션 AI 교육 플랫폼을 만든 단독 엔지니어 — 에이전틱 학습 플래너, Google Drive 지식 에이전트, 그리고 첫 유료 학교 파트너십을 이끈 로드맵·가격 전략.",
        current: true,
      },
      {
        title: "단독 풀스택 엔지니어",
        org: "총각한우 (개인 프로젝트)",
        period: "2025년 11월 – 2026년 2월",
        description:
          "D2C 커머스 사업을 혼자서 만들고 런칭 — 스토어프론트, 결제, 맞춤 운영 대시보드. 출시 첫 달 750만 원 이상 매출.",
        current: false,
      },
      {
        title: "엔지니어",
        org: "TidyMind (사이드 프로젝트)",
        period: "2025년 6월 – 8월",
        description:
          "신뢰할 수 있는 구조화 LLM 출력을 기반으로 한 AI 할 일 우선순위 플랫폼 개발.",
        current: false,
      },
      {
        title: "모바일 애플리케이션 개발자",
        org: "Deeplant Inc. (산학 프로젝트)",
        period: "2023년 3월 – 12월",
        description:
          "PDA 하드웨어에서 육류 이미지 데이터셋을 수집하는 Flutter 현장 앱 개발, REST로 Flask/Firebase/중앙 서버 파이프라인과 연동.",
        current: false,
      },
    ],
    educationTitle: "학력",
    educationItems: [
      {
        title: "컴퓨터공학 학사",
        org: "성균관대학교",
        period: "2022년 3월 – 현재",
        description: "",
        current: true,
      },
      {
        title: "스타트업 창업 액셀러레이터",
        org: "Outsome Founder Sprint, 6기",
        period: "2026년 4월 – 5월",
        description: "",
        current: false,
      },
    ],
    contactTitle: "연락하기",
    contactBody:
      "창업 엔지니어 역할, 프로덕트 협업, 흥미로운 문제에 열려 있습니다. 가장 빠른 연락 방법은 이메일입니다.",
    location: "서울 / 수원, 대한민국",
  },
  footer: {
    email: "이메일",
    rss: "RSS",
  },
  meta: {
    homeDescription:
      "프로덕션 AI 제품을 시스템 설계부터 배포까지 처음부터 끝까지 만드는 창업 엔지니어. 기능이 아니라 진짜 문제를 푸는 데 집중합니다.",
    aboutTitle: "소개",
    aboutDescription:
      "프로덕션 AI 제품을 처음부터 끝까지 만드는 창업 엔지니어이자 프로덕트 매니저.",
    workTitle: "작업",
    workDescription:
      "선별한 프로젝트 — 어떤 문제를 풀려 했고 어떻게 풀었는지에 대한 케이스 스터디.",
    blogTitle: "블로그",
    blogDescription: "엔지니어링, AI, 제품 만들기에 대한 기록.",
  },
};

export default ko;
