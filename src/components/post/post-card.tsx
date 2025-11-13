import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, Tag } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  category?: string;
  tags?: string[];
  className?: string;
}

export function PostCard({
  slug,
  title,
  description,
  date,
  category,
  tags,
  className,
}: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`} className="block group">
      <Card
        className={cn(
          "h-full overflow-hidden",

          className
        )}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>

            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 backdrop-blur-sm text-primary border border-primary/30 whitespace-nowrap shadow-lg shadow-primary/20">
              {category}
            </span>
          </div>
          {description && (
            <p className="mt-3 text-sm text-muted-foreground/90 line-clamp-3 leading-relaxed">
              {description}
            </p>
          )}
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/80">
            <div className="flex items-center gap-1.5 group/date">
              <Calendar className="h-4 w-4 group-hover/date:text-primary transition-colors" />
              <time
                dateTime={date}
                className="group-hover/date:text-foreground transition-colors"
              >
                {format(new Date(date), "PPP", { locale: ko })}
              </time>
            </div>
          </div>
        </CardContent>

        {tags && tags.length > 0 && (
          <CardFooter className="relative z-10">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground/60" />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded-lg bg-muted/50 backdrop-blur-sm text-muted-foreground border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
