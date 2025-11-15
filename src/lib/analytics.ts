/**
 * Analytics utility for tracking comment-related events
 * Currently logs to console in development, can be extended for Google Analytics, etc.
 */

export function trackCommentLoad(duration: number, slug: string) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Comment load time: ${duration}ms for ${slug}`);
  }

  // Send to analytics service (extend as needed)
  if (typeof window !== "undefined" && "gtag" in window) {
    // Google Analytics example
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", "comment_load", {
      event_category: "engagement",
      event_label: slug,
      value: Math.round(duration),
    });
  }

  // Add custom analytics here (e.g., PostHog, Mixpanel, etc.)
}

export function trackCommentError(error: Error, slug: string) {
  // Log to console
  console.error(`[Analytics] Comment error for ${slug}:`, error);

  // Send to analytics service
  if (typeof window !== "undefined" && "gtag" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", "exception", {
      description: `Comment load error: ${error.message}`,
      fatal: false,
      slug,
    });
  }

  // Add error tracking (e.g., Sentry, Bugsnag, etc.)
}

export function trackCommentInteraction(
  action: "view" | "write" | "react",
  slug: string
) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] Comment ${action} on ${slug}`);
  }

  if (typeof window !== "undefined" && "gtag" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", `comment_${action}`, {
      event_category: "engagement",
      event_label: slug,
    });
  }
}
