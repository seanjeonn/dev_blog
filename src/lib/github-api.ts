import { graphql } from "@octokit/graphql";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN && process.env.NODE_ENV !== "development") {
  console.warn("GITHUB_TOKEN not found. GitHub API calls will fail.");
}

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
});

export interface DiscussionStats {
  slug: string;
  commentCount: number;
  reactionCount: number;
  discussionUrl: string | null;
  reactionsData: Record<string, number>;
}

/**
 * Fetch discussion stats for a specific post by matching the pathname
 * Uses GitHub GraphQL API to search discussions
 */
export async function fetchDiscussionStats(
  owner: string,
  repo: string,
  slug: string
): Promise<DiscussionStats | null> {
  if (!GITHUB_TOKEN) {
    console.error("Cannot fetch discussion stats: GITHUB_TOKEN not set");
    return null;
  }

  try {
    // Search for discussions in the repository
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await graphqlWithAuth(
      `
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          discussions(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              title
              url
              number
              body
              comments {
                totalCount
              }
              reactions {
                totalCount
              }
              reactionGroups {
                content
                users {
                  totalCount
                }
              }
            }
          }
        }
      }
      `,
      {
        owner,
        repo,
      }
    );

    // Find the discussion that matches the slug
    // Giscus typically includes the path in the discussion body or title
    const discussions = response.repository.discussions.nodes;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const discussion = discussions.find((d: any) => {
      // Match by checking if the body contains the slug or path
      const pathMatch =
        d.body?.includes(`/posts/${slug}`) || d.title?.includes(slug);
      return pathMatch;
    });

    if (!discussion) {
      return null;
    }

    // Build reactions data object
    const reactionsData: Record<string, number> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    discussion.reactionGroups?.forEach((group: any) => {
      reactionsData[group.content] = group.users.totalCount;
    });

    return {
      slug,
      commentCount: discussion.comments.totalCount,
      reactionCount: discussion.reactions.totalCount,
      discussionUrl: discussion.url,
      reactionsData,
    };
  } catch (error) {
    console.error(`Error fetching discussion stats for slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch stats for all discussions in the repository
 * Useful for bulk updates
 */
export async function fetchAllDiscussionStats(
  owner: string,
  repo: string
): Promise<DiscussionStats[]> {
  if (!GITHUB_TOKEN) {
    console.error("Cannot fetch all discussion stats: GITHUB_TOKEN not set");
    return [];
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await graphqlWithAuth(
      `
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          discussions(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              title
              url
              number
              body
              comments {
                totalCount
              }
              reactions {
                totalCount
              }
              reactionGroups {
                content
                users {
                  totalCount
                }
              }
            }
          }
        }
      }
      `,
      {
        owner,
        repo,
      }
    );

    const stats: DiscussionStats[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.repository.discussions.nodes.forEach((discussion: any) => {
      // Try to extract slug from body or title
      // This is a simple pattern matching - adjust based on your needs
      const pathMatch =
        discussion.body?.match(/\/posts\/([^/\s]+)/) ||
        discussion.title?.match(/([^/\s]+)/);
      const slug = pathMatch ? pathMatch[1] : discussion.title;

      if (!slug) return;

      const reactionsData: Record<string, number> = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      discussion.reactionGroups?.forEach((group: any) => {
        reactionsData[group.content] = group.users.totalCount;
      });

      stats.push({
        slug,
        commentCount: discussion.comments.totalCount,
        reactionCount: discussion.reactions.totalCount,
        discussionUrl: discussion.url,
        reactionsData,
      });
    });

    return stats;
  } catch (error) {
    console.error("Error fetching all discussion stats:", error);
    return [];
  }
}

/**
 * Check GitHub API rate limit status
 */
export async function checkRateLimit(): Promise<{
  remaining: number;
  reset: number;
  limit: number;
} | null> {
  if (!GITHUB_TOKEN) {
    return null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await graphqlWithAuth(`
      query {
        rateLimit {
          remaining
          resetAt
          limit
        }
      }
    `);

    return {
      remaining: response.rateLimit.remaining,
      reset: new Date(response.rateLimit.resetAt).getTime(),
      limit: response.rateLimit.limit,
    };
  } catch (error) {
    console.error("Error checking rate limit:", error);
    return null;
  }
}
