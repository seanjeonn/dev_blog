import { HeroSection } from "@/components/home/hero-section";
import { Code2, Zap, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              블로그의 특징
            </h2>
            <p className="text-muted-foreground text-lg">
              현대적인 기술 스택으로 구축된 개발자 친화적인 블로그
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">MDX 기반 작성</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Velite MDX을 활용하여 유연하고 확장 가능한 블로그 포스트를
                작성하였습니다. 다양한 컴포넌트와 상호작용을 구현하였습니다.
              </p>
            </div>

            <div className="group rounded-2xl border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">빠른 성능</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Next.js 15와 Turbopack으로 최적화된 빌드 속도와 뛰어난 사용자
                경험을 제공합니다. 정적 생성으로 준수한 로딩을 보장합니다.
              </p>
            </div>

            <div className="group rounded-2xl border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">타입 안전성</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                TypeScript와 Velite를 통해 완벽한 타입 안전성을 보장합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
