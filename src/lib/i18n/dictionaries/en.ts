const en = {
  nav: {
    work: "Work",
    blog: "Blog",
    about: "About",
    contact: "Contact",
  },
  hero: {
    role: "Software Engineer & Founder",
    title: "Hi, I'm Sean — I build production AI products end-to-end.",
    intro:
      "Founding engineer and product manager. I've shipped an AI education platform as a sole engineer and a D2C commerce business solo — from system design and LLM agents to deployment and operations. I care about solving real problems, not shipping features.",
    viewWork: "View work",
    getInTouch: "Get in touch",
  },
  home: {
    selectedWork: "Selected work",
    caseStudies: "Case studies",
    viewAll: "View all",
    writing: "Writing",
    fromBlog: "From the blog",
    readBlog: "Read the blog",
    contactTitle: "Let's build something.",
    contactBody:
      "I'm open to founding-engineer roles, product collaborations, and interesting problems. The fastest way to reach me is email.",
  },
  work: {
    eyebrow: "Work",
    title: "Things I've built, and why",
    intro:
      "Each project is a short case study — the problem I was solving, the decisions I made, and how it turned out. Not a feature list.",
  },
  projectDetail: {
    allWork: "All work",
    problem: "The problem",
    goalConstraints: "Goal & constraints",
    keyDecisions: "Key decisions",
    howIBuilt: "How I built it",
    outcome: "Outcome",
    learnings: "What I took away",
    stack: "Stack",
    gallery: "Gallery",
  },
  blog: {
    eyebrow: "Blog",
    title: "Writing",
    intro: "Notes on engineering, AI agents, and building products.",
    noPosts: "No posts yet.",
  },
  about: {
    eyebrow: "About",
    bio: [
      "I'm a founding engineer and product manager, and a Computer Science student at Sungkyunkwan University. I like owning problems end-to-end — from system design and LLM agents to deployment and production operations.",
      "As the sole engineer, I shipped an AI education platform for a startup; independently, I built and launched a D2C commerce business. Across both I care most about shipping software that solves a real problem and that a small team can actually operate.",
    ],
    emailMe: "Email me",
    skillsTitle: "Skills",
    skillGroups: [
      { label: "Languages", items: ["JavaScript / TypeScript", "Python", "Dart", "C"] },
      { label: "Frontend", items: ["React", "Next.js", "Flutter"] },
      { label: "Backend", items: ["Express", "Flask", "Node.js"] },
      { label: "Data", items: ["PostgreSQL", "Redis", "Firebase"] },
      { label: "Cloud", items: ["AWS (CDK, ECS Fargate, RDS, CloudFront)", "Vercel"] },
      {
        label: "AI & Integrations",
        items: ["LLM APIs & agents", "OAuth", "Toss Payments", "Kakao AlimTalk"],
      },
    ],
    experienceTitle: "Experience",
    experienceItems: [
      {
        title: "Founding Engineer & Product Manager",
        org: "Yureka (AI Education Startup)",
        period: "Mar 2026 – Present",
        description:
          "Sole engineer behind a production AI education platform — agentic study planner, Google Drive knowledge agents, and the roadmap/pricing that landed the first paid school partnership.",
        current: true,
      },
      {
        title: "Solo Full-Stack Engineer",
        org: "Chonggak Hanwoo (Independent)",
        period: "Nov 2025 – Feb 2026",
        description:
          "Independently built and launched a D2C commerce business — storefront, payments, and a custom operations dashboard. ₩7.5M+ in first-month revenue.",
        current: false,
      },
      {
        title: "Engineer",
        org: "TidyMind (Side Project)",
        period: "Jun 2025 – Aug 2025",
        description:
          "Built an AI task-prioritization platform with reliable, structured LLM output.",
        current: false,
      },
      {
        title: "Mobile Application Developer",
        org: "Deeplant Inc. (Industry-Academic Project)",
        period: "Mar 2023 – Dec 2023",
        description:
          "Flutter field app for meat-image dataset collection on PDA hardware, wired to a Flask/Firebase/central-server pipeline over REST.",
        current: false,
      },
    ],
    educationTitle: "Education",
    educationItems: [
      {
        title: "B.S. in Computer Science & Engineering",
        org: "Sungkyunkwan University",
        period: "Mar 2022 – Present",
        description: "",
        current: true,
      },
      {
        title: "Startup Founder Accelerator",
        org: "Outsome Founder Sprint, Batch 6",
        period: "Apr 2026 – May 2026",
        description: "",
        current: false,
      },
    ],
    contactTitle: "Get in touch",
    contactBody:
      "Open to founding-engineer roles, product collaborations, and interesting problems. Email is the fastest way to reach me.",
    location: "Seoul / Suwon, South Korea",
  },
  footer: {
    email: "Email",
    rss: "RSS",
  },
  meta: {
    homeDescription:
      "Founding engineer building production AI products end-to-end — from system design to deployment. I care about solving real problems, not shipping features.",
    aboutTitle: "About",
    aboutDescription:
      "Founding engineer and product manager building production AI products end-to-end.",
    workTitle: "Work",
    workDescription:
      "Selected projects — case studies on the problems I set out to solve and how I solved them.",
    blogTitle: "Blog",
    blogDescription: "Notes on engineering, AI, and building products.",
  },
};

export default en;
export type Dictionary = typeof en;
