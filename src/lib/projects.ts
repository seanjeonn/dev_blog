export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  date: string;
}

export const projects: Project[] = [
  {
    id: "dev-blog",
    title: "개발 블로그 & 포트폴리오",
    description:
      "Next.js 15, TypeScript, Tailwind CSS를 활용한 개인 개발 블로그입니다. Velite를 사용한 MDX 기반 콘텐츠 관리, Giscus 댓글 시스템, 그리고 다크 모드를 지원합니다.",
    image: "/static/dev-blog.png",
    category: "Web",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Velite", "MDX"],
    github: "https://github.com/junsu0573/dev_blog",
    demo: "https://bongsik-dev.com",
    featured: false,
    date: "2025-12-01",
  },
  {
    id: "tidy-mind",
    title: "AI 기반 분류 할 일 관리 웹앱",
    description:
      "AI 기반 할 일 관리 앱으로, 사용자가 입력한 할 일을 자동으로 분류하고 정리해줍니다. 캘린더 뷰와 추가 기능을 통해 일정 관리를 지원합니다.",
    image: "/static/tidy-mind.png",
    category: "Web",
    tags: ["AI", "React.js", "Node.js", "MongoDB"],
    github: "https://github.com/ihj04982/tidy-mind-fe",
    demo: "https://tidymind-ai.vercel.app/",
    featured: false,
    date: "2025-08-31",
  },
  {
    id: "deep-plant",
    title: "육류 이미지 데이터 수집 및 저장 시스템",
    description:
      "육류 데이터를 PDA 디바이스 내장 카메라 및 바코드를 활용하여 수집하고, 중앙 서버에 저장하는 어플리케이션입니다.",
    image: "/static/deep-plant.png",
    category: "App",
    tags: ["Flutter", "Firebase", "Flask"],
    github: "https://github.com/Deep-Plant",
    demo: "",
    featured: false,
    date: "2023-12-30",
  },
];

/**
 * Get all unique categories from projects
 */
export function getProjectCategories(): string[] {
  const categories = projects.map((project) => project.category);
  return Array.from(new Set(categories)).sort();
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((project) => project.category === category);
}

/**
 * Get project by id
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
