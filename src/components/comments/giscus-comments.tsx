"use client";

import { useEffect, useState } from "react";

import Giscus from "@giscus/react";

interface GiscusCommentsProps {
  slug: string;
  title?: string;
}

/**
 * Giscus comment widget component
 * Integrates GitHub Discussions as a comment system
 *
 * @requires Environment variables:
 * - NEXT_PUBLIC_GISCUS_REPO
 * - NEXT_PUBLIC_GISCUS_REPO_ID
 * - NEXT_PUBLIC_GISCUS_CATEGORY
 * - NEXT_PUBLIC_GISCUS_CATEGORY_ID
 */
export default function GiscusComments({ slug }: GiscusCommentsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="giscus-container">
      <h2 className="text-2xl font-bold mb-6">댓글</h2>
      <Giscus
        id="comments"
        repo={process.env.NEXT_PUBLIC_GISCUS_REPO! as `${string}/${string}`}
        repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
        category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
        categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
        mapping="pathname"
        term={slug}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="ko"
        loading="lazy" // Enable native iframe lazy loading
      />
    </div>
  );
}
