import type { Dictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site-config";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function AboutHero({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 sm:pt-24">
      <div className="grid items-center gap-10 md:grid-cols-[280px_1fr]">
        {/* Profile image */}
        <div className="relative mx-auto aspect-[3/4] w-56 overflow-hidden rounded-2xl border border-border/60 bg-muted md:mx-0 md:w-full">
          <Image
            src={siteConfig.profileImage}
            alt={siteConfig.name}
            fill
            sizes="280px"
            className="object-cover"
            priority
          />
        </div>

        {/* Intro */}
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {dict.about.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="mt-1 text-muted-foreground">{dict.hero.role}</p>

          <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
            {dict.about.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              {dict.about.emailMe}
            </a>
            <a
              href={siteConfig.resumePath}
              download
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Download className="h-4 w-4" />
              {dict.about.resume}
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
