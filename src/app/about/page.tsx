import { AboutHero } from "@/components/about/about-hero";
import { ContactSection } from "@/components/about/contact-section";
import { ExperienceSection } from "@/components/about/experience-section";
import { SkillsSection } from "@/components/about/skills-section";

export const metadata = {
  title: "About",
  description: "개발자 소개 및 경력 정보",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AboutHero />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
