"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden h-[400px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
        className
      )}
    >
      {/* Project Image */}
      <div className="absolute inset-0 bg-muted">
        {!imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="400px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-linear-to-br from-primary/20 via-primary/10 to-primary/5">
            <div className="text-center space-y-2">
              <div className="text-6xl font-bold text-primary/40">
                {project.title.charAt(0)}
              </div>
              <p className="text-sm text-muted-foreground">No Image</p>
            </div>
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground border border-primary/30 shadow-lg">
          {project.category}
        </span>
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/90 backdrop-blur-sm text-yellow-950 border border-yellow-400/30 shadow-lg">
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Content - Always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform transition-transform duration-300">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Description - Hidden by default, shown on hover */}
          <p className="text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            <Tag className="h-3 w-3 text-gray-300" />
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-md bg-white/10 backdrop-blur-sm text-gray-200 border border-white/20"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs text-gray-300">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
                <span>Code</span>
              </Link>
            )}
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-primary/90 hover:bg-primary backdrop-blur-sm text-primary-foreground border border-primary/30 hover:border-primary transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
