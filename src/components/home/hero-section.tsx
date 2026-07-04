import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
      <p className="text-sm font-medium text-muted-foreground">
        {siteConfig.role}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
        Hi, I&apos;m Sean — I build production AI products end-to-end.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Founding engineer and product manager. I&apos;ve shipped an AI education
        platform as a sole engineer and a D2C commerce business solo — from
        system design and LLM agents to deployment and operations. I care about
        solving real problems, not shipping features.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          View work
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          Get in touch
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
    </section>
  );
}
