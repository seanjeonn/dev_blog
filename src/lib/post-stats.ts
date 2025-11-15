import { prisma } from './prisma';
import type { PostStats } from '@prisma/client';

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Get cached stats for a single post by slug
 * Returns null if not found
 */
export async function getPostStats(slug: string): Promise<PostStats | null> {
  try {
    const stats = await prisma.postStats.findUnique({
      where: { slug },
    });

    if (!stats) {
      return null;
    }

    // Check if cache is stale
    const isStale = Date.now() - stats.lastSyncedAt.getTime() > CACHE_TTL;

    if (isStale && process.env.NODE_ENV === 'development') {
      console.log(`[PostStats] Cache is stale for slug: ${slug}`);
      // Note: In production, you might trigger a background refresh here
    }

    return stats;
  } catch (error) {
    console.error(`Error fetching stats for slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get cached stats for multiple posts by slugs
 * Returns a Map for O(1) lookups
 */
export async function getMultiplePostStats(
  slugs: string[]
): Promise<Map<string, PostStats>> {
  try {
    const stats = await prisma.postStats.findMany({
      where: {
        slug: {
          in: slugs,
        },
      },
    });

    const statsMap = new Map<string, PostStats>();
    stats.forEach((stat) => {
      statsMap.set(stat.slug, stat);
    });

    return statsMap;
  } catch (error) {
    console.error('Error fetching multiple post stats:', error);
    return new Map();
  }
}

/**
 * Update or create post stats in database
 * Uses upsert for atomic operation
 */
export async function upsertPostStats(data: {
  slug: string;
  commentCount: number;
  reactionCount: number;
  discussionUrl?: string | null;
  reactionsData?: Record<string, number>;
}): Promise<PostStats> {
  const stats = await prisma.postStats.upsert({
    where: { slug: data.slug },
    update: {
      commentCount: data.commentCount,
      reactionCount: data.reactionCount,
      discussionUrl: data.discussionUrl,
      reactionsData: data.reactionsData || {},
      lastSyncedAt: new Date(),
    },
    create: {
      slug: data.slug,
      commentCount: data.commentCount,
      reactionCount: data.reactionCount,
      discussionUrl: data.discussionUrl,
      reactionsData: data.reactionsData || {},
      lastSyncedAt: new Date(),
    },
  });

  return stats;
}

/**
 * Get stats that need updating (older than specified hours)
 * Useful for finding stale cache entries
 */
export async function getStalePostStats(hoursOld: number = 24): Promise<PostStats[]> {
  const cutoffTime = new Date();
  cutoffTime.setHours(cutoffTime.getHours() - hoursOld);

  const staleStats = await prisma.postStats.findMany({
    where: {
      lastSyncedAt: {
        lt: cutoffTime,
      },
    },
  });

  return staleStats;
}

/**
 * Delete post stats by slug
 * Useful for cleanup or cache invalidation
 */
export async function deletePostStats(slug: string): Promise<boolean> {
  try {
    await prisma.postStats.delete({
      where: { slug },
    });
    return true;
  } catch (error) {
    console.error(`Error deleting stats for slug ${slug}:`, error);
    return false;
  }
}

/**
 * Get all cached post stats
 * Useful for admin dashboards or bulk operations
 */
export async function getAllPostStats(): Promise<PostStats[]> {
  try {
    const stats = await prisma.postStats.findMany({
      orderBy: {
        lastSyncedAt: 'desc',
      },
    });
    return stats;
  } catch (error) {
    console.error('Error fetching all post stats:', error);
    return [];
  }
}
