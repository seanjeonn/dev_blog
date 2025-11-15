"use client";

import { useState, useEffect } from "react";

import { CommentsSkeleton } from "./comments-skeleton";
import { useIdleCallback } from "@/hooks/use-idle-callback";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import dynamic from "next/dynamic";

// Dynamic import of Giscus component with SSR disabled
const GiscusComments = dynamic(() => import("./giscus-comments"), {
  ssr: false,
  loading: () => <CommentsSkeleton />,
});

interface CommentsContainerProps {
  slug: string;
  title?: string;
}

/**
 * Comments container with advanced lazy loading
 *
 * Features:
 * - Intersection Observer: Loads when user scrolls near (200px before viewport)
 * - Idle Callback: Prefetches component during browser idle time
 * - Progressive loading: Skeleton → Actual widget
 */
export function CommentsContainer({ slug, title }: CommentsContainerProps) {
  const [loadComments, setLoadComments] = useState(false);

  // Strategy 1: Intersection Observer (primary)
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    rootMargin: "200px", // Load 200px before entering viewport
    threshold: 0.1,
    triggerOnce: true,
  });

  // Strategy 2: Idle callback (prefetch during idle time)
  useIdleCallback(
    () => {
      if (!loadComments) {
        // Prefetch the component during idle time
        import("./giscus-comments").catch((err) =>
          console.error("Failed to prefetch Giscus:", err)
        );
      }
    },
    { timeout: 3000 }
  );

  // Trigger loading when intersecting
  useEffect(() => {
    if (isIntersecting && !loadComments) {
      setLoadComments(true);
    }
  }, [isIntersecting, loadComments]);

  return (
    <section
      ref={ref}
      id="comments"
      className="mt-16 pt-8 border-t"
      aria-label="댓글 섹션"
    >
      {loadComments ? (
        <GiscusComments slug={slug} title={title} />
      ) : (
        <CommentsSkeleton />
      )}
    </section>
  );
}
