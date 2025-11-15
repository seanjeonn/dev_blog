"use client";

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loading component for comments section
 * Provides visual feedback while Giscus widget loads
 */
export function CommentsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-9 w-24" />
      </div>

      {/* Comment Input Area */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-24 w-full rounded-lg" />
        <div className="flex justify-end">
          <Skeleton className="h-9 w-20" />
        </div>
      </div>

      {/* Mock Comments */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3 pt-6">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="flex gap-4 pt-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
