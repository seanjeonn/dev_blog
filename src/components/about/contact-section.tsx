"use client";

import { useEffect, useRef, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

const contactInfos: ContactInfo[] = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "junsu0573@naver.com",
    href: "mailto:junsu0573@naver.com",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Location",
    value: "화성 대한민국",
    href: "#",
  },
];

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FaGithub className="h-6 w-6" />,
    label: "GitHub",
    href: "https://github.com/junsu0573",
    color: "hover:text-gray-900 dark:hover:text-white",
  },
];

export function ContactSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">연락하기</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            프로젝트 문의나 협업 제안이 있으시다면 언제든지 연락주세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 연락처 정보 */}
          <div
            className={`space-y-4 ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">연락처 정보</h3>

            {contactInfos.map((info, index) => (
              <Link
                key={index}
                href={info.href}
                className={`block ${
                  info.href === "#" ? "pointer-events-none" : ""
                }`}
              >
                <Card className="group hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-primary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {info.label}
                        </p>
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* 소셜 미디어 */}
          <div
            className={`space-y-4 ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">소셜 미디어</h3>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">팔로우하기</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-all duration-200 group"
                    >
                      <div
                        className={`transition-colors duration-200 ${social.color}`}
                      >
                        {social.icon}
                      </div>
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {social.label}
                      </span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </div>
                    </Link>
                  ))}
                </div>

                {/* 추가 정보 */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    개발 관련 소식과 프로젝트 업데이트를 공유합니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
