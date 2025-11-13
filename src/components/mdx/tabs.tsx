"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultIndex?: number;
  className?: string;
}

export function Tabs({ items, defaultIndex = 0, className }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={cn("my-6", className)}>
      {/* Tab Headers */}
      <div className="flex gap-1 border-b border-border">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors",
              "hover:text-foreground",
              activeIndex === index
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.label}
            {activeIndex === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "transition-opacity",
              activeIndex === index ? "block" : "hidden"
            )}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}

interface CodeTabsProps {
  tabs: Array<{
    title: string;
    language: string;
    code: string;
  }>;
  className?: string;
}

export function CodeTabs({ tabs, className }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn("my-6", className)}>
      {/* Tab Headers */}
      <div className="flex gap-1 rounded-t-lg border border-b-0 border-border bg-muted p-1">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeIndex === index
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Code Content */}
      <div className="relative">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={cn(activeIndex === index ? "block" : "hidden")}
          >
            <pre className="overflow-x-auto rounded-b-lg rounded-t-none border border-border bg-gray-950 p-4 text-gray-50">
              <code className={`language-${tab.language}`}>{tab.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
