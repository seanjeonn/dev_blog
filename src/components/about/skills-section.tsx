"use client";

import { useEffect, useRef, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Server, Smartphone, Wrench } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code2 className="h-6 w-6" />,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    icon: <Server className="h-6 w-6" />,
    skills: ["Node.js", "Express"],
  },
  {
    title: "Database",
    icon: <Database className="h-6 w-6" />,
    skills: ["PostgreSQL", "Prisma", "Supabase", "MongoDB"],
  },
  {
    title: "Mobile",
    icon: <Smartphone className="h-6 w-6" />,
    skills: ["Flutter"],
  },
  {
    title: "Tools & Others",
    icon: <Wrench className="h-6 w-6" />,
    skills: ["Git", "AWS", "Vercel"],
  },
];

export function SkillsSection() {
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
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4">
        {/* 섹션 헤더 */}
        <div
          className={`text-center mb-12 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">기술 스택</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            다양한 기술과 도구를 활용하여 프로젝트를 개발합니다
          </p>
        </div>

        {/* 스킬 카테고리 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={category.title}
              className={`group hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                isVisible
                  ? `animate-fade-in-up animation-delay-${(index + 1) * 100}`
                  : "opacity-0"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {category.icon}
                  </div>
                  <span className="text-xl">{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all duration-200 border border-border/50 hover:border-primary/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
