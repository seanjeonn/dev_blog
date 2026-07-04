interface TimelineEntry {
  title: string;
  org: string;
  period: string;
  description?: string;
  current?: boolean;
}

const experience: TimelineEntry[] = [
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
  },
  {
    title: "Engineer",
    org: "TidyMind (Side Project)",
    period: "Jun 2025 – Aug 2025",
    description:
      "Built an AI task-prioritization platform with reliable, structured LLM output.",
  },
  {
    title: "Mobile Application Developer",
    org: "Deeplant Inc. (Industry-Academic Project)",
    period: "Mar 2023 – Dec 2023",
    description:
      "Flutter field app for meat-image dataset collection on PDA hardware, wired to a Flask/Firebase/central-server pipeline over REST.",
  },
];

const education: TimelineEntry[] = [
  {
    title: "B.S. in Computer Science & Engineering",
    org: "Sungkyunkwan University",
    period: "Mar 2022 – Present",
    current: true,
  },
  {
    title: "Startup Founder Accelerator",
    org: "Outsome Founder Sprint, Batch 6",
    period: "Apr 2026 – May 2026",
  },
];

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ul className="mt-6 space-y-6">
      {entries.map((entry) => (
        <li
          key={`${entry.title}-${entry.org}`}
          className="relative border-l border-border pl-5"
        >
          <span
            className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background ${
              entry.current ? "bg-foreground" : "bg-muted-foreground/50"
            }`}
            aria-hidden
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="font-semibold">{entry.title}</h3>
            <span className="text-sm text-muted-foreground">{entry.period}</span>
          </div>
          <p className="text-sm text-muted-foreground">{entry.org}</p>
          {entry.description && (
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">
              {entry.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ExperienceSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
          <Timeline entries={experience} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Education</h2>
          <Timeline entries={education} />
        </div>
      </div>
    </section>
  );
}
