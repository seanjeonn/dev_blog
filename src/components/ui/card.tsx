import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Base layout
        "relative flex flex-col gap-6 rounded-2xl py-6 overflow-hidden isolate",

        // Glassmorphism background
        "bg-white/10 dark:bg-white/5 backdrop-blur-2xl backdrop-saturate-150",
        "supports-[backdrop-filter:blur(0)]:backdrop-blur-2xl",

        // Gradient overlay for subtle color variation
        "bg-gradient-to-br from-card/90 via-card/70 to-card/90",

        // Border & ring for translucent edge
        "border hover:border-primary",

        // Shadows (outer + inner for glass depth)
        "shadow-[0_10px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
        "[box-shadow:_inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.08),inset_0_0_25px_8px_rgba(255,255,255,0.65)]",

        // Motion & hover interaction
        "transition-shadow duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_16px_60px_rgba(0,0,0,0.22)]",

        // Inner glow gradient layer (before)
        "before:absolute before:inset-0 before:rounded-2xl",
        "before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent",
        "before:pointer-events-none",

        // Top highlight line
        "after:absolute after:top-0 after:left-0 after:right-0 after:h-px",
        "after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent",
        "after:pointer-events-none",

        // Extra diagonal gloss sheen (optional)
        "after:content-[''] after:z-10 after:absolute after:inset-0",
        "after:bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.1)_25%,transparent_55%)] after:mix-blend-overlay",

        // Text color
        "text-card-foreground",

        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
