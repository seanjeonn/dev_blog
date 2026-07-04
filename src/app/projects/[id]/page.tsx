import { ProjectDetail } from "@/components/projects/project-detail";
import { getProjectById, projects } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      type: "article",
      title: project.title,
      description: project.tagline,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
