import type { Dictionary } from "@/lib/i18n/dictionaries";

export function SkillsSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-tight">
        {dict.about.skillsTitle}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dict.about.skillGroups.map((group) => (
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
