"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PostsHeroProps {
  categories: string[];
}

export function PostsHero({ categories }: PostsHeroProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const selectedCategory = searchParams.get("category") || "";

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL(searchQuery, selectedCategory);
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const updateURL = (query: string, category: string) => {
    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    if (category) {
      params.set("category", category);
    }

    const queryString = params.toString();
    const newURL = queryString ? `/posts?${queryString}` : "/posts";

    router.push(newURL, { scroll: false });
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = category === selectedCategory ? "" : category;
    updateURL(searchQuery, newCategory);
  };

  return (
    <div className="w-full max-w-xl mb-12 space-y-6">
      {/* 제목 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">포스트</h1>
        <p className="text-muted-foreground mt-2">
          검색하거나 카테고리로 필터링하세요
        </p>
      </div>

      {/* 검색 필드 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="포스트 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* 카테고리 버튼 그룹 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "" ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryClick("")}
        >
          전체
        </Button>

        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
