import type { Locale } from "@/lib/i18n/config";

/** A value stored per locale. */
export type Localized<T> = Record<Locale, T>;

// ─── Raw storage types (localized fields) ───
export interface ProjectLink {
  label: Localized<string>;
  href: string;
  type: "demo" | "github" | "other";
}

export interface ProjectDecision {
  decision: Localized<string>;
  rationale: Localized<string>;
}

export interface ProjectProcessStep {
  heading: Localized<string>;
  body: Localized<string>;
}

export interface ProjectMetric {
  label: Localized<string>;
  value: Localized<string>;
}

export interface Project {
  id: string;
  title: Localized<string>;
  tagline: Localized<string>;
  role: Localized<string>;
  organization?: Localized<string>;
  period: Localized<string>;
  category: Localized<string>;
  tags: string[];
  techStack: string[];
  image: string;
  gallery?: string[];
  links: ProjectLink[];
  featured: boolean;
  date: string;

  problem: Localized<string>;
  goal: Localized<string>;
  decisions: ProjectDecision[];
  process: ProjectProcessStep[];
  outcome: Localized<string>;
  metrics?: ProjectMetric[];
  learnings?: Localized<string[]>;
}

// ─── Resolved types (flattened for one locale — what components consume) ───
export interface ResolvedProjectLink {
  label: string;
  href: string;
  type: "demo" | "github" | "other";
}

export interface ResolvedProject {
  id: string;
  title: string;
  tagline: string;
  role: string;
  organization?: string;
  period: string;
  category: string;
  tags: string[];
  techStack: string[];
  image: string;
  gallery?: string[];
  links: ResolvedProjectLink[];
  featured: boolean;
  date: string;
  problem: string;
  goal: string;
  decisions: { decision: string; rationale: string }[];
  process: { heading: string; body: string }[];
  outcome: string;
  metrics?: { label: string; value: string }[];
  learnings?: string[];
}

