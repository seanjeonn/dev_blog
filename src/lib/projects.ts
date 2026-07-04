export interface ProjectLink {
  label: string;
  href: string;
  type: "demo" | "github" | "other";
}

export interface ProjectDecision {
  decision: string;
  rationale: string;
}

export interface ProjectProcessStep {
  heading: string;
  body: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  /** One-line summary used on cards and the detail hero. */
  tagline: string;
  role: string;
  organization?: string;
  period: string;
  category: string;
  /** Short display chips for cards. */
  tags: string[];
  /** Full stack listed on the case study. */
  techStack: string[];
  image: string;
  gallery?: string[];
  links: ProjectLink[];
  featured: boolean;
  /** ISO date, used for sorting. */
  date: string;

  // ─── Product case study narrative (problem-solving process, not a showcase) ───
  /** The problem / context — what pain existed and why it mattered. */
  problem: string;
  /** What success looked like, plus constraints. */
  goal: string;
  /** Key decisions paired with the reasoning / trade-off behind them. */
  decisions: ProjectDecision[];
  /** How the problem was actually solved, as narrative steps. */
  process: ProjectProcessStep[];
  /** How the problem ended up resolved. */
  outcome: string;
  /** Quantified evidence supporting the outcome (secondary, not headline bragging). */
  metrics?: ProjectMetric[];
  /** Reflections / what was learned. */
  learnings?: string[];
}

