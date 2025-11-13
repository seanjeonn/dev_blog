"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  children,
  language,
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group relative my-6", className)}>
      {filename && (
        <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-border bg-muted px-4 py-2">
          <span className="text-xs font-mono text-muted-foreground">
            {filename}
          </span>
          {language && (
            <span className="text-xs font-medium text-muted-foreground uppercase">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className={cn(
            "absolute right-3 top-3 z-10 rounded-md p-2",
            "bg-background/80 backdrop-blur-sm",
            "border border-border",
            "opacity-0 transition-opacity group-hover:opacity-100",
            "hover:bg-accent hover:text-accent-foreground"
          )}
          aria-label="코드 복사"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        <pre
          className={cn(
            "overflow-x-auto rounded-lg p-4",
            filename ? "rounded-t-none" : "",
            "bg-gray-950 text-gray-50"
          )}
        >
          <code className={language ? `language-${language}` : ""}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}
