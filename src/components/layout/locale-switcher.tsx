"use client";

import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const router = useRouter();

  function switchTo(target: Locale) {
    if (target === locale) return;
    const segments = pathname.split("/");
    if (isLocale(segments[1])) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    const next = segments.join("/") || `/${target}`;
    document.cookie = `NEXT_LOCALE=${target};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    router.push(next);
  }

  return (
    <div
      className="flex items-center overflow-hidden rounded-md border border-border text-xs"
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === locale}
          className={cn(
            "px-2 py-1 uppercase transition-colors",
            l === locale
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
