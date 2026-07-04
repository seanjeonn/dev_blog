import { ProjectDetail } from "@/components/projects/project-detail";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  getLocalizedProject,
  getProjectById,
  projects,
} from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const project = getProjectById(id);
  if (!project || !isLocale(locale)) {
    return { title: "Project not found" };
  }
  const resolved = getLocalizedProject(project, locale);
  return {
    title: resolved.title,
    description: resolved.tagline,
    openGraph: {
      type: "article",
      title: resolved.title,
      description: resolved.tagline,
      images: [resolved.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProjectById(id);
  if (!project) notFound();

  const dict = await getDictionary(locale);
  const resolved = getLocalizedProject(project, locale);

  return <ProjectDetail project={resolved} locale={locale} dict={dict} />;
}