export const projects: Project[] = [
  {
    id: "yureka",
    title: "Yureka — AI Study Platform",
    tagline:
      "An agentic study planner that turns messy student learning data into personalized guidance.",
    role: "Founding Engineer & Product Manager",
    organization: "Yureka (AI Education Startup)",
    period: "Mar 2026 – Present",
    category: "AI",
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
    links: [{ label: "Live", href: "https://yureka.co.kr", type: "demo" }],
    featured: true,
    date: "2026-03-01",
    problem:
      "Students and mentors sit on scattered learning data — quiz scores, session notes, study logs — but nobody has time to turn it into a concrete plan. A tutoring business can't scale personalized guidance when it depends on a human reading every student's history by hand.",
    goal: "Ship a production platform, as the sole engineer, that ingests real student learning data and produces personalized study plans and mentor insights automatically — reliable enough to charge for and operable by a small team.",
    decisions: [
      {
        decision: "Build the planner as an agentic pipeline rather than one big prompt.",
        rationale:
          "A single one-shot prompt couldn't reason over messy, multi-source student history reliably. Splitting analysis → planning → recommendation into discrete agent steps made each stage testable and the output auditable when a plan looked wrong.",
      },
      {
        decision: "Sync knowledge from Google Drive instead of building a separate CMS.",
        rationale:
          "Mentors already worked in Google Drive. Meeting them there removed an adoption barrier and let AI agents retrieve and index existing material instead of asking anyone to migrate.",
      },
      {
        decision: "Own the full stack solo on Next.js + AWS.",
        rationale:
          "As the only engineer, I optimized for a stack I could design, deploy, and operate end-to-end without handoffs. At this stage fast iteration mattered more than specialization.",
      },
    ],
    process: [
      {
        heading: "Agentic study planner",
        body: "Built a pipeline that analyzes a student's learning data, generates a personalized study plan, and surfaces mentor-facing insights and actionable recommendations.",
      },
      {
        heading: "Knowledge agents",
        body: "Developed AI agents for Google Drive knowledge synchronization, retrieval, and automated dashboard generation, tightening the team's internal knowledge workflows.",
      },
      {
        heading: "Cross-border delivery",
        body: "Led a cross-border engineering collaboration with Singapore Management University — translating product requirements into engineering tasks, coordinating implementation, and reviewing deliverables.",
      },
      {
        heading: "Product & pricing",
        body: "Defined the roadmap and pricing across planner subscriptions, 1:1 mentoring, and B2B school programs.",
      },
    ],
    outcome:
      "Shipped the company's first production AI education platform end-to-end and defined the model that landed Yureka's first paid school partnership.",
    metrics: [
      { label: "Engineering", value: "Sole engineer" },
      { label: "First paid partnership", value: "Local school (B2B)" },
    ],
    learnings: [
      "Wearing both PM and engineer hats forced every technical decision to earn its keep against a real pricing and adoption goal.",
      "Agent pipelines are worth the extra plumbing the moment outputs need to be trusted and debugged, not just demoed.",
    ],
  },
  {
    id: "chonggakhanwoo",
    title: "Chonggak Hanwoo — D2C Commerce",
    tagline:
      "A production D2C storefront and back-office a tiny, non-technical team can actually run.",
    role: "Solo Full-Stack Engineer",
    organization: "Independent",
    period: "Nov 2025 – Feb 2026",
    category: "Web",
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
      { label: "Live", href: "https://chonggakhanwoo.co.kr", type: "demo" },
    ],
    featured: true,
    date: "2026-02-01",
    problem:
      "A hanwoo (Korean beef) seller wanted to go direct-to-consumer, but a real D2C operation means payments, inventory, orders, delivery, and customer notifications — usually a whole team's worth of tooling. The business had none of it and no engineering staff.",
    goal: "Independently ship a production-ready storefront plus the back-office tooling a non-technical owner could operate day to day, without a team.",
    decisions: [
      {
        decision:
          "Integrate Toss Payments and Kakao AlimTalk instead of rolling custom payment/notification flows.",
        rationale:
          "In the Korean market these are the rails customers already trust. Leaning on them cut compliance and delivery-notification risk and freed engineering time for the parts that were actually differentiated.",
      },
      {
        decision: "Build a custom admin dashboard rather than use an off-the-shelf commerce backend.",
        rationale:
          "Inventory, orders, and delivery were tightly coupled to how this specific business worked. A tailored dashboard let the owner run operations without me in the loop.",
      },
      {
        decision: "Add Redis and CDN caching on top of Prisma/RDS.",
        rationale:
          "Storefront reads dominated traffic. Caching them kept the site fast and the database cheap under launch-day load.",
      },
    ],
    process: [
      {
        heading: "Storefront",
        body: "Designed and built the customer-facing D2C store on Next.js with Prisma and AWS RDS for reliable data, plus Redis and CDN caching for performance.",
      },
      {
        heading: "Payments & notifications",
        body: "Integrated Toss Payments for checkout and Kakao AlimTalk for order and delivery updates.",
      },
      {
        heading: "Operations dashboard",
        body: "Built a custom admin for inventory, order, and delivery management so the owner could operate the business independently.",
      },
    ],
    outcome:
      "The store launched and generated over ₩7.5M in revenue in its first month — validating both the product and the operability of the ops tooling.",
    metrics: [
      { label: "First-month revenue", value: "₩7.5M+" },
      { label: "Team size", value: "Solo" },
    ],
    learnings: [
      "Choosing boring, trusted infrastructure for payments freed my budget of attention for what made the business unique.",
      "The admin dashboard mattered as much as the storefront — shipping software someone else can operate is a different bar than shipping a demo.",
    ],
  },
  {
    id: "tidy-mind",
    title: "TidyMind — AI Task Prioritization",
    tagline:
      "Turning a messy brain-dump of tasks into a reliably ordered plan with LLMs.",
    role: "Engineer",
    organization: "Side Project",
    period: "Jun 2025 – Aug 2025",
    category: "AI",
    tags: ["React", "Node.js", "LLM API"],
    techStack: ["React", "Node.js", "LLM API"],
    image: "/static/tidy-mind.png",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ihj04982/tidy-mind-fe",
        type: "github",
      },
      { label: "Live", href: "https://tidymind-ai.vercel.app/", type: "demo" },
    ],
    featured: false,
    date: "2025-08-31",
    problem:
      "People usually know what their tasks are but stall on what to do first. Naively asking an LLM to \"prioritize my todos\" produces plausible-sounding but inconsistent, unparseable answers you can't build a real interface on.",
    goal: "Build a task app where an LLM reliably prioritizes tasks and returns structured output the frontend can trust every single time.",
    decisions: [
      {
        decision: "Engineer prompts for structured, schema-shaped output instead of free-form text.",
        rationale:
          "The UI needed dependable fields — priority, ordering, rationale — so model output had to be parseable, not prose. Prompt design was the actual product surface.",
      },
      {
        decision: "Add a response-parsing layer that validates and recovers from imperfect output.",
        rationale:
          "LLMs drift. A parsing and validation step kept a single bad response from breaking the whole task list.",
      },
    ],
    process: [
      {
        heading: "Prioritization engine",
        body: "Built the LLM-backed flow that ranks a user's tasks and explains the ordering.",
      },
      {
        heading: "Reliable outputs",
        body: "Designed prompt engineering and response parsing to produce reliable structured outputs the app could render directly.",
      },
    ],
    outcome:
      "A working AI task-prioritization platform where the model's output is structured and dependable enough to drive the interface.",
    learnings: [
      "Reliability with LLMs is mostly an engineering problem around the model — prompt shape and output validation — not the model itself.",
    ],
  },
  {
    id: "deep-plant",
    title: "Deeplant — Meat Data Collection",
    tagline:
      "A field app for capturing labeled meat-image datasets on rugged PDA hardware.",
    role: "Mobile Application Developer",
    organization: "Deeplant Inc. (Industry-Academic Project)",
    period: "Mar 2023 – Dec 2023",
    category: "Mobile",
    tags: ["Flutter", "Flask", "Firebase"],
    techStack: ["Flutter", "Flask", "Firebase", "REST"],
    image: "/static/deep-plant.png",
    links: [
      { label: "GitHub", href: "https://github.com/Deep-Plant", type: "github" },
    ],
    featured: false,
    date: "2023-12-30",
    problem:
      "Building meat-quality models needs large, consistently labeled image datasets — but collection happened in the field on PDA devices with cameras and barcode scanners, with no reliable pipeline to get labeled images into a central store.",
    goal: "Deliver a Flutter app that lets field workers capture meat images tied to barcode-scanned identifiers and reliably ship them to a central server.",
    decisions: [
      {
        decision: "Target the PDA hardware with a single Flutter codebase.",
        rationale:
          "One Flutter app could drive the PDA's camera and barcode scanner while staying maintainable for a small student-industry team.",
      },
      {
        decision: "Bridge Flutter, Flask, Firebase, and a central server over REST.",
        rationale:
          "Splitting responsibilities across clear REST boundaries kept the moving parts independently debuggable across the collaboration.",
      },
    ],
    process: [
      {
        heading: "Capture app",
        body: "Developed a Flutter application for collecting meat image datasets using PDA cameras and barcode scanners.",
      },
      {
        heading: "Data pipeline",
        body: "Implemented REST API communication between Flutter, Flask, Firebase, and a central server to move labeled images reliably.",
      },
      {
        heading: "Team delivery",
        body: "Coordinated development tasks and schedules across the engineering team to hit project milestones.",
      },
    ],
    outcome:
      "A working field-collection pipeline that turned PDA captures into a centrally stored, barcode-labeled meat-image dataset.",
    learnings: [
      "Clear service boundaries mattered more than clever code when four systems from different teams had to interoperate.",
    ],
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

/**
 * Projects sorted featured-first, then newest by date.
 */
export function getSortedProjects(): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.date.localeCompare(a.date);
  });
}
