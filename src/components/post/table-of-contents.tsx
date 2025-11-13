"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const tocListRef = useRef<HTMLUListElement>(null);
  const isClickScrollingRef = useRef(false);

  // 활성 항목이 변경될 때마다 TOC 스크롤 (클릭으로 인한 것이 아닌 경우에만)
  useEffect(() => {
    if (!activeId || !tocListRef.current || isClickScrollingRef.current) return;

    const activeElement = tocListRef.current.querySelector(
      `a[href="#${activeId}"]`
    );

    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeId]);

  useEffect(() => {
    // 헤딩 요소들 수집
    const headings = Array.from(
      document.querySelectorAll("article h2, article h3, article h4")
    );

    const tocItems: TOCItem[] = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName.charAt(1)),
    }));

    setToc(tocItems);

    // Intersection Observer로 현재 보이는 섹션 추적
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 1,
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    // 클릭으로 인한 스크롤 시작을 표시
    isClickScrollingRef.current = true;

    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // 스크롤 완료 후 플래그 해제 (스크롤 애니메이션 시간 고려)
      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 2000);
    }
  };

  return (
    <nav className={cn("space-y-2", className)}>
      <p className="text-sm font-semibold text-foreground mb-3">목차</p>
      <ul
        ref={tocListRef}
        className={cn(
          "space-y-2",
          "max-h-[calc(100vh-200px)]",
          "overflow-y-auto",
          "pr-2",
          // 커스텀 스크롤바 스타일링
          "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
          "[&::-webkit-scrollbar]:w-2",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:bg-border",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:hover:bg-border/80"
        )}
      >
        {toc.map((item) => (
          <li
            key={item.id}
            className={cn(
              item.level === 3 && "ml-4",
              item.level === 4 && "ml-8"
            )}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "block text-sm transition-colors hover:text-primary",
                "border-l-2 pl-3 py-1",
                activeId === item.id
                  ? "border-primary text-primary font-medium"
                  : "border-border text-muted-foreground"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
