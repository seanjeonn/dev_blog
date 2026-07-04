import { BlogTeaser } from "@/components/home/blog-teaser";
import { HeroSection } from "@/components/home/hero-section";
import { SelectedWork } from "@/components/home/selected-work";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="divide-y divide-border/60">
      <HeroSection />
      <SelectedWork />
      <BlogTeaser />

      {/* Contact band */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Let&apos;s build something.
          </h2>
          <p className="max-w-xl text-muted-foreground">
            I&apos;m open to founding-engineer roles, product collaborations, and
            interesting problems. The fastest way to reach me is email.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {siteConfig.email}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
