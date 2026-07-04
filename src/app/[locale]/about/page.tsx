import { AboutHero } from "@/components/about/about-hero";
import { ContactSection } from "@/components/about/contact-section";
import { ExperienceSection } from "@/components/about/experience-section";
import { SkillsSection } from "@/components/about/skills-section";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <div className="divide-y divide-border/60">
      <div className="pb-8">
        <AboutHero dict={dict} />
      </div>
      <SkillsSection dict={dict} />
      <ExperienceSection dict={dict} />
      <ContactSection dict={dict} />
    </div>
  );
}
