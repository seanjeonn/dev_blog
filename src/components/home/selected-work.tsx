import { ProjectCard } from "@/components/projects/project-card";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/href";
import { getFeaturedProjects, getLocalizedProject } from "@/lib/projects";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SelectedWorkProps {
  locale: Locale;
  dict: Dictionary;
}

export function SelectedWork({ locale, dict }: SelectedWorkProps) {
  const featured = getFeaturedProjects().map((p) =>
    getLocalizedProject(p, locale)
  );

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {dict.home.selectedWork}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {dict.home.caseStudies}
          </h2>
        </div>
        <Link
          href={localePath(locale, "/projects")}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {dict.home.viewAll}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}
