import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/href";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  category?: string;
  tags?: string[];
  locale: Locale;
  className?: string;
}

export function PostCard({
  slug,
  title,
  description,
  date,
  category,
  tags,
  locale,
  className,
}: PostCardProps) {
  const formatted =
    locale === "ko"
      ? format(new Date(date), "yyyy년 M월 d일", { locale: ko })
      : format(new Date(date), "MMM d, yyyy");

  return (
    <Link
      href={localePath(locale, `/posts/${slug}`)}
      className={cn(
        "group flex h-full flex-col rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-foreground/30",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        {category && (
          <span className="font-medium uppercase tracking-wide">{category}</span>
        )}
        <time dateTime={date} className="ml-auto">
          {formatted}
        </time>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-foreground">
        {title}
      </h3>

      {description && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {tags && tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
