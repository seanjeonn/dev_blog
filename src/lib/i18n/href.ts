import type { Locale } from "./config";

/**
 * Prefix an app-internal path with the active locale segment.
 * `localePath("ko", "/projects")` → "/ko/projects"; `localePath("en", "/")` → "/en".
 */
export function localePath(locale: Locale, path = "/"): string {
  if (path === "/") return `/${locale}`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}
