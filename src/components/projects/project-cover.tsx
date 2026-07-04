"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectCoverProps {
  src: string;
  alt: string;
  fallbackChar: string;
  className?: string;
  priority?: boolean;
}

export function ProjectCover({
  src,
  alt,
  fallbackChar,
  className,
  priority,
}: ProjectCoverProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-[16/9] overflow-hidden rounded-xl border border-border/60 bg-muted",
        className
      )}
    >
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority={priority}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-muted">
          <span className="text-6xl font-semibold text-muted-foreground/30">
            {fallbackChar}
          </span>
        </div>
      )}
    </div>
  );
}
