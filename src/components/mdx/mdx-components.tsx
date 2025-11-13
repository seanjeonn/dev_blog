import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { ImageGallery } from "./image-gallery";
import { Tabs as CustomTabs, CodeTabs } from "./tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// shadcn/ui 컴포넌트들

// MDX 컴포넌트 타입
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponents = Record<string, React.ComponentType<any>>;

export const mdxComponents: MDXComponents = {
  // ========== 기본 HTML 요소 스타일링 ==========
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-12 mb-4 text-4xl font-bold tracking-tight scroll-m-20",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 mb-4 text-3xl font-semibold tracking-tight scroll-m-20 border-b pb-2",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 mb-3 text-2xl font-semibold tracking-tight scroll-m-20",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-6 mb-2 text-xl font-semibold tracking-tight scroll-m-20",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-4 mb-2 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-4 mb-2 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),

  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("mb-4 text-base leading-7", className)} {...props} />
  ),

  a: ({
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link
      href={props.href || "#"}
      className={cn(
        "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
        className
      )}
      {...props}
    />
  ),

  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-4 ml-6 list-disc space-y-2", className)} {...props} />
  ),

  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("my-4 ml-6 list-decimal space-y-2", className)}
      {...props}
    />
  ),

  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("text-base leading-7", className)} {...props} />
  ),

  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "my-6 border-l-4 border-primary pl-6 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  ),

  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = "data-language" in props;

    if (isBlock) {
      return (
        <code
          className={cn(
            "relative rounded bg-[#282c34] px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",
            className
          )}
          {...props}
        />
      );
    } else
      return (
        <code
          className={cn(
            "relative rounded bg-[#ededeb] text-[#eb595a] px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",
            className
          )}
          {...props}
        />
      );
  },

  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm",
        className
      )}
      {...props}
    />
  ),

  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("my-6 rounded-lg border border-border", className)}
      alt={alt}
      {...props}
    />
  ),

  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <Separator className={cn("my-8", className)} {...props} />
  ),

  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),

  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn("bg-muted", className)} {...props} />
  ),

  tbody: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn("", className)} {...props} />
  ),

  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b border-border transition-colors hover:bg-muted/50",
        className
      )}
      {...props}
    />
  ),

  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "px-4 py-2 text-left font-semibold [[align=center]]:text-center [[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),

  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "px-4 py-2 [[align=center]]:text-center [[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),

  // ========== 커스텀 MDX 컴포넌트 ==========
  Callout,
  CodeBlock,
  ImageGallery,
  CustomTabs,
  CodeTabs,
  Image,

  // ========== shadcn/ui 컴포넌트 직접 노출 ==========
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Separator,
};
