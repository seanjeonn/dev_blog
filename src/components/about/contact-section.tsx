import type { Dictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site-config";
import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function ContactSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          {dict.about.contactTitle}
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {dict.about.contactBody}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4 text-muted-foreground" />
            {siteConfig.email}
          </a>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {dict.about.location}
          </span>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
