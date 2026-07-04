/**
 * 사이트 전역 정체성/설정의 단일 소스.
 * 이름·연락처·소셜·내비게이션을 여기서만 관리하고 모든 컴포넌트가 이 값을 소비한다.
 */
export const siteConfig = {
  name: "Sean (Suhyun) Jeon",
  shortName: "Sean Jeon",
  title: "Sean Jeon — Software Engineer & Founder",
  description:
    "Founding engineer building production AI products end-to-end — from system design to deployment. I care about solving real problems, not shipping features.",
  role: "Software Engineer & Founder",
  email: "sean.suhyunjeon@gmail.com",
  location: "Seoul / Suwon, South Korea",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seanjeon.dev",
  resumePath: "/resume.pdf",
  profileImage: "/profile.png",
  social: {
    github: "https://github.com/seanjeonn",
    linkedin: "https://linkedin.com/in/sean-jeon",
  },
  // 라우트 경로는 /projects 유지(이미지 매핑·getProjectById 안정), 표시 라벨만 "Work".
  nav: [
    { title: "Work", href: "/projects" },
    { title: "Blog", href: "/posts" },
    { title: "About", href: "/about" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
