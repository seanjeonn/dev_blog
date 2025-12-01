"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5" />

      <div className="relative z-10 container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 프로필 이미지 */}
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* 배경 장식 */}
              <div className="absolute -inset-4 bg-linear-to-br from-primary/20 to-primary/5 rounded-3xl rotate-3" />
              <div className="absolute -inset-4 bg-linear-to-tr from-primary/20 to-primary/5 rounded-3xl -rotate-3" />

              {/* 이미지 */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="/static/profile.jpg"
                  alt="Profile"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 소개 텍스트 */}
          <div className="space-y-6">
            <div
              className={`space-y-4 ${
                isVisible
                  ? "animate-fade-in-up animation-delay-100"
                  : "opacity-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                👋 안녕하세요
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                저는{" "}
                <span className="bg-linear-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                  개발자
                </span>
                입니다
              </h1>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  안녕하세요! 웹 개발에 열정을 가진 풀스택 개발자입니다. 사용자
                  경험을 최우선으로 생각하며, 깔끔하고 효율적인 코드를 작성하는
                  것을 좋아합니다.
                </p>
                <p>
                  새로운 기술을 배우고 도전하는 것을 즐기며, 팀과 협력하여
                  문제를 해결하는 과정에서 큰 보람을 느낍니다. 현재는 Next.js와
                  TypeScript를 주로 사용하고 있으며, AI/ML 기술에도 관심을
                  가지고 공부하고 있습니다.
                </p>
              </div>
            </div>

            {/* CTA 버튼들 */}
            <div
              className={`flex flex-wrap gap-4 ${
                isVisible
                  ? "animate-fade-in-up animation-delay-200"
                  : "opacity-0"
              }`}
            >
              <Button size="lg" className="group" asChild>
                <Link href="mailto:junsu0573@naver.com">
                  <Mail className="mr-2 h-5 w-5" />
                  이메일 보내기
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="group" asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  이력서 다운로드
                </a>
              </Button>
            </div>

            {/* 소셜 링크 */}
            <div
              className={`flex items-center gap-4 pt-4 ${
                isVisible
                  ? "animate-fade-in-up animation-delay-300"
                  : "opacity-0"
              }`}
            >
              <Link
                href="https://github.com/junsu0573"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
