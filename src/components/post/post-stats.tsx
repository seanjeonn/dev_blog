import { getPostStats } from "@/lib/post-stats";
import { MessageCircle, ThumbsUp } from "lucide-react";

interface PostStatsProps {
  slug: string;
}

/**
 * Server Component that displays comment and reaction counts for a post
 * Fetches from Supabase cache (synced via cron job)
 */
export async function PostStats({ slug }: PostStatsProps) {
  const stats = await getPostStats(slug);

  // Don't render if no stats or both counts are zero
  if (!stats || (stats.commentCount === 0 && stats.reactionCount === 0)) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground/80">
      {stats.commentCount > 0 && (
        <div className="flex items-center gap-1.5 group/comments">
          <MessageCircle className="h-4 w-4 group-hover/comments:text-primary transition-colors" />
          <span className="group-hover/comments:text-foreground transition-colors">
            {stats.commentCount}
          </span>
        </div>
      )}

      {stats.reactionCount > 0 && (
        <div className="flex items-center gap-1.5 group/reactions">
          <ThumbsUp className="h-4 w-4 group-hover/reactions:text-primary transition-colors" />
          <span className="group-hover/reactions:text-foreground transition-colors">
            {stats.reactionCount}
          </span>
        </div>
      )}
    </div>
  );
}
