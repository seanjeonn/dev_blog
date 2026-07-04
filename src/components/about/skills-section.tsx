const skillGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["JavaScript / TypeScript", "Python", "Dart", "C"] },
  { label: "Frontend", items: ["React", "Next.js", "Flutter"] },
  { label: "Backend", items: ["Express", "Flask", "Node.js"] },
  { label: "Data", items: ["PostgreSQL", "Redis", "Firebase"] },
  { label: "Cloud", items: ["AWS (CDK, ECS Fargate, RDS, CloudFront)", "Vercel"] },
  {
    label: "AI & Integrations",
    items: ["LLM APIs & agents", "OAuth", "Toss Payments", "Kakao AlimTalk"],
  },
];

export function SkillsSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.label} className="rounded-xl border border-border/60 p-5">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {group.label}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