export const projects: Project[] = [
  {
    id: "yureka",
    title: {
      en: "Yureka — AI Study Platform",
      ko: "Yureka — AI 학습 플랫폼",
    },
    tagline: {
      en: "An agentic study planner that turns messy student learning data into personalized guidance.",
      ko: "흩어진 학생 학습 데이터를 개인화된 가이드로 바꾸는 에이전틱 학습 플래너.",
    },
    role: {
      en: "Founding Engineer & Product Manager",
      ko: "창업 엔지니어 · 프로덕트 매니저",
    },
    organization: {
      en: "Yureka (AI Education Startup)",
      ko: "Yureka (AI 교육 스타트업)",
    },
    period: { en: "Mar 2026 – Present", ko: "2026년 3월 – 현재" },
    category: { en: "AI", ko: "AI" },
    tags: ["Next.js", "TypeScript", "LLM Agents", "AWS"],
    techStack: [
      "Next.js",
      "TypeScript",
      "LLM APIs",
      "AWS",
      "PostgreSQL",
      "Google Drive API",
    ],
    image: "/static/yureka.png",
    links: [
      { label: { en: "Live", ko: "바로가기" }, href: "https://yureka.co.kr", type: "demo" },
    ],
    featured: true,
    date: "2026-03-01",
    problem: {
      en: "Students and mentors sit on scattered learning data — quiz scores, session notes, study logs — but nobody has time to turn it into a concrete plan. A tutoring business can't scale personalized guidance when it depends on a human reading every student's history by hand.",
      ko: "학생과 멘토는 퀴즈 점수, 수업 노트, 학습 로그 같은 흩어진 데이터를 쌓아두지만, 이를 구체적인 계획으로 바꿀 시간이 없습니다. 사람이 학생 한 명 한 명의 이력을 일일이 읽어야 한다면 개인화된 지도를 확장할 수 없습니다.",
    },
    goal: {
      en: "Ship a production platform, as the sole engineer, that ingests real student learning data and produces personalized study plans and mentor insights automatically — reliable enough to charge for and operable by a small team.",
      ko: "단독 엔지니어로서, 실제 학생 학습 데이터를 받아 개인화된 학습 계획과 멘토 인사이트를 자동으로 만들어내는 프로덕션 플랫폼을 출시한다 — 유료로 받을 만큼 신뢰할 수 있고 작은 팀이 운영할 수 있게.",
    },
    decisions: [
      {
        decision: {
          en: "Build the planner as an agentic pipeline rather than one big prompt.",
          ko: "플래너를 하나의 큰 프롬프트가 아니라 에이전틱 파이프라인으로 구성.",
        },
        rationale: {
          en: "A single one-shot prompt couldn't reason over messy, multi-source student history reliably. Splitting analysis → planning → recommendation into discrete agent steps made each stage testable and the output auditable when a plan looked wrong.",
          ko: "한 번의 프롬프트로는 여러 소스에서 온 지저분한 학생 이력을 안정적으로 추론할 수 없었습니다. 분석 → 계획 → 추천을 개별 에이전트 단계로 쪼개니 각 단계를 테스트할 수 있었고, 계획이 이상할 때 출력을 추적할 수 있었습니다.",
        },
      },
      {
        decision: {
          en: "Sync knowledge from Google Drive instead of building a separate CMS.",
          ko: "별도 CMS를 만드는 대신 Google Drive에서 지식을 동기화.",
        },
        rationale: {
          en: "Mentors already worked in Google Drive. Meeting them there removed an adoption barrier and let AI agents retrieve and index existing material instead of asking anyone to migrate.",
          ko: "멘토들은 이미 Google Drive에서 작업하고 있었습니다. 그들이 있는 곳에서 만나니 도입 장벽이 사라졌고, 누구에게도 마이그레이션을 요구하지 않고 AI 에이전트가 기존 자료를 검색·색인할 수 있었습니다.",
        },
      },
      {
        decision: {
          en: "Own the full stack solo on Next.js + AWS.",
          ko: "Next.js + AWS 위에서 풀스택을 단독으로 소유.",
        },
        rationale: {
          en: "As the only engineer, I optimized for a stack I could design, deploy, and operate end-to-end without handoffs. At this stage fast iteration mattered more than specialization.",
          ko: "유일한 엔지니어로서, 인수인계 없이 직접 설계·배포·운영할 수 있는 스택에 최적화했습니다. 이 단계에서는 전문화보다 빠른 반복이 더 중요했습니다.",
        },
      },
    ],
    process: [
      {
        heading: { en: "Agentic study planner", ko: "에이전틱 학습 플래너" },
        body: {
          en: "Built a pipeline that analyzes a student's learning data, generates a personalized study plan, and surfaces mentor-facing insights and actionable recommendations.",
          ko: "학생의 학습 데이터를 분석하고, 개인화된 학습 계획을 생성하며, 멘토용 인사이트와 실행 가능한 추천을 제시하는 파이프라인을 구축했습니다.",
        },
      },
      {
        heading: { en: "Knowledge agents", ko: "지식 에이전트" },
        body: {
          en: "Developed AI agents for Google Drive knowledge synchronization, retrieval, and automated dashboard generation, tightening the team's internal knowledge workflows.",
          ko: "Google Drive 지식 동기화·검색·자동 대시보드 생성을 위한 AI 에이전트를 개발해 팀 내부 지식 워크플로를 개선했습니다.",
        },
      },
      {
        heading: { en: "Cross-border delivery", ko: "국경을 넘은 협업" },
        body: {
          en: "Led a cross-border engineering collaboration with Singapore Management University — translating product requirements into engineering tasks, coordinating implementation, and reviewing deliverables.",
          ko: "싱가포르 경영대학교(SMU)와의 국경을 넘은 엔지니어링 협업을 이끌었습니다 — 제품 요구사항을 엔지니어링 작업으로 번역하고, 구현을 조율하고, 산출물을 리뷰했습니다.",
        },
      },
      {
        heading: { en: "Product & pricing", ko: "제품 · 가격 전략" },
        body: {
          en: "Defined the roadmap and pricing across planner subscriptions, 1:1 mentoring, and B2B school programs.",
          ko: "플래너 구독, 1:1 멘토링, B2B 학교 프로그램에 걸친 로드맵과 가격 전략을 정의했습니다.",
        },
      },
    ],
    outcome: {
      en: "Shipped the company's first production AI education platform end-to-end and defined the model that landed Yureka's first paid school partnership.",
      ko: "회사의 첫 프로덕션 AI 교육 플랫폼을 처음부터 끝까지 출시했고, Yureka의 첫 유료 학교 파트너십을 성사시킨 모델을 정의했습니다.",
    },
    metrics: [
      {
        label: { en: "Engineering", ko: "엔지니어링" },
        value: { en: "Sole engineer", ko: "단독 엔지니어" },
      },
      {
        label: { en: "First paid partnership", ko: "첫 유료 파트너십" },
        value: { en: "Local school (B2B)", ko: "지역 학교 (B2B)" },
      },
    ],
    learnings: {
      en: [
        "Wearing both PM and engineer hats forced every technical decision to earn its keep against a real pricing and adoption goal.",
        "Agent pipelines are worth the extra plumbing the moment outputs need to be trusted and debugged, not just demoed.",
      ],
      ko: [
        "PM과 엔지니어 역할을 동시에 맡으니, 모든 기술적 결정이 실제 가격·도입 목표 앞에서 값어치를 증명해야 했습니다.",
        "출력을 단순히 시연하는 게 아니라 신뢰하고 디버깅해야 하는 순간, 에이전트 파이프라인의 추가 작업은 값을 합니다.",
      ],
    },
  },
  {
    id: "chonggakhanwoo",
    title: {
      en: "Chonggak Hanwoo — D2C Commerce",
      ko: "총각한우 — D2C 커머스",
    },
    tagline: {
      en: "A production D2C storefront and back-office a tiny, non-technical team can actually run.",
      ko: "작고 비개발자인 팀이 실제로 운영할 수 있는 프로덕션 D2C 스토어와 백오피스.",
    },
    role: { en: "Solo Full-Stack Engineer", ko: "단독 풀스택 엔지니어" },
    organization: { en: "Independent", ko: "개인 프로젝트" },
    period: { en: "Nov 2025 – Feb 2026", ko: "2025년 11월 – 2026년 2월" },
    category: { en: "Web", ko: "웹" },
    tags: ["Next.js", "Prisma", "AWS", "Toss Payments"],
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL (RDS)",
      "Redis",
      "AWS",
      "Toss Payments",
      "Kakao AlimTalk",
    ],
    image: "/static/chonggakhanwoo.png",
    links: [
      {
        label: { en: "Live", ko: "바로가기" },
        href: "https://chonggakhanwoo.co.kr",
        type: "demo",
      },
    ],
    featured: true,
    date: "2026-02-01",
    problem: {
      en: "A hanwoo (Korean beef) seller wanted to go direct-to-consumer, but a real D2C operation means payments, inventory, orders, delivery, and customer notifications — usually a whole team's worth of tooling. The business had none of it and no engineering staff.",
      ko: "한 한우 판매자가 D2C로 전환하고 싶어 했지만, 진짜 D2C 운영은 결제·재고·주문·배송·고객 알림을 뜻합니다 — 보통 한 팀이 만들 만한 도구가 필요합니다. 이 사업엔 그 어느 것도, 엔지니어링 인력도 없었습니다.",
    },
    goal: {
      en: "Independently ship a production-ready storefront plus the back-office tooling a non-technical owner could operate day to day, without a team.",
      ko: "팀 없이 혼자서, 프로덕션 수준의 스토어프론트와 비개발자 사장님이 매일 운영할 수 있는 백오피스 도구를 출시한다.",
    },
    decisions: [
      {
        decision: {
          en: "Integrate Toss Payments and Kakao AlimTalk instead of rolling custom payment/notification flows.",
          ko: "결제·알림 흐름을 직접 만들지 않고 토스페이먼츠와 카카오 알림톡을 연동.",
        },
        rationale: {
          en: "In the Korean market these are the rails customers already trust. Leaning on them cut compliance and delivery-notification risk and freed engineering time for the parts that were actually differentiated.",
          ko: "국내 시장에서 이들은 고객이 이미 신뢰하는 인프라입니다. 여기에 기대니 컴플라이언스와 배송 알림 리스크가 줄었고, 실제로 차별화되는 부분에 엔지니어링 시간을 쓸 수 있었습니다.",
        },
      },
      {
        decision: {
          en: "Build a custom admin dashboard rather than use an off-the-shelf commerce backend.",
          ko: "기성 커머스 백엔드 대신 맞춤 관리자 대시보드를 구축.",
        },
        rationale: {
          en: "Inventory, orders, and delivery were tightly coupled to how this specific business worked. A tailored dashboard let the owner run operations without me in the loop.",
          ko: "재고·주문·배송은 이 사업이 돌아가는 방식과 강하게 얽혀 있었습니다. 맞춤 대시보드 덕분에 사장님은 제가 개입하지 않아도 운영을 이어갈 수 있었습니다.",
        },
      },
      {
        decision: {
          en: "Add Redis and CDN caching on top of Prisma/RDS.",
          ko: "Prisma/RDS 위에 Redis와 CDN 캐싱을 추가.",
        },
        rationale: {
          en: "Storefront reads dominated traffic. Caching them kept the site fast and the database cheap under launch-day load.",
          ko: "스토어프론트 읽기가 트래픽의 대부분이었습니다. 이를 캐싱하니 출시 당일 부하에서도 사이트는 빠르고 데이터베이스는 저렴하게 유지됐습니다.",
        },
      },
    ],
    process: [
      {
        heading: { en: "Storefront", ko: "스토어프론트" },
        body: {
          en: "Designed and built the customer-facing D2C store on Next.js with Prisma and AWS RDS for reliable data, plus Redis and CDN caching for performance.",
          ko: "Next.js로 고객용 D2C 스토어를 설계·구축하고, 안정적인 데이터를 위해 Prisma와 AWS RDS를, 성능을 위해 Redis와 CDN 캐싱을 사용했습니다.",
        },
      },
      {
        heading: { en: "Payments & notifications", ko: "결제 · 알림" },
        body: {
          en: "Integrated Toss Payments for checkout and Kakao AlimTalk for order and delivery updates.",
          ko: "결제에 토스페이먼츠를, 주문·배송 알림에 카카오 알림톡을 연동했습니다.",
        },
      },
      {
        heading: { en: "Operations dashboard", ko: "운영 대시보드" },
        body: {
          en: "Built a custom admin for inventory, order, and delivery management so the owner could operate the business independently.",
          ko: "사장님이 독립적으로 사업을 운영할 수 있도록 재고·주문·배송 관리를 위한 맞춤 관리자를 구축했습니다.",
        },
      },
    ],
    outcome: {
      en: "The store launched and generated over ₩7.5M in revenue in its first month — validating both the product and the operability of the ops tooling.",
      ko: "스토어는 출시 후 첫 달에 750만 원 이상의 매출을 냈습니다 — 제품과 운영 도구의 실사용성을 모두 검증한 결과입니다.",
    },
    metrics: [
      {
        label: { en: "First-month revenue", ko: "출시 첫 달 매출" },
        value: { en: "₩7.5M+", ko: "₩7.5M+" },
      },
      { label: { en: "Team size", ko: "팀 규모" }, value: { en: "Solo", ko: "1인" } },
    ],
    learnings: {
      en: [
        "Choosing boring, trusted infrastructure for payments freed my budget of attention for what made the business unique.",
        "The admin dashboard mattered as much as the storefront — shipping software someone else can operate is a different bar than shipping a demo.",
      ],
      ko: [
        "결제에 검증된 무난한 인프라를 택하니, 사업을 특별하게 만드는 부분에 집중력을 쓸 여유가 생겼습니다.",
        "관리자 대시보드는 스토어프론트만큼 중요했습니다 — 남이 운영할 수 있는 소프트웨어를 만드는 건 시연을 만드는 것과 다른 기준입니다.",
      ],
    },
  },
  {
    id: "tidy-mind",
    title: {
      en: "TidyMind — AI Task Prioritization",
      ko: "TidyMind — AI 할 일 우선순위",
    },
    tagline: {
      en: "Turning a messy brain-dump of tasks into a reliably ordered plan with LLMs.",
      ko: "머릿속에 쏟아낸 할 일들을 LLM으로 신뢰할 수 있게 정렬된 계획으로.",
    },
    role: { en: "Engineer", ko: "엔지니어" },
    organization: { en: "Side Project", ko: "사이드 프로젝트" },
    period: { en: "Jun 2025 – Aug 2025", ko: "2025년 6월 – 8월" },
    category: { en: "AI", ko: "AI" },
    tags: ["React", "Node.js", "LLM API"],
    techStack: ["React", "Node.js", "LLM API"],
    image: "/static/tidy-mind.png",
    links: [
      {
        label: { en: "GitHub", ko: "GitHub" },
        href: "https://github.com/ihj04982/tidy-mind-fe",
        type: "github",
      },
      {
        label: { en: "Live", ko: "바로가기" },
        href: "https://tidymind-ai.vercel.app/",
        type: "demo",
      },
    ],
    featured: false,
    date: "2025-08-31",
    problem: {
      en: 'People usually know what their tasks are but stall on what to do first. Naively asking an LLM to "prioritize my todos" produces plausible-sounding but inconsistent, unparseable answers you can\'t build a real interface on.',
      ko: '사람들은 대개 자기 할 일이 무엇인지는 알지만 무엇부터 할지에서 멈칩니다. LLM에 그냥 "내 할 일 우선순위 정해줘"라고 하면 그럴듯하지만 일관성 없고 파싱 불가능한 답이 나와, 실제 인터페이스를 만들 수 없습니다.',
    },
    goal: {
      en: "Build a task app where an LLM reliably prioritizes tasks and returns structured output the frontend can trust every single time.",
      ko: "LLM이 할 일의 우선순위를 신뢰할 수 있게 매기고, 프론트엔드가 매번 믿을 수 있는 구조화된 출력을 반환하는 할 일 앱을 만든다.",
    },
    decisions: [
      {
        decision: {
          en: "Engineer prompts for structured, schema-shaped output instead of free-form text.",
          ko: "자유 형식 텍스트가 아니라 스키마 형태의 구조화 출력을 위해 프롬프트를 설계.",
        },
        rationale: {
          en: "The UI needed dependable fields — priority, ordering, rationale — so model output had to be parseable, not prose. Prompt design was the actual product surface.",
          ko: "UI는 우선순위·순서·근거 같은 믿을 수 있는 필드가 필요했기에, 모델 출력은 산문이 아니라 파싱 가능해야 했습니다. 프롬프트 설계가 곧 제품의 표면이었습니다.",
        },
      },
      {
        decision: {
          en: "Add a response-parsing layer that validates and recovers from imperfect output.",
          ko: "불완전한 출력을 검증하고 복구하는 응답 파싱 계층을 추가.",
        },
        rationale: {
          en: "LLMs drift. A parsing and validation step kept a single bad response from breaking the whole task list.",
          ko: "LLM은 흔들립니다. 파싱·검증 단계 덕분에 한 번의 잘못된 응답이 전체 할 일 목록을 망가뜨리지 않았습니다.",
        },
      },
    ],
    process: [
      {
        heading: { en: "Prioritization engine", ko: "우선순위 엔진" },
        body: {
          en: "Built the LLM-backed flow that ranks a user's tasks and explains the ordering.",
          ko: "사용자의 할 일을 순위 매기고 그 순서를 설명하는 LLM 기반 흐름을 구축했습니다.",
        },
      },
      {
        heading: { en: "Reliable outputs", ko: "신뢰할 수 있는 출력" },
        body: {
          en: "Designed prompt engineering and response parsing to produce reliable structured outputs the app could render directly.",
          ko: "앱이 곧바로 렌더링할 수 있는 신뢰할 수 있는 구조화 출력을 위해 프롬프트 엔지니어링과 응답 파싱을 설계했습니다.",
        },
      },
    ],
    outcome: {
      en: "A working AI task-prioritization platform where the model's output is structured and dependable enough to drive the interface.",
      ko: "모델 출력이 인터페이스를 구동할 만큼 구조화되고 신뢰할 수 있는, 실제 동작하는 AI 할 일 우선순위 플랫폼.",
    },
    learnings: {
      en: [
        "Reliability with LLMs is mostly an engineering problem around the model — prompt shape and output validation — not the model itself.",
      ],
      ko: [
        "LLM의 신뢰성은 대부분 모델 자체가 아니라 모델을 둘러싼 엔지니어링 문제입니다 — 프롬프트의 형태와 출력 검증.",
      ],
    },
  },
  {
    id: "deep-plant",
    title: {
      en: "Deeplant — Meat Data Collection",
      ko: "Deeplant — 육류 데이터 수집",
    },
    tagline: {
      en: "A field app for capturing labeled meat-image datasets on rugged PDA hardware.",
      ko: "견고한 PDA 하드웨어에서 라벨링된 육류 이미지 데이터셋을 수집하는 현장 앱.",
    },
    role: { en: "Mobile Application Developer", ko: "모바일 애플리케이션 개발자" },
    organization: {
      en: "Deeplant Inc. (Industry-Academic Project)",
      ko: "Deeplant Inc. (산학 프로젝트)",
    },
    period: { en: "Mar 2023 – Dec 2023", ko: "2023년 3월 – 12월" },
    category: { en: "Mobile", ko: "모바일" },
    tags: ["Flutter", "Flask", "Firebase"],
    techStack: ["Flutter", "Flask", "Firebase", "REST"],
    image: "/static/deep-plant.png",
    links: [
      {
        label: { en: "GitHub", ko: "GitHub" },
        href: "https://github.com/Deep-Plant",
        type: "github",
      },
    ],
    featured: false,
    date: "2023-12-30",
    problem: {
      en: "Building meat-quality models needs large, consistently labeled image datasets — but collection happened in the field on PDA devices with cameras and barcode scanners, with no reliable pipeline to get labeled images into a central store.",
      ko: "육류 품질 모델을 만들려면 크고 일관되게 라벨링된 이미지 데이터셋이 필요합니다 — 그런데 수집은 카메라와 바코드 스캐너가 달린 PDA로 현장에서 이뤄졌고, 라벨링된 이미지를 중앙 저장소로 보내는 신뢰할 수 있는 파이프라인이 없었습니다.",
    },
    goal: {
      en: "Deliver a Flutter app that lets field workers capture meat images tied to barcode-scanned identifiers and reliably ship them to a central server.",
      ko: "현장 작업자가 바코드로 스캔한 식별자와 연결된 육류 이미지를 촬영해 중앙 서버로 안정적으로 전송할 수 있는 Flutter 앱을 만든다.",
    },
    decisions: [
      {
        decision: {
          en: "Target the PDA hardware with a single Flutter codebase.",
          ko: "단일 Flutter 코드베이스로 PDA 하드웨어를 대응.",
        },
        rationale: {
          en: "One Flutter app could drive the PDA's camera and barcode scanner while staying maintainable for a small student-industry team.",
          ko: "하나의 Flutter 앱으로 PDA의 카메라와 바코드 스캐너를 다루면서도, 작은 산학 팀이 유지보수하기 좋게 유지할 수 있었습니다.",
        },
      },
      {
        decision: {
          en: "Bridge Flutter, Flask, Firebase, and a central server over REST.",
          ko: "Flutter, Flask, Firebase, 중앙 서버를 REST로 연결.",
        },
        rationale: {
          en: "Splitting responsibilities across clear REST boundaries kept the moving parts independently debuggable across the collaboration.",
          ko: "명확한 REST 경계로 책임을 나누니, 협업 전반에서 각 구성 요소를 독립적으로 디버깅할 수 있었습니다.",
        },
      },
    ],
    process: [
      {
        heading: { en: "Capture app", ko: "촬영 앱" },
        body: {
          en: "Developed a Flutter application for collecting meat image datasets using PDA cameras and barcode scanners.",
          ko: "PDA 카메라와 바코드 스캐너로 육류 이미지 데이터셋을 수집하는 Flutter 애플리케이션을 개발했습니다.",
        },
      },
      {
        heading: { en: "Data pipeline", ko: "데이터 파이프라인" },
        body: {
          en: "Implemented REST API communication between Flutter, Flask, Firebase, and a central server to move labeled images reliably.",
          ko: "라벨링된 이미지를 안정적으로 옮기기 위해 Flutter, Flask, Firebase, 중앙 서버 간 REST API 통신을 구현했습니다.",
        },
      },
      {
        heading: { en: "Team delivery", ko: "팀 딜리버리" },
        body: {
          en: "Coordinated development tasks and schedules across the engineering team to hit project milestones.",
          ko: "프로젝트 마일스톤을 달성하기 위해 엔지니어링 팀의 개발 작업과 일정을 조율했습니다.",
        },
      },
    ],
    outcome: {
      en: "A working field-collection pipeline that turned PDA captures into a centrally stored, barcode-labeled meat-image dataset.",
      ko: "PDA 촬영을 중앙에 저장된 바코드 라벨 육류 이미지 데이터셋으로 바꾼, 실제 동작하는 현장 수집 파이프라인.",
    },
    learnings: {
      en: [
        "Clear service boundaries mattered more than clever code when four systems from different teams had to interoperate.",
      ],
      ko: [
        "서로 다른 팀의 네 시스템이 함께 동작해야 할 때는, 영리한 코드보다 명확한 서비스 경계가 더 중요했습니다.",
      ],
    },
  },
];

// ─── Helpers ───
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getSortedProjects(): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.date.localeCompare(a.date);
  });
}

/** Flatten a stored project's localized fields to a single locale. */
export function getLocalizedProject(
  project: Project,
  locale: Locale
): ResolvedProject {
  return {
    id: project.id,
    title: project.title[locale],
    tagline: project.tagline[locale],
    role: project.role[locale],
    organization: project.organization?.[locale],
    period: project.period[locale],
    category: project.category[locale],
    tags: project.tags,
    techStack: project.techStack,
    image: project.image,
    gallery: project.gallery,
    links: project.links.map((link) => ({
      label: link.label[locale],
      href: link.href,
      type: link.type,
    })),
    featured: project.featured,
    date: project.date,
    problem: project.problem[locale],
    goal: project.goal[locale],
    decisions: project.decisions.map((d) => ({
      decision: d.decision[locale],
      rationale: d.rationale[locale],
    })),
    process: project.process.map((p) => ({
      heading: p.heading[locale],
      body: p.body[locale],
    })),
    outcome: project.outcome[locale],
    metrics: project.metrics?.map((m) => ({
      label: m.label[locale],
      value: m.value[locale],
    })),
    learnings: project.learnings?.[locale],
  };
}
