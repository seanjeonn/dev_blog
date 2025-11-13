import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "error" | "tip";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig = {
  info: {
    icon: Info,
    className:
      "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100",
    iconClassName: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100",
    iconClassName: "text-yellow-600 dark:text-yellow-400",
  },
  success: {
    icon: CheckCircle,
    className:
      "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
    iconClassName: "text-green-600 dark:text-green-400",
  },
  error: {
    icon: AlertCircle,
    className:
      "bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100",
    iconClassName: "text-red-600 dark:text-red-400",
  },
  tip: {
    icon: Lightbulb,
    className:
      "bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-100",
    iconClassName: "text-purple-600 dark:text-purple-400",
  },
};

export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border-l-4 p-4",
        config.className,
        className
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconClassName)} />
      <div className="flex-1 space-y-1">
        {title && (
          <div className="font-semibold text-sm uppercase tracking-wide">
            {title}
          </div>
        )}
        <div className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
