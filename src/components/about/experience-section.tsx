"use client";

import { useEffect, useRef, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
  current?: boolean;
}

const experiences: Experience[] = [
  {
    company: "Sungkyungwan University",
    position: "Bachelor",
    period: "2022.03 - 현재",
    location: "수원 대한민국",
    description: ["소프트웨어학과 재학중"],
    current: true,
  },

  {
    company: "Deep Plant",
    position: "App Developer",
    period: "2023.05 - 2023.12",
    location: "수원, 경기",
    description: [
      "UI/UX 디자인 협업 및 구현",
      "Flutter을 활용한 크로스 플랫폼 앱 개발",
      "백엔드 API 통신 및 데이터 관리",
      "바코드 스캐너 등 특수 하드웨어 연동",
    ],
  },
];

export function ExperienceSection() {
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
    <section ref={sectionRef} className="py-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* 섹션 헤더 */}
        <div
          className={`text-center mb-12 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">경력</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            다양한 프로젝트와 팀에서 쌓은 개발 경험입니다
          </p>
        </div>

        {/* 타임라인 */}
        <div className="relative">
          {/* 세로 라인 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative ${
                  isVisible
                    ? `animate-fade-in-up animation-delay-${(index + 1) * 100}`
                    : "opacity-0"
                }`}
              >
                {/* 타임라인 도트 */}
                <div
                  className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background ${
                    exp.current ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />

                {/* 카드 */}
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
                  } pl-16 md:pl-0`}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <CardHeader>
                      <div className="space-y-2">
                        {/* 회사명과 현재 뱃지 */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                            {exp.company}
                          </h3>
                          {exp.current && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
                              현재 재직중
                            </span>
                          )}
                        </div>

                        {/* 포지션 */}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="h-4 w-4" />
                          <span className="font-medium">{exp.position}</span>
                        </div>

                        {/* 기간 */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>

                        {/* 위치 */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-2">
                        {exp.description.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-primary">•</span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
