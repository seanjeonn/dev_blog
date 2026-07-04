import { ProjectCard } from "@/components/projects/project-card";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocalizedProject, getSortedProjects } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.workTitle,
    description: dict.meta.workDescription,
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const projects = getSortedProjects().map((p) =>
    getLocalizedProject(p, locale)
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {dict.work.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.work.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{dict.work.intro}</p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}
