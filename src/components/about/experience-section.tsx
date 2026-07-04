import type { Dictionary } from "@/lib/i18n/dictionaries";

interface TimelineEntry {
  title: string;
  org: string;
  period: string;
  description: string;
  current: boolean;
}

function Timeline({ entries }: { entries: readonly TimelineEntry[] }) {
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

export function ExperienceSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {dict.about.experienceTitle}
          </h2>
          <Timeline entries={dict.about.experienceItems} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {dict.about.educationTitle}
          </h2>
          <Timeline entries={dict.about.educationItems} />
        </div>
      </div>
    </section>
  );
}
