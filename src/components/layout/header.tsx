"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="text-base font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          {siteConfig.shortName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground",
                isActive(pathname, item.href)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
          <span className="mx-2 h-4 w-px bg-border" aria-hidden />
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <FaGithub className="h-[18px] w-[18px]" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <FaLinkedin className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="ml-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Contact
          </a>
        </nav>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-left">{siteConfig.shortName}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {siteConfig.nav.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-accent",
                      isActive(pathname, item.href)
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 rounded-md bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
                >
                  Contact
                </a>
              </SheetClose>
              <div className="mt-4 flex gap-2 px-3">
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
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
