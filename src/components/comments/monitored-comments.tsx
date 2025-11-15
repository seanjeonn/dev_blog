"use client";

import { useEffect, useState } from "react";

import { CommentsContainer } from "./comments-container";
import { CommentsErrorBoundary } from "./comments-error-boundary";

interface MonitoredCommentsProps {
  slug: string;
  title?: string;
}

/**
 * Wrapper component that integrates error boundary and monitoring
 */
export function MonitoredComments({ slug, title }: MonitoredCommentsProps) {
  const [loadStartTime] = useState(() => Date.now());

  useEffect(() => {
    // Track when component mounts
    const loadTime = Date.now() - loadStartTime;

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Comments] Mounted in ${loadTime}ms for slug: ${slug}`);
    }

    // Optional: Send to analytics service
    // trackCommentLoad(loadTime, slug);
  }, [loadStartTime, slug]);

  return (
    <CommentsErrorBoundary
      fallback={
        <div className="text-center py-12 text-muted-foreground">
          댓글을 불러올 수 없습니다
        </div>
      }
    >
      <CommentsContainer slug={slug} title={title} />
    </CommentsErrorBoundary>
  );
}
