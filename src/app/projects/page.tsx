import { ProjectCard } from "@/components/projects/project-card";
import { getSortedProjects } from "@/lib/projects";

export const metadata = {
  title: "Work",
  description:
    "Selected projects — case studies on the problems I set out to solve and how I solved them.",
};

export default function ProjectsPage() {
  const projects = getSortedProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Work
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Things I&apos;ve built, and why
        </h1>
        <p className="mt-4 text-muted-foreground">
          Each project is a short case study — the problem I was solving, the
          decisions I made, and how it turned out. Not a feature list.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
