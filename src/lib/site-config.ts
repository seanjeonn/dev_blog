/**
 * Locale-neutral site identity. Translatable copy lives in the i18n dictionaries
 * (src/lib/i18n/dictionaries), not here.
 */
export const siteConfig = {
  name: "Sean (Suhyun) Jeon",
  shortName: "Sean Jeon",
  email: "sean.suhyunjeon@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seanjeon.dev",
  resumePath: "/resume.pdf",
  profileImage: "/profile.png",
  social: {
    github: "https://github.com/seanjeonn",
    linkedin: "https://linkedin.com/in/sean-jeon",
  },
  // Nav labels come from the dictionary (nav.*); hrefs are prefixed with the
  // active locale at render time via localePath().
  nav: [
    { key: "work", href: "/projects" },
    { key: "blog", href: "/posts" },
    { key: "about", href: "/about" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type NavKey = (typeof siteConfig.nav)[number]["key"];
