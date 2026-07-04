import { ProjectCard } from "@/components/projects/project-card";
import { getFeaturedProjects } from "@/lib/projects";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function SelectedWork() {
  const featured = getFeaturedProjects();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Selected work
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Case studies
          </h2>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
