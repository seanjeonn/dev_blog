import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} {siteConfig.name}
        </p>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <FaGithub className="h-[18px] w-[18px]" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <FaLinkedin className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="transition-colors hover:text-foreground"
          >
            {dict.footer.email}
          </a>
          <Link href="/feed.xml" className="transition-colors hover:text-foreground">
            {dict.footer.rss}
          </Link>
        </div>
      </div>
    </footer>
  );
}
