"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/use-typewriter";
import { ArrowRight, BookOpen, Code2 } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface HeroMetrics {
  postCount: number;
  projectCount: number;
}

export function HeroSection({ metrics }: { metrics: HeroMetrics }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // 타이핑 효과
  const typedText = useTypewriter({
    words: ["개발자", "창작자", "문제 해결사", "학습자"],
    typeSpeed: 150,
    deleteSpeed: 100,
    delayBetweenWords: 2000,
  });

  // 스크롤 애니메이션을 위한 Intersection Observer
  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -top-16 min-h-dvh flex items-center justify-center overflow-hidden z-9"
    >
      {/* 애니메이션 그라디언트 배경 */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/10 to-primary/20 animate-gradient" />

      {/* 플로팅 그라디언트 블러 구체 */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float-delayed" />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 container max-w-5xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          {/* 타이틀 */}
          <div
            className={`space-y-4 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <Code2 className="w-4 h-4" />
              개발 블로그 & 포트폴리오
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              안녕하세요,
              <br />
              <span className="bg-linear-to-r from-primary via-primary to-pink-500 bg-clip-text text-transparent">
                {typedText}
              </span>
              <span className="animate-pulse">|</span>
              <br />
              입니다
            </h1>
          </div>

          {/* 설명 */}
          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            웹 개발, 프로그래밍, 그리고 기술에 대한 이야기를 공유합니다.
          </p>

          {/* CTA 버튼들 */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            <Button size="lg" className="group" asChild>
              <Link href="/posts">
                <BookOpen className="mr-2 h-5 w-5" />
                포스트 읽기
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="group" asChild>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="mr-2 h-5 w-5" />
                GitHub
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* 통계 또는 강조 정보 */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto pt-12 ${
              isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"
            }`}
          >
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary">{metrics.postCount}</div>
              <div className="text-sm text-muted-foreground mt-1">
                기술 포스트
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary">{metrics.projectCount}</div>
              <div className="text-sm text-muted-foreground mt-1">
                프로젝트
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 스크롤 힌트 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </section>
  );
}
