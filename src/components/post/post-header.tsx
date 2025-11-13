import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, Tag } from "lucide-react";

interface PostHeaderProps {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  category?: string;
}

export function PostHeader({
  title,
  description,
  date,
  tags,
  category,
}: PostHeaderProps) {
  return (
    <div className="space-y-4 pb-8">
      {/* Category Badge */}
      {category && (
        <div>
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">
            {category}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>

      {/* Description */}
      {description && (
        <p className="text-xl text-muted-foreground">{description}</p>
      )}

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <time dateTime={date}>
            {format(new Date(date), "PPP", { locale: ko })}
          </time>
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <Separator className="mt-6" />
    </div>
  );
}
