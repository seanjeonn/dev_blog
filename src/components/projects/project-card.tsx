"use client";

import { useState } from "react";

import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/href";
import type { ResolvedProject } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: ResolvedProject;
  locale: Locale;
  className?: string;
}

export function ProjectCard({ project, locale, className }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const headlineMetric = project.metrics?.[0];

  return (
    <Link
      href={localePath(locale, `/projects/${project.id}`)}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-foreground/30",
        className
      )}
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {!imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-5xl font-semibold text-muted-foreground/30">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-wide">
            {project.category}
          </span>
          <span>{project.period}</span>
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.tagline}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {headlineMetric && (
          <div className="border-t border-border/60 pt-3 text-sm">
            <span className="font-semibold text-foreground">
              {headlineMetric.value}
            </span>{" "}
            <span className="text-muted-foreground">{headlineMetric.label}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
