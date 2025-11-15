import { posts } from ".velite";
import { fetchDiscussionStats } from "@/lib/github-api";
import { upsertPostStats } from "@/lib/post-stats";
import { NextRequest, NextResponse } from "next/server";

const GITHUB_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO || "";
const [GITHUB_OWNER, GITHUB_REPO_NAME] = GITHUB_REPO.split("/");

/**
 * POST /api/sync-comments
 * Syncs comment counts from GitHub Discussions to Supabase
 *
 * Query params:
 * - slug: (optional) sync specific post
 * - all: (optional) sync all published posts
 *
 * Requires CRON_SECRET in Authorization header for security
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      return NextResponse.json(
        { error: "Server misconfiguration: CRON_SECRET not set" },
        { status: 500 }
      );
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!GITHUB_OWNER || !GITHUB_REPO_NAME) {
      return NextResponse.json(
        { error: "GitHub repository not configured" },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    const syncAll = searchParams.get("all") === "true";

    if (slug) {
      // Sync specific post
      const stats = await fetchDiscussionStats(
        GITHUB_OWNER,
        GITHUB_REPO_NAME,
        slug
      );

      if (stats) {
        await upsertPostStats(stats);
        return NextResponse.json({
          success: true,
          synced: 1,
          slug: stats.slug,
          commentCount: stats.commentCount,
          reactionCount: stats.reactionCount,
        });
      } else {
        // No discussion found, create empty stats
        await upsertPostStats({
          slug,
          commentCount: 0,
          reactionCount: 0,
          discussionUrl: null,
        });

        return NextResponse.json({
          success: true,
          synced: 1,
          slug,
          commentCount: 0,
          note: "No discussion found, created empty stats",
        });
      }
    } else if (syncAll) {
      // Sync all published posts
      const publishedPosts = posts.filter((post) => post.published);
      const synced: string[] = [];
      const failed: string[] = [];
      const results: Array<{
        slug: string;
        commentCount: number;
        reactionCount: number;
      }> = [];

      for (const post of publishedPosts) {
        try {
          const stats = await fetchDiscussionStats(
            GITHUB_OWNER,
            GITHUB_REPO_NAME,
            post.slug
          );

          if (stats) {
            await upsertPostStats(stats);
            synced.push(post.slug);
            results.push({
              slug: post.slug,
              commentCount: stats.commentCount,
              reactionCount: stats.reactionCount,
            });
          } else {
            // No discussion yet, create empty stats
            await upsertPostStats({
              slug: post.slug,
              commentCount: 0,
              reactionCount: 0,
              discussionUrl: null,
            });
            synced.push(post.slug);
            results.push({
              slug: post.slug,
              commentCount: 0,
              reactionCount: 0,
            });
          }
        } catch (error) {
          console.error(`Failed to sync ${post.slug}:`, error);
          failed.push(post.slug);
        }
      }

      return NextResponse.json({
        success: true,
        synced: synced.length,
        failed: failed.length,
        syncedSlugs: synced,
        failedSlugs: failed,
        results,
      });
    } else {
      return NextResponse.json(
        { error: "Provide either ?slug=xxx or ?all=true" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint for manual triggering via browser (dev only)
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Use POST method in production" },
      { status: 405 }
    );
  }

  // Redirect to POST for dev convenience
  return POST(request);
}
