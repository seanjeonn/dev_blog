import { AboutHero } from "@/components/about/about-hero";
import { ContactSection } from "@/components/about/contact-section";
import { ExperienceSection } from "@/components/about/experience-section";
import { SkillsSection } from "@/components/about/skills-section";

export const metadata = {
  title: "About",
  description:
    "Founding engineer and product manager building production AI products end-to-end.",
};

export default function AboutPage() {
  return (
    <div className="divide-y divide-border/60">
      <div className="pb-8">
        <AboutHero />
      </div>
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}
